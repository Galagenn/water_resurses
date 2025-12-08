import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// В реальном приложении здесь должна быть проверка с базой данных
// Для демо используем простую проверку
const mockUsers = [
  {
    id: "1",
    email: "gala@agrosense.ai",
    password: "password123", // В реальном приложении пароль должен быть хеширован
    name: "Гала",
  },
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email и пароль обязательны" },
        { status: 400 }
      );
    }

    // Поиск пользователя
    const user = mockUsers.find((u) => u.email === email);

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Неверный email или пароль" },
        { status: 401 }
      );
    }

    // Создание JWT токена (в реальном приложении используйте библиотеку типа jsonwebtoken)
    const token = Buffer.from(
      JSON.stringify({ userId: user.id, email: user.email })
    ).toString("base64");

    // Сохранение токена в cookie
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 дней
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}

