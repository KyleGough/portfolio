import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

import styles from '../Hero/Hero.module.css';
import { useHeroAnimationActive } from '../Hero/HeroAnimationContext';
import {
  type AddAllEnginePlumesResult,
  type PlumeLayer,
  addAllEnginePlumes,
  addBoosterSepThrusterPlumes,
  addEngineBayStructure,
  addEngineNozzle,
  addOctawebEngines,
  updatePlumeLayersForTick,
} from './Engine';
import {
  BOOSTER_FADE_AT_MISSION_SEC,
  BOOSTER_FADE_WALL_MS,
  BOOSTER_SEP_DURATION_MS,
  BOOSTER_VISUAL_FADE_DELAY_MS,
  BOOSTER_WIREFRAME_FADE_WALL_MS,
  CORE_BOTTOM_STAGING_WALL_MS,
  CORE_STAGING_AT_MISSION_SEC,
  getMissionSec,
  LOOP_FADE_IN_MISSION_SEC,
  LOOP_PERIOD_MISSION_SEC,
  LOOP_UPPER_EXIT_START_MISSION_SEC,
  S2_PLUME_AT_MISSION_SEC,
  S2_PLUME_FADEIN_WALL_MS,
  separationThrusterBurstMul,
} from './MissionTime';
import {
  type RocketDepthOccluderMaterial,
  type RocketWireDepthPass,
  addBoosterGridFins,
  addCylinderEdges,
  addPayloadFairingWithBoatTailEdges,
  addRoundedPayloadFairingEdges,
  addStrut,
  createRocketDepthOccluderMaterial,
  ROCKET_OCCLUDED_SILHOUETTE_OPACITY_MUL,
  ROCKET_WIRE_DEPTH_PASS_UD,
} from './Wireframe';

const CYAN = 0x5bd4ea;
const CYAN_DIM = 0x3d7a8a;
const ENGINE_CYAN_DARK = 0x2f8fa3;

/**
 * Yaw (spin about body Y) is driven by mission phase within each loop so it resets with
 * staging. Offset by −90° so by booster separation (~T+0:25) the triple-body layout reads
 * clearly from the hero camera. Rate matches legacy `+= 0.0028` per frame at ~60fps.
 */
const LOOP_YAW_OFFSET_RAD = 0;
const LOOP_YAW_RATE_RAD_PER_MISSION_SEC = 0.0028 * 60;
/** Screen-space launch tilt over one mission loop (was CSS `hero-rocket-launch-z`). */
const LOOP_LAUNCH_TILT_RAD = -THREE.MathUtils.degToRad(40);

/** Y mount for all octaweb engine clusters in buildRocket. */
const Y_MOUNT_CORE = 0.03;

/** Booster first-stage local origin — body space X offset for each side booster. */
const BOOSTER_STAGE_X = 0.7;
const BOOSTER_SEP_EXTRA_X = 0.38;
/** Max downward Y (body space) while side boosters fade; scales 0–1 with wireframe fade. */
const BOOSTER_SEP_FALL_MAX = 1;
/** Outward roll about Z, max at rotSplayK = 1. */
const BOOSTER_SEP_SPLAY_RAD = 0.55;

const CORE_FALL_DY = 0.55;
/** Second stage + fairing rise (body +Y) during T+2:05–T+2:10 loop exit. */
const CORE_UPPER_RISE = 1.15;

/** First stage height; joint with interstage is the natural “line” for stack separation. */
const S1_H = 3.12;
const INTERSTAGE_H = 0.2;
const S2_H = 0.92;
/** Short shoulder right above the interstage so S2 reads as a separate stage. */
const S2_SHOULDER_H = 0.18;
const FAIRING_H = 0.8;
const S1_TOP_R = 0.32;
const S1_BASE_R = 0.35;
/**
 * Three-engine cluster at second-stage base (interstage / S2 joint).
 * Scale is reduced vs. the original single MVAC-class bell so three bells fit cleanly
 * within the S2 base diameter; ring radius is sized so the bells (and their plumes) sit
 * apart with a visible gap rather than reading as one fat exhaust.
 */
const S2_ENGINE_COUNT = 3;
const S2_ENGINE_SCALE = 0.55;
const S2_ENGINE_RING_R = 0.08;
/** First engine points toward −Z so the cluster reads triangle-up from the hero camera. */
const S2_ENGINE_RING_ANGLE_OFFSET = -Math.PI / 2;
const S2_ENGINE_Y_MOUNT = S1_H + INTERSTAGE_H;
const ENGINE_WIREFRAME_OPACITY_FACTOR = 0.65;

