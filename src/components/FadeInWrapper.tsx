import { ReactNode } from 'react';
import useObserveElement from '../hooks/useObserveElement';

export default function FadeInWrapper(props: { children: ReactNode }) {
    const [elementRef, isVisible] = useObserveElement<HTMLDivElement>({
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    });    

    return (
        <div ref={elementRef} className={`${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
            {props.children}
        </div>
    );
}