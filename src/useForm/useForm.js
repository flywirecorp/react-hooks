import { useState, useCallback } from 'react';

function useForm(initialValues = {}) {
  const [state, setState] = useState({
    values: initialValues,
    dirtyFields: {},
  });

  const handleChange = useCallback((name, value) => {
    setState(state => ({
      ...state,
      values: { ...state.values, [name]: value },
      dirtyFields: { ...state.dirtyFields, [name]: true },
    }));
  }, []);

  return { ...state, handleChange };
}

export default useForm;
