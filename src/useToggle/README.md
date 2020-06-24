# useToggle

`useToggle` for toggle state

#### Usage

```js
const [on, toggle] = useToggle();
const [on] = useToggle(false);
```

#### Config

| Description                    |
| :----------------------------- |
| Initial state. Default = false |

#### Return pair

| Description                  |
| :--------------------------- |
| Current state value          |
| Function to update the state |

#### Example

```jsx harmony
import React from 'react';
import { useToggle } from '@flywire/react-hooks';

function App() {
  const [on, toggle] = useToggle();

  return <button onClick={toggle}>{on ? 'ON' : 'OFF'}</button>;
}

export default App;
```
