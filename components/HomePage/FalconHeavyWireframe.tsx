import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

import {
  getHeroMissionSec,
  HERO_BOOSTER_FADE_AT_MISSION_SEC,
  HERO_BOOSTER_FADE_WALL_MS,
  HERO_BOOSTER_SEP_DURATION_MS,
  HERO_BOOSTER_WIREFRAME_FADE_WALL_MS,
  HERO_CORE_BOTTOM_STAGING_WALL_MS,
  HERO_CORE_STAGING_AT_MISSION_SEC,
  HERO_S2_PLUME_AT_MISSION_SEC,
  HERO_S2_PLUME_FADEIN_WALL_MS,
} from './heroMissionTime';
import styles from './HomeHero.module.css';

const CYAN = 0x5bd4ea;
const CYAN_DIM = 0x3d7a8a;
/** Y mount for all octaweb engine clusters in buildRocket. */
const Y_MOUNT_CORE = 0.03;

const PLUME_ORANGE = 0xff5a1a;
const PLUME_GOLD = 0xffb040;
const PLUME_CORE = 0xfff4d4;

/** Booster first-stage local origin — body space X offset for each side booster. */
const BOOSTER_STAGE_X = 0.7;
const BOOSTER_SEP_EXTRA_X = 0.38;
/** Slight +Y with separation (lateral drift up). */
const BOOSTER_SEP_EXTRA_Y = 0.14;
/** Outward roll about Z, max at separationK = 1. */
const BOOSTER_SEP_SPLAY_RAD = 0.55;

const CORE_FALL_DY = 0.55;

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

function addCylinderEdges(
  parent: THREE.Group,
  material: THREE.LineBasicMaterial,
  radiusTop: number,
  radiusBottom: number,
  height: number,
  segments: number,
  x: number,
  yCenter: number,
  z: number
): void {
  const geom = new THREE.CylinderGeometry(
    radiusTop,
    radiusBottom,
    height,
    segments,
    1
  );
  const edges = new THREE.EdgesGeometry(geom);
  const line = new THREE.LineSegments(edges, material.clone());
  line.position.set(x, yCenter, z);
  parent.add(line);
  geom.dispose();
}

function addConeEdges(
  parent: THREE.Group,
  material: THREE.LineBasicMaterial,
  radius: number,
  height: number,
  segments: number,
  x: number,
  yCenter: number,
  z: number
): void {
  const geom = new THREE.ConeGeometry(radius, height, segments, 1);
  const edges = new THREE.EdgesGeometry(geom);
  const line = new THREE.LineSegments(edges, material.clone());
  line.position.set(x, yCenter, z);
  parent.add(line);
  geom.dispose();
}

/**
 * Rounded (blunt) nose: north-pole to equator (theta 0 → π/2) so the base is a circle in y=0
 * and the top is a smooth cap — no point.
 */
function addNorthHemisphereCapEdges(
  parent: THREE.Group,
  material: THREE.LineBasicMaterial,
  radius: number,
  widthSegments: number,
  x: number,
  yEquator: number,
  z: number
): void {
  const heightSegs = Math.max(3, Math.floor(widthSegments * 0.4));
  const geom = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegs,
    0,
    Math.PI * 2,
    0,
    Math.PI * 0.5
  );
  const edges = new THREE.EdgesGeometry(geom);
  const line = new THREE.LineSegments(edges, material.clone());
  line.position.set(x, yEquator, z);
  parent.add(line);
  geom.dispose();
}

/**
 * Cyl shoulder + spherical cap. Total height = shoulderH + capRadius (`FAIRING_H`).
 */
function addRoundedPayloadFairingEdges(
  parent: THREE.Group,
  material: THREE.LineBasicMaterial,
  baseRadius: number,
  capRadius: number,
  shoulderH: number,
  x: number,
  yBase: number,
  z: number
): void {
  if (shoulderH > 1e-4) {
    addCylinderEdges(
      parent,
      material,
      baseRadius,
      baseRadius,
      shoulderH,
      10,
      x,
      yBase + shoulderH * 0.5,
      z
    );
  }
  addNorthHemisphereCapEdges(
    parent,
    material,
    capRadius,
    10,
    x,
    yBase + shoulderH,
    z
  );
}

