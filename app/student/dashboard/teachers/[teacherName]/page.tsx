// // // app/student/dashboard/teachers/[teacherId]/page.tsx
// // "use client";
// // import { useEffect, useState } from "react";
// // import { useRouter, useParams } from "next/navigation";

// // interface Teacher {
// //   id: string;
// //   fullName: string;
// //   image: string | null;
// //   bio?: string;
// //   specialization?: string;
// //   email?: string;
// //   phoneNumber?: string;
// // }

// // interface Course {
// //   id: number;
// //   title: string;
// //   image: string;
// //   description: string;
// // }

// // export default function TeacherProfilePage() {
// //   const [teacher, setTeacher] = useState<Teacher | null>(null);
// //   const [courses, setCourses] = useState<Course[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const router = useRouter();
// //   const params = useParams();
// //   const { teacherId } = params;

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const token = localStorage.getItem("token");
// //         if (!token) {
// //           router.push("/login");
// //           return;
// //         }

// //         const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://elearning1.runasp.net";
        
// //         // Fetch teacher details
// //         const teacherResponse = await fetch(
// //           `${API_URL}/api/Student/Teachers`,
// //           {
// //             headers: {
// //               "Authorization": `Bearer ${token}`,
// //               "Content-Type": "application/json",
// //             }
// //           }
// //         );

// //         if (!teacherResponse.ok) {
// //           throw new Error("Failed to fetch teachers");
// //         }

// //         const teachersData = await teacherResponse.json();
// //         const matchedTeacher = teachersData.find((t: Teacher) => 
// //           t.id === decodeURIComponent(teacherId as string)
// //         );

// //         if (!matchedTeacher) {
// //           throw new Error("Teacher not found");
// //         }

// //         // Fetch all courses to find those taught by this teacher
// //         const coursesResponse = await fetch(
// //           `${API_URL}/api/Student/AllCourses`,
// //           {
// //             headers: {
// //               "Authorization": `Bearer ${token}`,
// //               "Content-Type": "application/json",
// //             }
// //           }
// //         );

// //         if (!coursesResponse.ok) {
// //           throw new Error("Failed to fetch courses");
// //         }

// //         const coursesData = await coursesResponse.json();
// //         const teacherCourses = coursesData
// //           .filter((course: any) => course.teacherId === matchedTeacher.id)
// //           .map((course: any) => ({
// //             id: course.id,
// //             title: course.title,
// //             description: course.description,
// //             image: course.image 
// //               ? `${API_URL}${course.image}`
// //               : "/images/default.jpg"
// //           }));

