import React from 'react';
import { render } from '@testing-library/react';
import useOnScroll from './useOnScroll';

describe('useOnScroll', () => {
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

  const callback = () => 'a callback';
  const DummyComponent = () => {
    useOnScroll(callback);
    return <div />;
  };

  test('adds an event listener on mount', () => {
    render(<DummyComponent />);

    expect(document.addEventListener).toHaveBeenCalledWith('scroll', callback);
  });

  test('removes the event listener on unmount', () => {
    const { unmount } = render(<DummyComponent />);
    unmount();

    expect(document.removeEventListener).toHaveBeenCalledWith(
      'scroll',
      callback,
    );
  });
});
