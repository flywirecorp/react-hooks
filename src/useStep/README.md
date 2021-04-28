# useStep

`useStep` is a basic step wizard.

#### Usage

```js
const steps = [];
const initialStep = 0;
const { complete, completed, index, navigation, step, uncomplete } = useStep({
  steps,
  initialStep,
});
```

#### Config

| Key           | Description                   |
| :------------ | :---------------------------- |
| `steps`       | Array of steps. Default = []  |
| `initialStep` | Initial step index. Default = |

#### Return object

| Key          | Description                                |
| :----------- | :----------------------------------------- |
| `complete`   | Call to set a step as completed            |
| `completed`  | An array of completed step indexes         |
| `index`      | A number containing the current step index |
| `navigation` | A navigation object                        |
| `step`       | An object containing the current step      |
| `uncomplete` | Call to set a step as uncompleted          |
| `reset`      | Reset status                               |

#### Navitation object

| Key    | Description                                 |
| :----- | :------------------------------------------ |
| `go`   | Call to navigate to a concrete step index   |
| `prev` | Call to navigate to the previous step index |
| `next` | Call to navigate to the next step index     |

#### Example

```jsx harmony
import React from 'react';
import { useStep } from '@flywire/react-hooks';

function FirstStep() {
  return <p>First Step</p>;
}

function SecondStep() {
  return <p>Second Step</p>;
}

function ThirdStep() {
  return <p>Third Step</p>;
}

function App() {
  const steps = [
    { id: 'first', element: <FirstStep /> },
    { id: 'second', element: <SecondStep /> },
    { id: 'third', element: <ThirdStep /> },
  ];

  const { index, complete, navigation } = useStep({ steps });

  function handleNextClick() {
    complete(index);
    navigation.next();
  }

  function handlePrevClick() {
    complete(index);
    navigation.prev();
  }

  return (
    <>
      {steps[index].element}
      <button onClick={handlePrevClick}>Prev</button>
      <button onClick={handleNextClick}>Next</button>
    </>
  );
}

export default App;
```

[Demo](https://codesandbox.io/s/flywire-react-hooks-usestep-4v250?file=/src/App.js)