const buildRocket = (
  wireMat: THREE.LineBasicMaterial,
  strutMat: THREE.LineBasicMaterial,
  engineWireMat: THREE.LineBasicMaterial,
  depthOccluder: RocketDepthOccluderMaterial,
): {
  body: THREE.Group;
  coreLower: THREE.Group;
  coreUpper: THREE.Group;
  engineWireGroups: THREE.Group[];
  leftBooster: THREE.Group;
  rightBooster: THREE.Group;
  strutsGroup: THREE.Group;
} => {
  const body = new THREE.Group();
  const coreLower = new THREE.Group();
  const coreUpper = new THREE.Group();
  const coreEngineWire = new THREE.Group();
  const coreUpperEngineWire = new THREE.Group();
  const leftBooster = new THREE.Group();
  const leftBoosterEngineWire = new THREE.Group();
  const rightBooster = new THREE.Group();
  const rightBoosterEngineWire = new THREE.Group();
  const strutsGroup = new THREE.Group();

  const boosterH = 2.95;
  const coreR = S1_BASE_R;
  const boosterR = 0.25;
  const boosterRTop = 0.205; /* stronger taper so boosters don't read as straight tubes */
  const boosterOctawebRingR = 0.127; /* ~scaled with diameter vs 0.3 / 0.152 */

  // Full first stage: separation seam is S1 / interstage (S1 top — existing ring line)
  addCylinderEdges(
    coreLower,
    wireMat,
    S1_TOP_R,
    coreR,
    S1_H,
    10,
    0,
    S1_H * 0.5,
    0,
    depthOccluder,
  );
  // Interstage stays with the first stage through separation (bottom stack).
  addCylinderEdges(
    coreLower,
    wireMat,
    0.3,
    0.32,
    INTERSTAGE_H,
    10,
    0,
    S1_H + INTERSTAGE_H / 2,
    0,
    depthOccluder,
  );
  addOctawebEngines(coreEngineWire, engineWireMat, Y_MOUNT_CORE, 0.2, 1);
  addEngineBayStructure(coreEngineWire, engineWireMat, Y_MOUNT_CORE, 0.2, 1);
  coreLower.add(coreEngineWire);

  // Second stage, fairing, and single S2 engine (MVAC) — above interstage / seam
  const s2BaseY = S1_H + INTERSTAGE_H;
  const s2BodyH = S2_H - S2_SHOULDER_H;
  // Thin ring seam sitting just above the interstage.
  addCylinderEdges(
    coreUpper,
    wireMat,
    0.3,
    0.3,
    0.028,
    16,
    0,
    s2BaseY + 0.014,
    0,
    depthOccluder,
  );
  // Short shoulder that steps in from interstage diameter toward the upper stage tank.
  addCylinderEdges(
    coreUpper,
    wireMat,
    0.24,
    0.225,
    S2_SHOULDER_H,
    10,
    0,
    s2BaseY + S2_SHOULDER_H * 0.5,
    0,
    depthOccluder,
  );
  // Main S2 body above the shoulder.
  addCylinderEdges(
    coreUpper,
    wireMat,
    0.2,
    0.22,
    s2BodyH,
    10,
    0,
    s2BaseY + S2_SHOULDER_H + s2BodyH * 0.5,
    0,
    depthOccluder,
  );
  const fairingR = 0.22;
  const fairingNeckR = 0.172;
  const fairingBoatTailH = 0.1;
  const fairingYBase = S1_H + INTERSTAGE_H + S2_H;
  addPayloadFairingWithBoatTailEdges(
    coreUpper,
    wireMat,
    fairingR,
    fairingNeckR,
    fairingBoatTailH,
    FAIRING_H,
    0,
    fairingYBase,
    0,
    depthOccluder,
  );
  for (let i = 0; i < S2_ENGINE_COUNT; i += 1) {
    const a =
      (i * 2 * Math.PI) / S2_ENGINE_COUNT + S2_ENGINE_RING_ANGLE_OFFSET;
    addEngineNozzle(
      coreUpperEngineWire,
      engineWireMat,
      Math.cos(a) * S2_ENGINE_RING_R,
      Math.sin(a) * S2_ENGINE_RING_R,
      S2_ENGINE_Y_MOUNT,
      S2_ENGINE_SCALE,
    );
  }
  addEngineBayStructure(
    coreUpperEngineWire,
    engineWireMat,
    S2_ENGINE_Y_MOUNT,
    S2_ENGINE_RING_R,
    S2_ENGINE_SCALE,
  );
  coreUpper.add(coreUpperEngineWire);

  body.add(coreLower, coreUpper);

  // Side boosters: local origin at stage center; body-space offset on each group
  for (const { b, outward, engineWire } of [
    { b: leftBooster, outward: -1 as const, engineWire: leftBoosterEngineWire },
    { b: rightBooster, outward: 1 as const, engineWire: rightBoosterEngineWire },
  ]) {
    b.position.set(outward * BOOSTER_STAGE_X, 0, 0);
    addCylinderEdges(
      b,
      wireMat,
      boosterRTop,
      boosterR,
      boosterH,
      10,
      0,
      boosterH / 2,
      0,
      depthOccluder,
    );
    // Rounded ogive-like nose: short shoulder + cap reads cleaner than a sharp cone tip.
    const boosterNoseCapR = boosterRTop;
    const boosterNoseH = 0.46;
    const boosterNoseShoulderH = Math.max(0, boosterNoseH - boosterNoseCapR);
    addRoundedPayloadFairingEdges(
      b,
      wireMat,
      boosterRTop,
      boosterNoseCapR,
      boosterNoseShoulderH,
      0,
      boosterH,
      0,
      depthOccluder,
    );
    addOctawebEngines(
      engineWire,
      engineWireMat,
      Y_MOUNT_CORE,
      boosterOctawebRingR,
      0.86,
    );
    addEngineBayStructure(
      engineWire,
      engineWireMat,
      Y_MOUNT_CORE,
      boosterOctawebRingR,
      0.86,
    );
    b.add(engineWire);
    const finYFlare = 0.12;
    const finYAttach = 0.46;
    addBoosterGridFins(
      b,
      wireMat,
      outward,
      boosterR,
      finYFlare,
      finYAttach,
      0.1,
      0.05,
      0.04,
      4,
      4,
    );
  }

  body.add(leftBooster, rightBooster, strutsGroup);

  // Struts (center core to side boosters), world space in body
  const strutYs = [1.05, 1.95, 2.55];
  for (const y of strutYs) {
    addStrut(
      strutsGroup,
      strutMat,
      -coreR * 0.92,
      y,
      -BOOSTER_STAGE_X + boosterR * 0.88,
    );
    addStrut(
      strutsGroup,
      strutMat,
      coreR * 0.92,
      y,
      BOOSTER_STAGE_X - boosterR * 0.88,
    );
  }

  return {
    body,
    coreLower,
    coreUpper,
    engineWireGroups: [
      coreEngineWire,
      coreUpperEngineWire,
      leftBoosterEngineWire,
      rightBoosterEngineWire,
    ],
    leftBooster,
    rightBooster,
    strutsGroup,
  };
};

