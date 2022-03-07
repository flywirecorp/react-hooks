import { renderHook, act } from '@testing-library/react-hooks';
import useIdleTimer from '.';

describe('Idle', () => {
  const INTERVAL = 1000;
  const TIMEOUT = 2000;

  beforeEach(() => {
    jest.useFakeTimers();
  });

  function tick() {
    jest.advanceTimersByTime(INTERVAL);
  }

  test('countdown', () => {
    const { result } = renderHook(() =>
      useIdleTimer({ timeout: TIMEOUT, interval: INTERVAL }),
    );

    act(tick);

    expect(result.current.timeleft).toEqual(1000);
    expect(result.current.idle).toBe(false);

    act(tick);

    expect(result.current.timeleft).toEqual(0);
    expect(result.current.idle).toBe(true);
  });

  test('reset the timer', () => {
    const { result } = renderHook(() =>
      useIdleTimer({ timeout: TIMEOUT, interval: INTERVAL }),
    );

    act(tick);
    act(result.current.reset);

    expect(result.current.timeleft).toBe(TIMEOUT);
  });
});
