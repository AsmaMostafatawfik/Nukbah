'use client';
import Image from 'next/image';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import HomeLayout from '../HomeLayout';


const RoleSelectionPage: NextPage = () => {
  const router = useRouter();

  const handleTeacherClick = () => {
    // Replace with your actual teacher route
    router.push('/teacher/register');
  };

  const handleStudentClick = () => {
    // Replace with your actual student route
    router.push('/student/register');
  };

  return (
    <HomeLayout>
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          اختر نوع الحساب
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Teacher Card */}
          <div 
            className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 transition-transform hover:scale-[1.02] cursor-pointer"
            onClick={handleTeacherClick}
          >
            <div className="h-48 relative overflow-hidden">
              <Image
                src="/images/teacher.png"
                alt="مدرس"
                layout="fill"
                objectFit="scale-down"
                quality={100}
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">مدرس</h3>
              <p className="text-gray-600 mb-4">
                انضم كمعلم وشارك معرفتك مع الطلاب
              </p>
              <button 
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                aria-label="تسجيل الدخول كمدرس"
              >
                تسجيل الدخول
              </button>
            </div>
          </div>

          {/* Student Card */}
          <div 
            className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 transition-transform hover:scale-[1.02] cursor-pointer"
            onClick={handleStudentClick}
          >
            <div className="h-48 relative overflow-hidden">
              <Image
                src="/images/student.png"
                alt="طالب"
                layout="fill"
                objectFit="scale-down"
                quality={100}
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">طالب</h3>
              <p className="text-gray-600 mb-4">
                ابدأ رحلتك التعليمية مع أفضل المعلمين
              </p>
              <button 
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                aria-label="تسجيل الدخول كطالب"
              >
                تسجيل الدخول
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </HomeLayout>
  );
};

export default RoleSelectionPage;