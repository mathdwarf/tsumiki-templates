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
      title: 'signup',
      session: await getSession(context)
    }
  }
}

interface IFormValues {
  email: string
  password: string
  confirm: string
  role: string
}

const SignUp = (props: any) => {
  const router = useRouter()
  if (props.session.user.role === 'admin') {
    const { register, handleSubmit } = useForm<IFormValues>()
    const signUpUser = async (data: IFormValues) => {
      const response = await fetch(
        '/api/auth/signup',
        { method: 'POST', body: JSON.stringify(data) } )
      
      const body = await response.json() as { status: number, message: string }
      if (body.status == 200) {
        alert('ユーザーが正常に登録されました。')
      }
      else {
        alert('ユーザー登録に失敗しました。\n' + body.message)
      }
    }
  
    return (
      <div style={{ textAlign: 'center' }}>
        <div>Sign Up</div>
        <form onSubmit={handleSubmit(signUpUser)}>
          <div style={{ marginTop: '15px' }}>
            <input
              type='text'
              placeholder='E-Mail'
              {...register('email')}
            ></input>
          </div>
          <div>
            <label htmlFor='password'></label>
            <input
              type='password'
              placeholder='Password'
              {...register('password')}
            ></input>
          </div>
          <div>
            <label htmlFor='confirm'></label>
            <input
              type='password'
              placeholder='Confirm password'
              {...register('confirm')}
            ></input>
          </div>
          <div>
            <label htmlFor='role'></label>
            <input
              type='text'
              placeholder='Role(user, admin)'
              {...register('role')}
            ></input>
          </div>
          <div>
            <input style={{ width: '250px' }} type='submit' />
          </div>
        </form>
        <div><button onClick={() => { router.push('/main') }}>Main Page</button></div>
        <div><button onClick={() => { router.push('/signup') }}>Sign Up Page</button></div>
        <div><button onClick={() => { signOut({callbackUrl: '/login'}) }}>Logout</button></div>
      </div>
    )
  }
  else {
    useEffect(() => { router.replace('/main') }, [])
  }
}

export default SignUp
