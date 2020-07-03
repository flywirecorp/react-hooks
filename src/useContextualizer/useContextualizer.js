/* eslint react/prop-types: 0 */
import React from 'react';

function useContextualizer(hook) {
  const Context = React.createContext();

  function Provider({ children, value = () => {}, ...rest }) {
    const hookValues = hook(rest);
    const customValues = value(hookValues);

    return (
      <Context.Provider value={{ ...hookValues, ...customValues }}>
        {children}
      </Context.Provider>
    );
  }

  function useContext() {
    const context = React.useContext(Context);
    if (context === undefined) {
      throw new Error('useContext must be used within a Provider');
    }
    return context;
  }

  return { Context, Provider, useContext };
}

export { useContextualizer };
