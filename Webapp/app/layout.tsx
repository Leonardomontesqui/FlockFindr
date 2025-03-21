import "./globals.css"; // Ensure you have a global CSS file for custom styles if needed
import React from "react";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Flock Finder",
  viewport: "width=device-width, initial-scale=1.0",
  charset: "UTF-8",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet={metadata.charset} />
        <meta name="viewport" content={metadata.viewport} />
        <title>{metadata.title}</title>
      </head>
      <body className="m-0 p-0 h-screen w-full overflow-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
