import CSSLogo from '@image/skill/css.svg';
import HTMLLogo from '@image/skill/html.svg';
import JavaScriptLogo from '@image/skill/javascript.svg';
import ReactLogo from '@image/skill/react.svg';
import TailwindLogo from '@image/skill/tailwind.svg';
import TypeScriptLogo from '@image/skill/typescript.svg';
import { Skill } from '@utilities/types';

export const skillsWeb: Skill[] = [
  {
    name: 'JavaScript',
    progress: 85,
    className: 'w-[85%]',
    description: 'LucidLab, Graph Algorithm Visualiser, RSCBot',
    logo: JavaScriptLogo,
  },
  {
    name: 'TypeScript',
    progress: 75,
    className: 'w-[75%]',
    description: 'Atom, Portfolio',
    logo: TypeScriptLogo,
  },
  {
    name: 'React',
    progress: 75,
    className: 'w-[75%]',
    description: 'Atom, Portfolio, LucidLab, Minesweeper',
    logo: ReactLogo,
  },
  {
    name: 'Tailwind',
    progress: 80,
    className: 'w-[80%]',
    description: 'Portfolio',
    logo: TailwindLogo,
  },
  {
    name: 'HTML',
    progress: 90,
    className: 'w-[90%]',
    description: 'Portfolio, BSplit, To Do List',
    logo: HTMLLogo,
  },
  {
    name: 'CSS',
    progress: 85,
    className: 'w-[85%]',
    description: 'Atom, Portfolio, LucidLab, BSplit',
    logo: CSSLogo,
  },
];
