import { Skill } from '@utilities/types';
import React from 'react';

import { SkillItem } from './SkillItem';

interface SkillListProps {
  skills: Skill[];
  className?: string;
}

export const SkillList: React.FC<SkillListProps> = ({ skills, className }) => (
  <ul className="grid xl:grid-cols-2">
    {skills.map((skill) => {
      return (
        <SkillItem
          key={skill.name}
          name={skill.name}
          description={skill.description}
          logo={skill.logo}
          className={className}
        />
      );
    })}
  </ul>
);
