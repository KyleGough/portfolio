import { GoalListItem } from '@components/GoalListItem';
import { Section } from '@components/Section';
import AstroLogo from '@image/skill/astro.svg';
import ESLintLogo from '@image/skill/eslint.svg';
import ActionsLogo from '@image/skill/github-actions.svg';
import GraphQLLogo from '@image/skill/graphql.svg';
import NextLogo from '@image/skill/next.svg';
import RustLogo from '@image/skill/rust.svg';
import ThreeLogo from '@image/skill/three.svg';
import TypeScriptLogo from '@image/skill/typescript.svg';
import ViteLogo from '@image/skill/vite.svg';
import React from 'react';

export const GoalsWidget: React.FC = () => (
  <Section>
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="mb-16 md:mb-4">
        <h2 className="project-header text-center">
          <p className="font-semibold text-6xl">2022</p>
          <p>Learned</p>
        </h2>
        <ul className="w-fit mx-auto">
          <GoalListItem logo={TypeScriptLogo} name="TypeScript" />
          <GoalListItem logo={ESLintLogo} name="ESLint" />
          <GoalListItem logo={ActionsLogo} name="GitHub Actions" />
          <GoalListItem logo={NextLogo} name="Next.js" />
          <GoalListItem name="WebExtensions API" />
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="project-header text-center">
          <p className="font-semibold text-6xl">2023</p>
          <p>Goals</p>
        </h2>
        <ul className="w-fit mx-auto">
          <GoalListItem logo={ThreeLogo} name="Three.js" />
          <GoalListItem logo={RustLogo} name="Rust" />
          <GoalListItem logo={AstroLogo} name="Astro" />
          <GoalListItem logo={GraphQLLogo} name="GraphQL" />
          <GoalListItem logo={ViteLogo} name="Vite" />
        </ul>
      </div>
    </div>
  </Section>
);
