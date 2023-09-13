import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { getCsrfToken, getSession, signIn } from 'next-auth/react'
import { CtxOrReq } from 'next-auth/client/_utils'
import { useForm } from 'react-hook-form'

export const getServerSideProps = async (context: CtxOrReq | undefined) => {
  const prefix = (process.env.ASCC_PREFIX) ? process.env.ASCC_PREFIX: ''
  return {
    props: {
      title: 'login',
      prefix: prefix,
      csrfToken: await getCsrfToken(context),
      session: await getSession(context)
    }
  }
}

interface IFormValues {
  email?: string
  password?: string
}

const Login: NextPage = (props: any) => {
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
        router.push('/member-page')
      }
    })
  }
  useEffect(() => {
    if (props.session) {
      router.replace('/member-page')
    }
  }, [props.session, router])
  if (props.session) {
    return null
  }
  else {
    return (
      <>
        <div className='pagetitle'>Login</div>
        <form className='w-[40vw] mx-[30vw]' onSubmit={handleSubmit(signInUser)}>
          <input name='csrfToken' type='hidden' defaultValue={props.csrfToken} />
          <div className='flex justify-between'><label className='pt-3.5'>E-Mail:</label><input className='textbox' type='text' placeholder='E-Mail' {...register('email')} /></div>
          <div className='flex justify-between'><label className='pt-3.5'>Password:</label><input className='textbox' type='password' placeholder='Password' {...register('password', { setValueAs: (value) => (value) })} /></div>
          <div><p className='text-red-600'>{error}</p></div>
          <div><input className='button-bg' type='submit' value="Login" /></div>
        </form>
      </>
    )
  }
}

export default Login
