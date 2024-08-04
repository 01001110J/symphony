import Router from '@components/Router';
import DarkThemeProvider from '@context/DarkTheme';

import './App.css';

const App = () => (
  <DarkThemeProvider>
    <Router />
  </DarkThemeProvider>
);

export default App;
