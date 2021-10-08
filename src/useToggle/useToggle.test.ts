import { renderHook, act } from '@testing-library/react-hooks';
import { useToggle } from '../index';

describe('useToggle', () => {
  test('returns a default state', () => {
    const { result } = renderHook(() => useToggle());
    const [on] = result.current;

    expect(on).toBe(false);
  });

  test('sets the initial state', () => {
    const { result } = renderHook(() => useToggle(true));
    const [on] = result.current;

    expect(on).toBe(true);
  });

  test('changes the state', () => {
    const { result } = renderHook(() => useToggle());
    const [, toggle] = result.current;

    act(() => {
      toggle(true);
    });

    const [on] = result.current;
    expect(on).toBe(true);
  });
});
