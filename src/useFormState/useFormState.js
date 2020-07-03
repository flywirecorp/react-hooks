import { useState } from 'react';

function useFormState(initialValues = {}) {
  const [state, setState] = useState({
    values: initialValues,
    dirtyFields: {},
  });

  function update(name, value) {
    setState({
      ...state,
      values: { ...state.values, [name]: value },
      dirtyFields: { ...state.dirtyFields, [name]: true },
    });
  }

  return { ...state, update };
}

export { useFormState };
