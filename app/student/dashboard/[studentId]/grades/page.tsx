export default function GradesPage() {
  const subjects = [
    {
      name: "الرياضيات",
      grade: "أ",
      percentage: 92,
      assignments: [
        { name: "اختبار الجبر", score: "95/100", date: "15 أكتوبر" },
        { name: "اختبار التفاضل", score: "88/100", date: "2 نوفمبر" },
      ],
    },
    {
      name: "الفيزياء",
      grade: "ب+",
      percentage: 87,
      assignments: [
        { name: "اختبار الميكانيكا", score: "85/100", date: "18 أكتوبر" },
      ],
    }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">الدرجات</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-105 text-right">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">الفصل الحالي</h2>
          <div className="flex gap-2">
            <select className="bg-gray-100 border border-gray-200 text-gray-700 rounded-lg px-3 py-2 text-sm">
              <option>فصل الخريف 2023</option>
              <option>فصل الربيع 2023</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {subjects.map((subject, index) => (
            <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">{subject.name}</h3>
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-indigo-600">
                    {subject.grade}
                  </div>
                  <div className="text-gray-500">
                    {subject.percentage}%
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {subject.assignments.map((assignment, aIndex) => (
                  <div key={aIndex} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="text-right">
                      <h4 className="font-medium text-gray-800">{assignment.name}</h4>
                      <p className="text-sm text-gray-500">{assignment.date}</p>
                    </div>
                    <div className="font-medium">
                      {assignment.score}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}