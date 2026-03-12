import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Teste TV | Notícias e Entretenimento",
    template: "%s | Teste TV" // Isso adiciona o nome do site automaticamente em todas as páginas
  },
  description: "As melhores notícias de Esportes, Entretenimento e Videogame.",
  keywords: ["Teste TV", "notícias de entretenimento", "últimas notícias de esportes", "games e tecnologia", "curitiba", "futebol", "lançamento de games", "portal de notícias"],
  authors: [{ name: "Raphael" }],
  robots: "index, follow", // Diz ao Google para ler o site
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>

        {children}
      </body>
    </html>
  );
}
