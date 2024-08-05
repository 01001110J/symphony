import Router from '@components/Router';
import DarkThemeProvider from '@context/DarkTheme';
import TokensProvider from '@context/Tokens';

import './App.css';

const App = () => (
  <DarkThemeProvider>
    <TokensProvider>
      <Router />
    </TokensProvider>
  </DarkThemeProvider>
);

export default App;
