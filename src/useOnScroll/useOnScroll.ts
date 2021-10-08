import { useEffect } from 'react';

const useOnScroll = (callback: () => void) => {
  useEffect(() => {
    document.addEventListener('scroll', callback);

    return () => {
      document.removeEventListener('scroll', callback);
    };
  }, [callback]);
};

export default useOnScroll;
