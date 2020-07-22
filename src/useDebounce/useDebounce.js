import { useEffect, useState } from 'react';

function useDebounce(value, delay) {
  const [nextValue, setNextValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setNextValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return nextValue;
}

export { useDebounce };
