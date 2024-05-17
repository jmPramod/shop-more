import type { Metadata } from 'next';

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* <LoginNavBar /> */}
      {children}
    </div>
  );
}
