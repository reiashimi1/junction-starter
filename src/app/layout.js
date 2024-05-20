import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/GlobalRedux/provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cloud Ten VIP",
  description:
    "This is for an e-commerce website, named Cloud Ten VIP, that sells different products (e.g. vapes)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
