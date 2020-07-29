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
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
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
