import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useOnScroll } from '../index';

describe('useOnScroll', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockCallback = jest.fn(() => {
    // do nothing
  });

  const DummyComponent = () => {
    useOnScroll(mockCallback);

    return <div />;
  };

  test('execute callback when scroll', () => {
    render(<DummyComponent />);

    fireEvent(document, new Event('scroll'));

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  test('do not execute callbacks after component unmounted', () => {
    const { unmount } = render(<DummyComponent />);

    unmount();
    fireEvent(document, new Event('scroll'));

    expect(mockCallback).toHaveBeenCalledTimes(0);
  });
});
