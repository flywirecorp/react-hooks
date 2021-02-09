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

  function updateAll(newFields = {}) {
    setState({
      ...state,
      values: { ...state.values, ...newFields },
      dirtyFields: {
        ...state.dirtyFields,
        ...Object.keys(newFields).reduce((acc, item) => {
          acc[item] = true;
          return acc;
        }, {}),
      },
    });
  }

  return { ...state, update, updateAll };
}

export { useFormState };
