# useFormState

`useFormState` persists form data and return dirty fields.

#### Usage

```js
const { values, dirtyFields, update } = useFormState({});
```

#### Config

| Key             | Description                                |
| :-------------- | :----------------------------------------- |
| `defaultValues` | Initial values of the fields. Default = {} |

#### Return object

| Key           | Description                          |
| :------------ | :----------------------------------- |
| `values`      | Field values                         |
| `dirtyFields` | Fields updated by the user           |
| `update`      | Function for updating field value    |
| `updateAll`   | Function for updating fields in bulk |
| `reset`       | Reset status                         |

#### Usage

```jsx harmony
import React from 'react';
import { useFormState } from '@flywire/react-hooks';

function App() {
  const { values, update, dirtyFields } = useFormState();

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  function handleInputChange(evt) {
    update(evt.target.name, evt.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstname" onChange={handleInputChange} />
      {!values?.firstName && dirtyFields?.firstName && 'First name is required.'}

      <input type="submit" />
    </form>
  );
}

export default App;
```
