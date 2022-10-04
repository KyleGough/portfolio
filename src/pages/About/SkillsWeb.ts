import { ISkill } from '../../components/SkillList';
import CSSLogo from '../../img/css.png';
import HTMLLogo from '../../img/html.png';
import JavaScriptLogo from '../../img/javascript.png';
import PHPLogo from '../../img/php.png';
import ReactLogo from '../../img/react.png';
import TailwindLogo from '../../img/tailwind.png';
import TypeScriptLogo from '../../img/typescript.png';

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
    description: 'BSplit, Portfolio',
    logo: PHPLogo,
  },
];
