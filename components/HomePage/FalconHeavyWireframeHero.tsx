import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

import {
  getHeroMissionSec,
  HERO_BOOSTER_FADE_AT_MISSION_SEC,
  HERO_BOOSTER_FADE_WALL_MS,
} from './heroMissionTime';
import styles from './HomeHeroVariants.module.css';

const CYAN = 0x5bd4ea;
const CYAN_DIM = 0x3d7a8a;
/** Y mount for all octaweb engine clusters in buildRocket. */
const Y_MOUNT_CORE = 0.03;

const PLUME_ORANGE = 0xff5a1a;
const PLUME_GOLD = 0xffb040;
const PLUME_CORE = 0xfff4d4;

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
 * y: booster base = 0, up = +Y.
 */
function addSideBoosterGridFins(
  parent: THREE.Group,
  mat: THREE.LineBasicMaterial,
  sx: number,
  boosterR: number,
  yFlare: number,
  yAttach: number,
  halfZAtFlare: number,
  halfZAtAttach: number,
  radialFlare: number,
  nCols: number,
  nRows: number
): void {
  const outDir = sx > 0 ? 1 : -1;
  const skin = 0.002;
  const xAttach = sx + outDir * (boosterR + skin);
  const xFlare = sx + outDir * (boosterR + radialFlare);
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
  mat: THREE.MeshBasicMaterial;
  mesh: THREE.Mesh;
  phase: number;
};

type PlumeSpec = {
  isBooster: boolean;
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
  boosterX: number,
  boosterRingR: number,
  reducedMotion: boolean
): { allLayers: PlumeLayer[]; disposers: (() => void)[]; plumes: THREE.Group } {
  const allLayers: PlumeLayer[] = [];
  const plumes = new THREE.Group();
  const disposers: (() => void)[] = [];
  const exhaustCore = merlinExhaustY(yMount, 1);
  const exhaustBooster = merlinExhaustY(yMount, 0.86);
  let phase = 0;

  const addCluster = (
    centerX: number,
    ringR: number,
    s: number,
    exhaustY: number,
    isBooster: boolean
  ) => {
    forEachOctawebEngine(centerX, 0, ringR, s, (x, z) => {
      const p = (phase += 0.21) % 12.5;
      const { group, layers, dispose } = makeEnginePlumeGroup(
        { isBooster, phase: p, scale: s, x, y: exhaustY, z },
        reducedMotion
      );
      plumes.add(group);
      allLayers.push(...layers);
      disposers.push(dispose);
    });
  };

  addCluster(0, coreRingR, 1, exhaustCore, false);
  addCluster(boosterX, boosterRingR, 0.86, exhaustBooster, true);
  addCluster(-boosterX, boosterRingR, 0.86, exhaustBooster, true);

  return { allLayers, disposers, plumes };
}

