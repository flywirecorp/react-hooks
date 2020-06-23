import { renderHook } from '@testing-library/react-hooks';
import useValidate from './useValidate';

describe('useValidate', () => {
  it('returns errors when invalid data', () => {
    const data = {};
    const constraints = {
      terms: {
        presence: true,
        inclusion: {
          within: [true],
        },
      },
    };

    const { result } = renderHook(() => useValidate(data, constraints));

    expect(result.current.isValid).toEqual(false);
    expect(result.current.errors).toEqual({ terms: ["Terms can't be blank"] });
  });

  it('returns no errors when valid data', () => {
    const data = { terms: true };
    const constraints = {
      terms: {
        presence: true,
        inclusion: {
          within: [true],
        },
      },
    };

    const { result } = renderHook(() => useValidate(data, constraints));

    expect(result.current.isValid).toEqual(true);
    expect(result.current.errors).toEqual({});
  });
});
