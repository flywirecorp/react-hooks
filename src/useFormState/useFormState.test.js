import { renderHook, act } from '@testing-library/react-hooks';
import { useFormState } from '../index';

describe('useFormState', () => {
  test('sets initial values', () => {
    const initialValues = { terms: false };
    const { result } = renderHook(() => useFormState(initialValues));

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.dirtyFields).toEqual({});
  });

  test('sets the right value', () => {
    const { result } = renderHook(() => useFormState());

    act(() => {
      result.current.update('firstName', 'John');
    });

    expect(result.current.values).toEqual({ firstName: 'John' });
    expect(result.current.dirtyFields).toEqual({ firstName: true });
  });

  test('sets the right values', () => {
    const initialValues = { terms: false };
    const { result } = renderHook(() => useFormState(initialValues));

    act(() => {
      result.current.updateAll({ firstName: 'John', lastName: 'Wrick' });
    });

    expect(result.current.values).toEqual({
      terms: false,
      firstName: 'John',
      lastName: 'Wrick',
    });

    expect(result.current.dirtyFields).toEqual({
      firstName: true,
      lastName: true,
    });
  });

  test('reset', function () {
    const initialValues = { terms: false };
    const { result } = renderHook(() => useFormState(initialValues));

    act(() => {
      result.current.reset();
    });

    expect(result.current.values).toEqual({ terms: false });
    expect(result.current.dirtyFields).toEqual({});

    act(() => {
      result.current.reset({});
    });

    expect(result.current.values).toEqual({});
    expect(result.current.dirtyFields).toEqual({});
  });
});
