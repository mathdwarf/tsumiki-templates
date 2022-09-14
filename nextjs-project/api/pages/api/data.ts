import type { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  string: string,
  number: number
}

const dataHandler = ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
  switch (req.method) {
    case 'GET': {
      const { val1, val2 } = req.query
      res.status(200).json({ string: `val1: ${val1}, val2: ${val2}`, number: 0 })
      break
    }
    case 'POST': {
      const { val1, val2 } = req.body
      res.status(200).json({ string: `val1: ${val1}, val2: ${val2}`, number: 1 })
      break
    }
    default: {
      res.status(405).end()
      break
    }
  }
}
export default dataHandler
