"use client";
import "@styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/assets/x_logo.jpg" type="image/x-icon" />
      <title>X - Clone</title>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div>
          <QueryClientProvider client={queryClient}>
            <GoogleOAuthProvider
              clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID || ""}
            >
              <div className="w-full h-full flex justify-center items-center">
                <Toaster
                  position="top-center"
                  reverseOrder={false}
                  toastOptions={{
                    style: { background: "#0ea5e9", color: "white" },
                  }}
                />
                {children}
              </div>
              <ReactQueryDevtools />
            </GoogleOAuthProvider>
          </QueryClientProvider>
        </div>
      </body>
    </html>
  );
}
