import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
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

interface IFormValues {
  email: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const ChangePassword = (props: any) => {
  const { register, handleSubmit } = useForm<IFormValues>()
  const chagePassword = async (data: IFormValues) => {
    data.email = props.session.user.email
    const response = await fetch(
      '/api/auth/change-password',
      { method: 'POST', body: JSON.stringify(data) } )
    
    const body = await response.json() as { status: number, message: string }
    if (body.status == 200) {
      alert('パスワードが変更されました。')
      signOut({callbackUrl: '/login'})
    }
    else {
      alert('パスワードが変更できませんでした。\n' + body.message)
    }
  }
  const router = useRouter()
  if (props.session) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div>Change Password Page</div>
        <form onSubmit={handleSubmit(chagePassword)}>
          <div>
            <label htmlFor='currentPassword'></label>
            <input
              type='password'
              placeholder='Current Password'
              {...register('currentPassword')}
            ></input>
          </div>
          <div>
            <label htmlFor='newPassword'></label>
            <input
              type='password'
              placeholder='New Password'
              {...register('newPassword')}
            ></input>
          </div>
          <div>
            <label htmlFor='confirmPassword'></label>
            <input
              type='password'
              placeholder='Confirm Password'
              {...register('confirmPassword')}
            ></input>
          </div>
          <div>
            <input style={{ width: '250px' }} type='submit' />
          </div>
        </form>
        <div><button onClick={() => { router.push('/main')}}>Main Page</button></div>
        <div><button onClick={() => { signOut({callbackUrl: '/login'}) }}>Logout</button></div>
      </div>
    )
  }
  else {
    useEffect(() => { router.replace('/login') }, [])
  }
}

export default ChangePassword
