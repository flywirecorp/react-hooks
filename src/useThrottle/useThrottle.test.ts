import { renderHook } from '@testing-library/react-hooks';
import { useThrottle } from '../index';

describe('useThrottle', () => {
  let wallclock = 0;

  beforeEach(() => {
    jest.spyOn(Date, 'now').mockImplementation(() => ++wallclock);
  });

  test('initial call holds initial value instance', () => {
    const value = { foo: 42 };
    const { result } = renderHook(() => useThrottle(value, 1));

    expect(result.current).toBe(value);
  });

  test('returns same instance when delay is active', () => {
    let value = { foo: 'A' };
    const { result, rerender } = renderHook(() =>
      useThrottle(value, wallclock * 2, wallclock),
    );

    value = { foo: 'B' };
    rerender();

    expect(result.current).toEqual({ foo: 'A' });
  });

  test('returns next instance when delay expired', () => {
    let value = { foo: 'A' };
    const { result, rerender } = renderHook(() => useThrottle(value, 1));

    value = { foo: 'B' };
    rerender();
    rerender();

    expect(result.current).toEqual({ foo: 'B' });
  });
});
