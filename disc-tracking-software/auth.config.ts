import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/sign-in",
    newUser: "/create-account"
  },

  callbacks: {
      async jwt({ token, user, trigger, session }) {
          if (user) {
              token.id = user.id || ""
              token.picture = user.image
          }
          if (trigger === "update") {
            if (session?.user?.image) {
                token.picture = session.user.image;
            } else if (session?.image) {
                token.picture = session.image;
            }
          }
          return token
      },
      async session({ session, token }) {
          if (session.user) {
              session.user.id = token.id as string
              session.user.image = token.picture as string
          }
          return session
      }
  }
} satisfies NextAuthConfig