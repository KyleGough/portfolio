import { useEffect, useState, useRef, RefObject } from "react";

export default function useOnScreen(ref: RefObject<HTMLElement>) {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const [isOnScreen, setIsOnScreen] = useState<boolean>(false);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(([entry]) =>
            setIsOnScreen(entry.isIntersecting)
        );
    }, []);

    useEffect(() => {
        (observerRef.current as IntersectionObserver).observe(ref.current as Element);

        return () => {
            (observerRef.current as IntersectionObserver).disconnect();
        };
    }, [ref]);

    return isOnScreen;
}