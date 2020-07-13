import { useEffect, useRef, useState } from 'react';

function useThrottle(value, delay, wallclock = 0) {
  const lastTime = useRef(wallclock);
  const [nextValue, setNextValue] = useState(value);

  useEffect(() => {
    const now = Date.now();
    if (now - lastTime.current >= delay) {
      lastTime.current = now;
      setNextValue(value);
    }
  }, [value, delay]);

  return nextValue;
}

export { useThrottle };
