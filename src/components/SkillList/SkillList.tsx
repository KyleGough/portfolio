import React from 'react';
import { Skill } from './Skill';

// TODO
interface SkillListProps {
  skills: [string, number, string, string, string, string][];
  type: string;
}

export const SkillList: React.FC<SkillListProps> = ({ skills, type }) => (
  <>
    {skills.map((skill) => {
      return (
        <Skill
          key={skill[0]}
          type={type}
          title={skill[0]}
          progress={skill[1]}
          progressClass={skill[2]}
          description={skill[3]}
          comment={skill[4]}
          logo={skill[5]}
        />
      );
    })}
  </>
);
