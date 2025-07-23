// // // "use client";
// // // import { useState, useEffect } from "react";

// // // interface Course {
// // //   id: number;
// // //   title: string;
// // //   description: string;
// // //   price: number;
// // //   stage: number;
// // //   gradeLevel: number;
// // //   isActivated: boolean;
// // //   image: string | null;
// // //   teacherId: number;
// // // }

// // // export default function AllCoursesPage() {
// // //   const [courses, setCourses] = useState<Course[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState<string | null>(null);

// // //   useEffect(() => {
// // //     const fetchCourses = async () => {
// // //       try {
// // //         const token = localStorage.getItem("token");
// // //         if (!token) {
// // //           throw new Error("Authentication required");
// // //         }

// // //         const response = await fetch(
// // //           "http://elearning1.runasp.net/api/Admin/AllCourses",
// // //           {
// // //             headers: {
// // //               Authorization: `Bearer ${token}`,
// // //             },
// // //           }
// // //         );

// // //         if (!response.ok) {
// // //           throw new Error("Failed to fetch courses");
// // //         }

// // //         const data = await response.json();
// // //         setCourses(data.map((c: any) => ({
// // //           id: c.id,
// // //           title: c.title,
// // //           description: c.description,
// // //           price: c.price,
// // //           stage: c.stage,
// // //           gradeLevel: c.gradeLevel,
// // //           isActivated: c.isActivated,
// // //           image: c.image,
// // //           teacherId: c.teacherId
// // //         })));
// // //       } catch (err) {
// // //         setError(err instanceof Error ? err.message : "An unknown error occurred");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchCourses();
// // //   }, []);

// // //   const getStageText = (stage: number) => {
// // //     switch (stage) {
// // //       case 0: return "الابتدائية";
// // //       case 1: return "المتوسطة";
// // //       case 2: return "الثانوية";
// // //       case 3: return "جامعة";
// // //       case 4: return "غير ذلك";
// // //       default: return "غير معروف";
// // //     }
// // //   };

// // //   const getGradeText = (grade: number) => {
// // //     if (grade === 7) return "غير ذلك";
// // //     return `الصف ${grade}`;
// // //   };

// // //   const getStatusText = (isActivated: boolean) => {
// // //     return isActivated ? "نشط" : "غير نشط";
// // //   };

// // //   const getStatusColor = (isActivated: boolean) => {
// // //     return isActivated ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
// // //   };

// // //   if (loading) {
// // //     return <div className="text-center py-8">جاري التحميل...</div>;
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
// // //         {error}
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="space-y-8" dir="rtl">
// // //       <h1 className="text-3xl font-bold text-gray-800">جميع الدورات</h1>

// // //       <div className="bg-white p-6 rounded-lg shadow">
// // //         {courses.length === 0 ? (
// // //           <div className="text-center py-8 text-gray-500">
// // //             لا توجد دورات متاحة حالياً
// // //           </div>
// // //         ) : (
// // //           <div className="overflow-x-auto">
// // //             <table className="w-full">
// // //               <thead>
// // //                 <tr className="border-b">
// // //                   <th className="pb-3 text-right px-4">العنوان</th>
// // //                   <th className="pb-3 text-right px-4">الوصف</th>
// // //                   <th className="pb-3 text-right px-4">السعر</th>
// // //                   <th className="pb-3 text-right px-4">المرحلة</th>
// // //                   <th className="pb-3 text-right px-4">الصف</th>
// // //                   <th className="pb-3 text-right px-4">الحالة</th>
// // //                   <th className="pb-3 text-right px-4">صورة</th>
// // //                   <th className="pb-3 text-right px-4">معرف المعلم</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {courses.map((course) => (
// // //                   <tr key={course.id} className="border-b hover:bg-gray-50">
// // //                     <td className="py-4 px-4">{course.title}</td>
// // //                     <td className="py-4 px-4 max-w-xs truncate">{course.description}</td>
// // //                     <td className="py-4 px-4">{course.price} ر.س</td>
// // //                     <td className="py-4 px-4">{getStageText(course.stage)}</td>
// // //                     <td className="py-4 px-4">{getGradeText(course.gradeLevel)}</td>
// // //                     <td className="py-4 px-4">
// // //                       <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(course.isActivated)}`}>
// // //                         {getStatusText(course.isActivated)}
// // //                       </span>
// // //                     </td>
// // //                     <td className="py-4 px-4">
// // //                       {course.image ? (
// // //                         <img 
// // //                           src={course.image} 
// // //                           alt="صورة الدورة" 
// // //                           className="w-16 h-16 object-cover rounded"
// // //                         />
// // //                       ) : (
// // //                         "لا يوجد"
// // //                       )}
// // //                     </td>
// // //                     <td className="py-4 px-4">{course.teacherId}</td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }






