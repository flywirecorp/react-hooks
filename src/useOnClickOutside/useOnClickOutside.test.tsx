import React, { useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useOnClickOutside } from '../index';

const callbackMock = jest.fn();
const WithClickOutside = () => {
  const ref = useRef(null);
  useOnClickOutside(ref, callbackMock);
  return <span ref={ref} data-testid="inside" />;
};

const TestComponent = () => {
  return (
    <>
      <p data-testid="outside">a text</p>
      <WithClickOutside />
    </>
  );
};

describe('useOnClickOutside', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('executes the callback when clicking outside the referenced element', () => {
    const { getByTestId } = render(<TestComponent />);

    fireEvent(
      getByTestId('outside'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(callbackMock).toHaveBeenCalledTimes(1);
  });

  test('does nothing when clicking the referenced element', () => {
    const { getByTestId } = render(<TestComponent />);

    fireEvent(
      getByTestId('inside'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(callbackMock).not.toHaveBeenCalled();
  });

  test('does not add the event multiple times when re-rendering', () => {
    const { rerender, getByTestId } = render(<TestComponent />);

    rerender(<TestComponent />);
    fireEvent(
      getByTestId('outside'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(callbackMock).toHaveBeenCalledTimes(1);
  });

  test('removes the event when unmounting', () => {
    const { unmount } = render(<TestComponent />);

    unmount();

    fireEvent(
      document.body,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(callbackMock).not.toHaveBeenCalled();
  });
});
