import { useState, useEffect, useCallback, useMemo } from 'react';

const ONE_SECOND_IN_MS = 1000;
const THIRTY_MINUTES_IN_MS = 30 * 60 * 1000;

function useIdleTimer({
  events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'],
  interval = ONE_SECOND_IN_MS,
  timeout = THIRTY_MINUTES_IN_MS,
} = {}) {
  const [timeleft, setTimeleft] = useState(timeout);
  const [idle, setIdle] = useState(false);

  const tick = () => {
    if (idle) {
      return;
    }

    const remaining = timeleft - interval;
    setTimeleft(remaining <= 0 ? 0 : remaining);
    setIdle(remaining <= 0);
  };

  const reset = useCallback(() => {
    if (idle) {
      return;
    }

    setTimeleft(timeout);
    setIdle(false);
  }, [timeout, idle]);

  useEffect(() => {
    if (timeout <= 0) {
      return;
    }

    events.forEach(evt => window.addEventListener(evt, reset));
    const countdown = setInterval(tick, interval);

    return () => {
      events.forEach(evt => window.removeEventListener(evt, reset));
      clearInterval(countdown);
    };
  });

  const stateAndHelpers = useMemo(
    () => ({
      idle,
      reset,
      timeleft,
    }),
    [idle, reset, timeleft],
  );

  return stateAndHelpers;
}

export default useIdleTimer;
