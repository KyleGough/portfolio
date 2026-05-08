import {
  type RocketDepthOccluderMaterial,
  type RocketWireDepthPass,
  addTwinLineSegmentsDepthPassesToParent,
  createRocketDepthOccluderMaterial,
  ROCKET_OCCLUDED_SILHOUETTE_OPACITY_MUL,
  ROCKET_WIRE_DEPTH_PASS_UD,
} from '@components/Rocket/Wireframe';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

import styles from './EnvelopeWireframe.module.css';

/** Cyan wireframe colour shared with the Falcon Heavy rocket. */
const CYAN = 0x5bd4ea;

/** Envelope body proportions. Roughly DL letter aspect (≈ 1.6:1) with a thin depth so it reads as a box. */
const W = 1.6;
const H = 1.0;
const D = 0.06;

/** Triangle flap depth — apex sits below the flap base by this amount when the flap is closed. */
const FLAP_H = 0.42;

/** Static three-quarter pose. A slight yaw + pitch keep the wireframe reading as 3D without spinning. */
const STATIC_YAW_RAD = -0.32;
const STATIC_PITCH_RAD = 0.12;

type Disposer = () => void;

interface EnvelopeContent {
  disposers: Disposer[];
  envelope: THREE.Group;
}

const buildBodyEdges = (
  parent: THREE.Group,
  material: THREE.LineBasicMaterial,
  depthOccluder: RocketDepthOccluderMaterial,
  disposers: Disposer[],
): void => {
  const bodyBox = new THREE.BoxGeometry(W, H, D);
  const bodyEdges = new THREE.EdgesGeometry(bodyBox);
  bodyBox.dispose();
  addTwinLineSegmentsDepthPassesToParent(parent, bodyEdges, material);
  disposers.push(() => bodyEdges.dispose());

  const hullGeometry = new THREE.BoxGeometry(W, H, D);
  const hull = new THREE.Mesh(hullGeometry, depthOccluder);
  hull.renderOrder = 0;
  parent.add(hull);
  disposers.push(() => hullGeometry.dispose());
};

const buildClosedFlap = (
  material: THREE.LineBasicMaterial,
  disposers: Disposer[],
): THREE.Group => {
  const flap = new THREE.Group();
  // Lay the flap flat on the front face so its V-seam reads as the recognisable envelope feature.
  // Lifted by a tiny epsilon so the seam doesn't z-fight the body's front edges.
  flap.position.set(0, 0, D / 2 + 0.0008);

  // Triangle outline (3 edges): top-left → top-right (along the body top edge),
  // and the two angled seam lines from the top corners down to the apex.
  const flapEdges = new THREE.BufferGeometry();
  flapEdges.setAttribute(
    'position',
    new THREE.BufferAttribute(
      new Float32Array([
        -W / 2, H / 2, 0,
        W / 2, H / 2, 0,
        -W / 2, H / 2, 0,
        0, H / 2 - FLAP_H, 0,
        W / 2, H / 2, 0,
        0, H / 2 - FLAP_H, 0,
      ]),
      3,
    ),
  );
  addTwinLineSegmentsDepthPassesToParent(flap, flapEdges, material);
  disposers.push(() => flapEdges.dispose());

  return flap;
};

const buildEnvelopeContent = (
  material: THREE.LineBasicMaterial,
  depthOccluder: RocketDepthOccluderMaterial,
): EnvelopeContent => {
  const disposers: Disposer[] = [];
  const envelope = new THREE.Group();
  buildBodyEdges(envelope, material, depthOccluder, disposers);
  envelope.add(buildClosedFlap(material, disposers));
  envelope.rotation.set(STATIC_PITCH_RAD, STATIC_YAW_RAD, 0);
  return { disposers, envelope };
};

const isWireLine = (
  obj: THREE.Object3D,
): obj is THREE.Line | THREE.LineSegments =>
  obj instanceof THREE.Line || obj instanceof THREE.LineSegments;

const refreshLineOpacityForDepthPass = (root: THREE.Object3D): void => {
  root.traverse((obj) => {
    if (!isWireLine(obj)) {
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
    const next = base * passOpacityMul;
    m.transparent = next < 0.999;
    m.opacity = next;
  });
};

const createRendererStack = (
  mount: HTMLElement,
): {
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  setSize: () => void;
} => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.05, 100);
  camera.position.set(0, 0, 2.95);
  camera.lookAt(0, 0, 0);

  const setSize = (): void => {
    const w = mount.clientWidth;
    const h = mount.clientHeight;
    if (w < 2 || h < 2) {
      return;
    }
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };

  return { camera, renderer, scene, setSize };
};

const disposeSceneMaterials = (scene: THREE.Scene): void => {
  scene.traverse((obj) => {
    if (!isWireLine(obj)) {
      return;
    }
    const mat = obj.material;
    if (Array.isArray(mat)) {
      mat.forEach((m) => m.dispose());
      return;
    }
    mat.dispose();
  });
};

const attachEnvelopeViewport = (
  mount: HTMLElement,
): { dispose: () => void } => {
  const { camera, renderer, scene, setSize } = createRendererStack(mount);

  const wireMat = new THREE.LineBasicMaterial({
    color: CYAN,
    transparent: true,
    opacity: 0.92,
  });
  const depthOccluder = createRocketDepthOccluderMaterial();

  const { disposers, envelope } = buildEnvelopeContent(wireMat, depthOccluder);
  refreshLineOpacityForDepthPass(envelope);
  scene.add(envelope);

  mount.appendChild(renderer.domElement);
  setSize();
  renderer.render(scene, camera);

  const ro = new ResizeObserver(() => {
    setSize();
    renderer.render(scene, camera);
  });
  ro.observe(mount);

  const dispose = (): void => {
    ro.disconnect();
    if (renderer.domElement.parentNode === mount) {
      mount.removeChild(renderer.domElement);
    }
    for (const d of disposers) {
      d();
    }
    disposeSceneMaterials(scene);
    wireMat.dispose();
    depthOccluder.dispose();
    renderer.dispose();
  };

  return { dispose };
};

/**
 * Client-only WebGL: a static cyan wireframe envelope held in a slight three-quarter
 * pose with its flap sealed. Shares the Falcon Heavy hero's depth-aware twin-pass
 * rendering style and palette.
 */
export const EnvelopeWireframe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return undefined;
    }
    const { dispose } = attachEnvelopeViewport(mount);
    return dispose;
  }, []);

  return (
    <div
      ref={mountRef}
      className={styles.canvasHost}
      role="img"
      aria-label="Three-dimensional cyan wireframe envelope with a sealed flap, facing the viewer."
    />
  );
};
