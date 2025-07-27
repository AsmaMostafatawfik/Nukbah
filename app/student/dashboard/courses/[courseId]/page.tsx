


//work with teacher id


// // app/student/dashboard/courses/[courseId]/page.tsx
// "use client";
// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";

// interface CourseDetails {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   stage: number;
//   gradeLevel: number;
//   numberOfSubscribers: number;
//   image: string;
//   teacherId: string;
//   sessionsCount: number;
//   instructor?: string;
//   instructorImage?: string;
// }

// interface Teacher {
//   id: string;
//   fullName: string;
//   image: string | null;
//   bio?: string;
//   specialization?: string;
// }

// export default function CourseDetailPage() {
//   const [course, setCourse] = useState<CourseDetails | null>(null);
//   const [teacher, setTeacher] = useState<Teacher | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();
//   const params = useParams();
//   const { courseId } = params;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           router.push("/login");
//           return;
//         }

//         const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://elearning1.runasp.net";
        
//         // First fetch basic course data
//         const courseResponse = await fetch(
//           `${API_URL}/api/Student/AllCourses`,
//           {
//             headers: {
//               "Authorization": `Bearer ${token}`,
//               "Content-Type": "application/json",
//             }
//           }
//         );

//         if (!courseResponse.ok) {
//           throw new Error("Failed to fetch courses");
//         }

//         const coursesData = await courseResponse.json();
//         const matchedCourse = coursesData.find((c: any) => 
//           c.id.toString() === courseId
//         );

//         if (!matchedCourse) {
//           throw new Error("Course not found");
//         }

//         // Then fetch course details including number of sessions
//         const detailsResponse = await fetch(
//           `${API_URL}/api/Student/CourseDetails/${matchedCourse.id}`,
//           {
//             headers: {
//               "Authorization": `Bearer ${token}`,
//               "Content-Type": "application/json",
//             }
//           }
//         );

//         if (!detailsResponse.ok) {
//           throw new Error("Failed to fetch course details");
//         }

//         const detailsData = await detailsResponse.json();

//         // Fetch teacher details
//         const teacherResponse = await fetch(
//           `${API_URL}/api/Student/Teachers`,
//           {
//             headers: {
//               "Authorization": `Bearer ${token}`,
//               "Content-Type": "application/json",
//             }
//           }
//         );

//         if (!teacherResponse.ok) {
//           throw new Error("Failed to fetch teachers");
//         }

//         const teachersData = await teacherResponse.json();
//         const matchedTeacher = teachersData.find((t: Teacher) => t.id === matchedCourse.teacherId);

//         const courseDetails: CourseDetails = {
//           id: matchedCourse.id,
//           title: matchedCourse.title,
//           description: matchedCourse.description,
//           price: matchedCourse.price,
//           stage: matchedCourse.stage,
//           gradeLevel: matchedCourse.gradeLevel,
//           numberOfSubscribers: matchedCourse.numberOfSubscribers || 0,
//           image: matchedCourse.image 
//             ? `${API_URL}${matchedCourse.image}`
//             : "/images/default.jpg",
//           teacherId: matchedCourse.teacherId,
//           sessionsCount: detailsData.sessionsCount || 0,
//           instructor: matchedTeacher?.fullName || "Unknown",
//           instructorImage: matchedTeacher?.image 
//             ? `${API_URL}${matchedTeacher.image}`
//             : "/images/teacher-default.jpg"
//         };

