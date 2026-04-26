import React from 'react';

/**
 * Normalized viewBox 0–100 (×) × 0–100 (y). Trunk at x=50; branches alternate
 * toward role cards. Animated with pathLength for reliable dash drawing.
 */
export const TimelineTreeGraphic: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    aria-hidden
    focusable="false"
  >
    {/* Central trunk */}
    <path className="work-timeline__tree-trunk" pathLength="1" d="M 50 3 L 50 97" />
    {/* Four rows ≈ 25% each; twigs suggest sub-branching */}
    <path
      className="work-timeline__tree-branch work-timeline__tree-branch--1"
      pathLength="1"
      d="M 50 12.5 L 22 12.5 M 22 12.5 l -4.5 -3.5 M 22 12.5 l -4.5 3.5"
    />
    <path
      className="work-timeline__tree-branch work-timeline__tree-branch--2"
      pathLength="1"
      d="M 50 37.5 L 78 37.5 M 78 37.5 l 4.5 -3.5 M 78 37.5 l 4.5 3.5"
    />
    <path
      className="work-timeline__tree-branch work-timeline__tree-branch--3"
      pathLength="1"
      d="M 50 62.5 L 22 62.5 M 22 62.5 l -4.5 -3.5 M 22 62.5 l -4.5 3.5"
    />
    <path
      className="work-timeline__tree-branch work-timeline__tree-branch--4"
      pathLength="1"
      d="M 50 87.5 L 78 87.5 M 78 87.5 l 4.5 -3.5 M 78 87.5 l 4.5 3.5"
    />
  </svg>
);
