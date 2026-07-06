import type { Metadata } from "next";
import { Aref_Ruqaa, Tajawal } from "next/font/google";
import "./globals.css";

const displayFont = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-display",
});

const bodyFont = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "كنافة أبو صابر | كنافة نابلسية أصيلة",
  description:
    "كنافة أبو صابر، صناعة يومية طازجة بوصفة نابلسية أصيلة. اطلب الآن أو زورنا في نابلس.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="font-body bg-base text-cream antialiased">
        {children}
      </body>
    </html>
  );
}
