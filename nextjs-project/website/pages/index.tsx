import type { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import type { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { CtxOrReq } from 'next-auth/client/_utils'

export const getServerSideProps: GetServerSideProps<{ session: Session | null }>
  = async (context: CtxOrReq | undefined) => {
  const prefix = (process.env.ASCC_PREFIX) ? process.env.ASCC_PREFIX: ''
  return {
    props: {
      title: 'top-page',
      prefix: prefix,
      session: await getSession(context)
    }
  }
}

const Base: NextPage = (props: any) => {
  const router = useRouter()
  return (
    <>
      <div className='pagetitle'>Top Page</div>
    </>
  )
}

export default Base
