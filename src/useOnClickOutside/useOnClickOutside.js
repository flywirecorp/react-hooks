import { useEffect, useCallback } from 'react';

const useOnClickOutside = (ref, callback) => {
  const handler = useCallback(
    evt => {
      const hasReferencedElement = ref && ref.current;
      if (!hasReferencedElement) return;

      const hasClickedOutside = !ref.current.contains(evt.target);
      if (hasClickedOutside) callback();
    },
    [ref, callback],
  );

  useEffect(() => {
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [handler]);
};

export default useOnClickOutside;