//         setCourse(courseDetails);
//         setTeacher(matchedTeacher || null);
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setError(err instanceof Error ? err.message : "An unknown error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [courseId, router]);

//   const handleEnrollClick = () => {
//     router.push(`/student/dashboard/courses/${courseId}/enrollment`);
//   };

//   const handleTeacherClick = (teacherId: string) => {
//     router.push(`/student/dashboard/teachers/${encodeURIComponent(teacherId)}`);
//   };

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
//             onClick={() => router.push("/student/dashboard/courses")}
//             className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//           >
//             العودة إلى المقررات
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!course) {
//     return (
//       <div className="text-center py-8 text-gray-500">
//         لا توجد بيانات لهذا المقرر
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <button 
//         onClick={() => router.back()}
//         className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//         </svg>
//         العودة
//       </button>

//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="md:flex">
//           <div className="md:w-1/2">
//             <div className="relative h-96 w-full">
//               {course.image ? (
//                 <img
//                   src={course.image}
//                   alt={course.title}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     const target = e.target as HTMLImageElement;
//                     target.onerror = null;
//                     target.src = "/images/course-default.jpg";
//                   }}
//                 />
//               ) : (
//                 <div className="w-full h-full bg-gray-100 flex items-center justify-center">
//                   <span className="text-gray-400">لا توجد صورة</span>
//                 </div>
//               )}
//             </div>
//           </div>
          
//           <div className="p-8 md:w-1/2">
//             <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
//               الصف {course.gradeLevel} - المرحلة {course.stage}
//             </div>
//             <h1 className="mt-2 text-3xl font-bold text-gray-800">
//               {course.title}
//             </h1>
            
//             {/* Enhanced Instructor Section */}
//             <div className="mt-6 bg-gray-50 p-4 rounded-lg">
//               <h2 className="text-lg font-semibold text-gray-800 mb-3">معلومات المدرس</h2>
//               <div className="flex items-start gap-4">
//                 <div className="flex-shrink-0">
//                   <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-100 cursor-pointer"
//                        onClick={() => handleTeacherClick(course.teacherId)}>
//                     <img
//                       src={course.instructorImage || "/images/teacher-default.jpg"}
//                       alt={course.instructor}
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         const target = e.target as HTMLImageElement;
//                         target.onerror = null;
//                         target.src = "/images/teacher-default.jpg";
//                       }}
//                     />
//                   </div>
//                 </div>
//                 <div className="flex-1">
//                   <h3 
//                     className="font-medium text-gray-800 cursor-pointer hover:text-indigo-600"
//                     onClick={() => handleTeacherClick(course.teacherId)}
//                   >
//                     أ. {course.instructor}
//                   </h3>
//                   {teacher?.specialization && (
//                     <p className="text-sm text-gray-600 mt-1">
//                       التخصص: {teacher.specialization}
//                     </p>
//                   )}
//                   {teacher?.bio && (
//                     <p className="text-sm text-gray-600 mt-2">
//                       {teacher.bio}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
            
//             <div className="mt-6">
//               <span className="text-2xl font-bold text-gray-900">
//                 {course.price} ج.م
//               </span>
//             </div>
            
//             <div className="mt-4 flex items-center">
//               <svg 
//                 xmlns="http://www.w3.org/2000/svg" 
//                 className="h-5 w-5 text-gray-500 mr-2" 
//                 viewBox="0 0 20 20" 
//                 fill="currentColor"
//               >
//                 <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
//               </svg>
//               <span className="text-gray-700">
//                 عدد المشتركين: <span className="font-semibold">{course.numberOfSubscribers}</span>
//               </span>
//             </div>
            
//             <div className="mt-4">
//               <span className="text-gray-700">
//                 عدد الجلسات: <span className="font-semibold">{course.sessionsCount}</span>
//               </span>
//             </div>
            
//             <div className="mt-8">
//               <h2 className="text-xl font-semibold text-gray-800">وصف المقرر</h2>
//               <p className="mt-2 text-gray-600 whitespace-pre-line">
//                 {course.description}
//               </p>
//             </div>
            
//             <div className="mt-8">
//               <button 
//                 onClick={handleEnrollClick}
//                 className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
//               >
//                 اشترك الآن
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






//work with teacher name


// app/student/dashboard/courses/[courseId]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface CourseDetails {
  id: number;
  title: string;
  description: string;
  price: number;
  stage: number;
  gradeLevel: number;
  numberOfSubscribers: number;
  image: string;
  teacherId: string;
  sessionsCount: number;
  instructor?: string;
  instructorImage?: string;
}

interface Teacher {
  id: string;
  fullName: string;
  image: string | null;
  bio?: string;
  specialization?: string;
}

// Function to generate Arabic-friendly slug
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, '') // Remove Arabic diacritics
    .replace(/[^\w\u0621-\u064A]/g, '-') // Replace non-word/Arabic chars with hyphen
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
};

