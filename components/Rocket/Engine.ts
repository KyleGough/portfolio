import * as THREE from 'three';

import {
  addCylinderEdges,
  addTwinLineDepthPassesToParent,
  addTwinLineSegmentsDepthPassesToParent,
} from './Wireframe';

const CONE_SEGMENTS = 8;

const PLUME_ORANGE = 0xff5a1a;
const PLUME_GOLD = 0xffb040;
const PLUME_CORE = 0xfff4d4;

/** First stage height; joint with interstage is the natural “line” for stack separation. */
const S1_H = 3.12;
const INTERSTAGE_H = 0.2;

/** Single MVAC-class bell at second-stage base (interstage / S2 joint). */
const S2_ENGINE_SCALE = 0.72;
const S2_ENGINE_Y_MOUNT = S1_H + INTERSTAGE_H;

export type PlumeLayer = {
  baseOpacity: number;
  breathAmp: number;
  curlAmp: number;
  curlPhaseX: number;
  curlPhaseZ: number;
  curlSpeedX: number;
  curlSpeedZ: number;
  flickerCeil: number;
  flickerFloor: number;
  isBooster: boolean;
  isCore: boolean;
  isUpperStage: boolean;
  mat: THREE.MeshBasicMaterial;
  mesh: THREE.Mesh;
  oscSpeedA: number;
  oscSpeedB: number;
  phase: number;
  pulseAmp: number;
  tipCurlAmp: number;
};

export type AddAllEnginePlumesResult = {
  allLayers: PlumeLayer[];
  disposers: (() => void)[];
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

/** Cone with apex toward −Y opening downward. */
const addInvertedCone = (
  parent: THREE.Group,
  material: THREE.LineBasicMaterial,
  radius: number,
  height: number,
  x: number,
  yCenter: number,
  z: number,
): void => {
  const geometry = new THREE.ConeGeometry(radius, height, CONE_SEGMENTS, 1);
  const edges = new THREE.EdgesGeometry(geometry);
  addTwinLineSegmentsDepthPassesToParent(
    parent,
    edges,
    material.clone(),
    (behind, front) => {
      behind.position.set(x, yCenter, z);
      front.position.set(x, yCenter, z);
    },
  );
  geometry.dispose();
};

/** Single engine nozzle bell: short chamber + flared nozzle. */
export const addEngineNozzle = (
  parent: THREE.Group,
  material: THREE.LineBasicMaterial,
  x: number,
  z: number,
  yMount: number,
  scale: number,
): void => {
  const hStem = 0.052 * scale * 0.33;
  const hBell = 0.1 * scale;
  const rBell = 0.068 * scale;
  addCylinderEdges(
    parent,
    material,
    0.042 * scale,
    0.032 * scale,
    hStem,
    4,
    x,
    yMount - hStem * 0.5,
    z,
  );
  addInvertedCone(
    parent,
    material,
    rBell,
    hBell,
    x,
    yMount - hStem - hBell * 0.5,
    z,
  );
};

/** Falcon 9 style octaweb: one center engine + eight on a ring. */
export const addOctawebEngines = (
  parent: THREE.Group,
  material: THREE.LineBasicMaterial,
  yMount: number,
  ringRadius: number,
  scale: number,
): void => {
  addEngineNozzle(parent, material, 0, 0, yMount, scale);
  for (let i = 0; i < 8; i += 1) {
    const a = (i * Math.PI) / 4;
    const ox = Math.cos(a) * ringRadius;
    const oz = Math.sin(a) * ringRadius;
    addEngineNozzle(parent, material, ox, oz, yMount, scale);
  }
};

/**
 * Octaweb hints: mounting rings + radial braces so engines feel structurally tied
 * into the stage base rather than floating nozzles.
 */
export const addEngineBayStructure = (
  parent: THREE.Group | THREE.Object3D,
  material: THREE.LineBasicMaterial,
  yMount: number,
  ringRadius: number,
  scale: number,
): void => {
  const bayY = yMount + 0.032 * scale;
  const upperR = ringRadius * 1.2;
  const lowerR = ringRadius * 1.05;
  addCylinderEdges(parent as THREE.Group, material, upperR, upperR, 0.012 * scale, 8, 0, bayY, 0);
  addCylinderEdges(
    parent as THREE.Group,
    material,
    lowerR,
    lowerR,
    0.01 * scale,
    8,
    0,
    bayY - 0.026 * scale,
    0,
  );
  for (let i = 0; i < 8; i += 1) {
    const a = (i * Math.PI) / 4;
    const xUpper = Math.cos(a) * upperR;
    const zUpper = Math.sin(a) * upperR;
    const xLower = Math.cos(a + Math.PI / 8) * lowerR;
    const zLower = Math.sin(a + Math.PI / 8) * lowerR;
    const braceGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(xUpper, bayY, zUpper),
      new THREE.Vector3(xLower, bayY - 0.026 * scale, zLower),
    ]);
    addTwinLineDepthPassesToParent(parent, braceGeom, material.clone());
  }
  // Few radial spokes (hub → ring engines): reads as octaweb without drawing every bay.
  const spokeY = bayY - 0.014 * scale;
  const spokeRingK = 0.96;
  for (const i of [0, 3, 6]) {
    const a = (i * Math.PI) / 4;
    const xOuter = Math.cos(a) * ringRadius * spokeRingK;
    const zOuter = Math.sin(a) * ringRadius * spokeRingK;
    const spokeGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, spokeY, 0),
      new THREE.Vector3(xOuter, spokeY, zOuter),
    ]);
    addTwinLineDepthPassesToParent(parent, spokeGeom, material.clone());
  }
  const mountGeom = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, bayY - 0.022 * scale, 0),
    new THREE.Vector3(0, yMount + 0.004 * scale, 0),
  ]);
  addTwinLineDepthPassesToParent(parent, mountGeom, material.clone());
};

