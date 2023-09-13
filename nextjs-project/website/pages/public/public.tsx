import { NextPage } from 'next'
import { useRouter } from 'next/router'

const Public: NextPage = () => {
  const router = useRouter()
  return (
    <>
        <div className='pagetitle'>Public Page</div>
        <button className='button-bg' onClick={() => { router.push('/login') }}>Login</button>
    </>
  )
}

export default Public
