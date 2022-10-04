import { clsx } from 'clsx';
import React, { useEffect, useState } from 'react';

import { useObserveElement } from '../../hooks/useObserveElement';

interface FadeInProps {
  className?: string;
  children: React.ReactNode;
}

export const FadeIn: React.FC<FadeInProps> = ({ className, children }) => {
  const [elementRef, isVisible] = useObserveElement<HTMLDivElement>({
    threshold: 0.5,
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    isVisible && setShow(true);
  }, [isVisible]);

  return (
    <div
      ref={elementRef}
      className={clsx(
        className,
        { 'opacity-100': show },
        { 'opacity-0': !show },
        'transition-opacity duration-1000'
      )}
    >
      {children}
    </div>
  );
};
