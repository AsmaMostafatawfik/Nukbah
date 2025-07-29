
// "use client";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { User, BookOpen, LogOut } from "lucide-react";
// import { useEffect, useState } from "react";
// import Image from "next/image";

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');
    
//     if (!token || !userData) {
//       router.push('/login');
//     } else {
//       setIsAuthenticated(true);
//     }
//   }, [pathname]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     router.push('/login');
//   };

//   if (!isAuthenticated) {
//     return <div className="flex justify-center items-center h-screen">جار التحميل...</div>;
//   }

//   return (
//     <div dir="rtl">
//       <header className="bg-white py-4 px-6 shadow-[0_1px_3px_0_#cfb195,0_1px_2px_-1px_rgba(0,0,0,0.1)]">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center">
//             <Link href="/student/dashboard">
//               <div className="w-48 h-16 relative">
//                 <Image
//                   src="/images/logo.png"
//                   alt="Logo"
//                   fill
//                   className="object-contain"
//                   priority
//                 />
//               </div>
//             </Link>
//           </div>

//           <div className="flex items-center space-x-6">
//             <Link 
//               href="/student/dashboard/courses"
//               className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
//                 pathname.includes('/courses') 
//                   ? 'bg-blue-50 text-blue-600' 
//                   : 'text-gray-600 hover:bg-gray-100'
//               }`}
//             >
//               <BookOpen size={20} />
//               <span className="font-medium text-base">المقررات</span>
//             </Link>

//             <Link 
//               href="/student/dashboard/profile"
//               className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
//                 pathname.includes('/profile') 
//                   ? 'bg-blue-50 text-blue-600' 
//                   : 'text-gray-600 hover:bg-gray-100'
//               }`}
//             >
//               <User size={20} />
//               <span className="font-medium text-base">الملف الشخصي</span>
//             </Link>

//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <LogOut size={20} />
//               <span className="font-medium text-base">تسجيل الخروج</span>
//             </button>
//           </div>
//         </div>
//       </header>

//       <main>{children}</main>

//       <footer className="bg-gray-100 py-4 px-6 border-t border-gray-200">
//         <div className="max-w-7xl mx-auto flex items-center justify-between text-gray-600 text-sm">
//           <div>© {new Date().getFullYear()} جميع الحقوق محفوظة</div>
//           <div className="flex space-x-4">
//             <Link href="#" className="hover:text-blue-600">الشروط والأحكام</Link>
//             <Link href="#" className="hover:text-blue-600">سياسة الخصوصية</Link>
//             <Link href="#" className="hover:text-blue-600">اتصل بنا</Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }








"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, BookOpen, LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!isAuthenticated) {
    return <div className="flex justify-center items-center h-screen">جار التحميل...</div>;
  }

  return (
    <div dir="rtl">
      <header className="bg-white py-4 px-6 shadow-[0_1px_3px_0_#cfb195,0_1px_2px_-1px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Container - Improved */}
         <div className="flex items-center flex-shrink-0 mr-4">
            <Link href="/student/dashboard" className="block focus:outline-none">
              <div className="relative" style={{ width: 'clamp(120px, 18vw, 180px)', height: 'clamp(40px, 6vw, 60px)' }}>
                <Image
                  src="/images/logo.png"
                  alt="شعار الأكاديمية"
                  fill
                  className="object-contain object-left"
                  priority
                  quality={100}
                  sizes="(max-width: 640px) 120px, 180px"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/images/logo.png';
                  }}
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/student/dashboard/courses"
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                pathname.includes('/courses') 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BookOpen size={20} />
              <span className="font-medium text-base">المقررات</span>
            </Link>

            <Link 
              href="/student/dashboard/profile"
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                pathname.includes('/profile') 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <User size={20} />
              <span className="font-medium text-base">الملف الشخصي</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium text-base">تسجيل الخروج</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link 
              href="/student/dashboard/courses"
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors block ${
                pathname.includes('/courses') 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <BookOpen size={20} />
              <span className="font-medium text-base">المقررات</span>
            </Link>

            <Link 
              href="/student/dashboard/profile"
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors block ${
                pathname.includes('/profile') 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <User size={20} />
              <span className="font-medium text-base">الملف الشخصي</span>
            </Link>

            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors w-full"
            >
              <LogOut size={20} />
              <span className="font-medium text-base">تسجيل الخروج</span>
            </button>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="bg-gray-100 py-4 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-gray-600 text-sm gap-4">
          <div>© {new Date().getFullYear()} جميع الحقوق محفوظة</div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#" className="hover:text-blue-600">الشروط والأحكام</Link>
            <Link href="#" className="hover:text-blue-600">سياسة الخصوصية</Link>
            <Link href="#" className="hover:text-blue-600">اتصل بنا</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}