const centerObjectAtOrigin = (object: THREE.Object3D): void => {
  const box = new THREE.Box3().setFromObject(object);
  const center = new THREE.Vector3();
  box.getCenter(center);
  object.position.sub(center);
};

const fitPerspectiveCameraToObject = (
  camera: THREE.PerspectiveCamera,
  object: THREE.Object3D,
  margin: number,
): void => {
  const box = new THREE.Box3().setFromObject(object);
  const size = new THREE.Vector3();
  box.getSize(size);
  const center = new THREE.Vector3();
  box.getCenter(center);

  const halfY = size.y * 0.5;
  const halfX = Math.max(size.x, size.z) * 0.5;
  const fovRad = THREE.MathUtils.degToRad(camera.fov);
  const tanHalf = Math.tan(fovRad * 0.5);
  const distY = (halfY / tanHalf) * margin;
  const distX = (halfX / (tanHalf * camera.aspect)) * margin;
  const dist = Math.max(distY, distX, 0.01);

  camera.near = Math.max(0.02, dist * 0.004);
  camera.far = dist * 40;
  camera.position.set(
    center.x + dist * 0.58,
    center.y + dist * 0.36,
    center.z + dist * 0.72,
  );
  camera.lookAt(center);
};

const lineLiesUnderSubtree = (
  line: THREE.Object3D,
  subtreeRoot: THREE.Object3D,
): boolean => {
  for (
    let p: THREE.Object3D | null = line.parent;
    p;
    p = p.parent
  ) {
    if (p === subtreeRoot) {
      return true;
    }
  }
  return false;
};