function buildRocket(
  wireMat: THREE.LineBasicMaterial,
  strutMat: THREE.LineBasicMaterial
): { body: THREE.Group } {
  const body = new THREE.Group();

  const h1 = 3.12;
  const hi = 0.2;
  const h2 = 0.92;
  /* Shorter fairing = blunter (less acute) nose than a tall cone */
  const hf = 0.8;
  const boosterH = 2.95;
  /* Slightly closer to center core than 0.84; strut endpoints follow booster inner face */
  const boosterX = 0.7;
  const coreR = 0.35;
  const boosterR = 0.25;
  const boosterRTop = 0.24; /* tapers: narrow toward second-stage joint */
  const boosterOctawebRingR = 0.127; /* ~scaled with diameter vs 0.3 / 0.152 */

  // Center: first stage
  addCylinderEdges(body, wireMat, 0.32, coreR, h1, 10, 0, h1 / 2, 0);
  // Core octaweb (9 Merlins)
  addOctawebEngines(body, wireMat, 0, 0, Y_MOUNT_CORE, 0.2, 1);

  // Interstage
  addCylinderEdges(body, wireMat, 0.3, 0.32, hi, 10, 0, h1 + hi / 2, 0);
  // Second stage
  addCylinderEdges(body, wireMat, 0.2, 0.22, h2, 10, 0, h1 + hi + h2 / 2, 0);
  // Fairing
  const fairingR = 0.22;
  const fairingY = h1 + hi + h2 + hf / 2;
  addConeEdges(body, wireMat, fairingR, hf, 10, 0, fairingY, 0);

  // Side boosters (parallel first stages)
  for (const sx of [-boosterX, boosterX] as const) {
    addCylinderEdges(
      body,
      wireMat,
      boosterRTop,
      boosterR,
      boosterH,
      10,
      sx,
      boosterH / 2,
      0
    );
    /* Nose cap matches top-of-stage radius */
    const noseH = 0.34;
    const noseR = boosterRTop;
    addConeEdges(body, wireMat, noseR, noseH, 8, sx, boosterH + noseH / 2, 0);
    // Booster octaweb (same 9-engine pattern, scaled to booster diameter)
    addOctawebEngines(
      body,
      wireMat,
      sx,
      0,
      Y_MOUNT_CORE,
      boosterOctawebRingR,
      0.86
    );
    // Outboard grid fin: top against hull, bottom flared out
    const finYFlare = 0.12;
    const finYAttach = 0.46;
    addSideBoosterGridFins(
      body,
      wireMat,
      sx,
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

  // Struts (center core to side boosters)
  const strutYs = [1.05, 1.95, 2.55];
  for (const y of strutYs) {
    addStrut(body, strutMat, -coreR * 0.92, y, -boosterX + boosterR * 0.88);
    addStrut(body, strutMat, coreR * 0.92, y, boosterX - boosterR * 0.88);
  }

  return { body };
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

function nextBoosterPlumeFade(
  now: number,
  wallS: number,
  previousWall0: number | null
): { boosterMul: number; nextWall0: number | null } {
  const missionSec = getHeroMissionSec(wallS);
  let nextWall0 = previousWall0;
  if (missionSec >= HERO_BOOSTER_FADE_AT_MISSION_SEC) {
    if (nextWall0 === null) {
      nextWall0 = now;
    }
  } else {
    nextWall0 = null;
  }
  const boosterMul =
    nextWall0 === null
      ? 1
      : Math.max(0, 1 - (now - nextWall0) / HERO_BOOSTER_FADE_WALL_MS);
  return { boosterMul, nextWall0 };
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

  const { body } = buildRocket(wireMat, strutMat);
  centerObjectAtOrigin(body);

  const { allLayers, disposers: plumeDisposers, plumes } = buildAllPlumes(
    Y_MOUNT_CORE,
    0.2,
    0.7,
    0.127,
    reducedMotion
  );
  body.add(plumes);

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
  let boosterFadeWall0: number | null = null;
  let rafId = 0;
  const tick = () => {
    const now = performance.now();
    const wallS = (now - time0) * 0.001;
    const { boosterMul, nextWall0 } = nextBoosterPlumeFade(
      now,
      wallS,
      boosterFadeWall0
    );
    boosterFadeWall0 = nextWall0;

    if (!reducedMotion) {
      pivot.rotation.y += 0.0028;
      const t = wallS;
      for (const layer of allLayers) {
        const f = Math.sin(t * 19.5 + layer.phase);
        const g = 0.5 + 0.5 * Math.sin(t * 29 + layer.phase * 1.63);
        const flicker = 0.72 + 0.28 * g;
        const b = layer.isBooster ? boosterMul : 1;
        layer.mat.opacity = layer.baseOpacity * flicker * b;
        const pulse = 1 + 0.1 * f;
        const breath = 0.94 + 0.12 * g;
        layer.mesh.scale.set(pulse, breath, pulse);
      }
    } else {
      for (const layer of allLayers) {
        if (layer.isBooster) {
          layer.mat.opacity = layer.baseOpacity * boosterMul;
        }
      }
    }
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
 * Client-only WebGL: Falcon Heavy style triple-body wireframe (center + two boosters).
 */
export const FalconHeavyWireframeHero: React.FC = () => {
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
      <div
        ref={mountRef}
        className={styles.rocketCanvasHost}
        aria-hidden
      />
    </div>
  );
};
