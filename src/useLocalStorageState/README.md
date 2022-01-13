# useLocalStorageState

`useLocalStorageState` is a hook for having state in a component that is synced
to localStorage

#### Usage

```js
import { useLocalStorageState } from '@flywire/react-hooks';

const [state, setState] = useLocalStorageState('yourKey', 'defaultValue');
```

#### Config

| Key            | Description                                                                    |
| :------------- | :----------------------------------------------------------------------------- |
| `key`          | Key used to save in localStorage.                                              |
| `defaultValue` | If the record in localStorage does not exists, sets its default.               |
| `options`      | Allows you to specify a `serialize` and `deserialize` function of your choice. |

#### Example

```jsx harmony
import React from 'react';
import { useLocalStorageState } from '@flywire/react-hooks';

function App() {
  const [on, setOn] = useLocalStorageState(`button-isOn`, true);

  return <button onClick={() => setOn(!on)}>{on ? 'ON' : 'OFF'}</button>;
}

export default App;
```

[Demo](https://codesandbox.io/s/flywire-react-hooks-useonclickoutside-q5dw2?file=/src/App.js)
