
// // app/layout.tsx
// import './globals.css'
// import Image from "next/image";
// import { Cairo } from 'next/font/google'
// import Link from 'next/link'
// import { FaUser, FaUserPlus } from 'react-icons/fa' // Importing icons from react-icons
// import '@fortawesome/fontawesome-free/css/all.min.css';

// const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '700', '900'] })

// export const metadata = {
//   title: 'بوابة التعليم - لوحة الطالب',
//   description: 'منصة تعليمية شاملة للطلاب',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="ar" dir="rtl">
//       <body className={`${cairo.className} bg-gray-50`}>
//         {/* Header Section */}
//         <header className="bg-white shadow-md">
//           <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//             {/* Navigation and Auth Links */}
//             <nav className="flex items-center gap-8">
//               <div className="flex items-center gap-4">
//                 <Link
//                   href="/login"
//                   className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition flex items-center gap-2"
//                 >
//                   <FaUser className="text-lg" />
//                   تسجيل الدخول
//                 </Link>
//                 <Link
//                   href="/you-are"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2"
//                 >
//                   <FaUserPlus className="text-lg" />
//                   إنشاء حساب جديد !
//                 </Link>
//               </div>
              
//               <div className="flex items-center gap-6">
//                 <Link
//                   href="/courses"
//                   className="text-gray-700 hover:text-blue-600 transition"
//                 >
//                   الدورات
//                 </Link>
//                 <Link
//                   href="/about"
//                   className="text-gray-700 hover:text-blue-600 transition"
//                 >
//                   عن المنصة
//                 </Link>
//                 <Link
//                   href="/"
//                   className="text-gray-700 hover:text-blue-600 transition"
//                 >
//                   الرئيسية
//                 </Link>
//               </div>
//             </nav>

//             {/* Logo and Site Name */}
//             <div className="flex items-center gap-2">
//               <div className="w-30 h-15 rounded-full overflow-hidden relative">
//                 <Image
//                   src="/images/logo.png"
//                   alt="شعار نُخبة"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main>{children}</main>

//         {/* Footer */}
//           <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-8">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="text-center space-y-8">
//             {/* Logo */}
//             <div>
//               <img
//                 src="/images/logo4.png"
//                 alt="Nokhba Logo"
//                 className="mx-auto h-20 w-auto"
//               />
//               <h3 className="text-2xl md:text-3xl font-bold mt-2">نُخبة</h3>
//             </div>

//             {/* Hotline Box */}
//            <div className="inline-flex items-center gap-4 border border-white/30 rounded-xl px-6 py-4 bg-white/10 hover:bg-white/20 transition-colors duration-300">
//   <div>
//     <p className="text-lg md:text-xl">الخط الساخن:</p>
//   </div>
//   <div className="flex items-center gap-2">
//     <a
//       href="tel:16546"
//       className="text-3xl md:text-4xl font-bold hover:text-blue-300 transition-colors"
//     >
//       16546
//     </a>
//     <svg 
//       xmlns="http://www.w3.org/2000/svg" 
//       className="h-8 w-8 text-blue-300" 
//       fill="none" 
//       viewBox="0 0 24 24" 
//       stroke="currentColor"
//     >
//       <path 
//         strokeLinecap="round" 
//         strokeLinejoin="round" 
//         strokeWidth={2} 
//         d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
//       />
//     </svg>
//   </div>
// </div>

//             {/* Social Media Icons with Rounded Backgrounds */}
//             <div className="flex justify-center gap-4 rtl:space-x-reverse mt-4">
//               <a
//                 href="#"
//                 className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white transition"
//               >
//                 <i className="fab fa-facebook-f text-xl"></i>
//               </a>
//               <a
//                 href="#"
//                 className="w-12 h-12 rounded-full flex items-center justify-center bg-sky-500 hover:bg-sky-400 text-white transition"
//               >
//                 <i className="fab fa-twitter text-xl"></i>
//               </a>
//               <a
//                 href="#"
//                 className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-pink-500 to-yellow-500 hover:opacity-90 text-white transition"
//               >
//                 <i className="fab fa-instagram text-xl"></i>
//               </a>
//               <a
//                 href="#"
//                 className="w-12 h-12 rounded-full flex items-center justify-center bg-red-600 hover:bg-red-500 text-white transition"
//               >
//                 <i className="fab fa-youtube text-xl"></i>
//               </a>
//             </div>

//             {/* Final Description */}
//             <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto mt-6">
//               تم صنع هذه المنصة بهدف تهيئة الطالب لـ كامل جوانب الثانوية العامة
//             </p>
//           </div>
//         </div>
//       </footer>
//       </body>
//     </html>
//   )
// }








import './globals.css';
import { Cairo } from 'next/font/google';
import { AuthProvider } from './context/AuthContext';

const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '700', '900'] });

export const metadata = {
  title: 'بوابة التعليم - لوحة الطالب',
  description: 'منصة تعليمية شاملة للطلاب',
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} bg-gray-50`}>
         <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}