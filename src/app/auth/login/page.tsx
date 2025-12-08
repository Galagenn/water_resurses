'use client';

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Ошибка входа");
        setLoading(false);
        return;
      }

      // Успешный вход - редирект на сохраненный URL или /account
      const redirect = searchParams.get("redirect") || "/account";
      router.push(redirect);
      router.refresh();
    } catch (err) {
      setError("Произошла ошибка при входе");
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 400 }}>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Stack spacing={3}>
              <Stack spacing={1} alignItems="center">
                <Typography variant="h4" component="h1">
                  Вход
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Войдите в свой аккаунт
                </Typography>
              </Stack>

              {error && (
                <Alert severity="error" onClose={() => setError("")}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2.5}>
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    autoComplete="email"
                  />
                  <TextField
                    label="Пароль"
                    type="password"
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    autoComplete="current-password"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
                    sx={{ mt: 1 }}
                  >
                    {loading ? "Вход..." : "Войти"}
                  </Button>
                </Stack>
              </Box>

              <Stack direction="row" justifyContent="center" spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Нет аккаунта?
                </Typography>
                <Link href="/auth/register" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "primary.main",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Зарегистрироваться
                  </Typography>
                </Link>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

