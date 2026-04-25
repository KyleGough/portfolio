import { RefObject, useCallback, useEffect, useRef } from 'react';

export function useTypewriter<T extends HTMLElement>(
  text: string,
  delay: number,
  startDelay: number
) {
  const typewriterRef = useRef<T>(null);

  const typewrite = useCallback(
    (txt: string, ref: RefObject<T>) => {
      if (!ref.current || !txt) {
        return;
      }
      ref.current.innerHTML = ref.current.innerHTML + txt[0];
      setTimeout(() => typewrite(txt.slice(1), ref), delay);
    },
    [delay]
  );

  useEffect(() => {
    if (typewriterRef.current) {
      typewriterRef.current.innerHTML = '';
      setTimeout(() => {
        typewrite(text, typewriterRef);
      }, startDelay);
    }
  }, [startDelay, text, typewrite]);

  return typewriterRef;
}
