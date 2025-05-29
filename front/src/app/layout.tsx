import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: "Artefatos magicos bem baratin",
  description: "Só tem artefato brabo aqui heinnn",
  keywords: ["world of warcraft", "medieval", "explosive", "artefatos usados", "orgrimmar"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
