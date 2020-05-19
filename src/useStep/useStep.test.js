import { renderHook, act } from '@testing-library/react-hooks';
import useStep from './useStep';

describe('useStep', () => {
  const steps = [{ id: 'first' }, { id: 'second' }];

  test('returns first step as default', () => {
    const { result } = renderHook(() => useStep({ steps }));

    expect(result.current.step).toEqual({ id: 'first' });
  });

  test('initializes initial step', () => {
    const initialStep = 1;
    const { result } = renderHook(() => useStep({ steps, initialStep }));

    expect(result.current.step).toEqual({ id: 'second' });
  });

  test('returns current step index', () => {
    const initialStep = 1;
    const { result } = renderHook(() => useStep({ steps, initialStep }));

    expect(result.current.index).toEqual(initialStep);
  });

  test('moves to the next step', () => {
    const { result } = renderHook(() => useStep({ steps }));

    act(() => {
      result.current.navigation.next();
    });

    expect(result.current.index).toEqual(1);
  });

  test('returns last step if index greater than steps length', () => {
    const initialStep = 1;
    const { result } = renderHook(() => useStep({ steps, initialStep }));

    act(() => {
      result.current.navigation.next();
    });

    expect(result.current.index).toEqual(1);
  });

  test('moves to the prev step', () => {
    const initialStep = 1;
    const { result } = renderHook(() => useStep({ steps, initialStep }));

    act(() => {
      result.current.navigation.prev();
    });

    expect(result.current.index).toEqual(0);
  });

  test('returns first step if index less than zero', () => {
    const { result } = renderHook(() => useStep({ steps }));

    act(() => {
      result.current.navigation.prev();
    });

    expect(result.current.index).toEqual(0);
  });

  test('moves to a concrete step by index', () => {
    const { result } = renderHook(() => useStep({ steps }));

    act(() => {
      result.current.navigation.go(1);
    });

    expect(result.current.index).toEqual(1);
  });

  test('moves to a concrete step by id', () => {
    const { result } = renderHook(() => useStep({ steps }));

    act(() => {
      result.current.navigation.go('second');
    });

    expect(result.current.index).toEqual(1);
  });

  test('sets a step as completed', () => {
    const { result } = renderHook(() => useStep({ steps }));

    act(() => {
      result.current.complete('first');
    });

    act(() => {
      result.current.complete('first');
    });

    expect(result.current.completed).toEqual(['first']);
  });

  test('sets a step as uncompleted', () => {
    const { result } = renderHook(() => useStep({ steps }));

    act(() => {
      result.current.complete('first');
    });

    act(() => {
      result.current.complete('second');
    });

    act(() => {
      result.current.uncomplete('first');
    });

    expect(result.current.completed).toEqual(['second']);
  });
});
