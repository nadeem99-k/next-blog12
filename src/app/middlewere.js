import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect all routes except public assets and auth routes
    "/((?!_next|static|public|.*\\.(?:js|css|json|html|jpg|jpeg|png|svg|gif|ico|woff|woff2|ttf|map|txt|csv|zip)|sign-in|sign-up).*)",
    "/(api|trpc)(.*)",
  ],
};
