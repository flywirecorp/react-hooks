# useIdleTimer

`useIdleTimer` callbacks when users become idle.

#### Usage

```js
import { useIdleTimer } from '@flywire/react-hooks';

const { idle, timeleft } = useIdleTimer({
  interval: 1000,
  timeout: 10000,
});
```

#### Config

| Key        | Description                   | Default                                                       |
| :--------- | :---------------------------- | :------------------------------------------------------------ |
| `events`   | Events to listen              | ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'] |
| `interval` | Interval time in milliseconds | 1000                                                          |
| `timeout`  | Timeout time in milliseconds  | 1800000                                                       |

#### Return object

| Key        | Description                       |
| :--------- | :-------------------------------- |
| `idle`     | Time expetired, users become idle |
| `reset`    | Reset timer                       |
| `timeleft` | Time to idle in milliseconds      |

#### Example

```jsx harmony
import React from 'react';
import { useIdleTimer } from '@flywire/react-hooks';

function App() {
  const { idle, timeleft } = useIdleTimer({ timeout: 5000 });

  if (idle) {
    console.log('user goes idle!');
  }

  return <span>{timeleft}</span>;
}

export default App;
```

[Demo](https://codesandbox.io/s/flywire-react-hooks-useidletimer-yor63r?file=/src/App.js)
