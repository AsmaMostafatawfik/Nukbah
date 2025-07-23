import Header from './components/Header';
import Footer from './components/Footer';
import Image from "next/image";
import Link from 'next/link'
import { FaUser, FaUserPlus } from 'react-icons/fa' // Importing icons from react-icons
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}