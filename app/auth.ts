import NextAuth from "next-auth";
import authOptions from "./api/auth/[...nextauth]/options";

// Export the NextAuth functions directly
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);