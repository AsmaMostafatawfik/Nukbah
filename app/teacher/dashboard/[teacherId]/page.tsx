import { BookOpen, MessageSquare } from "lucide-react";

// app/user/dashboard/page.tsx
export default function DashboardPage() {
  const upcomingAssignments = [
    { id: 1, course: "الرياضيات", title: "واجب الجبر", dueDate: "غداً" },
    { id: 2, course: "الأدب", title: "مسودة المقال", dueDate: "بعد 3 أيام" },
    { id: 3, course: "العلوم", title: "تقرير المختبر", dueDate: "الأسبوع القادم" },
  ];

  const recentAnnouncements = [
    { id: 1, title: "إشعار عطلة المدرسة", date: "منذ ساعتين" },
    { id: 2, title: "تسجيل معرض العلوم", date: "منذ يوم" },
    { id: 3, title: "فعاليات أسبوع المكتبة", date: "منذ 3 أيام" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">مرحباً بعودتك، سارة!</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-120">
          <h3 className="font-medium text-gray-500 mb-2">المقررات النشطة</h3>
          <p className="text-3xl font-bold text-indigo-600">5</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-120">
          <h3 className="font-medium text-gray-500 mb-2">الواجبات المستحقة</h3>
          <p className="text-3xl font-bold text-amber-600">3</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-120">
          <h3 className="font-medium text-gray-500 mb-2">الحضور</h3>
          <p className="text-3xl font-bold text-emerald-600">98%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-120">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">الواجبات القادمة</h2>
          <div className="space-y-4">
            {upcomingAssignments.map((assignment) => (
              <div key={assignment.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="text-indigo-600" size={16} />
                </div>
                <div className="flex-1 text-right">
                  <h3 className="font-medium text-gray-800">{assignment.title}</h3>
                  <p className="text-sm text-gray-500">{assignment.course}</p>
                </div>
                <div className="text-sm text-amber-600">{assignment.dueDate}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-120">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">الإعلانات الحديثة</h2>
          <div className="space-y-4">
            {recentAnnouncements.map((announcement) => (
              <div key={announcement.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="text-blue-600" size={16} />
                </div>
                <div className="flex-1 text-right">
                  <h3 className="font-medium text-gray-800">{announcement.title}</h3>
                  <p className="text-sm text-gray-500">{announcement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}