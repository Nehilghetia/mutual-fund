import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Layout from '../components/Layout';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#1de9b6' },
    secondary: { main: '#ff5252' },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}