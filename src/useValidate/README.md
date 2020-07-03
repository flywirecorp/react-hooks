# useValidate

`useValidate` hook for validating data using validate.js

#### Usage

Ensure your project has these dependencies installed:

```
npm install lodash.isequal validate.js@0.11.1 xregexp
```

Then:

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
| `errors`  | Object that contains the errors. Default = {} |

#### Example

```jsx harmony
import React from 'react';
import { useFormState, useValidate } from '@flywire/react-hooks';

function App() {
  const constraints = {
    terms: {
      presence: true,
      inclusion: {
        within: [true],
      },
    },
    username: {
      presence: true,
    },
    password: {
      presence: true,
      format: {
        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        message:
          'must have minimum eight characters and at least one letter and one number',
      },
    },
  };

  const { values, update, dirtyFields } = useFormState();
  const { isValid, errors } = useValidate(values, constraints);

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  function handleInputChange(evt) {
    update(evt.target.name, evt.target.value);
  }

  function handleTermsChange() {
    update('terms', !values.terms);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label style={{ display: 'block' }}>
        <b>Username</b>
        <input type="text" name="username" onChange={handleInputChange} />
        {dirtyFields.username && errors?.username && (
          <span style={{ color: 'red' }}>{errors.username[0]}</span>
        )}
      </label>

      <label style={{ display: 'block' }}>
        <b>Password</b>
        <input type="password" name="password" onChange={handleInputChange} />
        {dirtyFields.password && errors?.password && (
          <span style={{ color: 'red' }}>{errors.password[0]}</span>
        )}
      </label>

      <label style={{ display: 'block' }}>
        <input
          type="checkbox"
          name="terms"
          value="false"
          onChange={handleTermsChange}
        />{' '}
        I have read and agree to the Terms and Conditions
      </label>

      <button type="submit" disabled={!isValid}>
        Register
      </button>
    </form>
  );
}

export default App;
```
