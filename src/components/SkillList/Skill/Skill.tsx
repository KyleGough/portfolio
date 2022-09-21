import React, { useEffect,useState } from 'react';

import { useObserveElement } from '../../../hooks/useObserveElement';
import { Confidence } from '../SkillList.types';

interface SkillProps {
  type: string;
  progress: number;
  progressClass: string;
  name: string;
  description: string;
  confidence: Confidence;
  logo: string;
}

export const Skill: React.FC<SkillProps> = ({
  type,
  progress,
  progressClass,
  name,
  description,
  confidence,
  logo,
}) => {
  const [progressRef, isVisible] = useObserveElement<HTMLDivElement>({
    threshold: 0,
  });
  const [animatedIn, setAnimatedIn] = useState(false);
  const durationVar = {
    '--duration-factor': progress,
  } as React.CSSProperties;

  useEffect(() => {
    if (!animatedIn && isVisible) {
      (progressRef.current as HTMLDivElement).classList.replace(
        '-translate-x-full',
        'translate-x-0'
      );
      setAnimatedIn(true);
    }
  }, [progressRef, isVisible, animatedIn]);

  return (
    <div className="flex flex-row justify-center py-4">
      <div className="w-3/12 lg:w-4/12 pt-2">
        <div className={`progress overflow-hidden ${type}`}>
          <div
            ref={progressRef}
            className={`custom-duration progress-bar transition-transform ease-in-out -translate-x-full ${progressClass}`}
            style={durationVar}
          ></div>
        </div>
      </div>
      <div className="w-9/12 lg:w-8/12 ml-6 flex">
        <img
          loading="lazy"
          className={`w-8 h-8 mr-4 transition-opacity duration-500 ${
            animatedIn ? 'opacity-100' : 'opacity-0'
          }`}
          src={logo}
          alt={`${name} logo`}
        />
        <div>
          <p>
            <span className="font-extrabold">{name}</span> -{' '}
            <span className="text-sm">{description}</span>
          </p>
          <p className="text-sm text-link-hover mt-1">{confidence}</p>
        </div>
      </div>
    </div>
  );
};