function addStrut(
  parent: THREE.Group,
  material: THREE.LineBasicMaterial,
  x0: number,
  y: number,
  x1: number
): void {
  const geom = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(x0, y, 0),
    new THREE.Vector3(x1, y, 0),
  ]);
  const line = new THREE.Line(geom, material.clone());
  parent.add(line);
}

/**
 * Outboard grid fin: top edge (yAttach) lies on the tank, bottom (yFlare) is
 * canted out in +radial and slightly wider in z (hinged / fanned look).
 * y: booster base = 0, up = +Y. Booster origin at center: `outward` = −1 = toward −X, +1 = toward +X.
 */
function addSideBoosterGridFins(
  parent: THREE.Group,
  mat: THREE.LineBasicMaterial,
  outward: 1 | -1,
  boosterR: number,
  yFlare: number,
  yAttach: number,
  halfZAtFlare: number,
  halfZAtAttach: number,
  radialFlare: number,
  nCols: number,
  nRows: number
): void {
  const outDir = outward;
  const skin = 0.002;
  const xAttach = outDir * (boosterR + skin);
  const xFlare = outDir * (boosterR + radialFlare);
  for (let j = 0; j <= nRows; j += 1) {
    const t = j / nRows;
    const y = THREE.MathUtils.lerp(yFlare, yAttach, t);
    const x = THREE.MathUtils.lerp(xFlare, xAttach, t);
    const zH = THREE.MathUtils.lerp(halfZAtFlare, halfZAtAttach, t);
    const geomH = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x, y, -zH),
      new THREE.Vector3(x, y, zH),
    ]);
    parent.add(new THREE.Line(geomH, mat.clone()));
  }
  for (let i = 0; i <= nCols; i += 1) {
    const u = i / nCols;
    const z0 = THREE.MathUtils.lerp(-halfZAtFlare, halfZAtFlare, u);
    const z1 = THREE.MathUtils.lerp(-halfZAtAttach, halfZAtAttach, u);
    const geomV = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(xFlare, yFlare, z0),
      new THREE.Vector3(xAttach, yAttach, z1),
    ]);
    parent.add(new THREE.Line(geomV, mat.clone()));
  }
}

/** Cone with apex toward −Y (Merlin bell opening downward). */
function addInvertedConeEdges(
  parent: THREE.Group,
  material: THREE.LineBasicMaterial,
  radius: number,
  height: number,
  segments: number,
  x: number,
  yCenter: number,
  z: number
): void {
  const geom = new THREE.ConeGeometry(radius, height, segments, 1);
  const edges = new THREE.EdgesGeometry(geom);
  const line = new THREE.LineSegments(edges, material.clone());
  line.rotation.x = Math.PI;
  line.position.set(x, yCenter, z);
  parent.add(line);
  geom.dispose();
}

/** Single Merlin-class bell: short chamber + flared nozzle (wireframe). */
function addMerlinCluster(
  parent: THREE.Group,
  material: THREE.LineBasicMaterial,
  x: number,
  z: number,
  yMount: number,
  scale: number
): void {
  const hStem = 0.052 * scale;
  const hBell = 0.1 * scale;
  const rBell = 0.068 * scale;
  addCylinderEdges(
    parent,
    material,
    0.034 * scale,
    0.042 * scale,
    hStem,
    6,
    x,
    yMount - hStem * 0.5,
    z
  );
  addInvertedConeEdges(
    parent,
    material,
    rBell,
    hBell,
    8,
    x,
    yMount - hStem - hBell * 0.5,
    z
  );
}

/** Falcon 9 style octaweb: one center engine + eight on a ring (Block-type layout). */
function addOctawebEngines(
  parent: THREE.Group,
  material: THREE.LineBasicMaterial,
  centerX: number,
  centerZ: number,
  yMount: number,
  ringRadius: number,
  scale: number
): void {
  addMerlinCluster(parent, material, centerX, centerZ, yMount, scale);
  for (let i = 0; i < 8; i += 1) {
    const a = (i * Math.PI) / 4;
    const ox = centerX + Math.cos(a) * ringRadius;
    const oz = centerZ + Math.sin(a) * ringRadius;
    addMerlinCluster(parent, material, ox, oz, yMount, scale);
  }
}

