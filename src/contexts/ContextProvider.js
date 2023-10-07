import React, { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const StateContext = createContext();

export function ContextProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [isMainLanding, setIsMainLanding] = useState(false);

  const contextValue = useMemo(
    () => ({
      auth,
      setAuth,
      isMainLanding,
      setIsMainLanding,
    }),
    [auth, setAuth, isMainLanding, setIsMainLanding]
  );

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
