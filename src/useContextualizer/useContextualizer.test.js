import React, { useState } from 'react';
import { useContextualizer } from '../index';
import { render, fireEvent } from '@testing-library/react';

function useCounter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);
  const increment = () => setCount(count => count + 1);

  return { count, setCount, increment };
}

test('it works', () => {
  const {
    Provider: CounterProvider,
    useContext: useCounterContext,
  } = useContextualizer(useCounter);

  function Counter() {
    const { count, increment, decrement } = useCounterContext();

    return (
      <div>
        <p data-testid="count">{count}</p>
        <button data-testid="increment" onClick={increment}>
          +
        </button>
        <button data-testid="decrement" onClick={decrement}>
          -
        </button>
      </div>
    );
  }

  function App() {
    return (
      <CounterProvider
        value={({ setCount }) => ({
          decrement: () => setCount(count => count - 1),
        })}
      >
        <Counter />
      </CounterProvider>
    );
  }
  const { getByTestId } = render(<App />);

  expect(getByTestId('count')).toHaveTextContent(0);
  fireEvent.click(getByTestId('increment'));
  expect(getByTestId('count')).toHaveTextContent(1);
  fireEvent.click(getByTestId('decrement'));
  expect(getByTestId('count')).toHaveTextContent(0);
});
