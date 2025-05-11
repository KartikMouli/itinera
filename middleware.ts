import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
    const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
        baseURL: request.nextUrl.origin,
        headers: {
            cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
        },
    });

    // Get the current path
    const path = request.nextUrl.pathname;

    // If user is authenticated and tries to access auth routes
    if (session && (path.startsWith('/auth'))) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // If user is not authenticated and tries to access protected routes
    if (!session && path.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',  // Protect all dashboard routes
        '/auth/:path*'       // Protect all auth routes
    ],
};