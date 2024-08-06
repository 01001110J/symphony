import Router from '@components/Router';

import TokensProvider from '@context/Tokens';
import DarkThemeProvider from '@context/DarkTheme';

const App = () => (
  <DarkThemeProvider>
    <TokensProvider>
      <Router />
    </TokensProvider>
  </DarkThemeProvider>
);

export default App;