export default function CourseDetailPage() {
  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const { courseId } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://elearning1.runasp.net";
        
        // First fetch basic course data
        const courseResponse = await fetch(
          `${API_URL}/api/Student/AllCourses`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          }
        );

        if (!courseResponse.ok) {
          throw new Error("Failed to fetch courses");
        }

        const coursesData = await courseResponse.json();
        const matchedCourse = coursesData.find((c: any) => 
          c.id.toString() === courseId
        );

        if (!matchedCourse) {
          throw new Error("Course not found");
        }

        // Then fetch course details including number of sessions
        const detailsResponse = await fetch(
          `${API_URL}/api/Student/CourseDetails/${matchedCourse.id}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          }
        );

        if (!detailsResponse.ok) {
          throw new Error("Failed to fetch course details");
        }

        const detailsData = await detailsResponse.json();

        // Fetch teacher details
        const teacherResponse = await fetch(
          `${API_URL}/api/Student/Teachers`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          }
        );

        if (!teacherResponse.ok) {
          throw new Error("Failed to fetch teachers");
        }

        const teachersData = await teacherResponse.json();
        const matchedTeacher = teachersData.find((t: Teacher) => t.id === matchedCourse.teacherId);

        const courseDetails: CourseDetails = {
          id: matchedCourse.id,
          title: matchedCourse.title,
          description: matchedCourse.description,
          price: matchedCourse.price,
          stage: matchedCourse.stage,
          gradeLevel: matchedCourse.gradeLevel,
          numberOfSubscribers: matchedCourse.numberOfSubscribers || 0,
          image: matchedCourse.image 
            ? `${API_URL}${matchedCourse.image}`
            : "/images/default-course.jpg",
          teacherId: matchedCourse.teacherId,
          sessionsCount: detailsData.sessionsCount || 0,
          instructor: matchedTeacher?.fullName || "غير معروف",
          instructorImage: matchedTeacher?.image 
            ? `${API_URL}${matchedTeacher.image}`
            : "/images/teacher-default.jpg"
        };

        setCourse(courseDetails);
        setTeacher(matchedTeacher || null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, router]);

  const handleEnrollClick = () => {
    router.push(`/student/dashboard/courses/${courseId}/enrollment`);
  };

  const handleTeacherClick = (teacherName: string) => {
    const teacherSlug = generateSlug(teacherName);
    router.push(`/student/dashboard/teachers/${encodeURIComponent(teacherSlug)}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64" dir="rtl">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="mr-3">جاري التحميل...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500" dir="rtl">
        <p className="mb-4">خطأ: {error}</p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            إعادة المحاولة
          </button>
          <button 
            onClick={() => router.push("/student/dashboard/courses")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            العودة إلى المقررات
          </button>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-8 text-gray-500" dir="rtl">
        لا توجد بيانات لهذا المقرر
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <button 
        onClick={() => router.back()}
        className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        العودة
      </button>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="relative h-96 w-full">
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
          </div>
          
          <div className="p-8 md:w-1/2">
            <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
              الصف {course.gradeLevel} - المرحلة {course.stage}
            </div>
            <h1 className="mt-2 text-3xl font-bold text-gray-800">
              {course.title}
            </h1>
            
            {/* Enhanced Instructor Section */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">معلومات المدرس</h2>
              <div className="flex items-start gap-4 flex-row-reverse">
                <div className="flex-shrink-0">
                  <div 
                    className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-100 cursor-pointer"
                    onClick={() => course.instructor && handleTeacherClick(course.instructor)}
                  >
                    <img
                      src={course.instructorImage || "/images/teacher-default.jpg"}
                      alt={course.instructor}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "/images/teacher-default.jpg";
                      }}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 
                    className="font-medium text-gray-800 cursor-pointer hover:text-indigo-600 text-right"
                    onClick={() => course.instructor && handleTeacherClick(course.instructor)}
                  >
                    أ. {course.instructor}
                  </h3>
                  {teacher?.specialization && (
                    <p className="text-sm text-gray-600 mt-1 text-right">
                      التخصص: {teacher.specialization}
                    </p>
                  )}
                  {teacher?.bio && (
                    <p className="text-sm text-gray-600 mt-2 text-right">
                      {teacher.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <span className="text-2xl font-bold text-gray-900">
                {course.price} ج.م
              </span>
            </div>
            
            <div className="mt-4 flex items-center justify-end">
              <span className="text-gray-700 ml-2">
                عدد المشتركين: <span className="font-semibold">{course.numberOfSubscribers}</span>
              </span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-gray-500" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            
            <div className="mt-4 text-right">
              <span className="text-gray-700">
                عدد الجلسات: <span className="font-semibold">{course.sessionsCount}</span>
              </span>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 text-right">وصف المقرر</h2>
              <p className="mt-2 text-gray-600 whitespace-pre-line text-right">
                {course.description}
              </p>
            </div>
            
            <div className="mt-8">
              <button 
                onClick={handleEnrollClick}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                اشترك الآن
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}