import { useReducer } from 'react';

function useToggle(initialState = false): [boolean, (state: boolean) => void] {
  return useReducer(state => !state, initialState);
}

export default useToggle;
