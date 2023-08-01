import { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import type { Session } from 'next-auth'
import { getSession, signOut } from 'next-auth/react'
import { CtxOrReq } from 'next-auth/client/_utils'

export const getServerSideProps: GetServerSideProps<{ session: Session | null }>
  = async (context: CtxOrReq | undefined) => {
  return {
    props: {
      title: 'main',
      session: await getSession(context)
    }
  }
}

const Main = (props: any) => {
  const router = useRouter()
  if (props.session) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div>
          <div>Main Page</div>
          <div><button onClick={() => {router.push('/change-password')}}>Change Password</button></div>
          {(props.session.user.role === 'admin') && <div><button onClick={() => {router.push('/admin-panel')}}>Admin Panel</button></div>}
          <div><button onClick={() => {signOut({callbackUrl: '/login'})}}>Logout</button></div>
        </div>
      </div>
    )
  }
  else {
    useEffect(() => { router.replace('/login') }, [])
  }
}

export default Main
