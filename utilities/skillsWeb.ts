import { Skill } from '@utilities/types';
import CSSLogo from 'public/img/skill/css.svg';
import HTMLLogo from 'public/img/skill/html.svg';
import JavaScriptLogo from 'public/img/skill/javascript.svg';
import ReactLogo from 'public/img/skill/react.svg';
import TailwindLogo from 'public/img/skill/tailwind.svg';
import TypeScriptLogo from 'public/img/skill/typescript.svg';

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
    progress: 75,
    className: 'w-[75%]',
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
