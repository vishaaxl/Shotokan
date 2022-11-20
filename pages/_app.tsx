import "styles/reset.css";
import type { AppProps } from "next/app";

import { ThemeProvider } from "styled-components";
import { defaultTheme } from "data/theme";
import { AuthProvider } from "context/User";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider theme={defaultTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}
