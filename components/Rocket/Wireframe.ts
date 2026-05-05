import * as THREE from 'three';

/**
 * Cylinder edges used to render the rocket's body, core, and fairing.
 */
export const addCylinderEdges = (
  parent: THREE.Group,
  material: THREE.LineBasicMaterial,
  radiusTop: number,
  radiusBottom: number,
  height: number,
  segments: number,
  x: number,
  yCenter: number,
  z: number,
): void => {
  const geometry = new THREE.CylinderGeometry(
    radiusTop,
    radiusBottom,
    height,
    segments,
    1,
  );
  const edges = new THREE.EdgesGeometry(geometry);
  const line = new THREE.LineSegments(edges, material.clone());
  line.position.set(x, yCenter, z);
  parent.add(line);
  geometry.dispose();
};

/**
 * Cone edges used to render the booster's nose.
 */
export const addConeEdges = (
  parent: THREE.Group,
  material: THREE.LineBasicMaterial,
  radius: number,
  height: number,
  segments: number,
  x: number,
  yCenter: number,
  z: number,
): void => {
  const geometry = new THREE.ConeGeometry(radius, height, segments, 1);
  const edges = new THREE.EdgesGeometry(geometry);
  const line = new THREE.LineSegments(edges, material.clone());
  line.position.set(x, yCenter, z);
  parent.add(line);
  geometry.dispose();
};

/**
 * Connecting struts between the core and the side boosters.
 */
export const addStrut = (
  parent: THREE.Group,
  material: THREE.LineBasicMaterial,
  x0: number,
  y: number,
  x1: number,
): void => {
  const geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(x0, y, 0),
    new THREE.Vector3(x1, y, 0),
  ]);
  const line = new THREE.Line(geometry, material.clone());
  parent.add(line);
};

/**
 * Rounded nose of main stage.
 */
const addMainStageNose = (
  parent: THREE.Group,
  material: THREE.LineBasicMaterial,
  radius: number,
  widthSegments: number,
  x: number,
  yEquator: number,
  z: number,
): void => {
  const heightSegs = Math.max(2, Math.floor(widthSegments * 0.4));
  const geometry = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegs,
    0,
    Math.PI * 2,
    0,
    Math.PI * 0.5,
  );
  const edges = new THREE.EdgesGeometry(geometry);
  const line = new THREE.LineSegments(edges, material.clone());
  line.position.set(x, yEquator, z);
  parent.add(line);
  geometry.dispose();
};

/**
 * Outboard grid fin: top edge (yAttach) lies on the tank, bottom (yFlare) is
 * canted out in +radial and slightly wider in z (hinged / fanned look).
 * y: booster base = 0, up = +Y. Booster origin at center: `outward` = −1 = toward −X, +1 = toward +X.
 */
export const addBoosterGridFins = (
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
  nRows: number,
): void => {
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
};

/**
 * Payload fairing profile: inward frustum at the base (boat-tail from stage) +
 * constant-radius shoulder + hemispherical nose. Vertical span ≈ totalHeight.
 * (Reads less like “cylinder + dome on top”.)
 */
export const addPayloadFairingWithBoatTailEdges = (
  parent: THREE.Group,
  material: THREE.LineBasicMaterial,
  baseRadius: number,
  neckRadius: number,
  boatTailH: number,
  totalHeight: number,
  x: number,
  yBase: number,
  z: number,
): void => {
  if (boatTailH > 1e-4) {
    addCylinderEdges(
      parent,
      material,
      baseRadius,
      neckRadius,
      boatTailH,
      10,
      x,
      yBase + boatTailH * 0.5,
      z,
    );
  }
  const capR = neckRadius;
  const cylH = Math.max(1e-4, totalHeight - boatTailH - capR);
  addCylinderEdges(
    parent,
    material,
    neckRadius,
    neckRadius,
    cylH,
    10,
    x,
    yBase + boatTailH + cylH * 0.5,
    z,
  );
  addMainStageNose(parent, material, capR, 10, x, yBase + boatTailH + cylH, z);
};

/**
 * Cyl shoulder + spherical cap. Total height = shoulderH + capRadius.
 */
export const addRoundedPayloadFairingEdges = (
  parent: THREE.Group,
  material: THREE.LineBasicMaterial,
  baseRadius: number,
  capRadius: number,
  shoulderH: number,
  x: number,
  yBase: number,
  z: number,
): void => {
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
      z,
    );
  }
  addMainStageNose(parent, material, capRadius, 10, x, yBase + shoulderH, z);
};
