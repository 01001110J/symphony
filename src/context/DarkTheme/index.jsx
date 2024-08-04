import { createContext, useState, useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';
import PropTypes from 'prop-types';

export const DarkThemeContext = createContext();

const isSystemDarkMode = () => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const DarkThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(isSystemDarkMode());

  const toggleDarkTheme = () => {
    setIsDarkMode((previousValue) => {
      const newValue = !previousValue;

      if (newValue) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }

      return newValue;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <DarkThemeContext.Provider value={{ toggleDarkTheme, isDarkMode }}>{children}</DarkThemeContext.Provider>
    </ConfigProvider>
  );
};

DarkThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DarkThemeProvider;
