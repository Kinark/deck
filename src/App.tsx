import { Provider as JotaiProvider } from 'jotai';
import { MotionConfig } from 'framer-motion';
import { useTheme } from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';

import Routes from '~/Routes';
import GlobalStyles from '~/components/GlobalStyles';
import ThemeProvider from '~/components/ThemeProvider';
import Error from '~/components/Error';

const MotionConfigProxy = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return <MotionConfig transition={theme.animation.springs.default}>{children}</MotionConfig>;
};

function App() {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <JotaiProvider>
        <ThemeProvider>
          <MotionConfigProxy>
            <Routes />
            <GlobalStyles />
          </MotionConfigProxy>
        </ThemeProvider>
      </JotaiProvider>
    </ErrorBoundary>
  );
}

export default App;
