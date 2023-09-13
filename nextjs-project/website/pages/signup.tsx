import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
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
      title: 'signup',
      prefix: prefix,
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

const SignUp: NextPage = (props: any) => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<IFormValues>()
  useEffect(() => { 
    if(!props.session) {
      router.replace('/login')
    }
    else if (props.session.user.role != 'admin') {
      router.replace('/main')
    }
  }, [props.session, router])
  if ((props.session) && (props.session.user.role == 'admin')) {
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
      <>
        <Header title={props.title} router={router} session={props.session} prefix={props.prefix} />
        <div className='pagetitle'>Sign Up</div>
        <form className='w-[40vw] mx-[30vw]' onSubmit={handleSubmit(signUpUser)}>
          <div className='flex justify-between'><label className='pt-3.5'>E-Mail:</label><input className='textbox' type='text' placeholder='E-Mail' {...register('email')} /></div>
          <div className='flex justify-between'><label className='pt-3.5'>Password:</label><input className='textbox' type='password' placeholder='Password' {...register('password')} /></div>
          <div className='flex justify-between'><label className='pt-3.5'>Password Confirm:</label><input className='textbox' type='password' placeholder='Password Confirm' {...register('confirm')} /></div>
          <div className='flex justify-between'><label className='pt-3.5'>Role(user, admin):</label><input className='textbox' type='text' placeholder='Role(user, admin)' {...register('role')} /></div>
          <div><input className='button-bg' type='submit' value="Send" /></div>
        </form>
      </>
    )
  }
  else {
    return null
  }
}

export default SignUp
