
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, BookOpen, Settings, LogOut, Home, BarChart, Users, FileText, MessageSquare } from "lucide-react";
import { JSX, useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [teacherId, setTeacherId] = useState<string | null>(null);
  const sidebarColor = "#3a5a78";
  const accentColor = "#d4a76a";
  const bgColor = "#f8f9fa";

  useEffect(() => {
    // Get teacher ID from localStorage or path
    const userData = localStorage.getItem('user');
    const pathParts = pathname.split('/');
    const idFromPath = pathParts[3]; // /teacher/dashboard/[teacherId]/...
    
    if (userData) {
      const user = JSON.parse(userData);
      if (user.id) {
        setTeacherId(user.id);
        // Ensure URL has correct ID
        if (idFromPath !== user.id) {
          router.replace(`/teacher/dashboard/${user.id}${pathname.split('/').slice(4).join('/')}`);
        }
      }
    } else if (idFromPath) {
      setTeacherId(idFromPath);
    } else {
      router.push('/login');
    }
  }, [pathname]);

  const NavItem = ({ href, label, icon }: { href: string; label: string; icon: JSX.Element }) => (
    <Link
      href={teacherId ? `/teacher/dashboard/${teacherId}${href}` : '#'}
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

  if (!teacherId) {
    return <div className="flex justify-center items-center h-screen">جار التحميل...</div>;
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: bgColor }} dir="rtl">
      <aside className="w-64 p-6 space-y-8 flex flex-col" style={{ backgroundColor: sidebarColor }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: accentColor }}>
            <BookOpen className="text-white" size={20} />
          </div>
          <h2 className="text-xl font-bold text-white">لوحة المعلم</h2>
        </div>
        
        <nav className="space-y-2">
          <NavItem href="" label="الرئيسية" icon={<Home size={18} />} />
          <NavItem href="/profile" label="الملف الشخصي" icon={<User size={18} />} />
          <NavItem href="/courses" label="الدورات" icon={<BookOpen size={18} />} />
          <NavItem href="/students" label="الطلاب" icon={<Users size={18} />} />
          <NavItem href="/grades" label="التقييمات" icon={<BarChart size={18} />} />
          <NavItem href="/assignments" label="الواجبات" icon={<FileText size={18} />} />
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