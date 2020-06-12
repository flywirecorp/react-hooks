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
import { useToggle } from '@flywire/react-hooks';

function App() {
  const [on, toggle] = useToggle();

  return <button onClick={toggle}>{on ? 'ON' : 'OFF'}</button>;
}
```