/**
 * Stacked soft cones = flame: tip at nozzle, flares then tapers; animated like exhaust.
 */
const addEnginePlumeGroup = (
  spec: PlumeSpec,
  reducedMotion: boolean,
): { dispose: () => void; group: THREE.Group; layers: PlumeLayer[] } => {
  const s = spec.scale;
  const tipY = spec.y;
  const phase = spec.phase;
  // Frustum: narrow at nozzle (top, +Y), flares down (-Y) like real exhaust
  const r0 = 0.022 * s;
  const hOuter = 0.84 * s;
  const hGold = 0.56 * s;
  const hCore = 0.28 * s;
  const layers: PlumeLayer[] = [];
  const group = new THREE.Group();
  group.position.set(spec.x, 0, spec.z);

  const addLayer = (
    height: number,
    rTop: number,
    rBottom: number,
    color: number,
    baseOpacity: number,
    j: number,
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
    // Anchor at nozzle: move geometry down so local origin is at the top of the plume.
    geom.translate(0, -height * 0.5, 0);
    mesh.position.y = tipY;
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
      oscSpeedA: THREE.MathUtils.randFloat(15.5, 26),
      oscSpeedB: THREE.MathUtils.randFloat(23, 36),
      flickerFloor: THREE.MathUtils.randFloat(0.62, 0.78),
      flickerCeil: THREE.MathUtils.randFloat(0.22, 0.36),
      pulseAmp: THREE.MathUtils.randFloat(0.08, 0.16),
      breathAmp: THREE.MathUtils.randFloat(0.09, 0.18),
      curlAmp: THREE.MathUtils.randFloat(0.008, 0.024) * s,
      curlSpeedX: THREE.MathUtils.randFloat(1.8, 3.6),
      curlSpeedZ: THREE.MathUtils.randFloat(1.6, 3.2),
      curlPhaseX: THREE.MathUtils.randFloat(-Math.PI, Math.PI),
      curlPhaseZ: THREE.MathUtils.randFloat(-Math.PI, Math.PI),
      tipCurlAmp: THREE.MathUtils.randFloat(0.03, 0.075),
    });
  };

  // Wider, softer outer
  addLayer(
    hOuter,
    r0 * 0.78,
    r0 * 3.35,
    PLUME_ORANGE,
    reducedMotion ? 0.14 : 0.22,
    0,
  );
  // Mid bright
  addLayer(
    hGold,
    r0 * 0.5,
    r0 * 1.9,
    PLUME_GOLD,
    reducedMotion ? 0.18 : 0.3,
    1,
  );
  // Hot core
  addLayer(
    hCore,
    r0 * 0.18,
    r0 * 0.72,
    PLUME_CORE,
    reducedMotion ? 0.35 : 0.55,
    2,
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
};

/** Y at the engine bell exhaust (wide opening), matches addEngineNozzle + addInvertedCone. */
const merlinExhaustY = (yMount: number, scale: number): number => {
  const hStem = 0.052 * scale;
  return yMount - hStem;
};

/**
 * Pushes the (x, z) of each engine in an octaweb; center (centerX, centerZ), ring, scale.
 */
const forEachOctawebEngine = (
  centerX: number,
  centerZ: number,
  ringRadius: number,
  scale: number,
  fn: (x: number, z: number) => void,
): void => {
  fn(centerX, centerZ);
  for (let i = 0; i < 8; i += 1) {
    const a = (i * Math.PI) / 4;
    fn(centerX + Math.cos(a) * ringRadius, centerZ + Math.sin(a) * ringRadius);
  }
};

