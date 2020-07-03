import { renderHook, act } from '@testing-library/react-hooks';
import { useFormState } from '../index';

describe('useFormState', () => {
  it('sets initial values', () => {
    const initialValues = { terms: false };
    const { result } = renderHook(() => useFormState(initialValues));

    expect(result.current.values).toEqual(initialValues);
  });

  it('sets the right value', () => {
    const { result } = renderHook(() => useFormState());

    act(() => {
      result.current.update('firstName', 'John');
    });

    expect(result.current.values).toEqual({ firstName: 'John' });
    expect(result.current.dirtyFields).toEqual({ firstName: true });
  });
});