const setGroupLineOpacityFactor = (
  root: THREE.Object3D,
  factor: number,
  excludeSubtree?: THREE.Object3D,
): void => {
  root.traverse((obj) => {
    if (!(obj instanceof THREE.Line || obj instanceof THREE.LineSegments)) {
      return;
    }
    if (
      excludeSubtree &&
      lineLiesUnderSubtree(obj, excludeSubtree)
    ) {
      return;
    }
    const m = obj.material as THREE.Material;
    if (obj.userData.baseLineOpacity === undefined) {
      obj.userData.baseLineOpacity = m.opacity;
    }
    const base = obj.userData.baseLineOpacity as number;
    const pass = obj.userData[ROCKET_WIRE_DEPTH_PASS_UD] as
      | RocketWireDepthPass
      | undefined;
    const passOpacityMul =
      pass === 'behind' ? ROCKET_OCCLUDED_SILHOUETTE_OPACITY_MUL : 1;
    const next = base * factor * passOpacityMul;
    m.transparent = next < 0.999;
    m.opacity = next;
  });
};

/** Booster hull depth-write meshes must hide when booster wireframe fades or they keep occluding the core. */
const BOOSTER_DEPTH_HULL_VISIBILITY_EPS = 1e-4;

const setBoosterDepthHullVisibility = (
  booster: THREE.Object3D,
  lineOpacityFactor: number,
  depthOccluder: RocketDepthOccluderMaterial,
): void => {
  const show = lineOpacityFactor > BOOSTER_DEPTH_HULL_VISIBILITY_EPS;
  booster.traverse((obj) => {
    if (obj instanceof THREE.Mesh && obj.material === depthOccluder) {
      obj.visible = show;
    }
  });
};

const loopFadeFromPhaseSec = (phaseSec: number): number => {
  if (phaseSec >= LOOP_FADE_IN_MISSION_SEC) {
    return 1;
  }
  const t = phaseSec / LOOP_FADE_IN_MISSION_SEC;
  return 1 - (1 - t) * (1 - t);
};

const upperStackExitFromPhaseSec = (
  phaseSec: number,
): {
  riseY: number;
  stackFadeK: number;
} => {
  if (phaseSec < LOOP_UPPER_EXIT_START_MISSION_SEC) {
    return { riseY: 0, stackFadeK: 1 };
  }
  const span = LOOP_PERIOD_MISSION_SEC - LOOP_UPPER_EXIT_START_MISSION_SEC;
  const u = Math.min(
    1,
    Math.max(0, (phaseSec - LOOP_UPPER_EXIT_START_MISSION_SEC) / span),
  );
  const riseY = CORE_UPPER_RISE * u * u * u;
  const stackFadeK = 1 - u;
  return { riseY, stackFadeK };
};

const t2EventProgress = (
  now: number,
  phaseMissionSec: number,
  previousT2Wall: number | null,
): {
  boosterFallK: number;
  plumeMul: number;
  rotSplayK: number;
  separationK: number;
  t2Wall: number | null;
  wireAlpha: number;
} => {
  let t2Wall = previousT2Wall;
  if (phaseMissionSec >= BOOSTER_FADE_AT_MISSION_SEC) {
    if (t2Wall === null) {
      t2Wall = now;
    }
  } else {
    t2Wall = null;
  }
  if (t2Wall === null) {
    return {
      boosterFallK: 0,
      plumeMul: 1,
      rotSplayK: 0,
      separationK: 0,
      t2Wall: null,
      wireAlpha: 1,
    };
  }
  const d = now - t2Wall;
  const fadeDelay = BOOSTER_VISUAL_FADE_DELAY_MS;
  const dFade = Math.max(0, d - fadeDelay);
  const plumeFadeWallMs = Math.max(1, BOOSTER_FADE_WALL_MS - fadeDelay);
  const wireFadeWallMs = Math.max(1, BOOSTER_WIREFRAME_FADE_WALL_MS - fadeDelay);
  const plumeMul = Math.max(0, 1 - dFade / plumeFadeWallMs);
  const wireAlpha = Math.max(0, 1 - dFade / wireFadeWallMs);
  const uOffset = Math.min(1, d / BOOSTER_SEP_DURATION_MS);
  const separationK = 1 - (1 - uOffset) * (1 - uOffset);
  /** Same timeline as wire fade; rotation uses cubic ease-in (slow roll-up → faster). */
  const uRot = Math.min(1, d / BOOSTER_WIREFRAME_FADE_WALL_MS);
  const rotSplayK = Math.pow(uRot, 3);
  const boosterFallK = Math.pow(uRot, 2);
  return { boosterFallK, plumeMul, rotSplayK, separationK, t2Wall, wireAlpha };
};