export const addAllEnginePlumes = (
  yMount: number,
  coreRingR: number,
  boosterRingR: number,
  coreLower: THREE.Object3D,
  coreUpper: THREE.Object3D,
  leftBooster: THREE.Group,
  rightBooster: THREE.Group,
  reducedMotion: boolean,
): AddAllEnginePlumesResult => {
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
    isCore: boolean,
  ) => {
    forEachOctawebEngine(centerX, 0, ringR, s, (x, z) => {
      phase += 0.21;
      const p = phase % 12.5;
      const { group, layers, dispose } = addEnginePlumeGroup(
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
        reducedMotion,
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
    phase += 0.21;
    const p = phase % 12.5;
    const { group, layers, dispose } = addEnginePlumeGroup(
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
      reducedMotion,
    );
    coreUpper.add(group);
    allLayers.push(...layers);
    disposers.push(dispose);
  }

  return { allLayers, disposers };
};

const plumeLayerMul = (
  layer: PlumeLayer,
  corePlumeK: number,
  plumeMul: number,
  s2PlumeK: number,
): number => {
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
};

export const updatePlumeLayersForTick = (
  layers: readonly PlumeLayer[],
  wallS: number,
  phaseSec: number,
  corePlumeK: number,
  plumeMul: number,
  s2PlumeK: number,
  reducedMotion: boolean,
  loopFadeK = 1,
  upperStackFadeK = 1,
): void => {
  const plumeMulOnly = (layer: PlumeLayer): number =>
    plumeLayerMul(layer, corePlumeK, plumeMul, s2PlumeK) *
    (layer.isUpperStage ? upperStackFadeK : 1);

  const pressureByPhase = (sec: number): number => {
    if (sec <= 35) {
      return THREE.MathUtils.lerp(1, 0.55, sec / 35);
    }
    if (sec <= 60) {
      return THREE.MathUtils.lerp(0.55, 0.28, (sec - 35) / 25);
    }
    return THREE.MathUtils.lerp(0.28, 0.12, Math.min(1, (sec - 60) / 10));
  };

  const setOpacity = (layer: PlumeLayer, flicker: number): void => {
    const o = layer.baseOpacity * flicker * plumeMulOnly(layer) * loopFadeK;
    layer.mat.opacity = o;
    layer.mesh.visible = o > 0.002;
  };

  if (reducedMotion) {
    for (const layer of layers) {
      setOpacity(layer, 1);
      const stageK = plumeMulOnly(layer);
      const pressureK = Math.min(
        1,
        Math.max(
          0,
          pressureByPhase(phaseSec) + (layer.isUpperStage ? -0.16 : 0.06),
        ),
      );
      const radialPressure = THREE.MathUtils.lerp(1.36, 0.88, pressureK);
      const axialPressure = THREE.MathUtils.lerp(1.24, 0.92, pressureK);
      layer.mesh.scale.set(radialPressure, axialPressure * stageK, radialPressure);
      layer.mesh.position.x = 0;
      layer.mesh.position.z = 0;
      layer.mesh.rotation.x = 0;
      layer.mesh.rotation.z = 0;
    }
    return;
  }
  for (const layer of layers) {
    const stageK = plumeMulOnly(layer);
    const pressureK = Math.min(
      1,
      Math.max(
        0,
        pressureByPhase(phaseSec) + (layer.isUpperStage ? -0.16 : 0.06),
      ),
    );
    const radialPressure = THREE.MathUtils.lerp(1.38, 0.86, pressureK);
    const axialPressure = THREE.MathUtils.lerp(1.26, 0.9, pressureK);
    const f = Math.sin(wallS * layer.oscSpeedA + layer.phase);
    const g = 0.5 + 0.5 * Math.sin(wallS * layer.oscSpeedB + layer.phase * 1.63);
    const flicker = layer.flickerFloor + layer.flickerCeil * g;
    setOpacity(layer, flicker);
    const pulse = 1 + layer.pulseAmp * f;
    const breath = 0.94 + layer.breathAmp * g;
    layer.mesh.scale.set(
      pulse * radialPressure,
      breath * axialPressure * stageK,
      pulse * radialPressure,
    );
    const curlK = layer.curlAmp * (0.65 + 0.35 * g) * Math.max(0.3, stageK);
    layer.mesh.position.x =
      Math.sin(wallS * layer.curlSpeedX + layer.phase + layer.curlPhaseX) *
      curlK *
      0.34;
    layer.mesh.position.z =
      Math.sin(wallS * layer.curlSpeedZ + layer.phase * 1.17 + layer.curlPhaseZ) *
      curlK *
      0.34;
    const tipCurlK = layer.tipCurlAmp * (0.72 + 0.28 * f) * Math.max(0.3, stageK);
    layer.mesh.rotation.x =
      Math.sin(wallS * (layer.curlSpeedX * 0.82) + layer.phase * 1.11 + layer.curlPhaseX) *
      tipCurlK;
    layer.mesh.rotation.z =
      Math.sin(wallS * (layer.curlSpeedZ * 0.87) + layer.phase * 1.19 + layer.curlPhaseZ) *
      tipCurlK;
  }
};
