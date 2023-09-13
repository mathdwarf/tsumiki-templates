import header from './header.module.css'
import { signOut } from 'next-auth/react'

export default function Header({title, router, session, prefix}: any) {
  return (
    <div className='flex justify-between sticky top-0 z-50 bg-white bg-opacity-50'>
      <div className={header.logo}>Tsumikiasobi PlayGround</div>
      <div className='flex justify-around'>
        {(title != 'top-page') && 
          <button className='button-bg' onClick={() => {router.push(prefix + '/')}}>Top</button>
        }
        {(session) && (session.user) && (session.user.role === 'admin') && (title != 'admin-panel') && 
          <button className='button-bg' onClick={() => {router.push(prefix + '/admin-panel')}}>Admin</button>
        }
        {session && 
          <>
            {(title != 'main') && 
              <button className='button-bg' onClick={() => {router.push(prefix + '/main')}}>Main</button>
            }
            <button className='button-bg' onClick={() => { signOut({callbackUrl: prefix + '/login'}) }}>Logout</button>
          </>
        }
        {!session && (title != 'login') && 
          <button className='button-bg' onClick={() => {router.push(prefix + '/login')}}>Login</button>
        }
      </div>
    </div>
  )
}
