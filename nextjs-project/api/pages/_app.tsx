import '../styles/globals.css'
import type { AppProps } from 'next/app'

function NextJsApiApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default NextJsApiApp