const applyBoosterSeparationPose = (
  separationK: number,
  rotSplayK: number,
  boosterFallK: number,
  wireAlpha: number,
  loopFadeK: number,
  leftBooster: THREE.Group,
  rightBooster: THREE.Group,
  strutsGroup: THREE.Object3D,
  depthOccluder: RocketDepthOccluderMaterial,
  leftBoosterEngines: THREE.Object3D,
  rightBoosterEngines: THREE.Object3D,
): void => {
  const extraX = BOOSTER_SEP_EXTRA_X * separationK;
  const extraY = -BOOSTER_SEP_FALL_MAX * boosterFallK;
  const lineK = wireAlpha * loopFadeK;
  leftBooster.position.set(-BOOSTER_STAGE_X - extraX, extraY, 0);
  rightBooster.position.set(BOOSTER_STAGE_X + extraX, extraY, 0);
  leftBooster.rotation.z = BOOSTER_SEP_SPLAY_RAD * rotSplayK;
  rightBooster.rotation.z = -BOOSTER_SEP_SPLAY_RAD * rotSplayK;
  setGroupLineOpacityFactor(leftBooster, lineK, leftBoosterEngines);
  setGroupLineOpacityFactor(rightBooster, lineK, rightBoosterEngines);
  setGroupLineOpacityFactor(strutsGroup, lineK);
  setBoosterDepthHullVisibility(leftBooster, lineK, depthOccluder);
  setBoosterDepthHullVisibility(rightBooster, lineK, depthOccluder);
};

const resetBoosterSeparationPose = (
  loopFadeK: number,
  leftBooster: THREE.Group,
  rightBooster: THREE.Group,
  strutsGroup: THREE.Object3D,
  depthOccluder: RocketDepthOccluderMaterial,
  leftBoosterEngines: THREE.Object3D,
  rightBoosterEngines: THREE.Object3D,
): void => {
  leftBooster.position.set(-BOOSTER_STAGE_X, 0, 0);
  rightBooster.position.set(BOOSTER_STAGE_X, 0, 0);
  leftBooster.rotation.set(0, 0, 0);
  rightBooster.rotation.set(0, 0, 0);
  setGroupLineOpacityFactor(leftBooster, loopFadeK, leftBoosterEngines);
  setGroupLineOpacityFactor(rightBooster, loopFadeK, rightBoosterEngines);
  setGroupLineOpacityFactor(strutsGroup, loopFadeK);
  setBoosterDepthHullVisibility(leftBooster, loopFadeK, depthOccluder);
  setBoosterDepthHullVisibility(rightBooster, loopFadeK, depthOccluder);
};

const t3EventProgress = (
  now: number,
  phaseMissionSec: number,
  previousT3: number | null,
): {
  coreLowerK: number;
  corePlumeK: number;
  motionK: number;
  t3Wall: number | null;
} => {
  let t3Wall = previousT3;
  if (phaseMissionSec >= CORE_STAGING_AT_MISSION_SEC) {
    if (t3Wall === null) {
      t3Wall = now;
    }
  } else {
    t3Wall = null;
  }
  if (t3Wall === null) {
    return { coreLowerK: 1, corePlumeK: 1, motionK: 0, t3Wall: null };
  }
  const d = now - t3Wall;
  const u = Math.min(1, d / CORE_BOTTOM_STAGING_WALL_MS);
  const motionK = 1 - (1 - u) * (1 - u);
  const k = Math.max(0, 1 - d / CORE_BOTTOM_STAGING_WALL_MS);
  return { coreLowerK: k, corePlumeK: k, motionK, t3Wall };
};

/**
 * S2 (single) plume: off until T+2:02, then 0 → 1 over S2_PLUME_FADEIN_WALL_MS.
 */
