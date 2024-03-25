import { Inter, Murecho } from "next/font/google";
import "./globals.css";

const inter = Murecho({ subsets: ["latin"] });

export const metadata = {
  title: "Langbytes",
  description: "Quickly get problems to test your coding skills",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
      
        <body className={inter.className}>{children}</body>
      </html>
    </>
  );
}
