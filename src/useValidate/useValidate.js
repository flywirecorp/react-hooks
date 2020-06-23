import { useEffect, useReducer, useRef } from 'react';
import validate from './validate';
import isEqual from 'lodash.isEqual';

export const actionTypes = {
  VALIDATION_SUCCESS: 'VALIDATION_SUCCESS',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
};

function useValidate(data = {}, constraints = {}) {
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

  useEffect(() => {
    if (isEqual(previousInputs.current, [data, constraints])) {
      return;
    }

    const errors = validate.validate(data, constraints);

    if (errors) {
      return dispatch({ type: actionTypes.VALIDATION_ERROR, errors });
    }

    dispatch({ type: actionTypes.VALIDATION_SUCCESS });
  });

  const previousInputs = useRef();

  useEffect(() => {
    previousInputs.current = [data, constraints];
  });

  return state;
}

export default useValidate;
