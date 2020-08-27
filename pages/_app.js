import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "../providers/Auth";
import { SearchProvider } from "../providers/Search";
import { GlobalStyle } from "../styles/global";
import theme from "../styles/theme";
import "react-mde/lib/styles/css/react-mde-all.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/logos/astroplant.svg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta lang="en" charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <AuthProvider>
        <ThemeProvider theme={theme}>
          <SearchProvider>
            <Component {...pageProps} />
          </SearchProvider>
          <GlobalStyle />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}
