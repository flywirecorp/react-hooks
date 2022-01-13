import { renderHook, act } from '@testing-library/react-hooks';
import { useLocalStorageState } from '../index';

afterEach(() => window.localStorage.clear());

test('saves the state to localStorage on update', () => {
  const { result } = renderHook(() => useLocalStorageState('hello', 'value'));
  const [, setState] = result.current;

  act(() => {
    setState('another value');
  });

  expect(result.current[0]).toBe('another value');
  expect(window.localStorage.getItem('hello')).toBe(
    JSON.stringify('another value'),
  );
});

describe('when a value is already present in the localStorage', () => {
  beforeEach(() =>
    window.localStorage.setItem('hello', JSON.stringify('stored value')),
  );

  test('returns the stored value', () => {
    const { result } = renderHook(() => useLocalStorageState('hello'));
    const [state] = result.current;

    expect(state).toBe('stored value');
    expect(window.localStorage.getItem('hello')).toBe(
      JSON.stringify('stored value'),
    );
  });
});

describe('when  passing a function as a defaultValue', () => {
  test('returns the value', () => {
    const { result } = renderHook(() =>
      useLocalStorageState('key', () => 'key value'),
    );
    const [state] = result.current;

    expect(state).toBe('key value');
  });
});

describe('when  passing a value as a defaultValue', () => {
  test('returns the value', () => {
    const { result } = renderHook(() => useLocalStorageState('key', 3));
    const [state] = result.current;

    expect(state).toBe(3);
  });
});

describe('when deserializing causes an error', () => {
  test('handles it and removes the element', () => {
    JSON.stringify = jest.fn().mockImplementationOnce(() => {
      throw new Error('Error deserializing');
    });

    renderHook(() => useLocalStorageState('key', 'key value'));

    expect(window.localStorage.getItem('key')).toBe(null);
  });
});

describe('when changing the key in runtime', () => {
  test('deletes the item of previous key', () => {
    const { result, rerender } = renderHook(
      ({ key }) => useLocalStorageState(key, 'initialValue'),
      {
        initialProps: { key: 'key' },
      },
    );
    const [, setState] = result.current;

    rerender({ key: 'another key' });

    act(() => {
      setState('another value');
    });

    expect(window.localStorage.getItem('key')).toBe(null);
    expect(result.current[0]).toBe('another value');
  });
});
