import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// В реальном приложении здесь должна быть работа с базой данных
// Для демо используем простой массив
let mockUsers = [
  {
    id: "1",
    email: "gala@agrosense.ai",
    password: "password123",
    name: "Гала",
  },
];

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Все поля обязательны" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Пароль должен содержать минимум 6 символов" },
        { status: 400 }
      );
    }

    // Проверка на существующего пользователя
    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: "Пользователь с таким email уже существует" },
        { status: 409 }
      );
    }

    // Создание нового пользователя
    const newUser = {
      id: String(mockUsers.length + 1),
      email,
      password, // В реальном приложении пароль должен быть хеширован (bcrypt)
      name,
    };

    mockUsers.push(newUser);

    // Создание JWT токена
    const token = Buffer.from(
      JSON.stringify({ userId: newUser.id, email: newUser.email })
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
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}

