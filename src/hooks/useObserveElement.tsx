import { useRef, useState, useEffect, RefObject } from 'react';

export default function useObserveElement<T extends HTMLElement>(options: IntersectionObserverInit): [RefObject<T>, boolean] {
    const elementRef = useRef<T>(null);
    const [isVisible, setVisible] = useState(false);
    
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setVisible(entry.isIntersecting);
        }, options);

        elementRef.current && observer.observe(elementRef.current);

        return () => {
            observer.disconnect()
        }
    }, [elementRef, options])

    return [elementRef, isVisible];
}