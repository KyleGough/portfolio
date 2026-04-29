import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

import styles from '../Hero/Hero.module.css';
import {
  type AddAllEnginePlumesResult,
  addAllEnginePlumes,
  addEngineNozzle,
  addOctawebEngines,
  updatePlumeLayersForTick,
} from './Engine';
import {
  BOOSTER_FADE_AT_MISSION_SEC,
  BOOSTER_FADE_WALL_MS,
  BOOSTER_SEP_DURATION_MS,
  BOOSTER_WIREFRAME_FADE_WALL_MS,
  CORE_BOTTOM_STAGING_WALL_MS,
  CORE_STAGING_AT_MISSION_SEC,
  getMissionSec,
  LOOP_FADE_IN_MISSION_SEC,
  LOOP_PERIOD_MISSION_SEC,
  LOOP_UPPER_EXIT_START_MISSION_SEC,
  S2_PLUME_AT_MISSION_SEC,
  S2_PLUME_FADEIN_WALL_MS,
} from './MissionTime';
import {
  addBoosterGridFins,
  addConeEdges,
  addCylinderEdges,
  addRoundedPayloadFairingEdges,
  addStrut,
} from './Wireframe';

const CYAN = 0x5bd4ea;
const CYAN_DIM = 0x3d7a8a;
/** Y mount for all octaweb engine clusters in buildRocket. */
const Y_MOUNT_CORE = 0.03;

/** Booster first-stage local origin — body space X offset for each side booster. */
const BOOSTER_STAGE_X = 0.7;
const BOOSTER_SEP_EXTRA_X = 0.38;
/** Max downward Y (body space) while side boosters fade; scales 0–1 with wireframe fade. */
const BOOSTER_SEP_FALL_MAX = 0.5;
/** Outward roll about Z, max at rotSplayK = 1. */
const BOOSTER_SEP_SPLAY_RAD = 0.55;

const CORE_FALL_DY = 0.55;
/** Second stage + fairing rise (body +Y) during T+2:05–T+2:10 loop exit. */
const CORE_UPPER_RISE = 1.15;

/** First stage height; joint with interstage is the natural “line” for stack separation. */
const S1_H = 3.12;
const INTERSTAGE_H = 0.2;
const S2_H = 0.92;
const FAIRING_H = 0.8;
const S1_TOP_R = 0.32;
const S1_BASE_R = 0.35;
/** Single MVAC-class bell at second-stage base (interstage / S2 joint). */
const S2_ENGINE_SCALE = 0.72;
const S2_ENGINE_Y_MOUNT = S1_H + INTERSTAGE_H;

const buildRocket = (
  wireMat: THREE.LineBasicMaterial,
  strutMat: THREE.LineBasicMaterial
): {
  body: THREE.Group;
  coreLower: THREE.Group;
  coreUpper: THREE.Group;
  leftBooster: THREE.Group;
  rightBooster: THREE.Group;
  strutsGroup: THREE.Group;
} => {
  const body = new THREE.Group();
  const coreLower = new THREE.Group();
  const coreUpper = new THREE.Group();
  const coreEngineWire = new THREE.Group();
  const leftBooster = new THREE.Group();
  const rightBooster = new THREE.Group();
  const strutsGroup = new THREE.Group();

  const boosterH = 2.95;
  const coreR = S1_BASE_R;
  const boosterR = 0.25;
  const boosterRTop = 0.24; /* tapers: narrow toward second-stage joint */
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
    0
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
    0
  );
  addOctawebEngines(coreEngineWire, wireMat, Y_MOUNT_CORE, 0.2, 1);
  coreLower.add(coreEngineWire);

  // Second stage, fairing, and single S2 engine (MVAC) — above interstage / seam
  addCylinderEdges(
    coreUpper,
    wireMat,
    0.2,
    0.22,
    S2_H,
    10,
    0,
    S1_H + INTERSTAGE_H + S2_H / 2,
    0
  );
  const fairingR = 0.22;
  const fairingYBase = S1_H + INTERSTAGE_H + S2_H;
  const fairingDomeR = 0.22;
  const fairingShoulderH = Math.max(0, FAIRING_H - fairingDomeR);
  addRoundedPayloadFairingEdges(
    coreUpper,
    wireMat,
    fairingR,
    fairingDomeR,
    fairingShoulderH,
    0,
    fairingYBase,
    0
  );
  addEngineNozzle(coreUpper, wireMat, 0, 0, S2_ENGINE_Y_MOUNT, S2_ENGINE_SCALE);

  body.add(coreLower, coreUpper);

  // Side boosters: local origin at stage center; body-space offset on each group
  for (const { b, outward } of [
    { b: leftBooster, outward: -1 as const },
    { b: rightBooster, outward: 1 as const },
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
      0
    );
    const noseH = 0.34;
    const noseR = boosterRTop;
    addConeEdges(b, wireMat, noseR, noseH, 8, 0, boosterH + noseH / 2, 0);
    addOctawebEngines(b, wireMat, Y_MOUNT_CORE, boosterOctawebRingR, 0.86);
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
      4
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
      -BOOSTER_STAGE_X + boosterR * 0.88
    );
    addStrut(
      strutsGroup,
      strutMat,
      coreR * 0.92,
      y,
      BOOSTER_STAGE_X - boosterR * 0.88
    );
  }

  return {
    body,
    coreLower,
    coreUpper,
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
  margin: number
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
    center.z + dist * 0.72
  );
  camera.lookAt(center);
};

