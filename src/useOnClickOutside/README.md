# useOnClickOutside

`useOnClickOutside` is a hook for listening clicks that occur somewhere in the
document, outside of the element itself (for instance, if you need to hide a
menu when users click anywhere else on your page).

#### Usage

```js
import { useOnClickOutside } from '@flywire/react-hooks';

useOnClickOutside(ref, callback);
```

#### Config

| Key        | Description                                                       |
| :--------- | :---------------------------------------------------------------- |
| `ref`      | Reference to a React element.                                     |
| `callback` | Function to execute when click outside of the referenced element. |

#### Example

```jsx harmony
import React from 'react';
import { useOnClickOutside } from '@flywire/react-hooks';

const Nothing = () => null;

export default function App() {
  const [isVisible, setIsVisible] = React.useState(true);
  const ref = React.useRef();

  function toggleIsVisible() {
    setIsVisible(isVisible => !isVisible);
  }

  useOnClickOutside(ref, toggleIsVisible);

  if (!isVisible) {
    return <Nothing />;
  }

  return (
    <div
      className="alert"
      ref={ref}
      style={{
        padding: '20px',
        backgroundColor: '#f44336',
        color: 'white',
        marginBottom: '15px',
      }}
    >
      <span
        className="closebtn"
        onClick={toggleIsVisible}
        style={{
          marginLeft: '15px',
          color: 'white',
          fontWeight: 'bold',
          float: 'right',
          fontSize: '22px',
          lineHeight: '20px',
          cursor: 'pointer',
        }}
      >
        &times;
      </span>
      This is an alert box.
    </div>
  );
}

export default App;
```
