import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Linktree Clone',
  description: 'Your personal link hub',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
