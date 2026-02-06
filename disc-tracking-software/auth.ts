import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      // You can implement your own credential logic here
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // Return null if user not found, or a user object if found
        return null
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
})