/** Y at the engine bell exhaust (wide opening), matches addMerlinCluster + addInvertedConeEdges. */
function merlinExhaustY(yMount: number, scale: number): number {
  const hStem = 0.052 * scale;
  return yMount - hStem;
}

/**
 * Pushes the (x, z) of each engine in an octaweb; center (centerX, centerZ), ring, scale.
 */
function forEachOctawebEngine(
  centerX: number,
  centerZ: number,
  ringRadius: number,
  scale: number,
  fn: (x: number, z: number) => void
): void {
  fn(centerX, centerZ);
  for (let i = 0; i < 8; i += 1) {
    const a = (i * Math.PI) / 4;
    fn(centerX + Math.cos(a) * ringRadius, centerZ + Math.sin(a) * ringRadius);
  }
}

type PlumeLayer = {
  baseOpacity: number;
  isBooster: boolean;
  isCore: boolean;
  isUpperStage: boolean;
  mat: THREE.MeshBasicMaterial;
  mesh: THREE.Mesh;
  phase: number;
};

type PlumeSpec = {
  isBooster: boolean;
  isCore: boolean;
  isUpperStage: boolean;
  phase: number;
  scale: number;
  x: number;
  y: number;
  z: number;
};

/**
 * Stacked soft cones = flame: tip at nozzle, flares then tapers; animated like exhaust.
 */
function makeEnginePlumeGroup(
  spec: PlumeSpec,
  reducedMotion: boolean
): { dispose: () => void; group: THREE.Group; layers: PlumeLayer[] } {
  const s = spec.scale;
  const tipY = spec.y;
  const phase = spec.phase;
  // Frustum: narrow at nozzle (top, +Y), flares down (-Y) like real exhaust
  const r0 = 0.022 * s;
  const hOuter = 0.42 * s;
  const hGold = 0.28 * s;
  const hCore = 0.14 * s;
  const layers: PlumeLayer[] = [];
  const group = new THREE.Group();
  group.position.set(spec.x, 0, spec.z);

  const addLayer = (
    height: number,
    rTop: number,
    rBottom: number,
    color: number,
    baseOpacity: number,
    j: number
  ): void => {
    const geom = new THREE.CylinderGeometry(rTop, rBottom, height, 8, 1, true);
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: baseOpacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const mesh = new THREE.Mesh(geom, mat);
    // Cylinder: top (small) at y = +h/2, large bottom at y = -h/2 — top sits at engine exhaust
    const cy = tipY - height * 0.5;
    mesh.position.y = cy;
    mat.side = THREE.DoubleSide;
    group.add(mesh);
    layers.push({
      baseOpacity,
      isBooster: spec.isBooster,
      isCore: spec.isCore,
      isUpperStage: spec.isUpperStage,
      mat,
      mesh,
      phase: phase + j * 0.37,
    });
  };

  // Wider, softer outer
  addLayer(
    hOuter,
    r0 * 0.55,
    r0 * 2.6,
    PLUME_ORANGE,
    reducedMotion ? 0.14 : 0.22,
    0
  );
  // Mid bright
  addLayer(
    hGold,
    r0 * 0.35,
    r0 * 1.4,
    PLUME_GOLD,
    reducedMotion ? 0.18 : 0.3,
    1
  );
  // Hot core
  addLayer(
    hCore,
    r0 * 0.12,
    r0 * 0.5,
    PLUME_CORE,
    reducedMotion ? 0.35 : 0.55,
    2
  );

  return {
    group,
    layers,
    dispose: () => {
      for (const layer of layers) {
        layer.mat.dispose();
        layer.mesh.geometry.dispose();
      }
      if (group.parent) {
        group.removeFromParent();
      }
    },
  };
}

