// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// interface Course {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   image: string | null;
//   instructor?: string;
//   instructorImage?: string;
// }

// export default function CoursesPage() {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           router.push("/login");
//           return;
//         }

//         const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://elearning1.runasp.net";
        
//         const response = await fetch(
//           `${API_URL}/api/Student/AllCourses`,
//           {
//             headers: {
//               "Authorization": `Bearer ${token}`,
//               "Content-Type": "application/json",
//             }
//           }
//         );

//         if (!response.ok) {
//           let errorMessage = "Failed to fetch courses";
//           try {
//             const errorData = await response.json();
//             errorMessage = errorData.message || errorMessage;
//           } catch (e) {
//             console.error("Failed to parse error response", e);
//           }
//           throw new Error(errorMessage);
//         }

//         const data = await response.json();
        
//         const validatedCourses = data.map((course: any) => ({
//           id: course.id || 0,
//           title: course.title || "No Title",
//           description: course.description || "No Description",
//           price: course.price || 0,
//           image: course.image 
//             ? `https://elearning1.runasp.net${course.image}`
//             : "/images/default.jpg",
//           instructor: course.instructor || "Unknown",
//           instructorImage: course.instructorImage
//             ? `https://elearning1.runasp.net${course.instructorImage}`
//             : null
//         }));

//         setCourses(validatedCourses);
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setError(err instanceof Error ? err.message : "An unknown error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [router]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         <span className="mr-3">جاري التحميل...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-8 text-red-500">
//         <p className="mb-4">خطأ: {error}</p>
//         <div className="flex justify-center gap-4">
//           <button 
//             onClick={() => window.location.reload()}
//             className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
//           >
//             إعادة المحاولة
//           </button>
//           <button 
//             onClick={() => router.push("/login")}
//             className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//           >
//             تسجيل الدخول
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8 p-6">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <h1 className="text-3xl font-bold text-gray-800">الكورسات</h1>
//         {/* Removed the buttons as requested */}
//       </div>

//       {courses.length === 0 ? (
//         <div className="text-center py-12 text-gray-500">
//           لا توجد مقررات مسجلة حالياً
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {courses.map((course) => (
//             <div
//               key={course.id}
//               className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
//               onClick={() => router.push(`/student/dashboard/courses/${course.id}`)}
//             >
//               <div className="relative h-80 w-full">
//                 {course.image ? (
//                   <img
//                     src={course.image}
//                     alt={course.title}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       const target = e.target as HTMLImageElement;
//                       target.onerror = null;
//                       target.src = "/images/course-default.jpg";
//                     }}
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gray-100 flex items-center justify-center">
//                     <span className="text-gray-400">لا توجد صورة</span>
//                   </div>
//                 )}
//               </div>
//               <div className="p-6">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-800">
//                       {course.title}
//                     </h3>
//                     {course.instructor && (
//                       <div className="flex items-center mt-1">
//                         {course.instructorImage && (
//                           <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
//                             <img
//                               src={course.instructorImage}
//                               alt={course.instructor}
//                               className="w-full h-full object-cover"
//                               onError={(e) => {
//                                 const target = e.target as HTMLImageElement;
//                                 target.onerror = null;
//                                 target.src = "/images/default-avatar.jpg";
//                               }}
//                             />
//                           </div>
//                         )}
//                         <p className="text-sm text-gray-500">
//                           {course.instructor}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                   <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs whitespace-nowrap">
//                     {course.price} ج.م
//                   </span>
//                 </div>

//                 <p className="mt-3 text-sm text-gray-600 line-clamp-2">
//                   {course.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }




"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string | null;
  teacherId: string;
  instructor?: string;
  instructorImage?: string;
}

interface Teacher {
  id: string;
  fullName: string;
  image: string | null;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://elearning1.runasp.net";
        
        // Fetch all courses
        const coursesResponse = await fetch(
          `${API_URL}/api/Student/AllCourses`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          }
        );

        if (!coursesResponse.ok) {
          throw new Error("Failed to fetch courses");
        }

        const coursesData = await coursesResponse.json();

        // Fetch all teachers
        const teachersResponse = await fetch(
          `${API_URL}/api/Student/Teachers`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          }
        );

        if (!teachersResponse.ok) {
          throw new Error("Failed to fetch teachers");
        }

        const teachersData = await teachersResponse.json();
        setTeachers(teachersData);

        // Map courses with teacher information
        const validatedCourses = coursesData.map((course: any) => {
          const teacher = teachersData.find((t: Teacher) => t.id === course.teacherId);
          
          return {
            id: course.id || 0,
            title: course.title || "No Title",
            description: course.description || "No Description",
            price: course.price || 0,
            image: course.image 
              ? `${API_URL}${course.image}`
              : "/images/default.jpg",
            teacherId: course.teacherId,
            instructor: teacher?.fullName || "Unknown",
            instructorImage: teacher?.image 
              ? `${API_URL}${teacher.image}`
              : "/images/teacher-defualt.jpg"
          };
        });

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
        <h1 className="text-3xl font-bold text-gray-800">الكورسات</h1>
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
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => router.push(`/student/dashboard/courses/${course.id}`)}
            >
              <div className="relative h-80 w-full">
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
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
                      <div className="flex items-center mt-1">
                        {course.instructorImage && (
                          <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                            <img
                              src={course.instructorImage}
                              alt={course.instructor}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = "/images/default-avatar.jpg";
                              }}
                            />
                          </div>
                        )}
                        <p className="text-sm text-gray-500">
                         أ - {course.instructor}
                        </p>
                      </div>
                    )}
                  </div>
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs whitespace-nowrap">
                    {course.price} ج.م
                  </span>
                </div>

                <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                  {course.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}