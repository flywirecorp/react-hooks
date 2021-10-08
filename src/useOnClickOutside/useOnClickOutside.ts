import { MutableRefObject } from 'react';
import { useEffect, useCallback } from 'react';

const useOnClickOutside = (
  ref: MutableRefObject<HTMLElement | undefined | null>,
  callback: () => void,
) => {
  const handler = useCallback(
    evt => {
      if (ref && ref.current && !ref.current.contains(evt.target)) {
        callback();
      }
    },
    [ref, callback],
  );

  useEffect(() => {
    document.addEventListener('click', handler);
    document.addEventListener('ontouchstart', handler);

    return () => {
      document.removeEventListener('click', handler);
      document.removeEventListener('ontouchstart', handler);
    };
  }, [handler]);
};

export default useOnClickOutside;
