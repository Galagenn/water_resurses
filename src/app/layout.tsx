import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MuiThemeProvider from "@/components/providers/MuiThemeProvider";
import AppLayout from "@/components/layout/AppLayout";
import { ActionPlanProvider } from "@/contexts/ActionPlanContext";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "AgroSense AI · Панель мониторинга",
  description: "Интерактивный интерфейс ИИ-агента для агросектора",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <MuiThemeProvider>
          <ActionPlanProvider>
            <AppLayout>{children}</AppLayout>
          </ActionPlanProvider>
        </MuiThemeProvider>
      </body>
    </html>
  );
}
