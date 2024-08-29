import { Inter } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from '@clerk/nextjs'
import { shadesOfPurple } from "@clerk/themes"
import Header from "./components/Header"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CleverCards",
  description: "Created by Karl",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
      }}
    >
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
