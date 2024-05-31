import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/GlobalRedux/provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GiraffEV",
  description:
    "Plug your car. Charge to go far",
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
