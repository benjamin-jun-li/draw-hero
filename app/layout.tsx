import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import ConvexClientProvider from "@/providers/convex_client";
import { Toaster } from "@/components/ui/sonner";
import ModalProvider from "@/providers/modal_provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Draw Hero",
  description: "Made by Benjamin Li",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen")}>
        <Toaster richColors />

        <ConvexClientProvider>
          <ModalProvider />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
