import React, { useRef } from 'react';
import { render } from '@testing-library/react';
import useOnClickOutside from './useOnClickOutside';

const whenClickedOutside = jest.fn();
const WithClickOutside = () => {
  const ref = useRef();
  useOnClickOutside(ref, whenClickedOutside);
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
  const documentMock = {};

  beforeEach(() => {
    jest.clearAllMocks();

    document.addEventListener = jest.fn((event, callback) => {
      documentMock[event] = callback;
    });

    document.removeEventListener = jest.fn((event, callback) => {
      documentMock[event] = callback;
    });
  });

  test('executes the callback when clicking outside the referenced element', () => {
    const { getByTestId } = render(<TestComponent />);
    documentMock.click({ target: getByTestId('outside') });

    expect(whenClickedOutside).toHaveBeenCalled();
  });

  test('does nothing when clicking the referenced element', () => {
    const { getByTestId } = render(<TestComponent />);
    documentMock.click({ target: getByTestId('inside') });

    expect(whenClickedOutside).not.toHaveBeenCalled();
  });

  test('does not add the event multiple times when re-rendering', () => {
    const { rerender } = render(<TestComponent />);
    rerender();

    expect(document.addEventListener).toHaveBeenCalledTimes(1);
  });

  test('removes the event when unmounting', () => {
    const { unmount } = render(<TestComponent />);
    unmount();

    expect(document.removeEventListener).toHaveBeenCalled();
  });
});
