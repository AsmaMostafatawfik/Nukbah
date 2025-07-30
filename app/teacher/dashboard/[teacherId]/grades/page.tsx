"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

interface Student {
  id: string;
  fullName: string;
}

interface Grade {
  examId: number;
  totalScore: number;
  maxScore: number;
  submittedAt: string;
}

interface StudentWithGrades {
  course: string;
  student: Student;
  grades: Grade[];
}

export default function TeacherGradesPage() {
  const params = useParams();
  const router = useRouter();
  const { teacherId } = params as { teacherId: string };
  const [data, setData] = useState<StudentWithGrades[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [expandedStudents, setExpandedStudents] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required");
        }

        const response = await fetch(
          `https://elearning1.runasp.net/api/Teacher/StudentsWithGrades/${teacherId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teacherId]);

  const toggleStudentExpansion = (studentId: string) => {
    setExpandedStudents(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  const getUniqueCourses = () => {
    return [...new Set(data.map(item => item.course))];
  };

  const getStudentsByCourse = (course: string) => {
    return data.filter(item => item.course === course);
  };

  const calculateAverage = (grades: Grade[]) => {
    if (grades.length === 0) return 0;
    const total = grades.reduce((sum, grade) => sum + (grade.totalScore / grade.maxScore), 0);
    return (total / grades.length) * 100;
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
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <button 
          onClick={() => router.push(`/teacher/dashboard/${teacherId}`)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          العودة إلى لوحة التحكم
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">درجات الطلاب</h1>
        
        {/* Courses List */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">المقررات الدراسية</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {getUniqueCourses().map(course => (
              <button
                key={course}
                onClick={() => setSelectedCourse(course)}
                className={`px-4 py-3 rounded-lg shadow-sm border text-right transition-all ${
                  selectedCourse === course 
                    ? 'bg-blue-100 border-blue-400 text-blue-800' 
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <h3 className="font-medium">{course}</h3>
                <p className="text-sm text-gray-500">
                  {getStudentsByCourse(course).length} طالب
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Students and Grades */}
        {selectedCourse && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{selectedCourse}</h2>
                <button 
                  onClick={() => setSelectedCourse(null)}
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  رجوع
                </button>
              </div>

              <div className="space-y-4">
                {getStudentsByCourse(selectedCourse).map((item, index) => (
                  <div key={`${item.student.id}-${index}`} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div 
                      className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleStudentExpansion(item.student.id)}
                    >
                      <div>
                        <h3 className="font-medium text-gray-800">{item.student.fullName}</h3>
                        <p className="text-sm text-gray-500">
                          {item.grades.length} اختبارات
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          item.grades.length > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.grades.length > 0 ? `${calculateAverage(item.grades).toFixed(1)}%` : 'لا يوجد درجات'}
                        </span>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 text-gray-500 transition-transform ${
                            expandedStudents[item.student.id] ? 'rotate-180' : ''
                          }`}
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>

                    {expandedStudents[item.student.id] && (
                      <div className="p-4 bg-white">
                        {item.grades.length > 0 ? (
                          <div className="space-y-3">
                            {item.grades.map((grade, idx) => (
                              <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-blue-50 rounded-lg">
                                <div>
                                  <p className="text-xs text-gray-500">الاختبار #{grade.examId}</p>
                                  <p className="font-medium">{new Date(grade.submittedAt).toLocaleDateString('ar-EG')}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">الدرجة</p>
                                  <p className="font-medium">
                                    {grade.totalScore} / {grade.maxScore}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">النسبة</p>
                                  <p className="font-medium">
                                    {((grade.totalScore / grade.maxScore) * 100).toFixed(1)}%
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4 text-gray-500">
                            لا توجد درجات مسجلة لهذا الطالب
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}