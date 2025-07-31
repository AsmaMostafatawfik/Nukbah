// 'use client';

// import { useEffect, useState } from 'react';
// import { Pencil, Trash2, CheckCircle } from 'lucide-react';

// type Teacher = {
//   id: string;
//   fullName: string;
//   email: string;
//   phoneNumber?: string;
//   schoolName?: string;
//   bio?: string;
//   isAcivated: boolean; // Corrected to match backend spelling
//   registirationDate: string;
//   image?: string;
// };

// export default function TeachersPage() {
//   const [teachers, setTeachers] = useState<Teacher[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activatingId, setActivatingId] = useState<string | null>(null);

//   const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

//   const fetchTeachers = async () => {
//     if (!token) {
//       setError('الرجاء تسجيل الدخول أولاً.');
//       setLoading(false);
//       return;
//     }
//       const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://elearning1.runasp.net';
//     try {
//       const response = await fetch(`${API_URL}/api/Admin/Teachers`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) throw new Error('فشل في جلب بيانات المعلمين');

//       const data = await response.json();
//       setTeachers(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTeachers();
//   }, []);

//   const handleDelete = async (id: string) => {
//     if (!confirm('هل أنت متأكد من حذف هذا المعلم؟')) return;

//     const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://elearning1.runasp.net';

//     try {
//       const response = await fetch(`${API_URL}/api/Admin/DeleteUser/${id}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) throw new Error('فشل في حذف المعلم');

//       alert('تم حذف المعلم بنجاح');
//       await fetchTeachers();
//     } catch (error) {
//       alert(error instanceof Error ? error.message : 'حدث خطأ أثناء الحذف');
//     }
//   };

//   const handleEdit = (id: string) => {
//     alert(`تعديل المعلم ID: ${id}`);
//   };

//   const handleActivate = async (id: string) => {
//     if (!confirm('هل أنت متأكد من تفعيل حساب هذا المعلم؟')) return;


//     const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://elearning1.runasp.net';
    
//     setActivatingId(id);
//     try {
//       const response = await fetch(`${API_URL}/api/Admin/Activate_Account`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           teacherId: id
//         }),
//       });

//       if (!response.ok) throw new Error('فشل في تفعيل الحساب');

//       // Update local state to reflect activation
//       setTeachers(teachers.map(teacher => 
//         teacher.id === id ? { ...teacher, isAcivated: true } : teacher
//       ));
//       alert('تم تفعيل الحساب بنجاح');
//     } catch (error) {
//       alert(error instanceof Error ? error.message : 'حدث خطأ أثناء التفعيل');
//     } finally {
//       setActivatingId(null);
//     }
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">قائمة المعلمين</h1>

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
//       ) : teachers.length === 0 ? (
//         <div className="alert alert-info max-w-md mx-auto">
//           <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//           </svg>
//           <span>لا يوجد معلمون مسجلون حتى الآن</span>
//         </div>
//       ) : (
//         <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
//           <table className="min-w-full text-sm text-right bg-white">
//             <thead className="bg-gray-50 text-gray-700 font-bold">
//               <tr>
//                 <th className="p-4 border">الصورة</th>
//                 <th className="p-4 border">الاسم الكامل</th>
//                 <th className="p-4 border">البريد الإلكتروني</th>
//                 <th className="p-4 border">رقم الهاتف</th>
//                 <th className="p-4 border">المدرسة</th>
//                 <th className="p-4 border">النبذة</th>
//                 <th className="p-4 border">حالة الحساب</th>
//                 <th className="p-4 border">تاريخ التسجيل</th>
//                 <th className="p-4 border">الإجراءات</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {teachers.map((teacher) => (
//                 <tr key={teacher.id} className="hover:bg-gray-50 transition-colors">
//                   <td className="p-3 text-center border">
//                     {teacher.image ? (
//                       <img
//                         src={`data:image/jpeg;base64,${teacher.image}`}
//                         alt={teacher.fullName}
//                         className="w-12 h-12 rounded-full object-cover mx-auto border"
//                       />
//                     ) : (
//                       <div className="w-12 h-12 rounded-full bg-gray-200 mx-auto"></div>
//                     )}
//                   </td>
//                   <td className="p-3 border font-medium">{teacher.fullName}</td>
//                   <td className="p-3 border text-blue-600">{teacher.email}</td>
//                   <td className="p-3 border">{teacher.phoneNumber || '—'}</td>
//                   <td className="p-3 border">{teacher.schoolName || '—'}</td>
//                   <td className="p-3 border max-w-xs truncate">{teacher.bio || '—'}</td>
//                   <td className="p-3 border">
//                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
//                       teacher.isAcivated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                     }`}>
//                       {teacher.isAcivated ? 'مفعل' : 'غير مفعل'}
//                     </span>
//                   </td>
//                   <td className="p-3 border text-gray-500">
//                     {new Date(teacher.registirationDate).toLocaleDateString('ar-EG')}
//                   </td>
//                   <td className="p-3 border">
//                     <div className="flex justify-center gap-2">
//                       <button
//                         onClick={() => handleEdit(teacher.id)}
//                         className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white transition-colors"
//                         title="تعديل"
//                       >
//                         <Pencil size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(teacher.id)}
//                         className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
//                         title="حذف"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                       {!teacher.isAcivated && (
//                         <button
//                           onClick={() => handleActivate(teacher.id)}
//                           disabled={activatingId === teacher.id}
//                           className={`p-2 rounded-full ${
//                             activatingId === teacher.id
//                               ? 'bg-gray-400 cursor-not-allowed'
//                               : 'bg-green-500 hover:bg-green-600'
//                           } text-white transition-colors`}
//                           title="تفعيل الحساب"
//                         >
//                           {activatingId === teacher.id ? (
//                             <span className="loading loading-spinner loading-xs"></span>
//                           ) : (
//                             <CheckCircle size={16} />
//                           )}
//                         </button>
//                       )}
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
import { Pencil, Trash2, CheckCircle, User, ChevronDown, ChevronUp } from 'lucide-react';

