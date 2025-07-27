// "use client";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { User, BookOpen, LogOut } from "lucide-react";
// import { useEffect, useState } from "react";
// import Image from "next/image";

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [studentId, setStudentId] = useState<string | null>(null);

//   useEffect(() => {
//     const userData = localStorage.getItem('user');
//     const pathParts = pathname.split('/');
//     const idFromPath = pathParts[3];
    
//     if (userData) {
//       const user = JSON.parse(userData);
//       if (user.id) {
//         setStudentId(user.id);
//         if (idFromPath !== user.id) {
//           router.replace(`/student/dashboard/${user.id}${pathname.split('/').slice(4).join('/')}`);
//         }
//       }
//     } else if (idFromPath) {
//       setStudentId(idFromPath);
//     } else {
//       router.push('/login');
//     }
//   }, [pathname]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     router.push('/login');
//   };

//   if (!studentId) {
//     return <div className="flex justify-center items-center h-screen">جار التحميل...</div>;
//   }

//   return (
//     <div  dir="rtl">
//       {/* Header with custom shadow */}
//       <header className="bg-white py-4 px-6 shadow-[0_1px_3px_0_#cfb195,0_1px_2px_-1px_rgba(0,0,0,0.1)]">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           {/* Larger Logo */}
//           <div className="flex items-center">
//             <Link href={studentId ? `/student/dashboard/${studentId}` : '#'}>
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

//           {/* Navigation Links */}
//           <div className="flex items-center space-x-6">
//             <Link 
//               href={studentId ? `/student/dashboard/${studentId}/courses` : '#'}
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
//               href={studentId ? `/student/dashboard/${studentId}/profile` : '#'}
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

//       {/* Main Content with custom shadow */}
//       <main >
       
//           {children}
       
//       </main>

//       {/* Footer */}
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
import { User, BookOpen, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
          <div className="flex items-center">
            <Link href="/student/dashboard">
              <div className="w-48 h-16 relative">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
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
        </div>
      </header>

      <main>{children}</main>

      <footer className="bg-gray-100 py-4 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-gray-600 text-sm">
          <div>© {new Date().getFullYear()} جميع الحقوق محفوظة</div>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-blue-600">الشروط والأحكام</Link>
            <Link href="#" className="hover:text-blue-600">سياسة الخصوصية</Link>
            <Link href="#" className="hover:text-blue-600">اتصل بنا</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}