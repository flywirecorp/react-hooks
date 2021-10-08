import { useState } from 'react';

type FieldValue = string | boolean | null;
type FieldValues = {
  [key: string]: FieldValue;
};

type DirtyFields = {
  [key: string]: boolean;
};

type FormState = {
  values: FieldValues;
  dirtyFields: DirtyFields;
};

function useFormState(initialValues: FieldValues = {}) {
  const [state, setState] = useState<FormState>({
    values: initialValues,
    dirtyFields: {},
  });

  function update(name: string, value: FieldValue) {
    setState({
      ...state,
      values: { ...state.values, [name]: value },
      dirtyFields: { ...state.dirtyFields, [name]: true },
    });
  }

  function updateAll(newFields: FieldValues = {}) {
    setState({
      ...state,
      values: { ...state.values, ...newFields },
      dirtyFields: {
        ...state.dirtyFields,
        ...Object.keys(newFields).reduce((acc, item) => {
          acc[item] = true;
          return acc;
        }, <DirtyFields>{}),
      },
    });
  }

  function reset(values = initialValues) {
    setState({ values, dirtyFields: {} });
  }

  return { ...state, update, updateAll, reset };
}

export default useFormState;
