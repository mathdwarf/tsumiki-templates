import type { NextApiRequest, NextApiResponse } from 'next'
import executeQuery from '../../../lib/mysql'
const escape = require('sql-template-strings')
const bcrypt = require('bcrypt')

type ResponseData = { status: number, message: string }

const changePasswordHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  let resData: ResponseData = { status: 500, message: 'Error occured on sign up.' }
  try {
    if (req.method !== "POST") {
      throw({ status: 405, message: 'Method not allowed.' })
    }
    const { email, currentPassword, newPassword, confirmPassword } = JSON.parse(req.body)

    const queryGetPW = escape`select password from credentials where email = ${email}`
    const queryGetPwResults = await executeQuery(queryGetPW) as {password: string}[]
    if (queryGetPwResults.length < 0) {
      throw({ status: 400, message: 'The e-mail address is not registered.' })
    }
    const isPassed = bcrypt.compareSync(currentPassword, queryGetPwResults[0].password)
    if (!isPassed) {
      throw({ status: 400, message: 'The current password is invalid.' })
    }
    if (newPassword != confirmPassword) {
      throw({ status: 400, message: 'The password and cofnirm-password is invalid.' })
    }
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(newPassword, salt)
    const queryGetUser = escape`update credentials set password=${hash} where email=${email}`
    await executeQuery(queryGetUser)
    resData = { status: 200, message: 'Change password is completed.' }
  }
  catch (e: any) {
    console.log('Change password is failed.')
    console.log(e)
    if((e.status !== undefined) && (e.message !== undefined)) {
      return res.status(e.status).end(e.message)
    }
    else {
      return res.status(500).end('Error occured on change password.')
    }
  }
  console.log(resData)
  return res.status(resData.status).json(resData)
}
export default changePasswordHandler
