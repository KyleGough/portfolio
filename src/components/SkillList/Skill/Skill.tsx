import React, { useState, useEffect } from 'react';
import useObserveElement from '../../../hooks/useObserveElement';

interface SkillProps {
  type: string;
  progress: number;
  progressClass: string;
  title: string;
  description: string;
  comment: string;
  logo?: string;
}

export const Skill: React.FC<SkillProps> = ({
  type,
  progress,
  progressClass,
  title,
  description,
  comment,
  logo,
}) => {
  const [progressRef, isVisible] = useObserveElement<HTMLDivElement>({
    root: null,
    rootMargin: '0px',
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
          alt={`${title} logo`}
        />
        <div>
          <p>
            <span className="font-extrabold">{title}</span> -{' '}
            <span className="text-sm">{description}</span>
          </p>
          <p className="text-sm text-link-hover mt-1">{comment}</p>
        </div>
      </div>
    </div>
  );
};
