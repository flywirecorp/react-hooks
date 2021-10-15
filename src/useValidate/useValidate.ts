import { useEffect, useReducer, useRef } from 'react';
import validate from './validate';
import isEqual from 'lodash.isEqual';

function noop() {
  // do nothin
}

export enum actionTypes {
  VALIDATION_SUCCESS = 'VALIDATION_SUCCESS',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
}

type Errors = {
  [key: string]: string[];
};

type Data = {
  [key: string]: string | boolean | null;
};

type Constraints = {
  [key: string]: { [key: string]: unknown };
};

type Options = {
  onError?: (errors: Errors) => void;
  onSuccess?: () => void;
};

type State = {
  errors: Errors;
  isValid: boolean;
};

type Action =
  | { type: actionTypes.VALIDATION_SUCCESS }
  | { type: actionTypes.VALIDATION_ERROR; errors: Errors };

function useValidate(
  data: Data = {},
  constraints: Constraints = {},
  { onError = noop, onSuccess = noop }: Options = {},
) {
  const [state, dispatch] = useReducer(
    (state: State, action: Action) => {
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

  const previousInputs = useRef<[Data, Constraints]>();

  useEffect(() => {
    previousInputs.current = [data, constraints];
  });

  return { ...state, validate: perform };
}

export default useValidate;
