'use client';
import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import { Search, Plus, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
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

   

    return matchesSearch ;
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
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">إدارة الطلاب</h1>
        <div className="flex gap-4 w-full md:w-auto">
          <Link 
            href="/admin/students/add"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition whitespace-nowrap"
          >
            <Plus size={18} />
            إضافة طالب جديد
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-3 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="ابحث عن طالب..." 
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* <select 
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
          >
            <option value="all">جميع الحالات</option>
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
          </select> */}
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الطالب</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المعلومات الأساسية</th>
                {/* <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th> */}
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
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {student.image ? (
                            <img 
                              src={`https://elearning1.runasp.net/${student.image}`} 
                              alt={student.fullName}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500 text-sm">
                                {student.fullName.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          )}
                          <div className="mr-4">
                            <div className="text-sm font-medium text-gray-900">{student.fullName}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{student.phoneNumber}</div>
                        <div className="text-sm text-gray-500">{getStageText(student.educationalStage)} - {getGradeText(student.gradeLevel)}</div>
                      </td>
                      {/* <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          student.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {student.isActive ? 'نشط' : 'غير نشط'}
                        </span>
                      </td> */}
                      <td className="px-6 py-4 text-sm font-medium flex gap-2 justify-end">
                        {/* <Link 
                          href={`/admin/students/edit/${student.id}`}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Edit size={18} />
                        </Link> */}
                        <button 
                          className="text-red-600 hover:text-red-900 p-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(student.id);
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 p-1">
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
                              {student.image && (
                                <div className="mt-4">
                                  <h4 className="font-medium text-lg text-gray-900 border-b pb-2">صورة الطالب</h4>
                                  <img 
                                    src={`data:image/jpeg;base64,${student.image}`} 
                                    alt={student.fullName}
                                    className="w-24 h-24 rounded object-cover mt-2"
                                  />
                                </div>
                              )}
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
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow mt-4">
        <div className="text-sm text-gray-500 mb-2 md:mb-0">
          عرض 1 إلى {filteredStudents.length} من {filteredStudents.length} طالب
        </div>
        <div className="flex gap-1">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50">
            السابق
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-blue-600 text-white">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">
            التالي
          </button>
        </div>
      </div>
    </div>
  );
}