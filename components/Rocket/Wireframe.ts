import * as THREE from 'three';

/** Build solid hull meshes with this material so wires can depth-test faint vs unobstructed silhouette. */
export type RocketDepthOccluderMaterial = THREE.MeshBasicMaterial;

/** Multiply base line opacity when a fragment lands “behind” hull depth (`GreaterDepth` pass). */
export const ROCKET_OCCLUDED_SILHOUETTE_OPACITY_MUL = 0.2;

export type RocketWireDepthPass = 'behind' | 'front';

/** UserData key — `setGroupLineOpacityFactor` scales `behind` passes by ROCKET_OCCLUDED_SILHOUETTE_OPACITY_MUL. */
export const ROCKET_WIRE_DEPTH_PASS_UD = 'rocketWireDepthPass' as const;

const assignTwinMaterials = (
  faintMat: THREE.LineBasicMaterial,
  frontMat: THREE.LineBasicMaterial,
): void => {
  faintMat.depthFunc = THREE.GreaterDepth;
  faintMat.depthWrite = false;
  faintMat.transparent = true;
  frontMat.depthFunc = THREE.LessEqualDepth;
  frontMat.depthWrite = false;
  frontMat.transparent = true;
};

/** Two LineSegments share edge topology: behind-hull faint pass then unobstructed silhouette. */
export const addTwinLineSegmentsDepthPassesToParent = (
  parent: THREE.Object3D,
  edgesGeometry: THREE.BufferGeometry,
  templateMaterial: THREE.LineBasicMaterial,
  layoutTwin?: (
    behind: THREE.LineSegments,
    front: THREE.LineSegments,
  ) => void,
): void => {
  const faintMat = templateMaterial.clone();
  const frontMat = templateMaterial.clone();
  assignTwinMaterials(faintMat, frontMat);

  const behindGeom = edgesGeometry;
  const frontGeom = edgesGeometry.clone();

  const behind = new THREE.LineSegments(behindGeom, faintMat);
  behind.renderOrder = 1;
  behind.userData[ROCKET_WIRE_DEPTH_PASS_UD] = 'behind' satisfies RocketWireDepthPass;

  const front = new THREE.LineSegments(frontGeom, frontMat);
  front.renderOrder = 2;
  front.userData[ROCKET_WIRE_DEPTH_PASS_UD] = 'front' satisfies RocketWireDepthPass;

  layoutTwin?.(behind, front);
  parent.add(behind, front);
};

/** Two Lines over the same vertices: behind-hull faint then unobstructed silhouette. */
export const addTwinLineDepthPassesToParent = (
  parent: THREE.Object3D,
  lineGeometry: THREE.BufferGeometry,
  templateMaterial: THREE.LineBasicMaterial,
  layoutTwin?: (behind: THREE.Line, front: THREE.Line) => void,
): void => {
  const faintMat = templateMaterial.clone();
  const frontMat = templateMaterial.clone();
  assignTwinMaterials(faintMat, frontMat);

  const behindGeom = lineGeometry;
  const frontGeom = lineGeometry.clone();

  const behind = new THREE.Line(behindGeom, faintMat);
  behind.renderOrder = 1;
  behind.userData[ROCKET_WIRE_DEPTH_PASS_UD] = 'behind' satisfies RocketWireDepthPass;

  const front = new THREE.Line(frontGeom, frontMat);
  front.renderOrder = 2;
  front.userData[ROCKET_WIRE_DEPTH_PASS_UD] = 'front' satisfies RocketWireDepthPass;

  layoutTwin?.(behind, front);
  parent.add(behind, front);
};

/**
 * Cylinder edges used to render the rocket's body, core, and fairing.
 * Optional `depthOccluder`: matching solid hull writes depth only (no color).
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
  depthOccluder?: RocketDepthOccluderMaterial,
): void => {
  const geometry = new THREE.CylinderGeometry(
    radiusTop,
    radiusBottom,
    height,
    segments,
    1,
  );
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

  if (depthOccluder) {
    const hullGeometry = new THREE.CylinderGeometry(
      radiusTop,
      radiusBottom,
      height,
      segments,
      1,
    );
    const hull = new THREE.Mesh(hullGeometry, depthOccluder);
    hull.position.set(x, yCenter, z);
    hull.renderOrder = 0;
    parent.add(hull);
  }
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
  addTwinLineDepthPassesToParent(parent, geometry, material.clone());
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
  depthOccluder?: RocketDepthOccluderMaterial,
): void => {
  const correctionRotation = Math.PI * 0.5;
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
  geometry.rotateY(correctionRotation);
  const edges = new THREE.EdgesGeometry(geometry);
  addTwinLineSegmentsDepthPassesToParent(
    parent,
    edges,
    material.clone(),
    (behind, front) => {
      behind.position.set(x, yEquator, z);
      front.position.set(x, yEquator, z);
    },
  );
  geometry.dispose();

  if (depthOccluder) {
    const hullGeometry = new THREE.SphereGeometry(
      radius,
      widthSegments,
      heightSegs,
      0,
      Math.PI * 2,
      0,
      Math.PI * 0.5,
    );
    hullGeometry.rotateY(correctionRotation);
    const hull = new THREE.Mesh(hullGeometry, depthOccluder);
    hull.position.set(x, yEquator, z);
    hull.renderOrder = 0;
    parent.add(hull);
  }
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
    addTwinLineDepthPassesToParent(parent, geomH, mat.clone());
  }
  for (let i = 0; i <= nCols; i += 1) {
    const u = i / nCols;
    const z0 = THREE.MathUtils.lerp(-halfZAtFlare, halfZAtFlare, u);
    const z1 = THREE.MathUtils.lerp(-halfZAtAttach, halfZAtAttach, u);
    const geomV = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(xFlare, yFlare, z0),
      new THREE.Vector3(xAttach, yAttach, z1),
    ]);
    addTwinLineDepthPassesToParent(parent, geomV, mat.clone());
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
  depthOccluder?: RocketDepthOccluderMaterial,
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
      depthOccluder,
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
    depthOccluder,
  );
  addMainStageNose(
    parent,
    material,
    capR,
    10,
    x,
    yBase + boatTailH + cylH,
    z,
    depthOccluder,
  );
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
  depthOccluder?: RocketDepthOccluderMaterial,
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
      depthOccluder,
    );
  }
  addMainStageNose(parent, material, capRadius, 10, x, yBase + shoulderH, z, depthOccluder);
};

/**
 * Material shared by hull occluder meshes so wireframes depth-test correctly.
 */
export const createRocketDepthOccluderMaterial = (): RocketDepthOccluderMaterial => {
  const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
  material.colorWrite = false;
  material.depthWrite = true;
  material.depthTest = true;
  material.transparent = false;
  material.side = THREE.FrontSide;
  return material;
};
