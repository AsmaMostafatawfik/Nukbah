// 'use client';
// import Link from 'next/link';
// import Image from 'next/image';
// import { FaUser, FaUserPlus } from 'react-icons/fa';

// export default function Header() {
//   return (
//     <header className="bg-white shadow-md">
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//         <nav className="flex items-center gap-8">
//           <div className="flex items-center gap-4">
//             <Link
//               href="/login"
//               className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition flex items-center gap-2"
//             >
//               <FaUser className="text-lg" />
//               تسجيل الدخول
//             </Link>
//             <Link
//               href="/you-are"
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2"
//             >
//               <FaUserPlus className="text-lg" />
//               إنشاء حساب جديد !
//             </Link>
//           </div>
          
//           <div className="flex items-center gap-6">
//             <Link href="/courses" className="text-gray-700 hover:text-blue-600 transition">
//               الدورات
//             </Link>
//             <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
//               عن المنصة
//             </Link>
//             <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
//               الرئيسية
//             </Link>
//           </div>
//         </nav>

//         <div className="flex items-center gap-2">
//           <div className="w-30 h-15 rounded-full overflow-hidden relative">
//             <Image
//               src="/images/logo.png"
//               alt="شعار نُخبة"
//               fill
//               className="object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }








//responsive header



'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FaUser, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md" dir="rtl">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo - Always visible */}
        <div className="flex items-center gap-2">
          <div className="w-30 h-15 rounded-full overflow-hidden relative">
            <Image
              src="/images/logo.png"
              alt="شعار نُخبة"
              width={120}
              height={60}
              className="object-cover"
            />
          </div>
        </div>

        {/* Mobile menu button - Hidden on desktop */}
        <button 
          className="md:hidden p-2 text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Navigation - Hidden on mobile when menu is closed */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:flex md:items-center md:gap-8 absolute md:static top-16 right-0 left-0 bg-white shadow-md md:shadow-none z-50 p-4 md:p-0`}>
          {/* Main Links */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-4 md:mb-0">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 transition w-full md:w-auto text-right md:text-center py-2 md:py-0"
              onClick={() => setIsMenuOpen(false)}
            >
              الرئيسية
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-blue-600 transition w-full md:w-auto text-right md:text-center py-2 md:py-0"
              onClick={() => setIsMenuOpen(false)}
            >
              عن المنصة
            </Link>
            <Link 
              href="/courses" 
              className="text-gray-700 hover:text-blue-600 transition w-full md:w-auto text-right md:text-center py-2 md:py-0"
              onClick={() => setIsMenuOpen(false)}
            >
              الدورات
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Link
              href="/login"
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition flex items-center justify-center gap-2 w-full md:w-auto"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaUser className="text-lg" />
              تسجيل الدخول
            </Link>
            <Link
              href="/you-are"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2 w-full md:w-auto"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaUserPlus className="text-lg" />
              إنشاء حساب جديد !
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}