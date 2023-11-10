/* eslint-disable react/prop-types */
import { useContext, createContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks";

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("light-mode");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((isDark) => !isDark);

  const value = {
    isDarkMode,
    toggleDarkMode,
  };
  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};

const useContextDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context)
    throw new Error(
      "Context must be use inside DarkModeProvider, please try again"
    );
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useContextDarkMode, DarkModeProvider };