const setGroupLineOpacityFactor = (
  root: THREE.Object3D,
  factor: number
): void => {
  root.traverse((obj) => {
    if (!(obj instanceof THREE.Line || obj instanceof THREE.LineSegments)) {
      return;
    }
    const m = obj.material as THREE.Material;
    if (obj.userData.baseLineOpacity === undefined) {
      obj.userData.baseLineOpacity = m.opacity;
    }
    const base = obj.userData.baseLineOpacity as number;
    const next = base * factor;
    m.transparent = next < 0.999;
    m.opacity = next;
  });
};

const loopFadeFromPhaseSec = (phaseSec: number): number => {
  if (phaseSec >= LOOP_FADE_IN_MISSION_SEC) {
    return 1;
  }
  const t = phaseSec / LOOP_FADE_IN_MISSION_SEC;
  return 1 - (1 - t) * (1 - t);
};

const upperStackExitFromPhaseSec = (phaseSec: number): {
  riseY: number;
  stackFadeK: number;
} => {
  if (phaseSec < LOOP_UPPER_EXIT_START_MISSION_SEC) {
    return { riseY: 0, stackFadeK: 1 };
  }
  const span = LOOP_PERIOD_MISSION_SEC - LOOP_UPPER_EXIT_START_MISSION_SEC;
  const u = Math.min(1, Math.max(0, (phaseSec - LOOP_UPPER_EXIT_START_MISSION_SEC) / span));
  const riseY = CORE_UPPER_RISE * u * u * u;
  const stackFadeK = 1 - u;
  return { riseY, stackFadeK };
};

const t2EventProgress = (
  now: number,
  phaseMissionSec: number,
  previousT2Wall: number | null
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
  const plumeMul = Math.max(0, 1 - d / BOOSTER_FADE_WALL_MS);
  const wireAlpha = Math.max(0, 1 - d / BOOSTER_WIREFRAME_FADE_WALL_MS);
  const uOffset = Math.min(1, d / BOOSTER_SEP_DURATION_MS);
  const separationK = 1 - (1 - uOffset) * (1 - uOffset);
  /** Same timeline as wire fade; rotation uses cubic ease-in (slow roll-up → faster). */
  const uRot = Math.min(1, d / BOOSTER_WIREFRAME_FADE_WALL_MS);
  const rotSplayK = uRot * uRot * uRot;
  const boosterFallK = uRot;
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
  strutsGroup: THREE.Object3D
): void => {
  const extraX = BOOSTER_SEP_EXTRA_X * separationK;
  const extraY = -BOOSTER_SEP_FALL_MAX * boosterFallK;
  const lineK = wireAlpha * loopFadeK;
  leftBooster.position.set(-BOOSTER_STAGE_X - extraX, extraY, 0);
  rightBooster.position.set(BOOSTER_STAGE_X + extraX, extraY, 0);
  leftBooster.rotation.z = BOOSTER_SEP_SPLAY_RAD * rotSplayK;
  rightBooster.rotation.z = -BOOSTER_SEP_SPLAY_RAD * rotSplayK;
  setGroupLineOpacityFactor(leftBooster, lineK);
  setGroupLineOpacityFactor(rightBooster, lineK);
  setGroupLineOpacityFactor(strutsGroup, lineK);
};

