import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // // can be accessed while signed out
  publicRoutes: ["/"],
  // // Auth ignored routes
  // ignoredRoutes: [
  // ]
});

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
