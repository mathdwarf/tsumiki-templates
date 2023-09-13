import NextAuth, { User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import executeQuery from '../../../lib/mysql'
const escape = require('sql-template-strings')
const bcrypt = require('bcrypt')

export interface CustomUser extends User {
  role?: string | null;
}

const findUserByCredentials = async (credentials: {email: string, password: string}) => {
  const queryGetPW = escape`select password from credentials where email = ${credentials.email}`
  const queryGetPwResults = await executeQuery(queryGetPW) as {password: string}[]
  let retCredentials: CustomUser | null = null
  if (queryGetPwResults.length > 0) {
    const isPassed = bcrypt.compareSync(credentials.password, queryGetPwResults[0].password)
    if (isPassed) {
      const queryGetUser = escape`select email,role from credentials where email = ${credentials.email}`
      const queryGetUserResults = await executeQuery(queryGetUser) as {id:number,email:string,role:string}[]
      if((queryGetUserResults!==null) && (typeof(queryGetUserResults) === 'object') && (Object.keys(queryGetUserResults).length === 1)) {
        retCredentials = { id: queryGetUserResults[0].email, email: queryGetUserResults[0].email, role: queryGetUserResults[0].role }
      }
      else {
        // Do Nothing.
      }
    }
    else {
      // Do Nothing.
    }
  }
  else {
    // Do Nothing.
  }
  return retCredentials
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: 'E-Mail', type: 'text', placeholder: 'E-Mail' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        const credentialsData = {
          email: (credentials?.email) ? credentials?.email : '',
          password: (credentials?.password) ? credentials?.password : ''
        }
        const credentialsResult = await findUserByCredentials(credentialsData)
        return credentialsResult
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as CustomUser
      return session
    },
    async jwt({token, user}) {
        if (user) {
            token.accessToken = user.id;
            token.user = user;
        }
        return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/login"
  },
  debug: process.env.NODE_ENV === "development"
})
