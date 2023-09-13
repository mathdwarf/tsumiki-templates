import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import type { Session } from 'next-auth'
import { getSession, signOut } from 'next-auth/react'
import { CtxOrReq } from 'next-auth/client/_utils'

export const getServerSideProps: GetServerSideProps<{ session: Session | null }>
  = async (context: CtxOrReq | undefined) => {
  const prefix = (process.env.ASCC_PREFIX) ? process.env.ASCC_PREFIX: ''
  return {
    props: {
      title: 'change-password',
      prefix: prefix,
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

const ChangePassword: NextPage = (props: any) => {
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
  useEffect(() => { 
    if (!props.session) {
      router.replace('/login')
    }
  }, [props.session, router])
  if (props.session) {
    return (
      <>
        <div className='pagetitle'>Change Password</div>
        <form className='w-[40vw] mx-[30vw]' onSubmit={handleSubmit(chagePassword)}>
          <div className='flex justify-between'><label className='pt-3.5'>Current Password:</label><input className='textbox' type='password' placeholder='Current Password' {...register('currentPassword')} /></div>
          <div className='flex justify-between'><label className='pt-3.5'>New Password:</label><input className='textbox' type='password' placeholder='New Password' {...register('newPassword')} /></div>
          <div className='flex justify-between'><label className='pt-3.5'>New Password Confirm:</label><input className='textbox' type='password' placeholder='New Password Confirm' {...register('confirmPassword')} /></div>
          <div><input className='button-bg' type='submit' value="Update" /></div>
        </form>
      </>
    )
  }
  else {
    return null
  }
}

export default ChangePassword
