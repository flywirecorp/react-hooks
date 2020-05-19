import React from 'react';
import { useForm } from '../../src/index';
import '../styles.css';

function Form() {
  const { handleChange, values } = useForm();

  function handleInputChange(evt) {
    handleChange(evt.target.name, evt.target.value);
  }

  function handleSubmit(values) {
    console.log('values', values);
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <form
        onSubmit={evt => {
          evt.preventDefault();
          handleSubmit(values);
        }}
        noValidate
      >
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
        />

        <div className="actions">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

export default {
  title: 'useForm',
};

export const Example = () => <Form />;
