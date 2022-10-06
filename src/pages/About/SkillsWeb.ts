import { ISkill } from '../../components/SkillList';
import CSSLogo from '../../img/css.svg';
import HTMLLogo from '../../img/html.svg';
import JavaScriptLogo from '../../img/javascript.svg';
import PHPLogo from '../../img/php.png';
import ReactLogo from '../../img/react.svg';
import TailwindLogo from '../../img/tailwind.svg';
import TypeScriptLogo from '../../img/typescript.svg';

export const skillsWeb: ISkill[] = [
  {
    name: 'JavaScript',
    progress: 90,
    className: 'w-[90%]',
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
    progress: 90,
    className: 'w-[90%]',
    description: 'Atom, Portfolio, LucidLab, BSplit',
    logo: CSSLogo,
  },
  {
    name: 'PHP',
    progress: 50,
    className: 'w-[50%]',
    description: 'BSplit, To Do List',
    logo: PHPLogo,
  },
];
