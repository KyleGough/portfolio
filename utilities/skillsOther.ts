import BashLogo from '@image/skill/bash.svg';
import GitLogo from '@image/skill/git.svg';
import ManjaroLogo from '@image/skill/manjaro.svg';
import MarkdownLogo from '@image/skill/markdown.svg';
import { Skill } from '@utilities/types';

export const skillsOther: Skill[] = [
  {
    name: 'Git',
    description: 'All projects',
    logo: GitLogo,
  },
  {
    name: 'Bash / Zsh',
    description: 'Daily use, All projects',
    logo: BashLogo,
  },
  {
    name: 'Markdown',
    description: 'GitHub READMEs, Lecture Notes',
    logo: MarkdownLogo,
  },
  {
    name: 'Manjaro',
    description: 'Daily use',
    logo: ManjaroLogo,
  },
];
