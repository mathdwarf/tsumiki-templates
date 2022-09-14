import type { NextPage } from 'next'

const Home: NextPage = () => {
  const getData = async () => {
    const response = await fetch(
      '/nextjs-api/api/data?val1=GetMethodValue1&val2=10000',
      { method: 'GET' }
    )
    const json = await response.json()
    console.log(json)
  }
  const postData = async () => {
    const headers = {'Content-Type': 'application/json'}
    const postData = {
      val1: 'PostMethodValue1',
      val2: 10001
    }
    const response = await fetch(
      '/nextjs-api/api/data', 
      { method: 'POST', headers: headers, body: JSON.stringify(postData) }
    )
    const json = await response.json()
    console.log(json)
  }
  return (
    <div>
      <header>
      </header>

      <main>
        <button onClick={getData}>GET method</button>
        <button onClick={postData}>POST method</button>
      </main>

      <footer>
      </footer>
    </div>
  )
}
export default Home
