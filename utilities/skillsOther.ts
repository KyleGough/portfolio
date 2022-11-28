import { Skill } from '@utilities/types';
import BashLogo from 'public/img/skill/bash.svg';
import GitLogo from 'public/img/skill/git.svg';
import ManjaroLogo from 'public/img/skill/manjaro.svg';
import MarkdownLogo from 'public/img/skill/markdown.svg';

export const skillsOther: Skill[] = [
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
  },
];
