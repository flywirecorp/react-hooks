import React from 'react';
import { useStep } from '../../src/index';
import '../styles.css';

function FirstName() {
  return <input type="text" placeholder="First name" name="firstName" />;
}

function LastName() {
  return <input type="text" placeholder="Last name" name="lastName" />;
}

function Address() {
  return <input type="text" placeholder="Address" name="address" />;
}

function Step({ steps, index }) {
  return steps[index].element;
}

function Form() {
  const steps = [
    { id: 'first', element: <FirstName /> },
    { id: 'last', element: <LastName /> },
    { id: 'address', element: <Address /> },
  ];

  const {
    index,
    navigation: { next, prev },
  } = useStep({ steps });

  return (
    <div className="container">
      <h1>User</h1>
      <form onSubmit={evt => evt.preventDefault()}>
        <Step index={index} steps={steps} />
        <div className="actions">
          <input type="submit" value="&laquo; Prev" onClick={prev} />
          <input type="submit" value="Next &raquo;" onClick={next} />
        </div>
      </form>
    </div>
  );
}

export default {
  title: 'useStep',
};

export const Example = () => <Form />;
