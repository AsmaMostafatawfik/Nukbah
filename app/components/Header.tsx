'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FaUser, FaUserPlus } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <nav className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition flex items-center gap-2"
            >
              <FaUser className="text-lg" />
              تسجيل الدخول
            </Link>
            <Link
              href="/you-are"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2"
            >
              <FaUserPlus className="text-lg" />
              إنشاء حساب جديد !
            </Link>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/courses" className="text-gray-700 hover:text-blue-600 transition">
              الدورات
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
              عن المنصة
            </Link>
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
              الرئيسية
            </Link>
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <div className="w-30 h-15 rounded-full overflow-hidden relative">
            <Image
              src="/images/logo.png"
              alt="شعار نُخبة"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}