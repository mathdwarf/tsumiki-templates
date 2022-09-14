import type { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  string: string,
  number: number
}

const dataHandler = ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
  res.status(200).json({ string: 'string value', number: 9999 })
}
export default dataHandler
