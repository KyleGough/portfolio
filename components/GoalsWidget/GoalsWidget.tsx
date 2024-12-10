import { GoalListItem } from '@components/GoalListItem';
import { Section } from '@components/Section';
import ActionsLogo from '@image/skill/github-actions.svg';
import ThreeLogo from '@image/skill/three.svg';
import TypeScriptLogo from '@image/skill/typescript.svg';
import { StaticImageData } from 'next/image';
import React from 'react';

export const GoalsWidget: React.FC = () => (
  <Section>
    <div className="mb-16 md:mb-4">
      <h2 className="project-header text-center">
        <p className="font-semibold text-6xl">2025</p>
        <p>Focus</p>
      </h2>
      <ul className="w-fit mx-auto">
        <GoalListItem logo={ThreeLogo as StaticImageData} name="Three.js" />
        <GoalListItem
          logo={TypeScriptLogo as StaticImageData}
          name="TypeScript"
        />
        <GoalListItem
          logo={ActionsLogo as StaticImageData}
          name="GitHub Actions"
        />
      </ul>
    </div>
  </Section>
);
