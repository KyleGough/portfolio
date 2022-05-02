import { ReactNode, useState, useEffect } from 'react';
import useObserveElement from '../hooks/useObserveElement';

export default function FadeInWrapper(props: { children: ReactNode }) {
    const [elementRef, isVisible] = useObserveElement<HTMLDivElement>({
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    });
    const [show, setShow] = useState(false);

    useEffect(() => {
        isVisible && setShow(true);
    }, [isVisible]);

    return (
        <div ref={elementRef} className={`${show ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
            {props.children}
        </div>
    );
}