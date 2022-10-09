import { ISkill } from '../../components/SkillList';
import BashLogo from '../../img/bash.svg';
import GitLogo from '../../img/git.svg';
import ManjaroLogo from '../../img/manjaro.svg';
import MarkdownLogo from '../../img/markdown.svg';

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
    description: 'Daily use, All projects',
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
    name: 'Manjaro',
    progress: 75,
    className: 'w-[75%]',
    description: 'Daily use',
    logo: ManjaroLogo,
  }
];
