// // app/user/dashboard/layout.tsx
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   LogOut,
//   User,
//   BookOpen,
//   BarChart,
//   CheckCircle,
//   Home,
//   Calendar,
//   MessageSquare,
//   Settings,
// } from "lucide-react";
// import { JSX } from "react";
// import Image from "next/image";

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();

//   const NavItem = ({ href, label, icon }: { href: string; label: string; icon: JSX.Element }) => {
//     const active = pathname.startsWith(href);
//     return (
//       <Link
//         href={href}
//         className={`flex items-center gap-3 w-full text-right px-4 py-3 rounded-lg transition-all rtl:text-right
//           ${active ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-100"}`}
//       >
//         <span className={`p-2 rounded-lg ${active ? 'bg-indigo-100' : 'bg-gray-100'}`}>
//           {icon}
//         </span>
//         <span className="text-sm font-medium">{label}</span>
//       </Link>
//     );
//   };

//   const handleLogout = () => {
//     console.log("Logout clicked");
//     // Add real logout logic
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <aside className="w-72 bg-white border-l border-gray-200 p-6 space-y-8 flex flex-col">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center">
//             <BookOpen className="text-white" size={20} />
//           </div>
//           <h2 className="text-xl font-bold text-gray-800">بوابة التعليم</h2>
//         </div>
        
//         <div className="flex-1 space-y-6">
//           <nav className="space-y-2">
//             <NavItem href="/student/dashboard" label="الرئيسية" icon={<Home size={18} />} />
//             <NavItem href="/student/dashboard/${studentId}/profile" label="الملف الشخصي" icon={<User size={18} />} />
//             <NavItem href="/student/dashboard/${studentId}/courses" label="المقررات" icon={<BookOpen size={18} />} />
//             <NavItem href="/student/dashboard/${studentId}/grades" label="الدرجات" icon={<BarChart size={18} />} />
//             <NavItem href="/student/dashboard/${studentId}/attendance" label="الحضور" icon={<CheckCircle size={18} />} />
//             <NavItem href="/calendar" label="التقويم" icon={<Calendar size={18} />} />
//             <NavItem href="/messages" label="الرسائل" icon={<MessageSquare size={18} />} />
//           </nav>
//         </div>

//         <div className="space-y-4">
//           <NavItem href="/settings" label="الإعدادات" icon={<Settings size={18} />} />
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition-colors w-full px-4 py-3"
//           >
//             <span className="p-2 rounded-lg bg-gray-100">
//               <LogOut size={18} />
//             </span>
//             <span className="text-sm font-medium">تسجيل الخروج</span>
//           </button>
//         </div>
//       </aside>

//       <main className="flex-1 p-8 overflow-y-auto">
//         <div className="max-w-6xl mx-auto">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// }








"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, BookOpen, Settings, LogOut, Home, BarChart, CheckCircle, Calendar, MessageSquare } from "lucide-react";
import { JSX, useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [studentId, setStudentId] = useState<string | null>(null);
  const sidebarColor = "#3a5a78"; // Blue color from your design
  const accentColor = "#d4a76a"; // Gold accent color
  const bgColor = "#f8f9fa"; // Light background color

  useEffect(() => {
    // Get student ID from localStorage or path
    const userData = localStorage.getItem('user');
    const pathParts = pathname.split('/');
    const idFromPath = pathParts[3]; // /student/dashboard/[studentId]/...
    
    if (userData) {
      const user = JSON.parse(userData);
      if (user.id) {
        setStudentId(user.id);
        // Ensure URL has correct ID
        if (idFromPath !== user.id) {
          router.replace(`/student/dashboard/${user.id}${pathname.split('/').slice(4).join('/')}`);
        }
      }
    } else if (idFromPath) {
      setStudentId(idFromPath);
    } else {
      router.push('/login');
    }
  }, [pathname]);

  const NavItem = ({ href, label, icon }: { href: string; label: string; icon: JSX.Element }) => (
    <Link
      href={studentId ? `/student/dashboard/${studentId}${href}` : '#'}
      className={`flex items-center gap-3 w-full text-right px-4 py-3 rounded-lg transition-all
        ${pathname.includes(href) 
          ? "bg-white/20 text-white" 
          : "text-white/80 hover:bg-white/10"}`}
    >
      <span className={`p-2 rounded-lg ${pathname.includes(href) ? 'bg-white/30' : 'bg-white/10'}`}>
        {icon}
      </span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!studentId) {
    return <div className="flex justify-center items-center h-screen">جار التحميل...</div>;
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: bgColor }} dir="rtl">
      <aside className="w-64 p-6 space-y-8 flex flex-col" style={{ backgroundColor: sidebarColor }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: accentColor }}>
            <BookOpen className="text-white" size={20} />
          </div>
          <h2 className="text-xl font-bold text-white">بوابة الطالب</h2>
        </div>
        
        <nav className="space-y-2">
          <NavItem href="" label="الرئيسية" icon={<Home size={18} />} />
          <NavItem href="/profile" label="الملف الشخصي" icon={<User size={18} />} />
          <NavItem href="/courses" label="المقررات" icon={<BookOpen size={18} />} />
          <NavItem href="/grades" label="الدرجات" icon={<BarChart size={18} />} />
          <NavItem href="/attendance" label="الحضور" icon={<CheckCircle size={18} />} />
          <NavItem href="/calendar" label="التقويم" icon={<Calendar size={18} />} />
          <NavItem href="/messages" label="الرسائل" icon={<MessageSquare size={18} />} />
          <NavItem href="/settings" label="الإعدادات" icon={<Settings size={18} />} />
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 mt-auto text-white/80 hover:text-white transition-colors"
        >
          <span className="p-2 rounded-lg bg-white/10">
            <LogOut size={18} />
          </span>
          <span className="text-sm font-medium">تسجيل الخروج</span>
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-6">
          {children}
        </div>
      </main>
    </div>
  );
}