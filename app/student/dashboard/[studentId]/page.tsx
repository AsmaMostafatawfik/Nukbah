
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  instructor: string;
  price: number;
  instructorImage?: string;
}

export default function DashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(6);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication required");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/Student/AllCourses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        const coursesWithInstructors = data.map((course: Course) => ({
          ...course,
          instructorImage: course.instructorImage || null
        }));
        setCourses(coursesWithInstructors);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const visibleCourses = courses.slice(0, displayCount);
  const hasMoreCourses = courses.length > displayCount;

   if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">خطأ: {error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Full-screen Welcome Section with Video Background */}
      <div className="relative min-h-screen flex flex-col items-center justify-center text-white text-center p-8 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/1.mp4" type="video/mp4" />
            {/* Fallback image if video doesn't load */}
            <Image
              src="/images/hero-fallback.jpg"
              alt="Education Platform"
              fill
              className="object-cover"
            />
          </video>
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">مرحباً بك في منصتنا التعليمية</h1>
          <p className="text-xl md:text-2xl mb-12">ابدأ رحلتك التعليمية اليوم واحصل على أفضل المحتوى التعليمي</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/courses"
              className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              تصفح الكورسات
            </Link>
            <Link 
              href="/subscription"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:scale-105"
            >
              اشترك معنا
            </Link>
          </div>
        </div>
      </div>

      {/* Courses Section with Spacing */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800">أحدث الكورسات</h2>
          {courses.length > 0 && (
            <p className="text-gray-500 mt-4">
              عرض {Math.min(displayCount, courses.length)} من {courses.length} كورس
            </p>
          )}
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-xl">
            لا توجد كورسات متاحة حالياً
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleCourses.map((course) => (
                <Link 
                  key={course.id} 
                  href={`/courses/${course.id}`}
                  className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
                >
                  {/* Image with fixed height */}
                  <div className="w-full h-80 relative">
                    <Image
                      src={course.image ? `data:image/jpeg;base64,${course.image}` : "/images/course-default.jpg"}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Information */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-800 text-lg group-hover:text-[#cfb195] transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                      {course.description}
                    </p>
                    
                    {/* Instructor Info */}
                    <div className="mt-2 flex items-center">
                      <div className="w-8 h-8 rounded-full border border-gray-200 overflow-hidden mr-2">
                        {course.instructorImage ? (
                          <Image
                            src={`data:image/jpeg;base64,${course.instructorImage}`}
                            alt={course.instructor}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs text-gray-500">?</span>
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-gray-600">{course.instructor || "مجهول"}</span>
                    </div>
                    
                    {/* Price */}
                    <div className="mt-2">
                      <span className="text-indigo-600 font-bold">
                        {course.price} ج.م
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {hasMoreCourses && (
              <div className="text-center mt-12">
                <button
                  onClick={() => router.push('/student/dashboard/courses')}
                  className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all duration-300 font-bold"
                >
                  عرض المزيد
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}