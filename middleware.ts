import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("auth_token");

  // Разрешаем доступ к страницам аутентификации без проверки
  if (pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  // Если нет токена и пользователь пытается зайти на защищенную страницу
  if (!authToken && pathname !== "/auth/login" && pathname !== "/auth/register") {
    const loginUrl = new URL("/auth/login", request.url);
    // Сохраняем URL, на который пользователь хотел зайти, для редиректа после входа
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Настройка путей, для которых будет применяться middleware
export const config = {
  matcher: [
    /*
     * Применяется ко всем путям кроме:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

