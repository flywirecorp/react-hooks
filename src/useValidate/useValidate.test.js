import { renderHook } from '@testing-library/react-hooks';
import { useValidate } from '../index';

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
    const onErrorMock = jest.fn();

    const { result } = renderHook(() =>
      useValidate(data, constraints, { onError: onErrorMock }),
    );

    expect(result.current.isValid).toEqual(false);
    expect(result.current.errors).toEqual({ terms: ["Terms can't be blank"] });
    expect(onErrorMock).toHaveBeenCalledTimes(1);
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
    const onSuccessMock = jest.fn();

    const { result } = renderHook(() =>
      useValidate(data, constraints, { onSuccess: onSuccessMock }),
    );

    expect(result.current.isValid).toEqual(true);
    expect(result.current.errors).toEqual({});
    expect(onSuccessMock).toHaveBeenCalledTimes(1);
  });
});
