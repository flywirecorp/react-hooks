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
| `value` | Value to hold until delay expires                 |
| `delay` | Time in milliseconds for next value to be emitted |

#### Example

```jsx harmony
import React, { useState } from 'react';
import { useThrottle } from '@flywire/react-hooks';

function SearchForm({ onSearch }) {
  const [text, setText] = useState('');
  const throttledText = useThrottle(text, 250);

  useEffect(() => {
    onSearch(throttledText);
  }, [throttledText]);

  return (
    <input
      type="text"
      placeholder="Search…"
      onChange={e => setText(e.target.value)}
      value={text}
    />
  );
}

export default SearchForm;
```
