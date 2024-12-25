import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./compoents/Header";
import { ThemeProvider } from "next-themes";
import ThemeCom from "./compoents/ThemeCom";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeModeScript } from "flowbite-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
     <head>
      <ThemeModeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ThemeCom>
            <Header />
            {children}
          </ThemeCom>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
