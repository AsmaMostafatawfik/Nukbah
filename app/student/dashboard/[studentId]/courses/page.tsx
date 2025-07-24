// import Image from "next/image";

// const courses = [
//   {
//     id: 1,
//     title: "الرياضيات المتقدمة",
//     instructor: "د. روبيرت شين",
//     progress: 75,
//     image: "/images/course-math.jpg",
//     category: "العلوم",
//     assignments: 5,
//   },
//   {
//     id: 2,
//     title: "الفيزياء الحديثة",
//     instructor: "أ. إيميلي واتسون",
//     progress: 60,
//     image: "/images/course-science.jpg",
//     category: "العلوم",
//     assignments: 3,
//   },
//   {
//     id: 3,
//     title: "الأدب العالمي",
//     instructor: "د. جيمس ويلسون",
//     progress: 85,
//     image: "/images/course-literature.jpg",
//     category: "الآداب",
//     assignments: 2,
//   }
// ];

// export default function CoursesPage() {
//   return (
//     <div className="space-y-8">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-gray-800">مقرراتي الدراسية</h1>
//         <div className="flex gap-3">
//           <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium transition-colors">
//             جميع المقررات
//           </button>
//           <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
//             تسجيل مقرر جديد
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {courses.map((course) => (
//           <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-105 overflow-hidden hover:shadow-md transition-shadow text-right">
//             <div className="relative h-40">
//               <Image
//                 src={course.image}
//                 alt={course.title}
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <div className="p-6">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-800">{course.title}</h3>
//                   <p className="text-sm text-gray-500">المدرس: {course.instructor}</p>
//                 </div>
//                 <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs">
//                   {course.category}
//                 </span>
//               </div>

//               <div className="mt-4">
//                 <div className="flex justify-between text-sm mb-1">
//                   <span className="text-gray-500">التقدم</span>
//                   <span className="font-medium text-indigo-600">{course.progress}%</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div 
//                     className="bg-indigo-600 h-2 rounded-full" 
//                     style={{ width: `${course.progress}%` }}
//                   ></div>
//                 </div>
//               </div>

//               <div className="mt-4 flex justify-between items-center">
//                 <div className="text-sm text-gray-500">
//                   {course.assignments} واجبات
//                 </div>
//                 <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
//                   عرض المقرر
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }















"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string | null; // Changed to match profile image type
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required");
        }

        const coursesResponse = await fetch(
          "http://elearning1.runasp.net/api/Student/AllCourses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!coursesResponse.ok) {
          throw new Error("Failed to fetch courses");
        }

        const coursesData = await coursesResponse.json();
        setCourses(coursesData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        خطأ: {error}
        <br />
        <button 
          onClick={() => window.location.href = "/login"}
          className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          الرجوع إلى صفحة تسجيل الدخول
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">مقرراتي الدراسية</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium transition-colors">
            جميع المقررات
          </button>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
            تسجيل مقرر جديد
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-sm border border-gray-105 overflow-hidden hover:shadow-md transition-shadow text-right"
          >
            <div className="relative h-40">
              {course.image ? (
                <Image
                  src={`data:image/jpeg;base64,${course.image}`}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">لا توجد صورة</span>
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {course.title}
                  </h3>
                </div>
                <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs">
                  {course.price} ر.س
                </span>
              </div>

              <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                {course.description}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                  عرض المقرر
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}