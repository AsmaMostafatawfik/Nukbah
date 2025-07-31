
'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home, Users, BookOpen, CreditCard,
  UserCog, Settings, LogOut, User,
  Bookmark, UserCheck, Shield, Menu
} from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const primaryColor = "#1a365d"; // dark blue
  const secondaryColor = "#d4af37"; // gold

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const NavItem = ({
    href,
    label,
    icon
  }: {
    href: string;
    label: string;
    icon: React.ReactNode;
  }) => {
    const isActive = pathname.startsWith(href);

    return (
      <Link
        href={href}
        className={`flex items-center gap-3 w-full text-right px-4 py-3 rounded-lg transition-all 
          ${isActive
            ? `bg-white/10 text-white border-r-4 border-[${secondaryColor}]`
            : `text-white/80 hover:bg-white/10 hover:text-white`}`}
        onClick={() => isMobile && setIsSidebarOpen(false)}
      >
        <span className={`p-2 rounded-lg ${isActive
          ? `bg-white/20 text-white`
          : `bg-white/10 text-white/70`}`}>
          {icon}
        </span>
        <span className="text-sm font-medium">{label}</span>
      </Link>
    );
  };

  const handleLogout = () => {
    // Replace with actual logout logic
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ backgroundColor: primaryColor, color: 'white' }}>
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/20">
            <Shield className="text-white" size={20} />
          </div>
          <h2 className="text-xl font-bold">لوحة الإدارة</h2>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg bg-white/10"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* Sidebar */}
      <aside 
        className={`${isSidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-64 p-6 space-y-8 flex flex-col fixed md:static inset-0 z-50 md:z-auto`} 
        style={{ backgroundColor: primaryColor }}
      >
        {/* Close button for mobile */}
        {isMobile && (
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden absolute left-4 top-4 p-2 rounded-lg bg-white/10"
          >
            <Menu size={20} />
          </button>
        )}

        {/* Logo - hidden on mobile since we have it in header */}
        <div className="hidden md:flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/20">
            <Shield className="text-white" size={20} />
          </div>
          <h2 className="text-xl font-bold">لوحة الإدارة</h2>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex-1">
          <NavItem href="/admin/dashboard" label="الرئيسية" icon={<Home size={18} />} />
          <NavItem href="/admin/dashboard/students" label="الطلاب" icon={<UserCheck size={18} />} />
          <NavItem href="/admin/dashboard/teachers" label="المعلمين" icon={<UserCog size={18} />} />
          <NavItem href="/admin/dashboard/admins" label="المشرفين" icon={<Shield size={18} />} />
          <NavItem href="/admin/dashboard/courses" label="الكورسات" icon={<BookOpen size={18} />} />
          <NavItem href="/admin/dashboard/payments" label="المدفوعات" icon={<CreditCard size={18} />} />
          {/* <NavItem href="/admin/dashboard/settings" label="الإعدادات" icon={<Settings size={18} />} />
          <NavItem href="/admin/dashboard/profile" label="الملف الشخصي" icon={<User size={18} />} /> */}
        </nav>

        {/* Logout */}
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-white/80 hover:text-red-400 transition-colors"
          >
            <span className="p-2 rounded-lg bg-white/10">
              <LogOut size={18} />
            </span>
            <span className="text-sm font-medium">تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-white rounded-t-2xl md:rounded-tl-2xl shadow-inner text-black">
        {children}
      </main>
    </div>
  );
}