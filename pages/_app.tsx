import { CssBaseline } from "@material-ui/core";
import { AppProps } from "next/app";
import { useEffect } from "react";

const App = ({ Component, pageProps }: AppProps) => {

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <CssBaseline />
    </>
  )
}

export default App
