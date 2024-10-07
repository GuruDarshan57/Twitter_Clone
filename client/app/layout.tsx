import type { Metadata } from "next";
import "@styles/globals.css";
import Sidebar from "@components/Leftbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import RightBar from "@components/RightBar";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/assets/x_logo.jpg" type="image/x-icon" />
      <title>X - Clone</title>

      <body>
        <GoogleOAuthProvider clientId="720949350429-a2bsge3dno32g7a6n3nnem30ao3m2t1k.apps.googleusercontent.com">
          <div className="w-full h-full px-28 grid grid-cols-10">
            <div className="h-full col-span-2">
              <Sidebar />
            </div>
            {children}
            <div className="h-full col-span-3">
              <RightBar />
            </div>
          </div>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