const resetBoosterSeparationPose = (
  loopFadeK: number,
  leftBooster: THREE.Group,
  rightBooster: THREE.Group,
  strutsGroup: THREE.Object3D
): void => {
  leftBooster.position.set(-BOOSTER_STAGE_X, 0, 0);
  rightBooster.position.set(BOOSTER_STAGE_X, 0, 0);
  leftBooster.rotation.set(0, 0, 0);
  rightBooster.rotation.set(0, 0, 0);
  setGroupLineOpacityFactor(leftBooster, loopFadeK);
  setGroupLineOpacityFactor(rightBooster, loopFadeK);
  setGroupLineOpacityFactor(strutsGroup, loopFadeK);
};

const t3EventProgress = (
  now: number,
  phaseMissionSec: number,
  previousT3: number | null
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
  previousS2Wall: number | null
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
  coreLower: THREE.Group
): void => {
  coreLower.position.set(0, -CORE_FALL_DY * motionK, 0);
  setGroupLineOpacityFactor(coreLower, coreLowerK * loopFadeK);
};

const resetCoreStagingPose = (loopFadeK: number, coreLower: THREE.Group): void => {
  coreLower.position.set(0, 0, 0);
  setGroupLineOpacityFactor(coreLower, loopFadeK);
};

const disposeWireframeScene = (scene: THREE.Scene): void => {
  scene.traverse((obj) => {
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
};

const attachRocketViewport = (mount: HTMLElement): (() => void) => {
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
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

  const { body, coreLower, coreUpper, leftBooster, rightBooster, strutsGroup } =
    buildRocket(wireMat, strutMat);

  const plumeSetup: AddAllEnginePlumesResult = addAllEnginePlumes(
    Y_MOUNT_CORE,
    0.2,
    0.127,
    coreLower,
    coreUpper,
    leftBooster,
    rightBooster,
    reducedMotion
  );
  const { allLayers, disposers: plumeDisposers } = plumeSetup;
  centerObjectAtOrigin(body);

  const pivot = new THREE.Group();
  pivot.add(body);
  scene.add(pivot);

  const setSize = () => {
    const w = mount.clientWidth;
    const h = mount.clientHeight;
    if (w < 2 || h < 2) {
      return;
    }
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    fitPerspectiveCameraToObject(camera, pivot, 1.14);
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
      t3EventWall0
    );
    t3EventWall0 = t3Wall;
    const { s2PlumeK, s2Wall: s2PlumeWall } = s2PlumeProgress(
      now,
      phaseSec,
      s2PlumeEventWall0
    );
    s2PlumeEventWall0 = s2PlumeWall;

    coreUpper.position.y = coreUpperRiseY;
    setGroupLineOpacityFactor(coreUpper, upperStackFadeK * loopFadeK);

    if (t2Wall === null) {
      resetBoosterSeparationPose(loopFadeK, leftBooster, rightBooster, strutsGroup);
    } else {
      applyBoosterSeparationPose(
        separationK,
        rotSplayK,
        boosterFallK,
        wireAlpha,
        loopFadeK,
        leftBooster,
        rightBooster,
        strutsGroup
      );
    }
    if (t3Wall === null) {
      resetCoreStagingPose(loopFadeK, coreLower);
    } else {
      applyCoreStagingPose(coreLowerK, motionK, loopFadeK, coreLower);
    }

    if (!reducedMotion) {
      pivot.rotation.y += 0.0028;
    }
    updatePlumeLayersForTick(
      allLayers,
      wallS,
      corePlumeK,
      plumeMul,
      s2PlumeK,
      reducedMotion,
      loopFadeK,
      upperStackFadeK
    );
    renderer.render(scene, camera);
    rafId = window.requestAnimationFrame(tick);
  };
  tick();

  const ro = new ResizeObserver(() => setSize());
  ro.observe(mount);

  return () => {
    window.cancelAnimationFrame(rafId);
    ro.disconnect();
    if (renderer.domElement.parentNode === mount) {
      mount.removeChild(renderer.domElement);
    }
    renderer.dispose();
    for (const dispose of plumeDisposers) {
      dispose();
    }
    disposeWireframeScene(scene);
    wireMat.dispose();
    strutMat.dispose();
  };
};

/**
 * Client-only WebGL: Falcon Heavy style triple-body wireframe (main stage + two boosters).
 */
export const FalconHeavyWireframe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return undefined;
    }
    return attachRocketViewport(mount);
  }, []);

  return (
    <div className={styles.rocketFrame}>
      <div ref={mountRef} className={styles.rocketCanvasHost} aria-hidden />
    </div>
  );
};
