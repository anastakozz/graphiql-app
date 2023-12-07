import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

type props = {
  children: ReactNode;
};

export default function Layout({ children }: props) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
