import {
  getMissionSec,
  LOOP_PERIOD_MISSION_SEC,
} from '@components/Rocket/MissionTime';

const clamp = (n: number, a: number, b: number): number =>
  Math.min(b, Math.max(a, n));

export type AttitudeSnapshot = {
  horizonPitchDeg: number;
  rollDegHorizon: number;
  vectorThrustAngle: number;
  vectorVelocityAngle: number;
};

/** Inputs for ADI horizon + V/T vector diagram only (wall time aligned with rocket loop). */
export function buildAttitudeSnapshot(elapsedWallSec: number): AttitudeSnapshot {
  const wallMissionSec = getMissionSec(elapsedWallSec);
  const period = LOOP_PERIOD_MISSION_SEC;
  const phaseSec =
    wallMissionSec - Math.floor(wallMissionSec / period) * period;

  const pitch =
    12 +
    2.1 * Math.sin(elapsedWallSec * 0.31) +
    0.6 * Math.sin(elapsedWallSec * 0.9);
  const roll =
    -0.4 +
    0.9 * Math.cos(elapsedWallSec * 0.37) +
    0.25 * Math.sin(elapsedWallSec * 1.1);

  const rollDegHorizon = roll * 4;
  const horizonPitchDeg = clamp(pitch * 0.65, -25, 25);

  const vectorVelocityAngle = -12 + (phaseSec / period) * 28;
  const vectorThrustAngle =
    vectorVelocityAngle + 6 * Math.sin(elapsedWallSec * 0.5);

  return {
    horizonPitchDeg,
    rollDegHorizon,
    vectorThrustAngle,
    vectorVelocityAngle,
  };
}
