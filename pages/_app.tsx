import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <meta name="color-scheme" content="dark light"></meta>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
