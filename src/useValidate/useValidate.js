import { useEffect, useReducer, useRef } from 'react';
import { validate } from './validate';
import isEqual from 'lodash.isEqual';

const NOOP = () => {};
export const actionTypes = {
  VALIDATION_SUCCESS: 'VALIDATION_SUCCESS',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
};

function useValidate(
  data = {},
  constraints = {},
  { onError = NOOP, onSuccess = NOOP } = {},
) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case actionTypes.VALIDATION_SUCCESS:
          return { ...state, errors: {}, isValid: true };
        case actionTypes.VALIDATION_ERROR:
          return { ...state, errors: action.errors, isValid: false };
        default:
          return state;
      }
    },
    {
      errors: {},
      isValid: false,
    },
  );

  function perform() {
    const errors = validate.validate(data, constraints);

    if (errors) {
      dispatch({ type: actionTypes.VALIDATION_ERROR, errors });
      onError(errors);
      return false;
    }

    dispatch({ type: actionTypes.VALIDATION_SUCCESS });
    onSuccess();
    return true;
  }

  useEffect(() => {
    if (isEqual(previousInputs.current, [data, constraints])) {
      return;
    }

    perform();
  });

  const previousInputs = useRef();

  useEffect(() => {
    previousInputs.current = [data, constraints];
  });

  return { ...state, validate: perform };
}

export { useValidate };