type Teacher = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  schoolName?: string;
  bio?: string;
  isAcivated: boolean;
  registirationDate: string;
  image?: string;
};

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activatingId, setActivatingId] = useState<string | null>(null);
  const [expandedTeacher, setExpandedTeacher] = useState<string | null>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchTeachers = async () => {
    if (!token) {
      setError('الرجاء تسجيل الدخول أولاً.');
      setLoading(false);
      return;
    }
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://elearning1.runasp.net';
    try {
      const response = await fetch(`${API_URL}/api/Admin/Teachers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('فشل في جلب بيانات المعلمين');

      const data = await response.json();
      setTeachers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المعلم؟')) return;

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://elearning1.runasp.net';

    try {
      const response = await fetch(`${API_URL}/api/Admin/DeleteUser/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('فشل في حذف المعلم');

      alert('تم حذف المعلم بنجاح');
      await fetchTeachers();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'حدث خطأ أثناء الحذف');
    }
  };

  const handleEdit = (id: string) => {
    alert(`تعديل المعلم ID: ${id}`);
  };

  const handleActivate = async (id: string) => {
    if (!confirm('هل أنت متأكد من تفعيل حساب هذا المعلم؟')) return;

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://elearning1.runasp.net';
    
    setActivatingId(id);
    try {
      const response = await fetch(`${API_URL}/api/Admin/Activate_Account`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          teacherId: id
        }),
      });

      if (!response.ok) throw new Error('فشل في تفعيل الحساب');

      setTeachers(teachers.map(teacher => 
        teacher.id === id ? { ...teacher, isAcivated: true } : teacher
      ));
      alert('تم تفعيل الحساب بنجاح');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'حدث خطأ أثناء التفعيل');
    } finally {
      setActivatingId(null);
    }
  };

  const toggleTeacherExpand = (teacherId: string) => {
    setExpandedTeacher(expandedTeacher === teacherId ? null : teacherId);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto" dir="rtl">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">قائمة المعلمين</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mr-2 text-blue-500">جارٍ تحميل البيانات...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
          {error}
        </div>
      ) : teachers.length === 0 ? (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4 text-center">
          لا يوجد معلمون مسجلون حتى الآن
        </div>
      ) : (
        <>
          {/* Mobile View - Cards */}
          <div className="md:hidden space-y-4">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                <div 
                  className="p-4 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleTeacherExpand(teacher.id)}
                >
                  <div className="flex items-center gap-3">
                    {teacher.image ? (
                      <img
                        src={`https://elearning1.runasp.net${teacher.image}`}
                        alt={teacher.fullName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="text-gray-500" size={18} />
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-gray-900">{teacher.fullName}</div>
                      <div className="text-sm text-gray-500">{teacher.email}</div>
                    </div>
                  </div>
                  <button className="text-gray-600">
                    {expandedTeacher === teacher.id ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>
                </div>

                {expandedTeacher === teacher.id && (
                  <div className="p-4 border-t">
                    <div className="space-y-4">
                      {/* Teacher Info */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900">معلومات المعلم</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-500">رقم الهاتف:</span>
                            <span className="font-medium block">{teacher.phoneNumber || '—'}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">المدرسة:</span>
                            <span className="font-medium block">{teacher.schoolName || '—'}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">حالة الحساب:</span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              teacher.isAcivated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {teacher.isAcivated ? 'مفعل' : 'غير مفعل'}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">تاريخ التسجيل:</span>
                            <span className="font-medium block">
                              {new Date(teacher.registirationDate).toLocaleDateString('ar-EG')}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bio */}
                      {teacher.bio && (
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900">النبذة</h4>
                          <p className="text-sm text-gray-700">{teacher.bio}</p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(teacher.id);
                          }}
                          className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white transition-colors"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(teacher.id);
                          }}
                          className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                        {!teacher.isAcivated && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleActivate(teacher.id);
                            }}
                            disabled={activatingId === teacher.id}
                            className={`p-2 rounded-full ${
                              activatingId === teacher.id
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-green-500 hover:bg-green-600'
                            } text-white transition-colors`}
                          >
                            {activatingId === teacher.id ? (
                              <span className="loading loading-spinner loading-xs"></span>
                            ) : (
                              <CheckCircle size={16} />
                            )}
                          </button>
                        )}
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
                  <th className="p-4 border text-right">الاسم الكامل</th>
                  <th className="p-4 border text-right">البريد الإلكتروني</th>
                  <th className="p-4 border text-right">رقم الهاتف</th>
                  <th className="p-4 border text-right">حالة الحساب</th>
                  <th className="p-4 border text-right">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {teachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 text-center border">
                      {teacher.image ? (
                        <img
                          src={`https://elearning1.runasp.net${teacher.image}`}
                          alt={teacher.fullName}
                          className="w-10 h-10 rounded-full object-cover mx-auto border"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 mx-auto flex items-center justify-center">
                          <User className="text-gray-500" size={18} />
                        </div>
                      )}
                    </td>
                    <td className="p-3 border font-medium">{teacher.fullName}</td>
                    <td className="p-3 border text-blue-600">{teacher.email}</td>
                    <td className="p-3 border">{teacher.phoneNumber || '—'}</td>
                    <td className="p-3 border">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        teacher.isAcivated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {teacher.isAcivated ? 'مفعل' : 'غير مفعل'}
                      </span>
                    </td>
                    <td className="p-3 border">
                      <div className="flex justify-center gap-2">
                        {/* <button
                          onClick={() => handleEdit(teacher.id)}
                          className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white transition-colors"
                          title="تعديل"
                        >
                          <Pencil size={16} />
                        </button> */}
                        <button
                          onClick={() => handleDelete(teacher.id)}
                          className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
                          title="حذف"
                        >
                          <Trash2 size={16} />
                        </button>
                        {!teacher.isAcivated && (
                          <button
                            onClick={() => handleActivate(teacher.id)}
                            disabled={activatingId === teacher.id}
                            className={`p-2 rounded-full ${
                              activatingId === teacher.id
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-green-500 hover:bg-green-600'
                            } text-white transition-colors`}
                            title="تفعيل الحساب"
                          >
                            {activatingId === teacher.id ? (
                              <span className="loading loading-spinner loading-xs"></span>
                            ) : (
                              <CheckCircle size={16} />
                            )}
                          </button>
                        )}
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