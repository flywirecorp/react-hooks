# useForm

`useForm` persists form data and return dirty fields.

#### Usage

```js
const { values, dirtyFields, handleChange } = useForm({});
```

#### Config

| Key             | Description                                |
| :-------------- | :----------------------------------------- |
| `defaultValues` | Initial values of the fields. Default = {} |

#### Return object

| Key            | Description                               |
| :------------- | :---------------------------------------- |
| `values`       | Field values                              |
| `dirtyFields`  | Fields modified by the user               |
| `handleChange` | Callback for persisting the field's value |

#### Usage

```jsx harmony
import React from 'react';
import { useForm } from '@flywire/react-hooks';

function App() {
  const { values, handleChange, dirtyValues } = useForm();

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  function handleInputChange(evt) {
    handleChange(evt.target.name, evt.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstname" onChange={handleInputChange} />
      {!values.firstName && dirtyValues.firstName && 'First name is required.'}

      <input type="submit" />
    </form>
  );
}
```