function buildAllPlumes(
  yMount: number,
  coreRingR: number,
  boosterRingR: number,
  coreLower: THREE.Object3D,
  coreUpper: THREE.Object3D,
  leftBooster: THREE.Group,
  rightBooster: THREE.Group,
  reducedMotion: boolean
): { allLayers: PlumeLayer[]; disposers: (() => void)[] } {
  const allLayers: PlumeLayer[] = [];
  const disposers: (() => void)[] = [];
  const exhaustCore = merlinExhaustY(yMount, 1);
  const exhaustBooster = merlinExhaustY(yMount, 0.86);
  const s2ExhaustY = merlinExhaustY(S2_ENGINE_Y_MOUNT, S2_ENGINE_SCALE);
  let phase = 0;

  const addCluster = (
    parent: THREE.Object3D,
    centerX: number,
    ringR: number,
    s: number,
    exhaustY: number,
    isBooster: boolean,
    isCore: boolean
  ) => {
    forEachOctawebEngine(centerX, 0, ringR, s, (x, z) => {
      const p = (phase += 0.21) % 12.5;
      const { group, layers, dispose } = makeEnginePlumeGroup(
        {
          isBooster,
          isCore,
          isUpperStage: false,
          phase: p,
          scale: s,
          x,
          y: exhaustY,
          z,
        },
        reducedMotion
      );
      parent.add(group);
      allLayers.push(...layers);
      disposers.push(dispose);
    });
  };

  addCluster(coreLower, 0, coreRingR, 1, exhaustCore, false, true);
  addCluster(leftBooster, 0, boosterRingR, 0.86, exhaustBooster, true, false);
  addCluster(rightBooster, 0, boosterRingR, 0.86, exhaustBooster, true, false);

  {
    const p = (phase += 0.21) % 12.5;
    const { group, layers, dispose } = makeEnginePlumeGroup(
      {
        isBooster: false,
        isCore: false,
        isUpperStage: true,
        phase: p,
        scale: S2_ENGINE_SCALE,
        x: 0,
        y: s2ExhaustY,
        z: 0,
      },
      reducedMotion
    );
    coreUpper.add(group);
    allLayers.push(...layers);
    disposers.push(dispose);
  }

  return { allLayers, disposers };
}

