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

/** Base three-quarter pose. A slight yaw + pitch keep the wireframe reading as 3D without spinning. */
const STATIC_YAW_RAD = -0.20;
const STATIC_PITCH_RAD = 0.20;

/**
 * Circular wobble: pitch + yaw oscillate with a 90° phase offset around the base pose so the
 * envelope's facing direction traces a small slow circle. Amplitude kept small so it reads as
 * a gentle drift rather than swinging.
 */
const WOBBLE_AMP_RAD = 0.080;
const WOBBLE_PERIOD_MS = 5000;

/** Subtle in/out breath toward the camera so the envelope feels suspended in space rather than rotating in place. */
const BREATH_AMP = 0.04;
const BREATH_PERIOD_MS = 7000;

/**
 * Tiny roll on the camera axis. Quarter-amplitude and noticeably slower than the wobble — turns
 * the wobble from a "head shake" into "drifting paper".
 */
const ROLL_AMP_RAD = 0.025;
const ROLL_PERIOD_MS = 12000;

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

/**
 * V-fold seam mirrored on the back face: two diagonals from the top corners down to the same
 * apex point as the front flap. The depth-aware "behind" pass dims it to ~20% when occluded by
 * the body, so it reads as faint texture from the front and crisp seam during wobble parallax.
 */
const buildBackVFold = (
  material: THREE.LineBasicMaterial,
  disposers: Disposer[],
): THREE.Group => {
  const fold = new THREE.Group();
  // Slightly outside the back face so the seam doesn't z-fight the body's back edges.
  fold.position.set(0, 0, -(D / 2 + 0.0008));

  const foldEdges = new THREE.BufferGeometry();
  foldEdges.setAttribute(
    'position',
    new THREE.BufferAttribute(
      new Float32Array([
        -W / 2, H / 2, 0,
        0, H / 2 - FLAP_H, 0,
        W / 2, H / 2, 0,
        0, H / 2 - FLAP_H, 0,
      ]),
      3,
    ),
  );
  addTwinLineSegmentsDepthPassesToParent(fold, foldEdges, material);
  disposers.push(() => foldEdges.dispose());

  return fold;
};

const buildEnvelopeContent = (
  material: THREE.LineBasicMaterial,
  depthOccluder: RocketDepthOccluderMaterial,
): EnvelopeContent => {
  const disposers: Disposer[] = [];
  const envelope = new THREE.Group();
  buildBodyEdges(envelope, material, depthOccluder, disposers);
  envelope.add(buildClosedFlap(material, disposers));
  envelope.add(buildBackVFold(material, disposers));
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

const applyWobblePose = (envelope: THREE.Group, elapsedMs: number): void => {
  const wobblePhase = (elapsedMs / WOBBLE_PERIOD_MS) * Math.PI * 2;
  envelope.rotation.x =
    STATIC_PITCH_RAD + WOBBLE_AMP_RAD * Math.cos(wobblePhase);
  envelope.rotation.y =
    STATIC_YAW_RAD + WOBBLE_AMP_RAD * Math.sin(wobblePhase);

  const breathPhase = (elapsedMs / BREATH_PERIOD_MS) * Math.PI * 2;
  envelope.position.z = BREATH_AMP * Math.sin(breathPhase);

  const rollPhase = (elapsedMs / ROLL_PERIOD_MS) * Math.PI * 2;
  envelope.rotation.z = ROLL_AMP_RAD * Math.sin(rollPhase);
};

const createWobbleController = (
  envelope: THREE.Group,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
): { start: () => void; stop: () => void } => {
  const time0 = performance.now();
  let rafId = 0;
  let running = false;

  const tick = (): void => {
    applyWobblePose(envelope, performance.now() - time0);
    renderer.render(scene, camera);
    rafId = window.requestAnimationFrame(tick);
  };

  return {
    start: () => {
      if (running) {
        return;
      }
      running = true;
      rafId = window.requestAnimationFrame(tick);
    },
    stop: () => {
      running = false;
      window.cancelAnimationFrame(rafId);
    },
  };
};

const attachEnvelopeViewport = (
  mount: HTMLElement,
): { dispose: () => void } => {
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

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

  const wobble = createWobbleController(envelope, scene, camera, renderer);
  if (!reducedMotion) {
    wobble.start();
  }

  const ro = new ResizeObserver(() => {
    setSize();
    if (reducedMotion) {
      renderer.render(scene, camera);
    }
  });
  ro.observe(mount);

  // Pause off-screen so the wobble loop doesn't burn frames behind other content.
  const io = new IntersectionObserver((entries) => {
    if (reducedMotion) {
      return;
    }
    const inView = entries[0]?.isIntersecting ?? false;
    if (inView) {
      wobble.start();
    } else {
      wobble.stop();
    }
  });
  io.observe(mount);

  const dispose = (): void => {
    wobble.stop();
    ro.disconnect();
    io.disconnect();
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
 * Client-only WebGL: a cyan wireframe envelope held in a slight three-quarter pose with its
 * flap sealed and a matching V-fold mirrored on the back face. Drifts via three layered
 * oscillators on different periods — a circular pitch/yaw wobble, an in/out breath toward
 * the camera, and a slow roll around the camera axis — so it reads as gently floating paper
 * rather than a clean spin. Shares the Falcon Heavy hero's depth-aware twin-pass rendering
 * style and palette.
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
      aria-label="Three-dimensional cyan wireframe envelope with a sealed flap, gently wobbling."
    />
  );
};