const s2PlumeProgress = (
  now: number,
  phaseMissionSec: number,
  previousS2Wall: number | null,
): { s2PlumeK: number; s2Wall: number | null } => {
  let s2Wall = previousS2Wall;
  if (phaseMissionSec >= S2_PLUME_AT_MISSION_SEC) {
    if (s2Wall === null) {
      s2Wall = now;
    }
  } else {
    s2Wall = null;
  }
  if (s2Wall === null) {
    return { s2PlumeK: 0, s2Wall: null };
  }
  const d = now - s2Wall;
  const u = Math.min(1, d / S2_PLUME_FADEIN_WALL_MS);
  const s2PlumeK = 1 - (1 - u) * (1 - u);
  return { s2PlumeK, s2Wall };
};

const applyCoreStagingPose = (
  coreLowerK: number,
  motionK: number,
  loopFadeK: number,
  coreLower: THREE.Group,
): void => {
  coreLower.position.set(0, -CORE_FALL_DY * motionK, 0);
  setGroupLineOpacityFactor(coreLower, coreLowerK * loopFadeK);
};

const resetCoreStagingPose = (
  loopFadeK: number,
  coreLower: THREE.Group,
): void => {
  coreLower.position.set(0, 0, 0);
  setGroupLineOpacityFactor(coreLower, loopFadeK);
};

const averagePlumeBrightness = (
  layers: readonly PlumeLayer[],
  pick: (layer: PlumeLayer) => boolean,
): number => {
  let sum = 0;
  let count = 0;
  for (const layer of layers) {
    if (!pick(layer)) {
      continue;
    }
    const base = Math.max(0.001, layer.baseOpacity);
    sum += layer.mat.opacity / base;
    count += 1;
  }
  if (count === 0) {
    return 0;
  }
  return Math.min(1, Math.max(0, sum / count));
};

const disposeWireframeScene = (
  scene: THREE.Scene,
  depthOccluder: RocketDepthOccluderMaterial,
): void => {
  scene.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      const hullGeom = obj.geometry as THREE.BufferGeometry;
      hullGeom.dispose();
      return;
    }
    if (!(obj instanceof THREE.Line || obj instanceof THREE.LineSegments)) {
      return;
    }
    const wire = obj as THREE.Line | THREE.LineSegments;
    const geometry: THREE.BufferGeometry = wire.geometry;
    geometry.dispose();
    const mat: THREE.Material | THREE.Material[] = wire.material;
    if (Array.isArray(mat)) {
      mat.forEach((m) => m.dispose());
      return;
    }
    mat.dispose();
  });
  depthOccluder.dispose();
};

