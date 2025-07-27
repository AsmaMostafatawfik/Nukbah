
// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";

// interface StudentProfile {
//   fullName: string;
//   email: string;
//   phoneNumber: string;
//   schoolName: string;
//   gender: number;
//   age: number;
//   parentPhoneNumber: string;
//   educationalStage: number;
//   gradeLevel: number;
//   image: string | null;
// }

// type ActiveTab = 'profile' | 'courses' | 'subscription' | 'help';

// export default function ProfilePage() {
//   const [profile, setProfile] = useState<StudentProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState<ActiveTab>('profile');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const userData = localStorage.getItem("user");
        
//         if (!token || !userData) {
//           throw new Error("Authentication required");
//         }

//         const user = JSON.parse(userData);
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/Student/StudentProfile/${user.id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch profile");
//         }

//         const data = await response.json();
//         setProfile(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An unknown error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const getEducationalStageName = (stage: number): string => {
//     switch(stage) {
//       case 0: return "الابتدائية";
//       case 1: return "المتوسطة";
//       case 2: return "الثانوية";
//       case 3: return "جامعة";
//       case 4: return "غير ذلك";
//       default: return "غير محدد";
//     }
//   };

//   const getGenderName = (gender: number): string => {
//     return gender === 0 ? "ذكر" : "أنثى";
//   };

//   const renderTabContent = () => {
//     switch(activeTab) {
//       case 'profile':
//         return (
//           <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
//             <div className="flex flex-col md:flex-row gap-6 md:gap-8">
//               <div className="flex-shrink-0 mx-auto md:mx-0">
//                 <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full border-4 border-indigo-100 overflow-hidden">
//                   {profile?.image ? (
//                     <Image 
//                       src={`data:image/jpeg;base64,${profile.image}`}
//                       alt="صورة الطالب"
//                       width={128}
//                       height={128}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                       <span className="text-gray-500">لا توجد صورة</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
//                   <div className="text-right">
//                     <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{profile?.fullName}</h2>
//                     <p className="text-indigo-600 font-medium mt-1">
//                       {profile && getEducationalStageName(profile.educationalStage)} - {profile && `الصف ${profile.gradeLevel}`}
//                     </p>
//                   </div>
//                   <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors w-full sm:w-auto">
//                     تعديل الملف
//                   </button>
//                 </div>

//                 <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-right">
//                   <div className="space-y-2">
//                     <h3 className="font-medium text-gray-500">معلومات الاتصال</h3>
//                     <div className="bg-gray-50 p-3 sm:p-4 rounded-lg space-y-2">
//                       <p className="text-gray-800">{profile?.email}</p>
//                       <p className="text-gray-800">{profile?.phoneNumber}</p>
//                       <p className="text-gray-800">الجنس: {profile && getGenderName(profile.gender)}</p>
//                       <p className="text-gray-800">العمر: {profile?.age} سنة</p>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <h3 className="font-medium text-gray-500">المعلومات الأكاديمية</h3>
//                     <div className="bg-gray-50 p-3 sm:p-4 rounded-lg space-y-2">
//                       <p className="text-gray-800">المدرسة: {profile?.schoolName}</p>
//                       <p className="text-gray-800">رقم ولي الأمر: {profile?.parentPhoneNumber}</p>
//                       <p className="text-gray-800">المرحلة: {profile && getEducationalStageName(profile.educationalStage)}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       case 'courses':
//         return (
//           <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">المقررات الدراسية</h2>
//             <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
//               <p>سيتم عرض المقررات هنا</p>
//             </div>
//           </div>
//         );
//       case 'subscription':
//         return (
//           <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">الاشتراك</h2>
//             <div className="bg-gray-50 rounded-lg p-6 sm:p-8 text-center text-gray-500">
//               <p>لا يوجد لديك اشتراك في الوقت الحالي</p>
//               <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
//                 اشترك الآن
//               </button>
//             </div>
//           </div>
//         );
//       case 'help':
//         return (
//           <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">المساعدة</h2>
//             <div className="space-y-3 sm:space-y-4">
//               <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
//                 <h3 className="font-bold text-gray-700">البريد الإلكتروني للدعم</h3>
//                 <p className="text-gray-600 mt-1 sm:mt-2">support@elearning.com</p>
//               </div>
//               <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
//                 <h3 className="font-bold text-gray-700">رقم الدعم الفني</h3>
//                 <p className="text-gray-600 mt-1 sm:mt-2">+966 12 345 6789</p>
//               </div>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }
//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   if (!profile) {
//     return <div className="container mx-auto px-4 py-8 text-center">الملف الشخصي غير موجود</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8" dir="rtl">
//       <div className="space-y-6 sm:space-y-8">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">لوحة التحكم</h1>
        
//         <div className="flex overflow-x-auto pb-1 border-b border-gray-200">
//           <button
//             onClick={() => setActiveTab('profile')}
//             className={`px-4 sm:px-6 py-2 sm:py-3 font-medium text-sm whitespace-nowrap ${
//               activeTab === 'profile' 
//                 ? 'border-b-2 border-indigo-600 text-indigo-600' 
//                 : 'text-gray-500 hover:text-gray-700'
//             }`}
//           >
//             الملف الشخصي
//           </button>
//           <button
//             onClick={() => setActiveTab('courses')}
//             className={`px-4 sm:px-6 py-2 sm:py-3 font-medium text-sm whitespace-nowrap ${
//               activeTab === 'courses' 
//                 ? 'border-b-2 border-indigo-600 text-indigo-600' 
//                 : 'text-gray-500 hover:text-gray-700'
//             }`}
//           >
//             المقررات
//           </button>
//           <button
//             onClick={() => setActiveTab('subscription')}
//             className={`px-4 sm:px-6 py-2 sm:py-3 font-medium text-sm whitespace-nowrap ${
//               activeTab === 'subscription' 
//                 ? 'border-b-2 border-indigo-600 text-indigo-600' 
//                 : 'text-gray-500 hover:text-gray-700'
//             }`}
//           >
//             الاشتراك
//           </button>
//           <button
//             onClick={() => setActiveTab('help')}
//             className={`px-4 sm:px-6 py-2 sm:py-3 font-medium text-sm whitespace-nowrap ${
//               activeTab === 'help' 
//                 ? 'border-b-2 border-indigo-600 text-indigo-600' 
//                 : 'text-gray-500 hover:text-gray-700'
//             }`}
//           >
//             المساعدة
//           </button>
//         </div>

//         {renderTabContent()}
//       </div>
//     </div>
//   );
// }








"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

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
  id: number;
  title: string;
  description: string;
  image: string | null;
  instructor?: string;
  instructorImage?: string;
}

