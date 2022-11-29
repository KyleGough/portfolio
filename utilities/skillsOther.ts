import BashLogo from '@image/skill/bash.svg';
import GitLogo from '@image/skill/git.svg';
import ManjaroLogo from '@image/skill/manjaro.svg';
import MarkdownLogo from '@image/skill/markdown.svg';
import { Skill } from '@utilities/types';

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
