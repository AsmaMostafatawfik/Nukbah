
'use client';
import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import { Search, Plus, Edit, Trash2, ChevronDown, ChevronUp, User } from 'lucide-react';

interface Student {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  schoolName: string;
  gender: number;
  age: number;
  parentPhoneNumber: string;
  educationalStage: number;
  gradeLevel: number;
  image: string | null;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedStudent, setExpandedStudent] = useState<number | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication required');
        }
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://elearning1.runasp.net';
        const response = await fetch(`${API_URL}/api/Admin/Students`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }

        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const toggleStudentExpand = (studentId: number) => {
    setExpandedStudent(expandedStudent === studentId ? null : studentId);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا الطالب؟')) return;
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://elearning1.runasp.net';

      const response = await fetch(`${API_URL}/api/Admin/DeleteUser/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete student');
      }

      setStudents(students.filter(student => student.id !== id));
      alert('تم حذف الطالب بنجاح');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'حدث خطأ أثناء الحذف');
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.phoneNumber.includes(searchTerm);

    return matchesSearch;
  });

  const getGenderText = (gender: number) => {
    return gender === 0 ? 'ذكر' : 'أنثى';
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
    if (grade === 0) return "غير محدد";
    return grade >= 1 && grade <= 6 ? `الصف ${grade}` : "غير محدد";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6" dir="rtl">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">إدارة الطلاب</h1>
        {/* <div className="flex gap-4 w-full md:w-auto">
          <Link 
            href="/admin/students/add"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition whitespace-nowrap text-sm md:text-base"
          >
            <Plus size={18} />
            إضافة طالب جديد
          </Link>
        </div> */}
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-3 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="ابحث عن طالب..." 
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Students Table - Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredStudents.length === 0 ? (
          <div className="bg-white p-4 rounded-lg shadow text-center text-gray-500">
            لا يوجد طلاب متطابقون مع معايير البحث
          </div>
        ) : (
          filteredStudents.map((student) => (
            <div key={student.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div 
                className="p-4 flex justify-between items-center cursor-pointer"
                onClick={() => toggleStudentExpand(student.id)}
              >
                <div className="flex items-center gap-3">
                  {student.image ? (
                    <img 
                      src={`https://elearning1.runasp.net${student.image}`} 
                      alt={student.fullName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="text-gray-500" size={18} />
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-gray-900">{student.fullName}</div>
                    <div className="text-sm text-gray-500">{student.phoneNumber}</div>
                  </div>
                </div>
                <button className="text-gray-600">
                  {expandedStudent === student.id ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
              </div>

              {expandedStudent === student.id && (
                <div className="p-4 border-t">
                  <div className="space-y-4">
                    {/* Personal Information */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">المعلومات الشخصية</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">الجنس:</span>
                          <span className="font-medium block">{getGenderText(student.gender)}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">العمر:</span>
                          <span className="font-medium block">{student.age}</span>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">معلومات التواصل</h4>
                      <div className="space-y-1 text-sm">
                        <div>
                          <span className="text-gray-500">البريد الإلكتروني:</span>
                          <span className="font-medium block">{student.email}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">هاتف ولي الأمر:</span>
                          <span className="font-medium block">{student.parentPhoneNumber}</span>
                        </div>
                      </div>
                    </div>

                    {/* Educational Information */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">المعلومات التعليمية</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">المدرسة:</span>
                          <span className="font-medium block">{student.schoolName}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">المرحلة:</span>
                          <span className="font-medium block">{getStageText(student.educationalStage)}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">الصف:</span>
                          <span className="font-medium block">{getGradeText(student.gradeLevel)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-2">
                      <button 
                        className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(student.id);
                        }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Students Table - Desktop */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الطالب</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">معلومات التواصل</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المعلومات التعليمية</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    لا يوجد طلاب متطابقون مع معايير البحث
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <Fragment key={student.id}>
                    <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleStudentExpand(student.id)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {student.image ? (
                            <img 
                              src={`https://elearning1.runasp.net/${student.image}`} 
                              alt={student.fullName}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="text-gray-500" size={18} />
                            </div>
                          )}
                          <div className="mr-4">
                            <div className="text-sm font-medium text-gray-900">{student.fullName}</div>
                            <div className="text-sm text-gray-500">{getGenderText(student.gender)}, {student.age} سنة</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.email}</div>
                        <div className="text-sm text-gray-500">{student.phoneNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.schoolName}</div>
                        <div className="text-sm text-gray-500">{getStageText(student.educationalStage)} - {getGradeText(student.gradeLevel)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2 justify-end">
                        <button 
                          className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(student.id);
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 p-1 hover:bg-gray-50 rounded-full">
                          {expandedStudent === student.id ? (
                            <ChevronUp size={18} />
                          ) : (
                            <ChevronDown size={18} />
                          )}
                        </button>
                      </td>
                    </tr>
                    {expandedStudent === student.id && (
                      <tr className="bg-gray-50">
                        <td colSpan={4} className="px-6 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Personal Information */}
                            <div className="space-y-4">
                              <h4 className="font-medium text-lg text-gray-900 border-b pb-2">المعلومات الشخصية</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-500">الاسم الكامل:</span>
                                  <span className="font-medium">{student.fullName}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">الجنس:</span>
                                  <span className="font-medium">{getGenderText(student.gender)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">العمر:</span>
                                  <span className="font-medium">{student.age}</span>
                                </div>
                              </div>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-4">
                              <h4 className="font-medium text-lg text-gray-900 border-b pb-2">معلومات التواصل</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-500">البريد الإلكتروني:</span>
                                  <span className="font-medium">{student.email}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">رقم الهاتف:</span>
                                  <span className="font-medium">{student.phoneNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">هاتف ولي الأمر:</span>
                                  <span className="font-medium">{student.parentPhoneNumber}</span>
                                </div>
                              </div>
                            </div>

                            {/* Educational Information */}
                            <div className="space-y-4">
                              <h4 className="font-medium text-lg text-gray-900 border-b pb-2">المعلومات التعليمية</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-500">المدرسة:</span>
                                  <span className="font-medium">{student.schoolName}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">المرحلة:</span>
                                  <span className="font-medium">{getStageText(student.educationalStage)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">الصف:</span>
                                  <span className="font-medium">{getGradeText(student.gradeLevel)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {filteredStudents.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow mt-4">
          <div className="text-sm text-gray-500 mb-2 md:mb-0">
            عرض 1 إلى {filteredStudents.length} من {filteredStudents.length} طالب
          </div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 hover:bg-gray-50">
              السابق
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-blue-600 text-white">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              التالي
            </button>
          </div>
        </div>
      )}
    </div>
  );
}