import { Html, Head, Main, NextScript } from 'next/document'
import type { GetServerSideProps } from 'next'
import type { Session } from 'next-auth'
import { SessionProvider, getSession } from 'next-auth/react'
import { CtxOrReq } from 'next-auth/client/_utils'

export const getServerSideProps: GetServerSideProps<{ session: Session | null }>
  = async (context: CtxOrReq | undefined) => {
  const prefix = (process.env.ASCC_PREFIX) ? process.env.ASCC_PREFIX: ''
  console.log('prefix')
  console.log(prefix)
  return {
    props: {
      title: '_document',
      prefix: prefix,
      session: await getSession(context)
    }
  }
}
 
export default function Document(props: any) {
  const prefix = props.prefix
  return (
    <Html lang="ja">
    <Head>
        <link href="https://fonts.googleapis.com/css2?family=Darumadrop+One&family=Kosugi+Maru&display=swap" rel="stylesheet" />
        <link rel="shortcut icon" href={prefix + "/favicon.ico"} />
    </Head>
      <body>
        <SessionProvider session={props.session} basePath={props.prefix + '/api/auth'}>
          <Main />
          <NextScript />
        </SessionProvider>
      </body>
    </Html>
  )
}
