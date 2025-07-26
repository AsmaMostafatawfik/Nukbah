"use client";
import { useState, useEffect } from "react";
import { PlusCircle, Edit, Trash2, BookOpen, Users } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

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
  studentCount?: number;
}

export default function CoursesPage() {
  const params = useParams();
  const router = useRouter();
  const teacherId = params.teacherId as string;
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required");
        }

        // Fetch courses
        const coursesResponse = await fetch(
         `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/AllCourses/${teacherId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!coursesResponse.ok) {
          throw new Error("Failed to fetch courses");
        }

        const coursesData = await coursesResponse.json();
        
        // Fetch student counts for each course
        const coursesWithStudents = await Promise.all(
          coursesData.map(async (course: any) => {
            const studentsResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/AllStudentInCourse/${course.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            let studentCount = 0;
            if (studentsResponse.ok) {
              const studentsData = await studentsResponse.json();
              studentCount = Array.isArray(studentsData) ? studentsData.length : 0;
            }

            return {
              id: course.id,
              title: course.title,
              description: course.description,
              price: course.price,
              stage: course.stage,
              gradeLevel: course.gradeLevel,
              isActivated: course.isActivated,
              image: course.image ? `data:image/jpeg;base64,${course.image}` : null,
              teacherId: course.teacherId,
              studentCount
            };
          })
        );

        setCourses(coursesWithStudents);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [teacherId]);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/DeleteCourse/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete course");
      }

      setCourses(courses.filter((course) => course.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete course");
    }
  };

  const handleViewSessions = (courseId: number) => {
    router.push(`/teacher/dashboard/${teacherId}/courses/${courseId}/sessions`);
  };

  const getStatusText = (isActivated: boolean) => {
    return isActivated ? "نشط" : "غير نشط";
  };

  const getStatusColor = (isActivated: boolean) => {
    return isActivated
      ? { backgroundColor: "#e8f5e9", color: "#2e7d32" }
      : { backgroundColor: "#ffebee", color: "#c62828" };
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

  const getGradeLevelText = (grade: number) => {
    if (grade === 7) return "غير ذلك";
    return `الصف ${grade}`;
  };

  if (loading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8" dir="rtl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">دوراتي التعليمية</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:bg-opacity-90 transition-all"
          style={{ backgroundColor: "#3a5a78" }}
          onClick={() => router.push(`/teacher/dashboard/${teacherId}/courses/add-course`)}
        >
          <PlusCircle size={18} />
          إضافة دورة جديدة
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        {courses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            لا توجد دورات متاحة حالياً
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className={`border rounded-lg overflow-hidden transition-all duration-300 ${hoveredCourse === course.id ? 'border-blue-400 shadow-lg transform scale-105' : 'border-gray-200 shadow-md hover:shadow-lg'}`}
                onMouseEnter={() => setHoveredCourse(course.id)}
                onMouseLeave={() => setHoveredCourse(null)}
              >
                <div 
                  className="h-full flex flex-col cursor-pointer"
                  onClick={() => handleViewSessions(course.id)}
                >
                  {/* Course Image */}
                  <div className="relative h-40 bg-gray-100">
                    {course.image ? (
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <BookOpen size={40} className="text-gray-400" />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-xl font-bold text-white">{course.title}</h3>
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="p-4 flex-grow">
                    <p className="text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">المرحلة:</span>
                        <span className="font-medium">{getStageText(course.stage)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">الصف:</span>
                        <span className="font-medium">{getGradeLevelText(course.gradeLevel)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">السعر:</span>
                        <span className="font-medium text-green-700">{course.price} ج.م</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={16} className="text-gray-500" />
                        <span className="font-medium">{course.studentCount || 0} طالب</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span 
                        className={`px-3 py-1 rounded-full text-xs`}
                        style={getStatusColor(course.isActivated)}
                      >
                        {getStatusText(course.isActivated)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div 
                    className="border-t p-3 bg-gray-50 flex justify-end gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className={`p-2 rounded-full transition-all ${hoveredCourse === course.id ? 'bg-blue-100 text-blue-700' : 'text-blue-600 hover:bg-blue-50'}`}
                      onClick={() => router.push(`/teacher/dashboard/${teacherId}/courses/edit-course/${course.id}`)}
                      title="تعديل الدورة"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className={`p-2 rounded-full transition-all ${hoveredCourse === course.id ? 'bg-red-100 text-red-700' : 'text-red-600 hover:bg-red-50'}`}
                      onClick={() => handleDelete(course.id)}
                      title="حذف الدورة"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}