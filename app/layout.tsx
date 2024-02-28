import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import ConvexClientProvider from "@/providers/convex_client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Drawing clone",
  description: "Made by Benjamin",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen")}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
