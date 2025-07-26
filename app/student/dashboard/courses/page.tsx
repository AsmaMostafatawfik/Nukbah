// "use client";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// interface Course {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   image: string | null; // Changed to match profile image type
// }

// export default function CoursesPage() {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("Authentication required");
//         }

//         const coursesResponse = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/Student/AllCourses`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!coursesResponse.ok) {
//           throw new Error("Failed to fetch courses");
//         }

//         const coursesData = await coursesResponse.json();
//         setCourses(coursesData);
//         setLoading(false);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An unknown error occurred");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <div className="text-center py-8">جاري التحميل...</div>;
//   }

//   if (error) {
//     return (
//       <div className="text-center py-8 text-red-500">
//         خطأ: {error}
//         <br />
//         <button 
//           onClick={() => window.location.href = "/login"}
//           className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg"
//         >
//           الرجوع إلى صفحة تسجيل الدخول
//         </button>
//       </div>
//     );
//   }

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
//           <div
//             key={course.id}
//             className="bg-white rounded-xl shadow-sm border border-gray-105 overflow-hidden hover:shadow-md transition-shadow text-right"
//           >
//             <div className="relative h-40">
//               {course.image ? (
//                 <Image
//                   src={`data:image/jpeg;base64,${course.image}`}
//                   alt={course.title}
//                   fill
//                   className="object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                   <span className="text-gray-500">لا توجد صورة</span>
//                 </div>
//               )}
//             </div>
//             <div className="p-6">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-800">
//                     {course.title}
//                   </h3>
//                 </div>
//                 <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs">
//                   {course.price} ر.س
//                 </span>
//               </div>

//               <p className="mt-3 text-sm text-gray-600 line-clamp-2">
//                 {course.description}
//               </p>

//               <div className="mt-4 flex justify-between items-center">
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
import { useRouter } from "next/navigation";

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string | null;
  instructor?: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verify client-side execution
        if (typeof window === "undefined") {
          throw new Error("This page must be rendered on the client side");
        }

        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        // Use fallback URL if env variable not set
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://elearning1.runasp.net";
        
        const response = await fetch(
          `${API_URL}/api/Student/AllCourses`, // Removed the trailing space
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          // Try to get error message from response
          let errorMessage = "Failed to fetch courses";
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch (e) {
            console.error("Failed to parse error response", e);
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        
        // Validate and transform the data
        const validatedCourses = data.map((course: any) => ({
          id: course.id || 0,
          title: course.title || "No Title",
          description: course.description || "No Description",
          price: course.price || 0,
          image: course.image || null,
          instructor: course.instructor || "Unknown",
        }));

        setCourses(validatedCourses);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="mr-3">جاري التحميل...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p className="mb-4">خطأ: {error}</p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            إعادة المحاولة
          </button>
          <button 
            onClick={() => router.push("/login")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            تسجيل الدخول
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">مقرراتي الدراسية</h1>
        <div className="flex gap-3">
          <button 
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium transition-colors"
            onClick={() => window.location.reload()}
          >
            تحديث الصفحة
          </button>
          <button 
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
            onClick={() => router.push("/courses/new")}
          >
            تسجيل مقرر جديد
          </button>
        </div>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          لا توجد مقررات مسجلة حالياً
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 w-full">
                {course.image ? (
                  <Image
                    src={`data:image/jpeg;base64,${course.image}`}
                    alt={course.title}
                    fill
                    className="object-cover"
                    priority
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "/images/course-default.jpg";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">لا توجد صورة</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {course.title}
                    </h3>
                    {course.instructor && (
                      <p className="text-sm text-gray-500 mt-1">
                        {course.instructor}
                      </p>
                    )}
                  </div>
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs whitespace-nowrap">
                    {course.price} ر.س
                  </span>
                </div>

                <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                  {course.description}
                </p>

                <div className="mt-4 flex justify-end">
                  <button 
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                    onClick={() => router.push(`/courses/${course.id}`)}
                  >
                    عرض المقرر
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}