// //         setTeacher(matchedTeacher);
// //         setCourses(teacherCourses);
// //       } catch (err) {
// //         console.error("Fetch error:", err);
// //         setError(err instanceof Error ? err.message : "An unknown error occurred");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [teacherId, router]);

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
// //         <span className="mr-3">جاري التحميل...</span>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="text-center py-8 text-red-500">
// //         <p className="mb-4">خطأ: {error}</p>
// //         <div className="flex justify-center gap-4">
// //           <button 
// //             onClick={() => window.location.reload()}
// //             className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
// //           >
// //             إعادة المحاولة
// //           </button>
// //           <button 
// //             onClick={() => router.push("/student/dashboard/courses")}
// //             className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
// //           >
// //             العودة إلى المقررات
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!teacher) {
// //     return (
// //       <div className="text-center py-8 text-gray-500">
// //         لا توجد بيانات لهذا المدرس
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       <button 
// //         onClick={() => router.back()}
// //         className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800"
// //       >
// //         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
// //           <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
// //         </svg>
// //         العودة
// //       </button>

// //       <div className="bg-white rounded-xl shadow-md overflow-hidden">
// //         <div className="md:flex">
// //           <div className="md:w-1/3 p-8">
// //             <div className="flex flex-col items-center">
// //               <div className="w-32 h-32 rounded-full border-4 border-indigo-100 overflow-hidden mb-6">
// //                 <img
// //                   src={teacher.image ? `${process.env.NEXT_PUBLIC_API_URL || "https://elearning1.runasp.net"}${teacher.image}` : "/images/teacher-default.jpg"}
// //                   alt={teacher.fullName}
// //                   className="w-full h-full object-cover"
// //                   onError={(e) => {
// //                     const target = e.target as HTMLImageElement;
// //                     target.onerror = null;
// //                     target.src = "/images/teacher-default.jpg";
// //                   }}
// //                 />
// //               </div>
// //               <h1 className="text-2xl font-bold text-gray-800 text-center">
// //                 أ. {teacher.fullName}
// //               </h1>
// //               {teacher.specialization && (
// //                 <p className="text-indigo-600 font-medium mt-2">
// //                   {teacher.specialization}
// //                 </p>
// //               )}
// //             </div>

// //             <div className="mt-8 space-y-4">
// //               {teacher.email && (
// //                 <div className="flex items-center">
// //                   <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
// //                   </svg>
// //                   <span className="text-gray-700">{teacher.email}</span>
// //                 </div>
// //               )}
// //               {teacher.phoneNumber && (
// //                 <div className="flex items-center">
// //                   <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
// //                   </svg>
// //                   <span className="text-gray-700">{teacher.phoneNumber}</span>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           <div className="md:w-2/3 p-8 border-l border-gray-200">
// //             <h2 className="text-xl font-semibold text-gray-800 mb-6">نبذة عن المدرس</h2>
// //             {teacher.bio ? (
// //               <p className="text-gray-600 whitespace-pre-line">{teacher.bio}</p>
// //             ) : (
// //               <p className="text-gray-500">لا توجد معلومات متاحة</p>
// //             )}

// //             <h2 className="text-xl font-semibold text-gray-800 mt-10 mb-6">المقررات التي يدرسها</h2>
// //             {courses.length > 0 ? (
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 {courses.map((course) => (
// //                   <div 
// //                     key={course.id}
// //                     className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
// //                     onClick={() => router.push(`/student/dashboard/courses/${course.id}`)}
// //                   >
// //                     <div className="flex items-start">
// //                       <div className="w-16 h-16 rounded overflow-hidden mr-4">
// //                         <img
// //                           src={course.image}
// //                           alt={course.title}
// //                           className="w-full h-full object-cover"
// //                           onError={(e) => {
// //                             const target = e.target as HTMLImageElement;
// //                             target.onerror = null;
// //                             target.src = "/images/course-default.jpg";
// //                           }}
// //                         />
// //                       </div>
// //                       <div>
// //                         <h3 className="font-medium text-gray-800">{course.title}</h3>
// //                         <p className="text-sm text-gray-500 mt-1 line-clamp-2">{course.description}</p>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : (
// //               <p className="text-gray-500">لا توجد مقررات متاحة</p>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }





// // app/student/dashboard/teachers/[teacherName]/page.tsx
// "use client";
// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";

// interface Teacher {
//   id: string;
//   fullName: string;
//   image: string | null;
//   bio?: string;
//   specialization?: string;
//   email?: string;
//   phoneNumber?: string;
// }

// interface Course {
//   id: number;
//   title: string;
//   image: string;
//   description: string;
// }

// // Function to generate Arabic-friendly slug
// const generateSlug = (name: string): string => {
//   return name
//     .toLowerCase()
//     .replace(/[\u064B-\u065F\u0670]/g, '') // Remove Arabic diacritics
//     .replace(/[^\w\u0621-\u064A]/g, '-') // Replace non-word/Arabic chars with hyphen
//     .replace(/-+/g, '-') // Replace multiple hyphens with single
//     .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
// };

// export default function TeacherProfilePage() {
//   const [teacher, setTeacher] = useState<Teacher | null>(null);
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();
//   const params = useParams();
//   const { teacherName } = params;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           router.push("/login");
//           return;
//         }

//         const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://elearning1.runasp.net";
        
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
//           throw new Error("فشل تحميل بيانات المدرسين");
//         }

//         const teachersData = await teacherResponse.json();
//         const decodedTeacherName = decodeURIComponent(teacherName as string);
        
//         // Find teacher by matching Arabic name slug
//         const matchedTeacher = teachersData.find((t: Teacher) => {
//           const teacherSlug = generateSlug(t.fullName);
//           return teacherSlug === decodedTeacherName;
//         });

//         if (!matchedTeacher) {
//           throw new Error("المدرس غير موجود");
//         }

//         // Fetch courses
//         const coursesResponse = await fetch(
//           `${API_URL}/api/Student/AllCourses`,
//           {
//             headers: {
//               "Authorization": `Bearer ${token}`,
//               "Content-Type": "application/json",
//             }
//           }
//         );

//         if (!coursesResponse.ok) {
//           throw new Error("فشل تحميل المقررات الدراسية");
//         }

//         const coursesData = await coursesResponse.json();
//         const teacherCourses = coursesData
//           .filter((course: any) => course.teacherId === matchedTeacher.id)
//           .map((course: any) => ({
//             id: course.id,
//             title: course.title,
//             description: course.description,
//             image: course.image 
//               ? `${API_URL}${course.image}`
//               : "/images/default-course.jpg"
//           }));

//         setTeacher(matchedTeacher);
//         setCourses(teacherCourses);
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [teacherName, router]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64" dir="rtl">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         <span className="mr-3">جاري التحميل...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-8 text-red-500" dir="rtl">
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

//   if (!teacher) {
//     return (
//       <div className="text-center py-8 text-gray-500" dir="rtl">
//         لا توجد بيانات لهذا المدرس
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8" dir="rtl">
//       <button 
//         onClick={() => router.back()}
//         className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
//         </svg>
//         العودة
//       </button>

//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="md:flex">
//           <div className="md:w-1/3 p-8">
//             <div className="flex flex-col items-center">
//               <div className="w-32 h-32 rounded-full border-4 border-indigo-100 overflow-hidden mb-6">
//                 <img
//                   src={teacher.image ? `${process.env.NEXT_PUBLIC_API_URL || "https://elearning1.runasp.net"}${teacher.image}` : "/images/teacher-default.jpg"}
//                   alt={teacher.fullName}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     const target = e.target as HTMLImageElement;
//                     target.onerror = null;
//                     target.src = "/images/teacher-default.jpg";
//                   }}
//                 />
//               </div>
//               <h1 className="text-2xl font-bold text-gray-800 text-center">
//                 {teacher.fullName}
//               </h1>
//               {teacher.specialization && (
//                 <p className="text-indigo-600 font-medium mt-2">
//                   {teacher.specialization}
//                 </p>
//               )}
//             </div>

//             <div className="mt-8 space-y-4">
//               {teacher.email && (
//                 <div className="flex items-center justify-end">
//                   <span className="text-gray-700 ml-2">{teacher.email}</span>
//                   <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//               )}
//               {teacher.phoneNumber && (
//                 <div className="flex items-center justify-end">
//                   <span className="text-gray-700 ml-2">{teacher.phoneNumber}</span>
//                   <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                   </svg>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="md:w-2/3 p-8 border-r md:border-r-0 border-l md:border-l border-gray-200">
//             <h2 className="text-xl font-semibold text-gray-800 mb-6">نبذة عن المدرس</h2>
//             {teacher.bio ? (
//               <p className="text-gray-600 whitespace-pre-line text-right">{teacher.bio}</p>
//             ) : (
//               <p className="text-gray-500 text-right">لا توجد معلومات متاحة</p>
//             )}

//             <h2 className="text-xl font-semibold text-gray-800 mt-10 mb-6">المقررات التي يدرسها</h2>
//             {courses.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {courses.map((course) => (
//                   <div 
//                     key={course.id}
//                     className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer text-right"
//                     onClick={() => router.push(`/student/dashboard/courses/${course.id}`)}
//                   >
//                     <div className="flex items-start flex-row-reverse">
//                       <div className="w-16 h-16 rounded overflow-hidden ml-4">
//                         <img
//                           src={course.image}
//                           alt={course.title}
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             const target = e.target as HTMLImageElement;
//                             target.onerror = null;
//                             target.src = "/images/course-default.jpg";
//                           }}
//                         />
//                       </div>
//                       <div>
//                         <h3 className="font-medium text-gray-800">{course.title}</h3>
//                         <p className="text-sm text-gray-500 mt-1 line-clamp-2">{course.description}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 text-right">لا توجد مقررات متاحة</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }











"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaArrowLeft, FaEnvelope, FaPhone, FaChalkboardTeacher, FaBookOpen, FaUsers } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

interface Teacher {
  id: string;
  fullName: string;
  image: string | null;
  bio?: string;
  specialization?: string;
  email?: string;
  phoneNumber?: string;
}

interface Course {
  id: number;
  title: string;
  image: string;
  description: string;
  price?: number;
  subscribers?: number;
}

const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/[^\w\u0621-\u064A]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

export default function TeacherProfilePage() {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const { teacherName } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://elearning1.runasp.net";
        
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
          throw new Error("فشل تحميل بيانات المدرسين");
        }

        const teachersData = await teacherResponse.json();
        const decodedTeacherName = decodeURIComponent(teacherName as string);
        
        // Find teacher by matching Arabic name slug
        const matchedTeacher = teachersData.find((t: Teacher) => {
          const teacherSlug = generateSlug(t.fullName);
          return teacherSlug === decodedTeacherName;
        });

        if (!matchedTeacher) {
          throw new Error("المدرس غير موجود");
        }

        // Fetch courses
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
          throw new Error("فشل تحميل المقررات الدراسية");
        }

        const coursesData = await coursesResponse.json();
        const teacherCourses = coursesData
          .filter((course: any) => course.teacherId === matchedTeacher.id)
          .map((course: any) => ({
            id: course.id,
            title: course.title,
            description: course.description,
            price: course.price,
            subscribers: course.numberOfSubscribers,
            image: course.image 
              ? `${API_URL}${course.image}`
              : "/images/default-course.jpg"
          }));

        setTeacher(matchedTeacher);
        setCourses(teacherCourses);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teacherName, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50" dir="rtl">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">جاري تحميل بيانات المدرس...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4" dir="rtl">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4" dir="rtl">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <h2 className="text-xl font-medium text-gray-800 mb-4">لا توجد بيانات لهذا المدرس</h2>
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

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <FaArrowLeft className="h-5 w-5" />
          <span>العودة</span>
        </button>

        {/* Teacher Profile Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="flex flex-col lg:flex-row">
            {/* Teacher Info Section */}
            <div className="lg:w-1/3 p-6 bg-gradient-to-b from-indigo-50 to-white">
              <div className="flex flex-col items-center">
                {/* Teacher Avatar */}
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden mb-6">
                  <img
                    src={teacher.image ? `${process.env.NEXT_PUBLIC_API_URL || "https://elearning1.runasp.net"}${teacher.image}` : "/images/teacher-default.jpg"}
                    alt={teacher.fullName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "/images/teacher-default.jpg";
                    }}
                  />
                </div>
                
                {/* Teacher Name and Specialization */}
                <h1 className="text-2xl font-bold text-gray-800 text-center">
                  {teacher.fullName}
                </h1>
                {teacher.specialization && (
                  <p className="text-indigo-600 font-medium mt-2 text-center">
                    {teacher.specialization}
                  </p>
                )}
              </div>

              {/* Contact Info */}
              <div className="mt-8 space-y-4">
                {teacher.email && (
                  <div className="flex items-center justify-end gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <span className="text-gray-700">{teacher.email}</span>
                    <FaEnvelope className="h-5 w-5 text-indigo-500" />
                  </div>
                )}
                {teacher.phoneNumber && (
                  <div className="flex items-center justify-end gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <span className="text-gray-700">{teacher.phoneNumber}</span>
                    <FaPhone className="h-5 w-5 text-indigo-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Bio and Courses Section */}
            <div className="lg:w-2/3 p-6">
              {/* Bio Section */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaChalkboardTeacher className="text-indigo-500" />
                  نبذة عن المدرس
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  {teacher.bio ? (
                    <p className="text-gray-600 whitespace-pre-line">{teacher.bio}</p>
                  ) : (
                    <p className="text-gray-500">لا توجد معلومات متاحة</p>
                  )}
                </div>
              </div>

              {/* Courses Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaBookOpen className="text-indigo-500" />
                  المقررات التي يدرسها
                </h2>
                
                {courses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courses.map((course) => (
                      <div 
                        key={course.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer bg-white"
                        onClick={() => router.push(`/student/dashboard/courses/${course.id}`)}
                      >
                        <div className="flex flex-row-reverse gap-4">
                          {/* Course Image */}
                          <div className="flex-shrink-0 w-20 h-20 rounded overflow-hidden">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = "/images/default.jpg";
                              }}
                            />
                          </div>
                          
                          {/* Course Info */}
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-800">{course.title}</h3>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {course.description}
                            </p>
                            
                            {/* Course Stats */}
                            <div className="flex justify-between items-center mt-3">
                              {course.price && (
                                <div className="flex items-center gap-1 text-indigo-600">
                                  <RiMoneyDollarCircleLine className="h-4 w-4" />
                                  <span className="text-sm font-medium">{course.price} ج.م</span>
                                </div>
                              )}
                              {course.subscribers && (
                                <div className="flex items-center gap-1 text-gray-500">
                                  <FaUsers className="h-4 w-4" />
                                  <span className="text-sm">{course.subscribers}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
                    <p className="text-gray-500">لا توجد مقررات متاحة</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}