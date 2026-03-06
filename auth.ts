import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const res = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });

        if (!res.ok) {
          return null;
        }

        const data = await res.json();

        if (!data?.access_token) {
          return null;
        }

        return {
          id: credentials.username,
          name: credentials.username,
          accessToken: data.access_token,
          tokenType: data.token_type,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.name ?? undefined;
        token.accessToken = user.accessToken;
        token.tokenType = user.tokenType;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.name = token.username;
      session.accessToken = token.accessToken;
      session.tokenType = token.tokenType;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});
