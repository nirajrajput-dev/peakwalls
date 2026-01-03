import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Peakwalls",
  description:
    "Explore stunning wallpapers, grouped by their titles for easy browsing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "Manrope, sans-serif" }}>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1a1a1a",
              color: "#FDFDFD",
              border: "1px solid #333",
              fontFamily: "Manrope, sans-serif",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#FDFDFD",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#FDFDFD",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
