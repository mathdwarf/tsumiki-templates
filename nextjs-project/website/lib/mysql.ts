import mysql from 'serverless-mysql'

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  }
})

const executeQuery = async (SQL: any) => {
  try {
    const results = await db.query(SQL)
    await db.end()
    return results
  } catch (error) {
    return { error }
  }
}
export default executeQuery
