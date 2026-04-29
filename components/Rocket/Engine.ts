import * as THREE from 'three';

import { addCylinderEdges } from './wireframe';

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

/** Cone with apex toward −Y opening downward. */
const addInvertedCone = (
  parent: THREE.Group,
  material: THREE.LineBasicMaterial,
  radius: number,
  height: number,
  x: number,
  yCenter: number,
  z: number
): void => {
  const geometry = new THREE.ConeGeometry(radius, height, CONE_SEGMENTS, 1);
  const edges = new THREE.EdgesGeometry(geometry);
  const line = new THREE.LineSegments(edges, material.clone());
  line.rotation.x = Math.PI;
  line.position.set(x, yCenter, z);
  parent.add(line);
  geometry.dispose();
};

/** Single engine nozzle bell: short chamber + flared nozzle. */
export const addEngineNozzle = (
  parent: THREE.Group,
  material: THREE.LineBasicMaterial,
  x: number,
  z: number,
  yMount: number,
  scale: number
): void => {
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
  addInvertedCone(
    parent,
    material,
    rBell,
    hBell,
    x,
    yMount - hStem - hBell * 0.5,
    z
  );
};

/** Falcon 9 style octaweb: one center engine + eight on a ring. */
export const addOctawebEngines = (
  parent: THREE.Group,
  material: THREE.LineBasicMaterial,
  yMount: number,
  ringRadius: number,
  scale: number
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
 * Stacked soft cones = flame: tip at nozzle, flares then tapers; animated like exhaust.
 */
const addEnginePlumeGroup = (
  spec: PlumeSpec,
  reducedMotion: boolean
): { dispose: () => void; group: THREE.Group; layers: PlumeLayer[] } => {
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
  fn: (x: number, z: number) => void
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
  reducedMotion: boolean
): { allLayers: PlumeLayer[]; disposers: (() => void)[] } => {
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
      reducedMotion
    );
    coreUpper.add(group);
    allLayers.push(...layers);
    disposers.push(dispose);
  }

  return { allLayers, disposers };
};
