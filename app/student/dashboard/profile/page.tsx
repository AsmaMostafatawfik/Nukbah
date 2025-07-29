"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface StudentProfile {
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

interface Course {
  id: number | string;
  title: string;
  description: string;
  image: string | null;
  instructor?: string;
  instructorImage?: string;
}

interface EnrollmentRequest {
  type: string;
  courseTitle: string;
  status: string; // 0: Pending, 1: Approved, 2: Rejected
  date: string;
}

interface ViewExtensionRequest {
  type: string;
  courseTitle: string;
  videoTitle: string;
  reason: string;
  status: string; // 0: Pending, 1: Approved, 2: Rejected
}

interface StudentRequests {
  enrollmentRequests: EnrollmentRequest[];
  viewExtensionRequests: ViewExtensionRequest[];
}

type ActiveTab = 'profile' | 'courses' | 'subscription' | 'help';

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [requests, setRequests] = useState<StudentRequests | null>(null);
  const [loading, setLoading] = useState(true);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('profile');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        
        if (!token || !userData) {
          throw new Error("Authentication required");
        }

        const user = JSON.parse(userData);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/Student/StudentProfile/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      if (activeTab !== 'courses') return;

      try {
        setCoursesLoading(true);
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        
        if (!token || !userData) {
          throw new Error("Authentication required");
        }

        const user = JSON.parse(userData);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/Student/StudentCourses/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch courses: ${response.status}`);
        }

        const data = await response.json();
        
        const validCourses = Array.isArray(data) 
          ? data.map((course, index) => ({
              ...course,
              id: course.id || `temp-${index}`,
              image: course.image || null,
              description: course.description || "لا يوجد وصف للمقرر"
            }))
          : [];

        setCourses(validCourses);
        setError(null);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err instanceof Error ? err.message : "Failed to load courses");
        setCourses([]);
      } finally {
        setCoursesLoading(false);
      }
    };

    fetchCourses();
  }, [activeTab]);

  useEffect(() => {
    const fetchRequests = async () => {
      if (activeTab !== 'subscription') return;

      try {
        setRequestsLoading(true);
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        
        if (!token || !userData) {
          throw new Error("Authentication required");
        }

        const user = JSON.parse(userData);
        const response = await fetch(
          `https://elearning1.runasp.net/api/Student/StudentAllRequests/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch requests: ${response.status}`);
        }

        const data = await response.json();
        setRequests(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError(err instanceof Error ? err.message : "Failed to load requests");
        setRequests(null);
      } finally {
        setRequestsLoading(false);
      }
    };

    fetchRequests();
  }, [activeTab]);

  const getEducationalStageName = (stage: number): string => {
    switch(stage) {
      case 0: return "الابتدائية";
      case 1: return "المتوسطة";
      case 2: return "الثانوية";
      case 3: return "جامعة";
      case 4: return "غير ذلك";
      default: return "غير محدد";
    }
  };

  const getGenderName = (gender: number): string => {
    return gender === 0 ? "ذكر" : "أنثى";
  };

  const getStatusName = (status: string): { text: string, color: string } => {
  switch(status) {
    case "Pending": // Pending
      return { text: "قيد الانتظار", color: "text-yellow-600" };
    case "Approved": // Approved
      return { text: "مقبول", color: "text-green-600" };
    case "Rejected": // Rejected
      return { text: "مرفوض", color: "text-red-600" };
    default:
      return { text: "غير معروف", color: "text-gray-600" };
  }
};

  const handleCourseClick = (courseId: number | string) => {
    if (typeof courseId === 'number') {
      router.push(`/student/dashboard/courses/${courseId}/courseContent`);
    }
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div key="profile-content" className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full border-4 border-indigo-100 overflow-hidden">
                  {profile?.image ? (
                    <Image 
                      src={`data:image/jpeg;base64,${profile.image}`}
                      alt="صورة الطالب"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">لا توجد صورة</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="text-right">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{profile?.fullName}</h2>
                    <p className="text-indigo-600 font-medium mt-1">
                      {profile && getEducationalStageName(profile.educationalStage)} - {profile && `الصف ${profile.gradeLevel}`}
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors w-full sm:w-auto">
                    تعديل الملف
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-right">
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-500">معلومات الاتصال</h3>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg space-y-2">
                      <p className="text-gray-800">{profile?.email}</p>
                      <p className="text-gray-800">{profile?.phoneNumber}</p>
                      <p className="text-gray-800">الجنس: {profile && getGenderName(profile.gender)}</p>
                      <p className="text-gray-800">العمر: {profile?.age} سنة</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-500">المعلومات الأكاديمية</h3>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg space-y-2">
                      <p className="text-gray-800">المدرسة: {profile?.schoolName}</p>
                      <p className="text-gray-800">رقم ولي الأمر: {profile?.parentPhoneNumber}</p>
                      <p className="text-gray-800">المرحلة: {profile && getEducationalStageName(profile.educationalStage)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
    case 'courses':
  return (
    <div key="courses-content" className="bg-white p-4 sm:p-8 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">المقررات الدراسية</h2>
        <button 
          onClick={() => router.push('/student/dashboard/courses')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <span>تصفح المقررات</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
      
      {coursesLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => setActiveTab('courses')}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium"
          >
            حاول مرة أخرى
          </button>
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-500 mb-2">لا توجد مقررات مسجلة حالياً</h3>
          <p className="text-gray-400 mb-6">يمكنك تصفح المقررات المتاحة والتسجيل فيها</p>
          <button 
            onClick={() => router.push('/student/dashboard/courses')}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            تصفح المقررات
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div 
              key={`course-${course.id}`}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group"
              onClick={() => handleCourseClick(course.id)}
            >
              <div className="relative h-48 w-full bg-gradient-to-br from-gray-100 to-gray-50">
                {course.image ? (
                  course.image.startsWith('data:') ? (
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      unoptimized
                    />
                  ) : (
                    <img
                      src={course.image.startsWith('http') ? course.image : `https://elearning1.runasp.net${course.image}`}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "/images/course-default.jpg";
                      }}
                    />
                  )
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm">لا توجد صورة للمقرر</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{course.title}</h3>
                {course.instructor && (
                  <div className="flex items-center gap-2 mb-3">
                    {course.instructorImage ? (
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <img 
                          src={course.instructorImage} 
                          alt={course.instructor}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                    <p className="text-sm text-gray-600">المدرس: {course.instructor}</p>
                  </div>
                )}
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">{course.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">اضغط لعرض التفاصيل</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
      
   case 'subscription':
  return (
    <div key="subscription-content" className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">طلباتي</h2>
      
      {requestsLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          {error}
          <button 
            onClick={() => setActiveTab('subscription')}
            className="mt-2 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded text-sm"
          >
            حاول مرة أخرى
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Enrollment Requests Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">طلبات التسجيل</h3>
            {requests?.enrollmentRequests?.length ? (
              <div className="space-y-4">
                {requests.enrollmentRequests.map((request, index) => {
                  const status = getStatusName(request.status);
                  const bgColor = request.status === "Pending" ? "bg-yellow-500" : 
                                 request.status === "Approved" ? "bg-green-500" : 
                                 request.status === "Rejected" ? "bg-red-500" : "bg-gray-500";
                  return (
                    <div key={`enrollment-${index}`} className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex justify-between items-start hover:shadow-sm transition">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{request.courseTitle}</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          التاريخ: {new Date(request.date).toLocaleDateString('ar-EG')}
                        </p>
                      </div>
                      <div className="ml-6">
                        <div className={`px-4 py-2 rounded-xl border ${bgColor} border-transparent text-white text-sm font-medium`}>
                          {status.text}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-500">
                لا توجد طلبات تسجيل
              </div>
            )}
          </div>

          {/* View Extension Requests Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">طلبات تمديد المشاهدة</h3>
            {requests?.viewExtensionRequests?.length ? (
              <div className="space-y-4">
                {requests.viewExtensionRequests.map((request, index) => {
                  const status = getStatusName(request.status);
                  const bgColor = request.status === "Pending" ? "bg-yellow-500" : 
                                 request.status === "Approved" ? "bg-green-500" : 
                                 request.status === "Rejected" ? "bg-red-500" : "bg-gray-500";
                  return (
                    <div key={`extension-${index}`} className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex justify-between items-start hover:shadow-sm transition">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{request.courseTitle}</h4>
                        <p className="text-sm text-gray-600">الفيديو: {request.videoTitle}</p>
                        {request.reason && (
                          <p className="text-sm text-gray-500 mt-1">السبب: {request.reason}</p>
                        )}
                      </div>
                      <div className="ml-6">
                        <div className={`px-4 py-2 rounded-xl border ${bgColor} border-transparent text-white text-sm font-medium`}>
                          {status.text}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-500">
                لا توجد طلبات تمديد مشاهدة
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
      case 'help':
        return (
          <div key="help-content" className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">المساعدة</h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-700">البريد الإلكتروني للدعم</h3>
                <p className="text-gray-600 mt-1 sm:mt-2">support@elearning.com</p>
              </div>
              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-700">رقم الدعم الفني</h3>
                <p className="text-gray-600 mt-1 sm:mt-2">+966 12 345 6789</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div key="profile-loading" className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div key="error-message" className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          إعادة تحميل
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8" dir="rtl">
      <div className="space-y-6 sm:space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">لوحة التحكم</h1>
        
        <div className="flex overflow-x-auto pb-1 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 sm:px-6 py-2 sm:py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === 'profile' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            الملف الشخصي
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 sm:px-6 py-2 sm:py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === 'courses' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            المقررات
          </button>
          <button
            onClick={() => setActiveTab('subscription')}
            className={`px-4 sm:px-6 py-2 sm:py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === 'subscription' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            الطلبات
          </button>
          <button
            onClick={() => setActiveTab('help')}
            className={`px-4 sm:px-6 py-2 sm:py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === 'help' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            المساعدة
          </button>
        </div>

        {renderTabContent()}
      </div>
    </div>
  );
}