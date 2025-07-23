export default function AttendancePage() {
  const attendanceData = [
    { month: "سبتمبر", present: 22, absent: 0, late: 1 },
    { month: "أكتوبر", present: 20, absent: 1, late: 2 },
  ];

  const recentRecords = [
    { date: "اليوم", status: "حاضر", time: "08:15 ص" },
    { date: "أمس", status: "حاضر", time: "08:20 ص" },
    { date: "28 نوفمبر", status: "متأخر", time: "08:45 ص" },
  ];

  return (
    <div className="space-y-8 text-right">
      <h1 className="text-3xl font-bold text-gray-800">الحضور والغياب</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-105">
          <h3 className="font-medium text-gray-500 mb-2">معدل الحضور</h3>
          <p className="text-4xl font-bold text-emerald-600">96%</p>
          <p className="text-sm text-gray-500 mt-1">لهذا الفصل</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-105">
          <h3 className="font-medium text-gray-500 mb-2">أيام الحضور</h3>
          <p className="text-4xl font-bold text-blue-600">60</p>
          <p className="text-sm text-gray-500 mt-1">من أصل 62 يوم</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-105">
          <h3 className="font-medium text-gray-500 mb-2">التأخر</h3>
          <p className="text-4xl font-bold text-amber-600">3</p>
          <p className="text-sm text-gray-500 mt-1">لهذا الفصل</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-105">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">الحضور الشهري</h2>
          <div className="space-y-4">
            {attendanceData.map((monthData, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-800">{monthData.month}</span>
                  <span className="text-sm text-gray-500">
                    {Math.round((monthData.present / (monthData.present + monthData.absent)) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-600 h-2 rounded-full" 
                    style={{ width: `${(monthData.present / (monthData.present + monthData.absent)) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{monthData.present} حاضر</span>
                  <span>{monthData.absent} غائب</span>
                  <span>{monthData.late} متأخر</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-105">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">سجل الحضور الحديث</h2>
          <div className="space-y-4">
            {recentRecords.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="text-right">
                  <h3 className="font-medium text-gray-800">{record.date}</h3>
                  <p className="text-sm text-gray-500">{record.time}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  record.status === "حاضر" 
                    ? "bg-emerald-100 text-emerald-800" 
                    : "bg-amber-100 text-amber-800"
                }`}>
                  {record.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}