function buildRocket(
  wireMat: THREE.LineBasicMaterial,
  strutMat: THREE.LineBasicMaterial
): {
  body: THREE.Group;
  coreLower: THREE.Group;
  coreUpper: THREE.Group;
  leftBooster: THREE.Group;
  rightBooster: THREE.Group;
  strutsGroup: THREE.Group;
} {
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
  addOctawebEngines(coreEngineWire, wireMat, 0, 0, Y_MOUNT_CORE, 0.2, 1);
  coreLower.add(coreEngineWire);

  // Interstage, second stage, fairing, and single S2 engine (MVAC) — all above the split
  addCylinderEdges(
    coreUpper,
    wireMat,
    0.3,
    0.32,
    INTERSTAGE_H,
    10,
    0,
    S1_H + INTERSTAGE_H / 2,
    0
  );
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
  addMerlinCluster(
    coreUpper,
    wireMat,
    0,
    0,
    S2_ENGINE_Y_MOUNT,
    S2_ENGINE_SCALE
  );

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
    addOctawebEngines(
      b,
      wireMat,
      0,
      0,
      Y_MOUNT_CORE,
      boosterOctawebRingR,
      0.86
    );
    const finYFlare = 0.12;
    const finYAttach = 0.46;
    addSideBoosterGridFins(
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
}

function centerObjectAtOrigin(object: THREE.Object3D): void {
  const box = new THREE.Box3().setFromObject(object);
  const center = new THREE.Vector3();
  box.getCenter(center);
  object.position.sub(center);
}

function fitPerspectiveCameraToObject(
  camera: THREE.PerspectiveCamera,
  object: THREE.Object3D,
  margin: number
): void {
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
}

function setGroupLineOpacityFactor(root: THREE.Object3D, factor: number): void {
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
}

function t2EventProgress(
  now: number,
  wallS: number,
  previousT2Wall: number | null
): {
  plumeMul: number;
  rotSplayK: number;
  separationK: number;
  t2Wall: number | null;
  wireAlpha: number;
} {
  const missionSec = getHeroMissionSec(wallS);
  let t2Wall = previousT2Wall;
  if (missionSec >= HERO_BOOSTER_FADE_AT_MISSION_SEC) {
    if (t2Wall === null) {
      t2Wall = now;
    }
  } else {
    t2Wall = null;
  }
  if (t2Wall === null) {
    return {
      plumeMul: 1,
      rotSplayK: 0,
      separationK: 0,
      t2Wall: null,
      wireAlpha: 1,
    };
  }
  const d = now - t2Wall;
  const plumeMul = Math.max(0, 1 - d / HERO_BOOSTER_FADE_WALL_MS);
  const wireAlpha = Math.max(0, 1 - d / HERO_BOOSTER_WIREFRAME_FADE_WALL_MS);
  const uOffset = Math.min(1, d / HERO_BOOSTER_SEP_DURATION_MS);
  const separationK = 1 - (1 - uOffset) * (1 - uOffset);
  /** Splay continues over the full wireframe fade, max roll when fully transparent. */
  const uRot = Math.min(1, d / HERO_BOOSTER_WIREFRAME_FADE_WALL_MS);
  const rotSplayK = 1 - (1 - uRot) * (1 - uRot);
  return { plumeMul, rotSplayK, separationK, t2Wall, wireAlpha };
}

function applyBoosterSeparationPose(
  separationK: number,
  rotSplayK: number,
  wireAlpha: number,
  leftBooster: THREE.Group,
  rightBooster: THREE.Group,
  strutsGroup: THREE.Object3D
): void {
  const extraX = BOOSTER_SEP_EXTRA_X * separationK;
  const extraY = BOOSTER_SEP_EXTRA_Y * separationK;
  leftBooster.position.set(-BOOSTER_STAGE_X - extraX, extraY, 0);
  rightBooster.position.set(BOOSTER_STAGE_X + extraX, extraY, 0);
  leftBooster.rotation.z = BOOSTER_SEP_SPLAY_RAD * rotSplayK;
  rightBooster.rotation.z = -BOOSTER_SEP_SPLAY_RAD * rotSplayK;
  setGroupLineOpacityFactor(leftBooster, wireAlpha);
  setGroupLineOpacityFactor(rightBooster, wireAlpha);
  setGroupLineOpacityFactor(strutsGroup, wireAlpha);
}

function resetBoosterSeparationPose(
  leftBooster: THREE.Group,
  rightBooster: THREE.Group,
  strutsGroup: THREE.Object3D
): void {
  leftBooster.position.set(-BOOSTER_STAGE_X, 0, 0);
  rightBooster.position.set(BOOSTER_STAGE_X, 0, 0);
  leftBooster.rotation.set(0, 0, 0);
  rightBooster.rotation.set(0, 0, 0);
  setGroupLineOpacityFactor(leftBooster, 1);
  setGroupLineOpacityFactor(rightBooster, 1);
  setGroupLineOpacityFactor(strutsGroup, 1);
}

function t3EventProgress(
  now: number,
  wallS: number,
  previousT3: number | null
): {
  coreLowerK: number;
  corePlumeK: number;
  motionK: number;
  t3Wall: number | null;
} {
  const missionSec = getHeroMissionSec(wallS);
  let t3Wall = previousT3;
  if (missionSec >= HERO_CORE_STAGING_AT_MISSION_SEC) {
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
  const u = Math.min(1, d / HERO_CORE_BOTTOM_STAGING_WALL_MS);
  const motionK = 1 - (1 - u) * (1 - u);
  const k = Math.max(0, 1 - d / HERO_CORE_BOTTOM_STAGING_WALL_MS);
  return { coreLowerK: k, corePlumeK: k, motionK, t3Wall };
}

/**
 * S2 (single) plume: off until T+3:05, then 0 → 1 over HERO_S2_PLUME_FADEIN_WALL_MS.
 */
function s2PlumeProgress(
  now: number,
  wallS: number,
  previousS2Wall: number | null
): { s2PlumeK: number; s2Wall: number | null } {
  const missionSec = getHeroMissionSec(wallS);
  let s2Wall = previousS2Wall;
  if (missionSec >= HERO_S2_PLUME_AT_MISSION_SEC) {
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
  const u = Math.min(1, d / HERO_S2_PLUME_FADEIN_WALL_MS);
  const s2PlumeK = 1 - (1 - u) * (1 - u);
  return { s2PlumeK, s2Wall };
}

function applyCoreStagingPose(
  coreLowerK: number,
  motionK: number,
  coreLower: THREE.Group
): void {
  coreLower.position.set(0, -CORE_FALL_DY * motionK, 0);
  setGroupLineOpacityFactor(coreLower, coreLowerK);
}

function resetCoreStagingPose(coreLower: THREE.Group): void {
  coreLower.position.set(0, 0, 0);
  setGroupLineOpacityFactor(coreLower, 1);
}

function plumeLayerMul(
  layer: PlumeLayer,
  corePlumeK: number,
  plumeMul: number,
  s2PlumeK: number
): number {
  if (layer.isCore) {
    return corePlumeK;
  }
  if (layer.isBooster) {
    return plumeMul;
  }
  if (layer.isUpperStage) {
    return s2PlumeK;
  }
  return 1;
}

function updatePlumeLayersForTick(
  layers: readonly PlumeLayer[],
  wallS: number,
  corePlumeK: number,
  plumeMul: number,
  s2PlumeK: number,
  reducedMotion: boolean
): void {
  if (reducedMotion) {
    for (const layer of layers) {
      const m = plumeLayerMul(layer, corePlumeK, plumeMul, s2PlumeK);
      layer.mat.opacity = layer.baseOpacity * m;
    }
    return;
  }
  for (const layer of layers) {
    const f = Math.sin(wallS * 19.5 + layer.phase);
    const g = 0.5 + 0.5 * Math.sin(wallS * 29 + layer.phase * 1.63);
    const flicker = 0.72 + 0.28 * g;
    const pMul = plumeLayerMul(layer, corePlumeK, plumeMul, s2PlumeK);
    layer.mat.opacity = layer.baseOpacity * flicker * pMul;
    const pulse = 1 + 0.1 * f;
    const breath = 0.94 + 0.12 * g;
    layer.mesh.scale.set(pulse, breath, pulse);
  }
}

function disposeWireframeScene(scene: THREE.Scene): void {
  scene.traverse((obj) => {
    if (!(obj instanceof THREE.Line || obj instanceof THREE.LineSegments)) {
      return;
    }
    const wire = obj as THREE.Line | THREE.LineSegments;
    const geom: THREE.BufferGeometry = wire.geometry;
    geom.dispose();
    const mat: THREE.Material | THREE.Material[] = wire.material;
    if (Array.isArray(mat)) {
      mat.forEach((m) => m.dispose());
      return;
    }
    mat.dispose();
  });
}

function attachRocketViewport(mount: HTMLElement): () => void {
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

  const { allLayers, disposers: plumeDisposers } = buildAllPlumes(
    Y_MOUNT_CORE,
    0.2,
    0.127,
    coreLower,
    coreUpper,
    leftBooster,
    rightBooster,
    reducedMotion
  );
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
  let rafId = 0;
  const tick = () => {
    const now = performance.now();
    const wallS = (now - time0) * 0.001;
    const { plumeMul, rotSplayK, separationK, t2Wall, wireAlpha } =
      t2EventProgress(now, wallS, t2EventWall0);
    t2EventWall0 = t2Wall;
    const { coreLowerK, corePlumeK, motionK, t3Wall } = t3EventProgress(
      now,
      wallS,
      t3EventWall0
    );
    t3EventWall0 = t3Wall;
    const { s2PlumeK, s2Wall: s2PlumeWall } = s2PlumeProgress(
      now,
      wallS,
      s2PlumeEventWall0
    );
    s2PlumeEventWall0 = s2PlumeWall;
    if (t2Wall === null) {
      resetBoosterSeparationPose(leftBooster, rightBooster, strutsGroup);
    } else {
      applyBoosterSeparationPose(
        separationK,
        rotSplayK,
        wireAlpha,
        leftBooster,
        rightBooster,
        strutsGroup
      );
    }
    if (t3Wall === null) {
      resetCoreStagingPose(coreLower);
    } else {
      applyCoreStagingPose(coreLowerK, motionK, coreLower);
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
      reducedMotion
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
    plumeDisposers.forEach((d) => {
      d();
    });
    disposeWireframeScene(scene);
    wireMat.dispose();
    strutMat.dispose();
  };
}

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
