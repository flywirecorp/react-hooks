import { useReducer } from 'react';

function useToggle(initialState = false) {
  return useReducer(state => !state, initialState);
}

export { useToggle };
