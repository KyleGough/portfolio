import { ISkill, Confidence } from '../../components/SkillList';
import JavaScriptLogo from '../../img/javascript.png';
import TypeScriptLogo from '../../img/typescript.png';
import ReactLogo from '../../img/react.png';
import TailwindLogo from '../../img/tailwind.png';
import HTMLLogo from '../../img/html.png';
import CSSLogo from '../../img/css.png';
import PHPLogo from '../../img/php.png';

export const skillsWeb: ISkill[] = [
  {
    name: 'JavaScript',
    progress: 90,
    className: 'w-[90%]',
    description: 'Portfolio, LucidLab, Graph Algorithm Visualiser, RSCBot',
    confidence: Confidence.CONFIDENT,
    logo: JavaScriptLogo,
  },
  {
    name: 'TypeScript',
    progress: 70,
    className: 'w-[70%]',
    description: 'Portfolio',
    confidence: Confidence.COMFORTABLE,
    logo: TypeScriptLogo,
  },
  {
    name: 'React',
    progress: 75,
    className: 'w-[75%]',
    description: 'Portfolio, LucidLab, Minesweeper',
    confidence: Confidence.COMFORTABLE,
    logo: ReactLogo,
  },
  {
    name: 'Tailwind',
    progress: 70,
    className: 'w-[70%]',
    description: 'Portfolio',
    confidence: Confidence.COMFORTABLE,
    logo: TailwindLogo,
  },
  {
    name: 'HTML',
    progress: 90,
    className: 'w-[90%]',
    description: 'Portfolio, BSplit, To Do List',
    confidence: Confidence.CONFIDENT,
    logo: HTMLLogo,
  },
  {
    name: 'CSS',
    progress: 90,
    className: 'w-[90%]',
    description: 'Portfolio, LucidLab, BSplit, Minesweeper',
    confidence: Confidence.CONFIDENT,
    logo: CSSLogo,
  },
  {
    name: 'PHP',
    progress: 55,
    className: 'w-[55%]',
    description: 'BSplit, Portfolio',
    confidence: Confidence.COMFORTABLE,
    logo: PHPLogo,
  },
];
