import { FlightTelemetry } from "@components/FlightTelemetry";
import { Link } from "@components/Link";
import extruded from "@components/SpaceExtrudedTitle/extrudedTitle.module.css";
import { useObserveHeroAnimationActive } from "@hooks/useObserveHeroAnimationActive";
import dynamic from "next/dynamic";
import React, { useRef } from "react";

import styles from "./Hero.module.css";
import { HeroAnimationActiveContext } from "./HeroAnimationContext";

const FalconHeavyWireframe = dynamic(
  () =>
    import("../Rocket/FalconHeavyWireframe").then(
      (m) => m.FalconHeavyWireframe,
    ),
  {
    ssr: false,
    loading: () => (
      <div className={styles.rocketFrame} aria-hidden>
        <div className={styles.rocketCanvasHost} />
      </div>
    ),
  },
);

export const Hero: React.FC = () => {
  const wireframeStageRef = useRef<HTMLDivElement>(null);
  const animationActive = useObserveHeroAnimationActive(wireframeStageRef);

  return (
    <header className={styles.slot} aria-label="Welcome">
      <div
        className={styles.graphic}
        role="img"
        aria-label="Three-dimensional wireframe of a Falcon Heavy class rocket with animated engine plumes, plus a decorative mock GNC readout: fuel, velocity, pitch, and roll."
      >
        <HeroAnimationActiveContext.Provider value={animationActive}>
          <div ref={wireframeStageRef} className={styles.wireframeStage}>
            <FalconHeavyWireframe />
            <div className={styles.telemetryOverRocket}>
              <FlightTelemetry />
            </div>
          </div>
        </HeroAnimationActiveContext.Provider>
      </div>
      <div className={styles.copy}>
        <h1 className={styles.name}>
          <span className={extruded.nameExtruded}>Kyle Gough</span>
        </h1>
        <p className={styles.eyebrow}>Senior Front-End Engineer</p>
        <p className={styles.intro}>
          Specialising in building scalable, performant web applications with
          TypeScript and React. Passionate about cosmology, sci-fi, cycling,
          guitar, and board games.
        </p>
        <div className={styles.cta}>
          <Link className={styles.ctaButton} to="/projects">
            View Projects
          </Link>
        </div>
      </div>
    </header>
  );
};