type ActiveTab = 'profile' | 'courses' | 'subscription' | 'help';

export default function ProfilePage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [coursesLoading, setCoursesLoading] = useState(false);
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
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setCoursesLoading(false);
      }
    };

    fetchCourses();
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

  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
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
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">المقررات الدراسية</h2>
            {coursesLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : courses.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
                <p>لا توجد مقررات مسجلة حالياً</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-40 w-full">
                      {course.image ? (
                        <Image
                          src={course.image.startsWith('data:') ? course.image : `https://elearning1.runasp.net${course.image}`}
                          alt={course.title}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "/images/course-default.jpg";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400">لا توجد صورة</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{course.title}</h3>
                      {course.instructor && (
                        <p className="text-sm text-gray-600 mb-2">المدرس: {course.instructor}</p>
                      )}
                      <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'subscription':
        return (
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">الاشتراك</h2>
            <div className="bg-gray-50 rounded-lg p-6 sm:p-8 text-center text-gray-500">
              <p>لا يوجد لديك اشتراك في الوقت الحالي</p>
              <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                اشترك الآن
              </button>
            </div>
          </div>
        );
      case 'help':
        return (
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
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
      <div className="flex justify-center items-center h-64">
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
      </div>
    );
  }

  if (!profile) {
    return <div className="container mx-auto px-4 py-8 text-center">الملف الشخصي غير موجود</div>;
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
            الاشتراك
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