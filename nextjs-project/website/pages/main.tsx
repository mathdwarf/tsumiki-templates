import { useEffect } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import type { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { CtxOrReq } from 'next-auth/client/_utils'
import Header from '../components/header'

export const getServerSideProps: GetServerSideProps<{ session: Session | null }>
  = async (context: CtxOrReq | undefined) => {
    const prefix = (process.env.ASCC_PREFIX) ? process.env.ASCC_PREFIX: ''
    return {
    props: {
      title: 'main-page',
      prefix: prefix,
      session: await getSession(context)
    }
  }
}

const Main: NextPage = (props: any) => {
  const router = useRouter()
  useEffect(() => { 
    if (!props.session) {
      router.replace('/login')
    }
  }, [props.session, router])
  if (props.session) {
    return (
      <>
        <Header title={props.title} router={router} session={props.session} prefix={props.prefix} />
        <div className='pagetitle'>Main Page</div>
        <button className='button-bg' onClick={() => { router.push('/change-password') }}>Change Password</button>
      </>
    )
  }
  else {
    return null
  }
}

export default Main
