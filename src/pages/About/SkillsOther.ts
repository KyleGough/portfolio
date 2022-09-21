import { Confidence,ISkill } from '../../components/SkillList';
import BashLogo from '../../img/bash.png';
import GitLogo from '../../img/git.png';
import LatexLogo from '../../img/latex.png';
import MarkdownLogo from '../../img/markdown.png';
import SQLLogo from '../../img/sql.png';
import TerminalLogo from '../../img/terminal.png';

export const skillsOther: ISkill[] = [
  {
    name: 'Git',
    progress: 85,
    className: 'w-[85%]',
    description: 'Used in all projects',
    confidence: Confidence.COMFORTABLE,
    logo: GitLogo,
  },
  {
    name: 'Bash',
    progress: 75,
    className: 'w-[75%]',
    description: 'Shell Scripting Exercises, Finding security defects in a VM',
    confidence: Confidence.COMFORTABLE,
    logo: BashLogo,
  },
  {
    name: 'Zsh',
    progress: 85,
    className: 'w-[85%]',
    description: 'Personal Shell of Choice, Everyday use with Manjaro i3',
    confidence: Confidence.COMFORTABLE,
    logo: TerminalLogo,
  },
  {
    name: 'SQL',
    progress: 60,
    className: 'w-[60%]',
    description:
      'Delivery Route Planner, BSplit, Department Store Database Analysis',
    confidence: Confidence.COMFORTABLE,
    logo: SQLLogo,
  },
  {
    name: 'LaTeX',
    progress: 50,
    className: 'w-[50%]',
    description: 'Dissertation, Multiple Group Projects ',
    confidence: Confidence.COMFORTABLE,
    logo: LatexLogo,
  },
  {
    name: 'Markdown',
    progress: 80,
    className: 'w-[80%]',
    description: 'Lecture Notes, GitHub READMEs',
    confidence: Confidence.CONFIDENT,
    logo: MarkdownLogo,
  },
];