// // "use client";
// // import { useEffect, useState } from "react";
// // import { Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";

// // interface Course {
// //   id: number;
// //   title: string;
// //   description: string;
// //   price: number;
// //   stage: number;
// //   gradeLevel: number;
// //   isActivated: boolean;
// //   image: string | null;
// //   teacherId: number;
// // }

// // export default function AllCoursesPage() {
// //   const [courses, setCourses] = useState<Course[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [activatingId, setActivatingId] = useState<number | null>(null);

// //   const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

// //   const fetchCourses = async () => {
// //     if (!token) {
// //       setError('الرجاء تسجيل الدخول أولاً.');
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       const response = await fetch('http://elearning1.runasp.net/api/Admin/AllCourses', {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       if (!response.ok) throw new Error('فشل في جلب بيانات الدورات');

// //       const data = await response.json();
// //       setCourses(data.map((c: any) => ({
// //         id: c.id,
// //         title: c.title,
// //         description: c.description,
// //         price: c.price,
// //         stage: c.stage,
// //         gradeLevel: c.grade,
// //         isActivated: c.isActivated,
// //         image: c.image,
// //         teacherId: c.teacherId
// //       })));
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchCourses();
// //   }, []);

// //   const handleDelete = async (id: number) => {
// //     if (!confirm('هل أنت متأكد من حذف هذه الدورة؟')) return;

// //     try {
// //       const response = await fetch(`http://elearning1.runasp.net/api/Admin/DeleteCourse/${id}`, {
// //         method: 'DELETE',
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       if (!response.ok) throw new Error('فشل في حذف الدورة');

// //       alert('تم حذف الدورة بنجاح');
// //       await fetchCourses();
// //     } catch (error) {
// //       alert(error instanceof Error ? error.message : 'حدث خطأ أثناء الحذف');
// //     }
// //   };

// //   const handleEdit = (id: number) => {
// //     alert(`تعديل الدورة ID: ${id}`);
// //   };

// //   const handleActivate = async (id: number) => {
// //     const isCurrentlyActive = courses.find(c => c.id === id)?.isActivated;
// //     if (!confirm(`هل أنت متأكد من ${isCurrentlyActive ? 'تعطيل' : 'تفعيل'} هذه الدورة؟`)) return;
    
// //     setActivatingId(id);
// //     try {
// //       const response = await fetch('http://elearning1.runasp.net/api/Admin/ActivateCourse', {
// //         method: 'PATCH',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify({
// //           coursesId: id
// //         }),
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.message || `فشل في ${isCurrentlyActive ? 'تعطيل' : 'تفعيل'} الدورة`);
// //       }

// //       setCourses(courses.map(course => 
// //         course.id === id ? { ...course, isActivated: !course.isActivated } : course
// //       ));
// //       alert(`تم ${isCurrentlyActive ? 'تعطيل' : 'تفعيل'} الدورة بنجاح`);
// //     } catch (error) {
// //       alert(error instanceof Error ? error.message : 'حدث خطأ أثناء العملية');
// //       console.error('Activation error:', error);
// //     } finally {
// //       setActivatingId(null);
// //     }
// //   };

// //   const getStageText = (stage: number) => {
// //     switch (stage) {
// //       case 0: return "الابتدائية";
// //       case 1: return "المتوسطة";
// //       case 2: return "الثانوية";
// //       case 3: return "جامعة";
// //       case 4: return "غير ذلك";
// //       default: return "غير معروف";
// //     }
// //   };

// //   const getGradeText = (grade: number) => {
// //     if (grade === 7) return "غير ذلك";
// //     return `الصف ${grade}`;
// //   };

// //   return (
// //     <div className="p-6 max-w-7xl mx-auto">
// //       <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">قائمة الدورات</h1>

// //       {loading ? (
// //         <div className="flex justify-center items-center h-64">
// //           <span className="loading loading-spinner loading-lg text-blue-500"></span>
// //           <p className="mr-2 text-blue-500">جارٍ تحميل البيانات...</p>
// //         </div>
// //       ) : error ? (
// //         <div className="alert alert-error max-w-md mx-auto">
// //           <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
// //           </svg>
// //           <span>{error}</span>
// //         </div>
// //       ) : courses.length === 0 ? (
// //         <div className="alert alert-info max-w-md mx-auto">
// //           <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
// //           </svg>
// //           <span>لا يوجد دورات مسجلة حتى الآن</span>
// //         </div>
// //       ) : (
// //         <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
// //           <table className="min-w-full text-sm text-right bg-white">
// //             <thead className="bg-gray-50 text-gray-700 font-bold">
// //               <tr>
// //                 <th className="p-4 border">الصورة</th>
// //                 <th className="p-4 border">العنوان</th>
// //                 <th className="p-4 border">الوصف</th>
// //                 <th className="p-4 border">السعر</th>
// //                 <th className="p-4 border">المرحلة</th>
// //                 <th className="p-4 border">الصف</th>
// //                 <th className="p-4 border">حالة الدورة</th>
// //                 <th className="p-4 border">معرف المعلم</th>
// //                 <th className="p-4 border">الإجراءات</th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-gray-200">
// //               {courses.map((course) => (
// //                 <tr key={course.id} className="hover:bg-gray-50 transition-colors">
// //                   <td className="p-3 text-center border">
// //                     {course.image ? (
// //                       <img
// //                         src={course.image}
// //                         alt={course.title}
// //                         className="w-12 h-12 rounded-full object-cover mx-auto border"
// //                       />
// //                     ) : (
// //                       <div className="w-12 h-12 rounded-full bg-gray-200 mx-auto"></div>
// //                     )}
// //                   </td>
// //                   <td className="p-3 border font-medium">{course.title}</td>
// //                   <td className="p-3 border max-w-xs truncate">{course.description}</td>
// //                   <td className="p-3 border">{course.price} ر.س</td>
// //                   <td className="p-3 border">{getStageText(course.stage)}</td>
// //                   <td className="p-3 border">{getGradeText(course.gradeLevel)}</td>
// //                   <td className="p-3 border">
// //                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
// //                       course.isActivated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
// //                     }`}>
// //                       {course.isActivated ? 'مفعلة' : 'غير مفعلة'}
// //                     </span>
// //                   </td>
// //                   <td className="p-3 border text-blue-600">{course.teacherId}</td>
// //                   <td className="p-3 border">
// //                     <div className="flex justify-center gap-2">
// //                       <button
// //                         onClick={() => handleEdit(course.id)}
// //                         className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white transition-colors"
// //                         title="تعديل"
// //                       >
// //                         <Pencil size={16} />
// //                       </button>
// //                       <button
// //                         onClick={() => handleDelete(course.id)}
// //                         className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
// //                         title="حذف"
// //                       >
// //                         <Trash2 size={16} />
// //                       </button>
// //                       <button
// //                         onClick={() => handleActivate(course.id)}
// //                         disabled={activatingId === course.id}
// //                         className={`p-2 rounded-full ${
// //                           activatingId === course.id
// //                             ? 'bg-gray-400 cursor-not-allowed'
// //                             : course.isActivated
// //                               ? 'bg-orange-500 hover:bg-orange-600'
// //                               : 'bg-green-500 hover:bg-green-600'
// //                         } text-white transition-colors`}
// //                         title={course.isActivated ? "تعطيل" : "تفعيل"}
// //                       >
// //                         {activatingId === course.id ? (
// //                           <span className="loading loading-spinner loading-xs"></span>
// //                         ) : course.isActivated ? (
// //                           <XCircle size={16} />
// //                         ) : (
// //                           <CheckCircle size={16} />
// //                         )}
// //                       </button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }





// "use client";
// import { useEffect, useState } from "react";
// import { Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";

// interface Course {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   stage: number;
//   gradeLevel: number;
//   isActivated: boolean;
//   image: string | null;
//   teacherId: number;
// }

// export default function AllCoursesPage() {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activatingId, setActivatingId] = useState<number | null>(null);

//   const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

//   const fetchCourses = async () => {
//     if (!token) {
//       setError('الرجاء تسجيل الدخول أولاً.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch('http://elearning1.runasp.net/api/Admin/AllCourses', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) throw new Error('فشل في جلب بيانات الدورات');

//       const data = await response.json();
//       setCourses(data.map((c: any) => ({
//         id: c.id,
//         title: c.title,
//         description: c.description,
//         price: c.price,
//         stage: c.stage,
//         gradeLevel: c.grade,
//         isActivated: c.isActivated,
//         image: c.image,
//         teacherId: c.teacherId
//       })));
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const handleDelete = async (id: number) => {
//     if (!confirm('هل أنت متأكد من حذف هذه الدورة؟')) return;

//     try {
//       const response = await fetch(`http://elearning1.runasp.net/api/Admin/DeleteCourse/${id}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) throw new Error('فشل في حذف الدورة');

//       alert('تم حذف الدورة بنجاح');
//       await fetchCourses();
//     } catch (error) {
//       alert(error instanceof Error ? error.message : 'حدث خطأ أثناء الحذف');
//     }
//   };

//   const handleEdit = (id: number) => {
//     alert(`تعديل الدورة ID: ${id}`);
//   };

//   const handleActivate = async (id: number) => {
//     const isCurrentlyActive = courses.find(c => c.id === id)?.isActivated;
//     if (!confirm(`هل أنت متأكد من ${isCurrentlyActive ? 'تعطيل' : 'تفعيل'} هذه الدورة؟`)) return;
    
//     setActivatingId(id);
//     try {
//       // Try both endpoint variations
//       const endpoints = [
//         'http://elearning1.runasp.net/api/Admin/ActivateCourse'
//       ];
      
//       let lastError;
      
//       for (const endpoint of endpoints) {
//         try {
//           const response = await fetch(endpoint, {
//             method: 'PATCH',
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({
//               coursesId: id // Try with coursesId first
//             }),
//           });

//           // Try with 'corrects' if coursesId fails
//           if (!response.ok) {
//             const responseWithCorrects = await fetch(endpoint, {
//               method: 'PATCH',
//               headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`,
//               },
//               body: JSON.stringify({
//                 corrects: id
//               }),
//             });

//             if (responseWithCorrects.ok) {
//               setCourses(courses.map(course => 
//                 course.id === id ? { ...course, isActivated: !course.isActivated } : course
//               ));
//               alert(`تم ${isCurrentlyActive ? 'تعطيل' : 'تفعيل'} الدورة بنجاح`);
//               return;
//             }
//           }

//           if (response.ok) {
//             setCourses(courses.map(course => 
//               course.id === id ? { ...course, isActivated: !course.isActivated } : course
//             ));
//             alert(`تم ${isCurrentlyActive ? 'تعطيل' : 'تفعيل'} الدورة بنجاح`);
//             return;
//           }

//           // If we get here, both attempts failed
//           let errorMessage = `فشل في ${isCurrentlyActive ? 'تعطيل' : 'تفعيل'} الدورة (${response.status})`;
//           try {
//             const errorData = await response.text();
//             if (errorData) {
//               const parsedError = JSON.parse(errorData);
//               errorMessage = parsedError.message || errorData;
//             }
//           } catch (e) {
//             console.error('Error parsing error response:', e);
//           }
//           lastError = new Error(errorMessage);

//         } catch (err) {
//           lastError = err instanceof Error ? err : new Error('حدث خطأ غير متوقع');
//         }
//       }

//       if (lastError) throw lastError;

//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'حدث خطأ أثناء العملية';
//       alert(errorMessage);
//       console.error('Activation error:', error);
//     } finally {
//       setActivatingId(null);
//     }
//   };

//   const getStageText = (stage: number) => {
//     switch (stage) {
//       case 0: return "الابتدائية";
//       case 1: return "المتوسطة";
//       case 2: return "الثانوية";
//       case 3: return "جامعة";
//       case 4: return "غير ذلك";
//       default: return "غير معروف";
//     }
//   };

//   const getGradeText = (grade: number) => {
//     if (grade === 7) return "غير ذلك";
//     return `الصف ${grade}`;
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">قائمة الدورات</h1>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <span className="loading loading-spinner loading-lg text-blue-500"></span>
//           <p className="mr-2 text-blue-500">جارٍ تحميل البيانات...</p>
//         </div>
//       ) : error ? (
//         <div className="alert alert-error max-w-md mx-auto">
//           <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <span>{error}</span>
//         </div>
//       ) : courses.length === 0 ? (
//         <div className="alert alert-info max-w-md mx-auto">
//           <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//           </svg>
//           <span>لا يوجد دورات مسجلة حتى الآن</span>
//         </div>
//       ) : (
//         <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
//           <table className="min-w-full text-sm text-right bg-white">
//             <thead className="bg-gray-50 text-gray-700 font-bold">
//               <tr>
//                 <th className="p-4 border">الصورة</th>
//                 <th className="p-4 border">العنوان</th>
//                 <th className="p-4 border">الوصف</th>
//                 <th className="p-4 border">السعر</th>
//                 <th className="p-4 border">المرحلة</th>
//                 <th className="p-4 border">الصف</th>
//                 <th className="p-4 border">حالة الدورة</th>
//                 <th className="p-4 border">معرف المعلم</th>
//                 <th className="p-4 border">الإجراءات</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {courses.map((course) => (
//                 <tr key={course.id} className="hover:bg-gray-50 transition-colors">
//                   <td className="p-3 text-center border">
//                     {course.image ? (
//                       <img
//                         src={course.image}
//                         alt={course.title}
//                         className="w-12 h-12 rounded-full object-cover mx-auto border"
//                       />
//                     ) : (
//                       <div className="w-12 h-12 rounded-full bg-gray-200 mx-auto"></div>
//                     )}
//                   </td>
//                   <td className="p-3 border font-medium">{course.title}</td>
//                   <td className="p-3 border max-w-xs truncate">{course.description}</td>
//                   <td className="p-3 border">{course.price} ر.س</td>
//                   <td className="p-3 border">{getStageText(course.stage)}</td>
//                   <td className="p-3 border">{getGradeText(course.gradeLevel)}</td>
//                   <td className="p-3 border">
//                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
//                       course.isActivated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                     }`}>
//                       {course.isActivated ? 'مفعلة' : 'غير مفعلة'}
//                     </span>
//                   </td>
//                   <td className="p-3 border text-blue-600">{course.teacherId}</td>
//                   <td className="p-3 border">
//                     <div className="flex justify-center gap-2">
//                       <button
//                         onClick={() => handleEdit(course.id)}
//                         className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white transition-colors"
//                         title="تعديل"
//                       >
//                         <Pencil size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(course.id)}
//                         className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
//                         title="حذف"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleActivate(course.id)}
//                         disabled={activatingId === course.id}
//                         className={`p-2 rounded-full ${
//                           activatingId === course.id
//                             ? 'bg-gray-400 cursor-not-allowed'
//                             : course.isActivated
//                               ? 'bg-orange-500 hover:bg-orange-600'
//                               : 'bg-green-500 hover:bg-green-600'
//                         } text-white transition-colors`}
//                         title={course.isActivated ? "تعطيل" : "تفعيل"}
//                       >
//                         {activatingId === course.id ? (
//                           <span className="loading loading-spinner loading-xs"></span>
//                         ) : course.isActivated ? (
//                           <XCircle size={16} />
//                         ) : (
//                           <CheckCircle size={16} />
//                         )}
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }






"use client";
import { useEffect, useState } from "react";
import { Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  stage: number;
  gradeLevel: number;
  isActivated: boolean;
  image: string | null;
  teacherId: number;
}

export default function AllCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activatingId, setActivatingId] = useState<number | null>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchCourses = async () => {
    if (!token) {
      setError('الرجاء تسجيل الدخول أولاً.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://elearning1.runasp.net/api/Admin/AllCourses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('فشل في جلب بيانات الدورات');

      const data = await response.json();
      setCourses(data.map((c: any) => ({
        id: c.id,
        title: c.title,
        description: c.description,
        price: c.price,
        stage: c.stage,
        gradeLevel: c.grade,
        isActivated: c.isActivated,
        image: c.image,
        teacherId: c.teacherId
      })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه الدورة؟')) return;

    try {
      const response = await fetch(`http://elearning1.runasp.net/api/Admin/DeleteCourse/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('فشل في حذف الدورة');

      alert('تم حذف الدورة بنجاح');
      await fetchCourses();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'حدث خطأ أثناء الحذف');
    }
  };

  const handleEdit = (id: number) => {
    alert(`تعديل الدورة ID: ${id}`);
  };

  const handleActivate = async (id: number) => {
    const isCurrentlyActive = courses.find(c => c.id === id)?.isActivated;
    if (!confirm(`هل أنت متأكد من ${isCurrentlyActive ? 'تعطيل' : 'تفعيل'} هذه الدورة؟`)) return;
    
    setActivatingId(id);
    try {
      const response = await fetch('http://elearning1.runasp.net/api/Admin/ActivateCourse', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          CourseId: id // Changed from coursesId to CourseId to match backend
        }),
      });

      if (!response.ok) {
        // Try to parse error message
        const errorText = await response.text();
        let errorMessage = `فشل في ${isCurrentlyActive ? 'تعطيل' : 'تفعيل'} الدورة (${response.status})`;
        
        try {
          // If errorText is valid JSON
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || errorText;
        } catch {
          // If errorText is plain text
          errorMessage = errorText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      // Success - update local state
      setCourses(courses.map(course => 
        course.id === id ? { ...course, isActivated: !course.isActivated } : course
      ));
      
      alert(`تم ${isCurrentlyActive ? 'تعطيل' : 'تفعيل'} الدورة بنجاح`);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'حدث خطأ أثناء العملية';
      alert(errorMessage);
      console.error('Activation error:', error);
    } finally {
      setActivatingId(null);
    }
  };

  const getStageText = (stage: number) => {
    switch (stage) {
      case 0: return "الابتدائية";
      case 1: return "المتوسطة";
      case 2: return "الثانوية";
      case 3: return "جامعة";
      case 4: return "غير ذلك";
      default: return "غير معروف";
    }
  };

  const getGradeText = (grade: number) => {
    if (grade === 7) return "غير ذلك";
    return `الصف ${grade}`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">قائمة الدورات</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-blue-500"></span>
          <p className="mr-2 text-blue-500">جارٍ تحميل البيانات...</p>
        </div>
      ) : error ? (
        <div className="alert alert-error max-w-md mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      ) : courses.length === 0 ? (
        <div className="alert alert-info max-w-md mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>لا يوجد دورات مسجلة حتى الآن</span>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
          <table className="min-w-full text-sm text-right bg-white">
            <thead className="bg-gray-50 text-gray-700 font-bold">
              <tr>
                <th className="p-4 border">الصورة</th>
                <th className="p-4 border">العنوان</th>
                <th className="p-4 border">الوصف</th>
                <th className="p-4 border">السعر</th>
                <th className="p-4 border">المرحلة</th>
                <th className="p-4 border">الصف</th>
                <th className="p-4 border">حالة الدورة</th>
                <th className="p-4 border">معرف المعلم</th>
                <th className="p-4 border">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 text-center border">
                    {course.image ? (
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-12 h-12 rounded-full object-cover mx-auto border"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 mx-auto"></div>
                    )}
                  </td>
                  <td className="p-3 border font-medium">{course.title}</td>
                  <td className="p-3 border max-w-xs truncate">{course.description}</td>
                  <td className="p-3 border">{course.price} ر.س</td>
                  <td className="p-3 border">{getStageText(course.stage)}</td>
                  <td className="p-3 border">{getGradeText(course.gradeLevel)}</td>
                  <td className="p-3 border">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      course.isActivated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {course.isActivated ? 'مفعلة' : 'غير مفعلة'}
                    </span>
                  </td>
                  <td className="p-3 border text-blue-600">{course.teacherId}</td>
                  <td className="p-3 border">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(course.id)}
                        className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white transition-colors"
                        title="تعديل"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
                        title="حذف"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        onClick={() => handleActivate(course.id)}
                        disabled={activatingId === course.id}
                        className={`p-2 rounded-full ${
                          activatingId === course.id
                            ? 'bg-gray-400 cursor-not-allowed'
                            : course.isActivated
                              ? 'bg-orange-500 hover:bg-orange-600'
                              : 'bg-green-500 hover:bg-green-600'
                        } text-white transition-colors`}
                        title={course.isActivated ? "تعطيل" : "تفعيل"}
                      >
                        {activatingId === course.id ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : course.isActivated ? (
                          <XCircle size={16} />
                        ) : (
                          <CheckCircle size={16} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}