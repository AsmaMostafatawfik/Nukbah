
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
//   const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://elearning1.runasp.net';


//   const fetchCourses = async () => {
//     if (!token) {
//       setError('الرجاء تسجيل الدخول أولاً.');
//       setLoading(false);
//       return;
//     }


//     try {
//       const response = await fetch(`${API_URL}/api/Admin/AllCourses`, {
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
//       const response = await fetch(`${API_URL}/api/Admin/DeleteCourse/${id}`, {
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
//       const response = await fetch(`${API_URL}/api/Admin/ActivateCourse`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           CourseId: id
//         }),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         let errorMessage = `فشل في ${isCurrentlyActive ? 'تعطيل' : 'تفعيل'} الدورة (${response.status})`;
        
//         try {
//           const errorJson = JSON.parse(errorText);
//           errorMessage = errorJson.message || errorText;
//         } catch {
//           errorMessage = errorText || errorMessage;
//         }
        
//         throw new Error(errorMessage);
//       }

//       setCourses(courses.map(course => 
//         course.id === id ? { ...course, isActivated: !course.isActivated } : course
//       ));
      
//       alert(`تم ${isCurrentlyActive ? 'تعطيل' : 'تفعيل'} الدورة بنجاح`);
      
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
//         <div className="flex flex-col items-center justify-center py-12">
//           <div className="text-center p-8 max-w-md">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <h3 className="mt-4 text-xl font-medium text-gray-700">لا توجد دورات متاحة</h3>
//             <p className="mt-2 text-gray-500">لم يتم العثور على أي دورات مسجلة في النظام</p>
//             <button 
//               className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               onClick={() => window.location.reload()}
//             >
//               تحديث الصفحة
//             </button>
//           </div>
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
















'use client';
import { useEffect, useState } from 'react';
import { Pencil, Trash2, CheckCircle, XCircle, User, ChevronDown, ChevronUp } from 'lucide-react';

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

interface Teacher {
  id: number;
  fullName: string;
}

export default function AllCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activatingId, setActivatingId] = useState<number | null>(null);
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://elearning1.runasp.net';

  const fetchCourses = async () => {
    if (!token) {
      setError('الرجاء تسجيل الدخول أولاً.');
      setLoading(false);
      return;
    }

    try {
      // Fetch courses and teachers in parallel
      const [coursesResponse, teachersResponse] = await Promise.all([
        fetch(`${API_URL}/api/Admin/AllCourses`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/Admin/Teachers`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ]);

      if (!coursesResponse.ok) throw new Error('فشل في جلب بيانات الدورات');
      if (!teachersResponse.ok) throw new Error('فشل في جلب بيانات المعلمين');

      const coursesData = await coursesResponse.json();
      const teachersData = await teachersResponse.json();

      setTeachers(teachersData);
      setCourses(coursesData.map((c: any) => ({
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

  const getTeacherName = (teacherId: number) => {
    const teacher = teachers.find(t => t.id === teacherId);
    return teacher ? teacher.fullName : 'غير معروف';
  };

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه الدورة؟')) return;

    try {
      const response = await fetch(`${API_URL}/api/Admin/DeleteCourse/${id}`, {
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
      const response = await fetch(`${API_URL}/api/Admin/ActivateCourse`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          CourseId: id
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `فشل في ${isCurrentlyActive ? 'تعطيل' : 'تفعيل'} الدورة`);
      }

      setCourses(courses.map(course => 
        course.id === id ? { ...course, isActivated: !course.isActivated } : course
      ));
      alert(`تم ${isCurrentlyActive ? 'تعطيل' : 'تفعيل'} الدورة بنجاح`);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'حدث خطأ أثناء العملية');
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

  const toggleCourseExpand = (courseId: number) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto" dir="rtl">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">قائمة الدورات</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mr-2 text-blue-500">جارٍ تحميل البيانات...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
          {error}
        </div>
      ) : courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center p-8 max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-700">لا توجد دورات متاحة</h3>
            <p className="mt-2 text-gray-500">لم يتم العثور على أي دورات مسجلة في النظام</p>
            <button 
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => fetchCourses()}
            >
              تحديث البيانات
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Mobile View - Cards */}
          <div className="md:hidden space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                <div 
                  className="p-4 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleCourseExpand(course.id)}
                >
                  <div className="flex items-center gap-3">
                    {course.image ? (
                      <img
                        src={`https://elearning1.runasp.net${course.image}`}
                        alt={course.title}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="text-gray-500" size={18} />
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-gray-900">{course.title}</div>
                      <div className="text-sm text-gray-500">{getTeacherName(course.teacherId)}</div>
                    </div>
                  </div>
                  <button className="text-gray-600">
                    {expandedCourse === course.id ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>
                </div>

                {expandedCourse === course.id && (
                  <div className="p-4 border-t">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900">معلومات الدورة</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-500">السعر:</span>
                            <span className="font-medium block">{course.price} ج.م</span>
                          </div>
                          <div>
                            <span className="text-gray-500">المرحلة:</span>
                            <span className="font-medium block">{getStageText(course.stage)}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">الصف:</span>
                            <span className="font-medium block">{getGradeText(course.gradeLevel)}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">الحالة:</span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              course.isActivated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {course.isActivated ? 'مفعلة' : 'غير مفعلة'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900">الوصف</h4>
                        <p className="text-sm text-gray-700">{course.description}</p>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(course.id);
                          }}
                          className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white transition-colors"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(course.id);
                          }}
                          className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleActivate(course.id);
                          }}
                          disabled={activatingId === course.id}
                          className={`p-2 rounded-full ${
                            activatingId === course.id
                              ? 'bg-gray-400 cursor-not-allowed'
                              : course.isActivated
                                ? 'bg-orange-500 hover:bg-orange-600'
                                : 'bg-green-500 hover:bg-green-600'
                          } text-white transition-colors`}
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
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden md:block overflow-x-auto rounded-lg shadow-sm border border-gray-200">
            <table className="min-w-full text-sm bg-white">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="p-4 border text-right">الصورة</th>
                  <th className="p-4 border text-right">العنوان</th>
                  <th className="p-4 border text-right">الوصف</th>
                  <th className="p-4 border text-right">السعر</th>
                  <th className="p-4 border text-right">المرحلة</th>
                  <th className="p-4 border text-right">الصف</th>
                  <th className="p-4 border text-right">المعلم</th>
                  <th className="p-4 border text-right">الحالة</th>
                  <th className="p-4 border text-right">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 text-center border">
                      {course.image ? (
                        <img
                        
                          src={`https://elearning1.runasp.net${course.image}`}
                          alt={course.title}
                          className="w-10 h-10 rounded-full object-cover mx-auto border"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 mx-auto flex items-center justify-center">
                          <User className="text-gray-500" size={18} />
                        </div>
                      )}
                    </td>
                    <td className="p-3 border font-medium">{course.title}</td>
                    <td className="p-3 border max-w-xs truncate">{course.description}</td>
                    <td className="p-3 border">{course.price} ج.م</td>
                    <td className="p-3 border">{getStageText(course.stage)}</td>
                    <td className="p-3 border">{getGradeText(course.gradeLevel)}</td>
                    <td className="p-3 border text-blue-600">{getTeacherName(course.teacherId)}</td>
                    <td className="p-3 border">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        course.isActivated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {course.isActivated ? 'مفعلة' : 'غير مفعلة'}
                      </span>
                    </td>
                    <td className="p-3 border">
                      <div className="flex justify-center gap-2">
                        {/* <button
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
                        </button> */}
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
        </>
      )}
    </div>
  );
}