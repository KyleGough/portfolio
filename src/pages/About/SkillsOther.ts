import { ISkill } from '../../components/SkillList';
import BashLogo from '../../img/bash.png';
import GitLogo from '../../img/git.png';
import LatexLogo from '../../img/latex.png';
import MarkdownLogo from '../../img/markdown.png';
import SQLLogo from '../../img/sql.png';

export const skillsOther: ISkill[] = [
  {
    name: 'Git',
    progress: 85,
    className: 'w-[85%]',
    description: 'All projects',
    logo: GitLogo,
  },
  {
    name: 'Bash / Zsh',
    progress: 75,
    className: 'w-[75%]',
    description: 'Shell Scripting Exercises, Finding security defects in a VM',
    logo: BashLogo,
  },
  {
    name: 'Markdown',
    progress: 90,
    className: 'w-[90%]',
    description: 'GitHub READMEs, Lecture Notes',
    logo: MarkdownLogo,
  },
  {
    name: 'SQL',
    progress: 50,
    className: 'w-[50%]',
    description: 'Delivery Route Planner, BSplit',
    logo: SQLLogo,
  },
  {
    name: 'LaTeX',
    progress: 40,
    className: 'w-[40%]',
    description: 'Dissertation, LucidLab',
    logo: LatexLogo,
  }
];
