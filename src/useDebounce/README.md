# useDebounce

`useDebounce` to keep last value only if N milliseconds have passed
withoutchanging it.

#### Usage

```js
const [searchText, setSearchText] = useState(NO_TEXT_SEARCH);
const debouncedSearchText = useDebounce(searchText, 350);
```

#### Config

| Key     | Description                                       |
| :------ | :------------------------------------------------ |
| `value` | Value to hold until delay expires                 |
| `delay` | Time in milliseconds for next value to be emitted |

#### Example

```jsx harmony
import React, { useState } from 'react';
import { useDebounce } from '@flywire/react-hooks';

function SearchForm({ onSearch }) {
  const [text, setText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 350);

  useEffect(() => {
    onSearch(debouncedSearchText);
  }, [debouncedSearchText]);

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
