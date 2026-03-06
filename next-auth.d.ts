import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    accessToken: string;
    tokenType: string;
  }

  interface Session {
    accessToken?: string;
    tokenType?: string;
    user: {
      name?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string;
    accessToken?: string;
    tokenType?: string;
  }
}
