"use client";
import { Shield, MessageSquare, FileText, Users, Activity, Settings } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  // State for date to avoid hydration mismatch
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // This will only run on client side after hydration
    setCurrentDate(
      new Date().toLocaleDateString('ar-SA', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    );
  }, []);

  // Admin-specific data
  const recentActivities = [
    { id: 1, action: "تسجيل مستخدم جديد", user: "أحمد محمد", time: "منذ 15 دقيقة" },
    { id: 2, action: "تعديل صلاحيات", user: "نظام الإدارة", time: "منذ ساعة" },
    { id: 3, action: "تحديث النظام", user: "فريق التقنية", time: "منذ 3 ساعات" },
  ];

  const systemAlerts = [
    { id: 1, title: "نسخة احتياطية مطلوبة", priority: "medium", date: "منذ يوم" },
    { id: 2, title: "تحديث أمني متاح", priority: "high", date: "منذ يومين" },
    { id: 3, title: "مساحة التخزين 80% ممتلئة", priority: "low", date: "منذ أسبوع" },
  ];

  // Admin color scheme
  const primaryColor = "#1a365d"; // Dark blue
  const secondaryColor = "#d4af37"; // Gold
  const dangerColor = "#dc2626"; // Red for alerts
  const successColor = "#059669"; // Emerald green

  return (
   
    <div className="space-y-8" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold" style={{ color: primaryColor }}>لوحة تحكم المدير</h1>
        <div className="text-sm text-gray-500">
          {currentDate || "جاري التحميل..."}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-medium text-gray-500 mb-2">المستخدمون النشطون</h3>
          <p className="text-3xl font-bold" style={{ color: primaryColor }}>1,248</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-medium text-gray-500 mb-2">الطلبات الجديدة</h3>
          <p className="text-3xl font-bold" style={{ color: secondaryColor }}>24</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-medium text-gray-500 mb-2">مشاكل النظام</h3>
          <p className="text-3xl font-bold" style={{ color: dangerColor }}>3</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-medium text-gray-500 mb-2">إنتاجية النظام</h3>
          <p className="text-3xl font-bold" style={{ color: successColor }}>98%</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold" style={{ color: primaryColor }}>النشاطات الحديثة</h2>
            <button className="text-sm" style={{ color: secondaryColor }}>عرض الكل</button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" 
                     style={{ backgroundColor: `${primaryColor}20` }}>
                  <Activity className="text-sm" style={{ color: primaryColor }} />
                </div>
                <div className="flex-1 text-right">
                  <h3 className="font-medium text-gray-800">{activity.action}</h3>
                  <p className="text-sm text-gray-500">{activity.user}</p>
                </div>
                <div className="text-sm text-gray-400">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold" style={{ color: primaryColor }}>تنبيهات النظام</h2>
            <button className="text-sm" style={{ color: secondaryColor }}>عرض الكل</button>
          </div>
          <div className="space-y-4">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" 
                     style={{ 
                       backgroundColor: alert.priority === 'high' ? `${dangerColor}20` : 
                                      alert.priority === 'medium' ? `${secondaryColor}20` : '#f0f4ff'
                     }}>
                  <Shield className="text-sm" 
                          style={{ 
                            color: alert.priority === 'high' ? dangerColor : 
                                   alert.priority === 'medium' ? secondaryColor : primaryColor
                          }} />
                </div>
                <div className="flex-1 text-right">
                  <h3 className="font-medium text-gray-800">{alert.title}</h3>
                  <p className="text-sm text-gray-500">{alert.date}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                  alert.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {alert.priority === 'high' ? 'عالي' : alert.priority === 'medium' ? 'متوسط' : 'منخفض'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4" style={{ color: primaryColor }}>إجراءات سريعة</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 rounded-full mb-2 flex items-center justify-center" style={{ backgroundColor: `${primaryColor}20` }}>
              <Users style={{ color: primaryColor }} />
            </div>
            <span className="text-sm font-medium">إدارة المستخدمين</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 rounded-full mb-2 flex items-center justify-center" style={{ backgroundColor: `${secondaryColor}20` }}>
              <Settings style={{ color: secondaryColor }} />
            </div>
            <span className="text-sm font-medium">إعدادات النظام</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 rounded-full mb-2 flex items-center justify-center" style={{ backgroundColor: `${successColor}20` }}>
              <FileText style={{ color: successColor }} />
            </div>
            <span className="text-sm font-medium">التقارير</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 rounded-full mb-2 flex items-center justify-center" style={{ backgroundColor: `${dangerColor}20` }}>
              <MessageSquare style={{ color: dangerColor }} />
            </div>
            <span className="text-sm font-medium">الرسائل المهمة</span>
          </button>
        </div>
      </div>
    </div>
   
  );
}