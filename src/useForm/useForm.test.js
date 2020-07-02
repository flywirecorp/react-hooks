import { renderHook, act } from '@testing-library/react-hooks';
import { useForm } from '../index';

describe('useForm', () => {
  it('sets initial values', () => {
    const initialValues = { terms: false };
    const { result } = renderHook(() => useForm(initialValues));

    expect(result.current.values).toEqual(initialValues);
  });

  it('sets the right value', () => {
    const { result } = renderHook(() => useForm());

    act(() => {
      result.current.handleChange('firstName', 'John');
    });

    expect(result.current.values).toEqual({ firstName: 'John' });
    expect(result.current.dirtyFields).toEqual({ firstName: true });
  });
});
