import React from 'react';
import { Skill } from 'utilities/types';

import { SkillItem } from './SkillItem';

interface SkillListProps {
  skills: Skill[];
  type: string;
}

export const SkillList: React.FC<SkillListProps> = ({ skills, type }) => (
  <>
    {skills.map((skill) => {
      return (
        <SkillItem
          key={skill.name}
          type={type}
          name={skill.name}
          progress={skill.progress}
          progressClass={skill.className}
          description={skill.description}
          logo={skill.logo}
        />
      );
    })}
  </>
);
