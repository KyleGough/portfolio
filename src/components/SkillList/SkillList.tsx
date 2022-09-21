import React from 'react';

import { ISkill } from './';
import { Skill } from './Skill';

interface SkillListProps {
  skills: ISkill[];
  type: string;
}

export const SkillList: React.FC<SkillListProps> = ({ skills, type }) => (
  <>
    {skills.map((skill) => {
      return (
        <Skill
          key={skill.name}
          type={type}
          name={skill.name}
          progress={skill.progress}
          progressClass={skill.className}
          description={skill.description}
          confidence={skill.confidence}
          logo={skill.logo}
        />
      );
    })}
  </>
);
