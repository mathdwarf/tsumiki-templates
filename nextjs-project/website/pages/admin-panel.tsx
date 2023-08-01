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
      title: 'admin-panel',
      session: await getSession(context)
    }
  }
}

const AdminPanel = (props: any) => {
  const router = useRouter()
  if (props.session) {
    if (props.session.user.role === 'admin') {
      return (
        <div style={{ textAlign: 'center' }}>
          <div>
            <div>Admin-Panel</div>
            <div><button onClick={() => { router.push('/main') }}>Main Page</button></div>
            <div><button onClick={() => { router.push('/signup') }}>Sign Up Page</button></div>
            <div><button onClick={() => { signOut({callbackUrl: '/login'}) }}>Logout</button></div>
          </div>
        </div>
      )
    }
    else {
      useEffect(() => { router.replace('/main') }, [])
    }
  }
  else {
    return (
      useEffect(() => { router.replace('/login') }, [])
    )
  }
}

export default AdminPanel
