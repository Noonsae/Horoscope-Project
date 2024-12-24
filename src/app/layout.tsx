import type { Metadata } from 'next';

import MyProvider from './_providers/Provider';

import '@/styles/globals.css';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'Horoscope Project',
  description: '별자리를 통해 일일 운세와 신년 운세를 알려주는 앱'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning={true}>
      <link rel="icon" href="/icons/bee.png" sizes="any" />
      <MyProvider>
        <body className="dark:bg-[#0a1428]">
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </MyProvider>
    </html>
  );
}
