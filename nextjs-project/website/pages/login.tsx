import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import type { Session } from 'next-auth'
import { getCsrfToken, getSession, signIn } from 'next-auth/react'
import { CtxOrReq } from 'next-auth/client/_utils'
import { useForm } from 'react-hook-form'

export const getServerSideProps = async (context: CtxOrReq | undefined) => {
  return {
    props: {
      title: 'login',
      csrfToken: await getCsrfToken(context),
      session: await getSession(context)
    }
  }
}

interface IFormValues {
  email?: string
  password?: string
}

const Login = (props: any) => {
  const router = useRouter()
  const [error, setError] = useState('')
  const { register, handleSubmit } = useForm<IFormValues>()
  const signInUser = async (data: IFormValues) => {
    await signIn<any>('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: `${window.location.origin}`
    }).then((res) => {
      if (res?.error) {
        setError('E-Mail,Passwordを正しく入力してください')
      } else {
        router.push('/main')
      }
    })
  }
  if (props.session) {
    useEffect(() => { router.replace('/main') }, [])
  }
  else {
    return (
      <div style={{ textAlign: 'center' }}>
        <form onSubmit={handleSubmit(signInUser)}>
          <input name='csrfToken' type='hidden' defaultValue={props.csrfToken} />
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
              {...register('password', {
                setValueAs: (value) => (value)
              })}
            ></input>
          </div>
          <p>
            <span style={{ color: 'red' }}>{error}</span>
          </p>
          <div>
            <input style={{ width: '250px' }} type='submit' />
          </div>
        </form>
      </div>
    )
  }
}

export default Login
