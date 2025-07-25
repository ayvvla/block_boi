import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import ReactQueryProvider from "./ReactQueryProvider";
import { Toaster } from "../components/ui/sonner";
import { ThemeProvider } from "next-themes";
// import Footer from "./Footer";

const lora = Lora({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Block boi",
    absolute: "Block boi",
  },
  description: "One stop shop for your fashion wears",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lora.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <Navbar />
            {children}
            {/* <Footer /> */}
          </ReactQueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
