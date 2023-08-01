import { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Base: NextPage = () => {
  const router = useRouter()
  useEffect(() => { router.replace('/login') }, [])
  return null
}

export default Base
