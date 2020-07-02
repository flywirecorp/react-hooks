import { useState } from 'react';

function useForm(initialValues = {}) {
  const [state, setState] = useState({
    values: initialValues,
    dirtyFields: {},
  });

  function handleChange(name, value) {
    setState({
      ...state,
      values: { ...state.values, [name]: value },
      dirtyFields: { ...state.dirtyFields, [name]: true },
    });
  }

  return { ...state, handleChange };
}

export { useForm };
