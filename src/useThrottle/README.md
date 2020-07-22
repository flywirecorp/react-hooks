# useThrottle

`useThrottle` to delay the execution of a function at most once every N
milliseconds.

#### Usage

```js
const [value, setValue] = useState('user name');
const throttledValue = useThrottle(value, 250);
```

#### Config

| Key     | Description                                       |
| :------ | :------------------------------------------------ |
| `value` | Value to hold between delay expirations           |
| `delay` | Time in milliseconds for next value to be emitted |

#### Example

```jsx harmony
import React, { useState, useEffect } from 'react';
import { useThrottle } from '@flywire/react-hooks';

function SlowTable() {
  const [status, setStatus] = useState('calm');
  const [refreshCycle, setRefreshCycle] = useState(0);
  const throttledRefreshCycle = useThrottle(refreshCycle, 2000);

  useEffect(() => {
    setStatus('loading');
    expensiveApiCall().then(() => setStatus('calm'));
  }, [throttledRefreshCycle]);

  return (
    <div className="app">
      <button onClick={() => setRefreshCycle(refreshCycle + 1)}>Refresh</button>
      <div>status: {status}</div>
      <div>refreshCycle: {refreshCycle}</div>
      <div>throttledRefreshCycle: {throttledRefreshCycle}</div>
    </div>
  );
}

const expensiveApiCall = () =>
  new Promise(resolve => setTimeout(() => resolve(), 1500));

export default SlowTable;
```
