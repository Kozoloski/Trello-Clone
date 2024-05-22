import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req) {
    if(auth.userId && auth.isPublicRoute) {
      let path = "/select-org";

      if (auth.orgId) {
        path =  `/organization/${auth.orgId}`;
      }

      const orgSelection = new URL(path, req.url);
      return NextResponse.redirect(orgSelection);
    }

    if(!auth.userId && !auth.isPublicRoute) {
      return this.redirectToSignIn ({ returnBackUrl: req.url });
    }

    if(auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
      const orgSelection = new URL("/select-rtg", req.url);
      return NextResponse.redirect(orgSelection);
    }
  }
});



export const config = {
  matcher: ["/((?!.*\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};