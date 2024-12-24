import CSSLogo from '@image/skill/css.svg';
import HTMLLogo from '@image/skill/html.svg';
import JavaScriptLogo from '@image/skill/javascript.svg';
import JestLogo from '@image/skill/jest.svg';
import ReactLogo from '@image/skill/react.svg';
import TailwindLogo from '@image/skill/tailwind.svg';
import ThreeLogo from '@image/skill/three.svg';
import TypeScriptLogo from '@image/skill/typescript.svg';
import { Skill } from '@utilities/types';

export const skillsWeb: Skill[] = [
  {
    name: 'TypeScript',
    description: 'Atom, Portfolio, AI Space Telescope',
    logo: TypeScriptLogo,
  },
  {
    name: 'JavaScript',
    description: 'LucidLab, Graph Algorithm Visualiser, RSCBot',
    logo: JavaScriptLogo,
  },
  {
    name: 'React',
    description: 'Atom, Portfolio, AI Space Telescope, LucidLab',
    logo: ReactLogo,
  },
  {
    name: 'Tailwind',
    description: 'Portfolio, AI Space Telescope',
    logo: TailwindLogo,
  },
  {
    name: 'HTML',
    description: 'Portfolio, BSplit, To Do List',
    logo: HTMLLogo,
  },
  {
    name: 'CSS',
    description: 'Atom, Portfolio, LucidLab, BSplit',
    logo: CSSLogo,
  },
  {
    name: 'Jest',
    description: 'Portfolio, Atom',
    logo: JestLogo,
  },
  {
    name: 'Three.js',
    description: 'Solar System Model',
    logo: ThreeLogo,
  },
];
