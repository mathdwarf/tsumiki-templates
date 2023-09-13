import type { AppProps } from 'next/app'
import { Session } from "next-auth"
import '../styles/globals.css'

const App = ({ Component, pageProps }: AppProps<{session: Session}>)  =>{
  return (
    <div className='font-daruma_drop_one text-[1.5vw] text-center'>
      <Component {...pageProps} /> 
    </div>
  )
}

export default App
