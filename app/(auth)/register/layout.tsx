import type { Metadata } from 'next';
// import LoginNavBar from '../../components/Navigation/LoginNavBar';

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
