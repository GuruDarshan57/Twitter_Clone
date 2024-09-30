import type { Metadata } from "next";
import '@styles/globals.css'
import Sidebar from "@components/Sidebar";

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
        <div className="w-full h-full px-32 grid grid-cols-10">
        <div className="h-full col-span-2"><Sidebar/></div>
        {children}
        <div className="col-span-3">Search and follow list</div>
        </div>
      </body>
    </html>
  );
}
