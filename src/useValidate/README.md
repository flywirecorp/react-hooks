# useValidate

`useValidate` hook for validating data using validate.js

#### Usage

```js
const data = {};
const constraints = {
  terms: {
    presence: true,
    inclusion: {
      within: [true],
    },
  },
};

const { isValid, errors } = useValidate(data, constraints);
```

#### Config

| Key           | Description                                                                                                                    |
| :------------ | :----------------------------------------------------------------------------------------------------------------------------- |
| `data`        | Data to validate. Default = {}                                                                                                 |
| `constraints` | Validation schema. Visit [https://validatejs.org/#constraints](https://validatejs.org/#constraints) for examples. Default = {} |

#### Return object

| Key       | Description                                   |
| :-------- | :-------------------------------------------- |
| `isValid` | Result of the validation. Default = false     |
| `errors`  | Object that contains the errros. Default = {} |

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
