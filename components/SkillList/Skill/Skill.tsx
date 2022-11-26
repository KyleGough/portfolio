import { clsx } from 'clsx';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { useObserveElement } from '../../../hooks/useObserveElement';

interface SkillProps {
  type: string;
  progress: number;
  progressClass: string;
  name: string;
  description: string;
  logo: string;
}

export const Skill: React.FC<SkillProps> = ({
  type,
  progress,
  progressClass,
  name,
  description,
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
    <div className="flex flex-row justify-center py-6">
      <div className="w-3/12 lg:w-4/12 flex items-center">
        <div className={clsx(type, 'progress overflow-hidden')}>
          <div
            ref={progressRef}
            className={clsx(
              progressClass,
              'custom-duration progress-bar',
              'transition-transform ease-in-out -translate-x-full'
            )}
            style={durationVar}
          ></div>
        </div>
      </div>
      <div className="w-9/12 lg:w-8/12 ml-6 flex items-center">
        <div
          className={clsx(
            { 'opacity-100': animatedIn },
            { 'opacity-0': !animatedIn },
            'mr-4 w-8 h-8 transition-opacity duration-500'
          )}
        >
          <Image src={logo} alt={`${name} logo`} width={30} height={30} />
        </div>
        <div>
          <p>
            <span className="font-extrabold text-lg">{name}</span> -{' '}
            <span className="text-sm">{description}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
