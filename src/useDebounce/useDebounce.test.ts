import { renderHook, act } from '@testing-library/react-hooks';
import { useDebounce } from '../index';

// const originalClearTimeout = clearTimeout;

// beforeEach(() => {
//   clearTimeout = jest.fn();
// })

// afterEach(()=>{
//   clearTimeout = originalClearTimeout;
// })

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('holds initial value before delay expires', () => {
    const props = { initialProps: { foo: 'A' } };
    const { result, rerender } = renderHook(v => useDebounce(v, 100), props);

    rerender();
    act(() => {
      jest.advanceTimersByTime(40);
    });
    rerender();
    act(() => {
      jest.advanceTimersByTime(40);
    });

    expect(result.current).toEqual({ foo: 'A' });
  });

  test('last known value is emited after delay expires', () => {
    const props = { initialProps: { foo: 'A' } };
    const { result, rerender } = renderHook(v => useDebounce(v, 100), props);

    rerender({ foo: 'B' });
    act(() => {
      jest.advanceTimersByTime(150);
    });

    expect(result.current).toEqual({ foo: 'B' });
  });

  test('holds last value between delay expirations', () => {
    const props = { initialProps: { foo: 'A' } };
    const { result, rerender } = renderHook(v => useDebounce(v, 100), props);

    rerender({ foo: 'B' });
    expect(result.current).toEqual({ foo: 'A' });

    rerender({ foo: 'C' });
    act(() => {
      jest.advanceTimersByTime(150);
    });

    expect(result.current).toEqual({ foo: 'C' });
  });

  test('when value changes or component is unmounted, it should clear future updates', () => {
    const { result, rerender, unmount } = renderHook(
      value => useDebounce(value, 100),
      { initialProps: { foo: 'A' } },
    );

    rerender({ foo: 'B' });
    unmount();
    act(() => {
      jest.advanceTimersByTime(150);
    });

    // expect(clearTimeout).toHaveBeenCalledTimes(2);
    expect(result.current).toEqual({ foo: 'A' });
  });
});