const attachRocketViewport = (
  mount: HTMLElement,
  getShouldAnimate: () => boolean,
): { dispose: () => void; resume: () => void } => {
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  const wireMat = new THREE.LineBasicMaterial({
    color: CYAN,
    transparent: true,
    opacity: 0.88,
  });
  const strutMat = new THREE.LineBasicMaterial({
    color: CYAN_DIM,
    transparent: true,
    opacity: 0.5,
  });
  const engineWireMat = new THREE.LineBasicMaterial({
    color: ENGINE_CYAN_DARK,
    transparent: true,
    opacity: 0.72,
  });
  const depthOccluder = createRocketDepthOccluderMaterial();

  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(40, 1, 0.02, 200);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const {
    body,
    coreLower,
    coreUpper,
    engineWireGroups,
    leftBooster,
    rightBooster,
    strutsGroup,
  } = buildRocket(wireMat, strutMat, engineWireMat, depthOccluder);
  for (const engineWire of engineWireGroups) {
    setGroupLineOpacityFactor(engineWire, ENGINE_WIREFRAME_OPACITY_FACTOR);
  }

  const boosterNoseShoulderH = Math.max(
    0,
    0.46 - 0.205,
  ); /* matches buildRocket booster nose shoulders */
  const plumeSetup: AddAllEnginePlumesResult = addAllEnginePlumes(
    Y_MOUNT_CORE,
    0.2,
    0.127,
    coreLower,
    coreUpper,
    leftBooster,
    rightBooster,
    reducedMotion,
  );
  const sepPlumes = addBoosterSepThrusterPlumes(
    leftBooster,
    rightBooster,
    {
      boosterH: 2.95,
      boosterNoseCapR: 0.205,
      boosterRTop: 0.205,
      shoulderH: boosterNoseShoulderH,
    },
    reducedMotion,
  );
  const allLayers = [...plumeSetup.allLayers, ...sepPlumes.layers];
  const plumeDisposers = [...plumeSetup.disposers, ...sepPlumes.disposers];
  centerObjectAtOrigin(body);

  // Blue-white cast near nozzles, intensity driven by live plume brightness.
  const corePlumeLight = new THREE.PointLight(0xc8dcff, 0, 2.4, 2);
  corePlumeLight.position.set(0, Y_MOUNT_CORE - 0.1, 0);
  coreLower.add(corePlumeLight);
  const leftBoosterPlumeLight = new THREE.PointLight(0xc8dcff, 0, 2.1, 2);
  leftBoosterPlumeLight.position.set(0, Y_MOUNT_CORE - 0.08, 0);
  leftBooster.add(leftBoosterPlumeLight);
  const rightBoosterPlumeLight = new THREE.PointLight(0xc8dcff, 0, 2.1, 2);
  rightBoosterPlumeLight.position.set(0, Y_MOUNT_CORE - 0.08, 0);
  rightBooster.add(rightBoosterPlumeLight);
  const upperPlumeLight = new THREE.PointLight(0xd6e6ff, 0, 1.7, 2);
  upperPlumeLight.position.set(0, S2_ENGINE_Y_MOUNT - 0.08, 0);
  coreUpper.add(upperPlumeLight);

  const pivot = new THREE.Group();
  pivot.add(body);
  const rollGroup = new THREE.Group();
  rollGroup.add(pivot);
  scene.add(rollGroup);

  const setSize = () => {
    const w = mount.clientWidth;
    const h = mount.clientHeight;
    if (w < 2 || h < 2) {
      return;
    }
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    const fitMargin = Math.min(w, h) > 420 ? 1.18 : 1.12;
    fitPerspectiveCameraToObject(camera, pivot, fitMargin);
  };

  setSize();
  mount.appendChild(renderer.domElement);

  const time0 = performance.now();
  let t2EventWall0: number | null = null;
  let t3EventWall0: number | null = null;
  let s2PlumeEventWall0: number | null = null;
  let prevCycleIndex = 0;
  let rafId = 0;
  const tick = () => {
    if (!getShouldAnimate()) {
      return;
    }
    const now = performance.now();
    const wallS = (now - time0) * 0.001;
    const missionSec = getMissionSec(wallS);
    const phaseSec =
      missionSec -
      Math.floor(missionSec / LOOP_PERIOD_MISSION_SEC) *
        LOOP_PERIOD_MISSION_SEC;
    const cycleIndex = Math.floor(missionSec / LOOP_PERIOD_MISSION_SEC);
    if (cycleIndex > prevCycleIndex) {
      t2EventWall0 = null;
      t3EventWall0 = null;
      s2PlumeEventWall0 = null;
      prevCycleIndex = cycleIndex;
    }

    const loopFadeK = loopFadeFromPhaseSec(phaseSec);
    const { riseY: coreUpperRiseY, stackFadeK: upperStackFadeK } =
      upperStackExitFromPhaseSec(phaseSec);

    const {
      boosterFallK,
      plumeMul,
      rotSplayK,
      separationK,
      t2Wall,
      wireAlpha,
    } = t2EventProgress(now, phaseSec, t2EventWall0);
    t2EventWall0 = t2Wall;
    const { coreLowerK, corePlumeK, motionK, t3Wall } = t3EventProgress(
      now,
      phaseSec,
      t3EventWall0,
    );
    t3EventWall0 = t3Wall;
    const { s2PlumeK, s2Wall: s2PlumeWall } = s2PlumeProgress(
      now,
      phaseSec,
      s2PlumeEventWall0,
    );
    s2PlumeEventWall0 = s2PlumeWall;

    coreUpper.position.y = coreUpperRiseY;
    setGroupLineOpacityFactor(coreUpper, upperStackFadeK * loopFadeK);

    if (t2Wall === null) {
      resetBoosterSeparationPose(
        loopFadeK,
        leftBooster,
        rightBooster,
        strutsGroup,
        depthOccluder,
        engineWireGroups[2],
        engineWireGroups[3],
      );
    } else {
      applyBoosterSeparationPose(
        separationK,
        rotSplayK,
        boosterFallK,
        wireAlpha,
        loopFadeK,
        leftBooster,
        rightBooster,
        strutsGroup,
        depthOccluder,
        engineWireGroups[2],
        engineWireGroups[3],
      );
    }
    if (t3Wall === null) {
      resetCoreStagingPose(loopFadeK, coreLower);
    } else {
      applyCoreStagingPose(coreLowerK, motionK, loopFadeK, coreLower);
    }

    if (!reducedMotion) {
      const loopT = phaseSec / LOOP_PERIOD_MISSION_SEC;
      rollGroup.rotation.z = loopT * LOOP_LAUNCH_TILT_RAD;
      pivot.rotation.y =
        LOOP_YAW_OFFSET_RAD + phaseSec * LOOP_YAW_RATE_RAD_PER_MISSION_SEC;
    } else {
      rollGroup.rotation.z = 0;
      pivot.rotation.y = LOOP_YAW_OFFSET_RAD;
    }
    setGroupLineOpacityFactor(
      engineWireGroups[0],
      ENGINE_WIREFRAME_OPACITY_FACTOR * coreLowerK * loopFadeK,
    );
    setGroupLineOpacityFactor(
      engineWireGroups[1],
      ENGINE_WIREFRAME_OPACITY_FACTOR * upperStackFadeK * loopFadeK,
    );
    setGroupLineOpacityFactor(
      engineWireGroups[2],
      ENGINE_WIREFRAME_OPACITY_FACTOR *
        (t2Wall === null ? loopFadeK : wireAlpha * loopFadeK),
    );
    setGroupLineOpacityFactor(
      engineWireGroups[3],
      ENGINE_WIREFRAME_OPACITY_FACTOR *
        (t2Wall === null ? loopFadeK : wireAlpha * loopFadeK),
    );
    updatePlumeLayersForTick(
      allLayers,
      wallS,
      phaseSec,
      corePlumeK,
      plumeMul,
      s2PlumeK,
      reducedMotion,
      loopFadeK,
      upperStackFadeK,
      separationThrusterBurstMul(now, t2Wall),
    );
    const coreBrightness = averagePlumeBrightness(allLayers, (layer) => layer.isCore);
    const boosterBrightness = averagePlumeBrightness(
      allLayers,
      (layer) => layer.isBooster,
    );
    const upperBrightness = averagePlumeBrightness(
      allLayers,
      (layer) => layer.isUpperStage,
    );
    corePlumeLight.intensity = coreBrightness * 1.05 * corePlumeK * loopFadeK;
    const boosterLightI = boosterBrightness * 0.95 * plumeMul * loopFadeK;
    leftBoosterPlumeLight.intensity = boosterLightI;
    rightBoosterPlumeLight.intensity = boosterLightI;
    upperPlumeLight.intensity = upperBrightness * 1.2 * s2PlumeK * upperStackFadeK;
    renderer.render(scene, camera);
    rafId = window.requestAnimationFrame(tick);
  };

  renderer.render(scene, camera);
  rafId = window.requestAnimationFrame(tick);

  const ro = new ResizeObserver(() => setSize());
  ro.observe(mount);

  const resume = (): void => {
    window.cancelAnimationFrame(rafId);
    if (getShouldAnimate()) {
      rafId = window.requestAnimationFrame(tick);
    }
  };

  const disposeViewport = (): void => {
    window.cancelAnimationFrame(rafId);
    ro.disconnect();
    if (renderer.domElement.parentNode === mount) {
      mount.removeChild(renderer.domElement);
    }
    renderer.dispose();
    for (const dispose of plumeDisposers) {
      dispose();
    }
    disposeWireframeScene(scene, depthOccluder);
    wireMat.dispose();
    strutMat.dispose();
    engineWireMat.dispose();
  };

  return { dispose: disposeViewport, resume };
};

/**
 * Client-only WebGL: Falcon Heavy style triple-body wireframe (main stage + two boosters).
 */
export const FalconHeavyWireframe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationActive = useHeroAnimationActive();
  const activeRef = useRef(animationActive);
  const resumeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    activeRef.current = animationActive;
  }, [animationActive]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return undefined;
    }
    const { dispose, resume } = attachRocketViewport(
      mount,
      () => activeRef.current,
    );
    resumeRef.current = resume;
    return dispose;
  }, []);

  useEffect(() => {
    if (animationActive) {
      resumeRef.current?.();
    }
  }, [animationActive]);

  return (
    <div className={styles.rocketFrame}>
      <div ref={mountRef} className={styles.rocketCanvasHost} aria-hidden />
    </div>
  );
};
