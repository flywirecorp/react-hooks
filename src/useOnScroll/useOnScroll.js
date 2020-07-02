import { useEffect } from 'react';

const useOnScroll = callback => {
  useEffect(() => {
    document.addEventListener('scroll', callback);

    return () => {
      document.removeEventListener('scroll', callback);
    };
  }, [callback]);
};

export { useOnScroll };
