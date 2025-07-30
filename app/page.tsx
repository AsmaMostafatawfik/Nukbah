// import Image from "next/image";
// import { Tajawal, Noto_Naskh_Arabic } from 'next/font/google';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import HomeLayout from './HomeLayout';

// const tajawal = Tajawal({
//   subsets: ['arabic'],
//   weight: ['400', '500', '700'],
//   variable: '--font-tajawal'
// });

// const notoNaskh = Noto_Naskh_Arabic({
//   subsets: ['arabic'],
//   weight: ['400', '600', '700'],
//   variable: '--font-noto-naskh'
// });

// export default function Home() {
//   const teachers = [
//     { name: "أستاذ أحمد محمد", subject: "الرياضيات", image: "/images/dr-terrence-underwood-Io0eEAfSMjY-unsplash.jpg" },
//     { name: "أستاذة سارة علي", subject: "اللغة العربية", image: "/images/icons8-team-FcLyt7lW5wg-unsplash.jpg" },
//     { name: "أستاذ يوسف خالد", subject: "العلوم", image: "/images/jonas-kakaroto-KIPqvvTOC1s-unsplash.jpg" },
//     { name: "أستاذة لمى حسن", subject: "اللغة الإنجليزية", image: "/images/thisisengineering-TXxiFuQLBKQ-unsplash.jpg" },
//   ];

//   const featuredCourses = [
//     {
//       id: 1,
//       title: "الكورس التحضيري للامتحانات",
//       description: "برنامج متكامل لتحضير الطلاب للامتحانات النهائية",
//       level: "الصف الثالث الثانوي",
//       instructor: "محمد صالح - نفحة عزينة",
//       duration: "12 أسبوع",
//       price: "499",
//       originalPrice: "799",
//       image: "/images/grade.png",
//       rating: 4.8,
//       students: 1250
//     },
//     {
//       id: 2,
//       title: "الرياضيات المتقدمة",
//       description: "شامل لجميع مفاهيم الرياضيات للصف الثاني الثانوي",
//       level: "الصف الثاني الثانوي",
//       instructor: "أحمد محمد",
//       duration: "8 أسابيع",
//       price: "399",
//       originalPrice: "599",
//       image: "/images/hero.jpg",
//       rating: 4.6,
//       students: 980
//     },
//     {
//       id: 3,
//       title: "اللغة الإنجليزية الشاملة",
//       description: "تطوير المهارات اللغوية في القراءة والكتابة والمحادثة",
//       level: "جميع المستويات",
//       instructor: "أستاذة لمى حسن",
//       duration: "10 أسابيع",
//       price: "449",
//       originalPrice: "699",
//       image: "/images/login.jpg",
//       rating: 4.9,
//       students: 1500
//     },
//     {
//       id: 4,
//       title: "العلوم التطبيقية",
//       description: "تجارب عملية وشرح مفصل للمناهج العلمية",
//       level: "الصف الأول الثانوي",
//       instructor: "أستاذ يوسف خالد",
//       duration: "6 أسابيع",
//       price: "349",
//       originalPrice: "549",
//       image: "/images/logo.png",
//       rating: 4.7,
//       students: 870
//     }
//   ];

//   const features = [
//     {
//       title: "امتحانات إلكترونية",
//       description: "اختبارات تقييمية تقدم نتائج فورية مع تحليل للأداء",
//       icon: "📝"
//     },
//     {
//       title: "بنك الأسئلة",
//       description: "أكبر مجموعة من الأسئلة والاختبارات السابقة",
//       icon: "📚"
//     },
//     {
//       title: "متابعة شخصية",
//       description: "تتبع تقدمك الدراسي مع تقارير أداء مفصلة",
//       icon: "📊"
//     },
//     {
//       title: "مجموعات النقاش",
//       description: "مناقشة المواضيع الدراسية مع الزملاء والمعلمين",
//       icon: "💬"
//     }
//   ];

//   return (
//      <HomeLayout>
//     <div
//       className={`${tajawal.variable} ${notoNaskh.variable} bg-white text-gray-800`}
//       dir="rtl"
//     >
//       {/* Hero Section */}
//       <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col lg:flex-row items-center gap-12">
//             {/* Text Content */}
//             <div className="lg:w-1/2 space-y-8 font-sans">
//               <div className="mb-6">
//                 <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
//                   <span className="bg-white text-blue-600 px-6 py-3 rounded-full inline-block shadow-lg">
//                     نُخبة
//                   </span>
//                 </h1>
//               </div>

//               <p className="text-xl md:text-2xl leading-relaxed text-white/90 font-medium">
//                 منصة متكاملة بكل ما يحتاجه الطالب ليتفوق في مسيرته التعليمية
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 mt-8">
//                 <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition duration-300 shadow-md hover:shadow-lg text-lg">
//                   انضم الآن
//                 </button>
//                 <button className="px-8 py-3 border-2 border-white rounded-lg font-bold hover:bg-white hover:text-blue-600 transition duration-300 text-lg">
//                   تصفح الكورسات
//                 </button>
//               </div>
//             </div>

//             {/* Image */}
//             <div className="lg:w-1/2">
//               <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
//                 <Image
//                   src="/images/hero.jpg"
//                   alt="طلاب يدرسون في المنصة"
//                   fill
//                   className="object-cover"
//                   priority
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Courses - Improved Design */}
//       <section className="py-20 bg-gray-50">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               كورساتنا المُقترحة
//             </h2>
//             <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
//               دورات تعليمية متميزة بجودة عالية تقدم لك أفضل تجربة تعليمية
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {featuredCourses.map((course) => (
//               <div
//                 key={course.id}
//                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-transform hover:-translate-y-2 border border-gray-200 flex flex-col h-full"
//               >
//                 {/* Course Image - Improved */}
//                 <div className="relative h-48 w-full overflow-hidden">
//                   <Image
//                     src={course.image}
//                     alt={course.title}
//                     fill
//                     className="object-inherit w-full h-full"
//                     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
//                   />
//                   {/* {course.originalPrice && (
//                     // <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
//                     //   خصم {Math.round((1 - parseInt(course.price) / parseInt(course.originalPrice)) * 100}%,
//                     // </div>
//                   )} */}
//                 </div>

//                 {/* Course Details */}
//                 <div className="p-5 flex flex-col flex-grow">
//                   <div className="flex justify-between items-start mb-3">
//                     <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
//                       {course.level}
//                     </span>
//                     <div className="flex items-center text-yellow-500">
//                       <span className="ml-1 text-sm font-medium">
//                         {course.rating}
//                       </span>
//                       <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                     </div>
//                   </div>

//                   <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
//                     {course.title}
//                   </h3>
//                   <p className="text-gray-600 text-sm mb-3">
//                     {course.instructor}
//                   </p>

//                   <div className="flex items-center text-gray-500 text-xs md:text-sm mb-4 flex-wrap gap-2">
//                     <span className="flex items-center">
//                       <svg
//                         className="w-3 h-3 md:w-4 md:h-4 mr-1"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                         />
//                       </svg>
//                       {course.duration}
//                     </span>
//                     <span className="hidden sm:inline">•</span>
//                     <span className="flex items-center">
//                       <svg
//                         className="w-3 h-3 md:w-4 md:h-4 mr-1"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                         />
//                       </svg>
//                       {course.students.toLocaleString()} طالب
//                     </span>
//                   </div>

//                   <div className="mt-auto">
//                     <div className="flex items-center mb-4 gap-2">
//                       <span className="text-sm text-gray-500 line-through">
//                         {course.originalPrice} جنيه
//                       </span>
//                       <span className="text-lg font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">
//                         {course.price} جنيه
//                       </span>
//                     </div>

//                     <div className="flex gap-2">
//                       <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition">
//                         اشترك الآن
//                       </button>
//                       <button className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-3 rounded-lg text-sm font-medium transition">
//                         التفاصيل
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Platform Features */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-4 sm:px-6">
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
//             مميزات منصتنا
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {features.map((f, idx) => (
//               <div
//                 key={idx}
//                 className="bg-white p-6 rounded-xl text-center border border-gray-200 hover:shadow-lg transition h-full"
//               >
//                 <div className="text-4xl mb-4">{f.icon}</div>
//                 <h3 className="text-xl font-bold text-blue-800 mb-3">
//                   {f.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm md:text-base">
//                   {f.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Teachers */}
//       <section className="py-20 bg-gray-50">
//         <div className="container mx-auto px-4 sm:px-6">
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
//             معلمونا المتميزون
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//             {teachers.map((teacher, idx) => (
//               <div
//                 key={idx}
//                 className="bg-white rounded-xl shadow-md hover:shadow-lg transition h-full flex flex-col items-center text-center p-6"
//               >
//                 {/* Box Image */}
//                 <div className="w-50 h-50 mb-4 overflow-hidden border-2 border-gray-300 rounded-lg shadow-md">
//                   <Image
//                     src={teacher.image}
//                     alt={teacher.name}
//                     width={300}
//                     height={150}
//                     className="object-inherit w-full h-full"
//                   />
//                 </div>

//                 {/* Name and Subject */}
//                 <h3 className="text-lg md:text-xl font-semibold">
//                   {teacher.name}
//                 </h3>
//                 <p className="text-blue-600 mt-2 text-sm md:text-base">
//                   {teacher.subject}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* See More Button */}
//           <div className="text-center">
//             <button className="px-6 py-3 bg-red-600 text-white border border-red-600 hover:bg-white hover:text-red-600 rounded-lg font-semibold text-base transition shadow">
//               عرض المزيد من المعلمين
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-20 bg-blue-700 text-white">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="flex flex-col md:flex-row items-center justify-between bg-white text-blue-700 rounded-xl border border-blue-200 shadow-lg overflow-hidden">
//             {/* Text Section */}
//             <div className="w-full md:w-1/2 p-8 md:p-12 text-center md:text-right">
//               <h2 className="text-2xl md:text-4xl font-bold mb-4">
//                 تعلم في أي وقت ومن أي مكان
//               </h2>
//               <p className="mb-6 text-base md:text-lg">
//                 استمتع بتجربة تعليمية مرنة وشاملة تساعدك على الوصول إلى أهدافك
//                 الدراسية بسهولة، عبر جميع أجهزتك.
//               </p>
//               <button className="px-6 py-3 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition">
//                 ابدأ رحلتك التعليمية الآن
//               </button>
//             </div>

//             {/* Image Section */}
//             <div className="w-full md:w-1/2 h-64 md:h-full">
//               <img
//                 src="/images/about.jpg" // Replace with your desired image path
//                 alt="تعلم في أي وقت"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

   
//     </div>
//     </HomeLayout>
//   );
// }











"use client";

import Image from "next/image";
import { Tajawal, Noto_Naskh_Arabic } from 'next/font/google';
import '@fortawesome/fontawesome-free/css/all.min.css';
import HomeLayout from './HomeLayout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';


// Font setup
const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-tajawal'
});

const notoNaskh = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
  variable: '--font-noto-naskh'
});

// TypeScript Interfaces
interface Teacher {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  schoolName: string;
  bio: string;
  departmentId: number;
  isAcivated: boolean;
  image: string;
  registirationDate: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  stage: number;
  gradeLevel: number;
  isActivated: boolean;
  image: string | null;
  teacherId: string;
}

interface Department {
  id: number;
  name: string;
}

interface Feature {
  title: string;
  description: string;
  icon: string;
}

export default function Home() {
  const router = useRouter();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [controllers, setControllers] = useState<AbortController[]>([]);

  const fetchData = async () => {
    try {
      const baseUrl = 'https://elearning1.runasp.net/api';
      const newControllers = Array(3).fill(null).map(() => new AbortController());
      setControllers(newControllers);
      
      const [teachersRes, coursesRes, departmentsRes] = await Promise.all([
        fetch(`${baseUrl}/Home/Teachers`, { signal: newControllers[0].signal }),
        fetch(`${baseUrl}/Home/AllCourses`, { signal: newControllers[1].signal }),
        fetch(`${baseUrl}/Account/Departments`, { signal: newControllers[2].signal })
      ]);

      if (!teachersRes.ok) throw new Error('فشل تحميل بيانات المعلمين');
      if (!coursesRes.ok) throw new Error('فشل تحميل بيانات الكورسات');
      if (!departmentsRes.ok) throw new Error('فشل تحميل بيانات الأقسام');

      const [teachersData, coursesData, departmentsData] = await Promise.all([
        teachersRes.json(),
        coursesRes.json(),
        departmentsRes.json()
      ]) as [Teacher[], Course[], Department[]];

      setTeachers(teachersData.slice(0, 4));
      setCourses(coursesData.slice(0, 4));
      setDepartments(departmentsData);
      setError(null);
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('API Error:', err);
        setError(err.message || 'حدث خطأ غير متوقع');
        toast.error(err.message || 'حدث خطأ أثناء جلب البيانات');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      controllers.forEach(controller => controller.abort());
    };
  }, []);

  // Helper functions
  const getStageLabel = (stage: number): string => {
    switch(stage) {
      case 0: return 'الابتدائية';
      case 1: return 'المتوسطة';
      case 2: return 'الثانوية';
      case 3: return 'جامعة';
      case 4: return 'غير ذلك';
      default: return '';
    }
  };

  const getGradeLabel = (grade: number): string => {
    return grade === 7 ? 'غير ذلك' : `الصف ${grade}`;
  };

  const getTeacherName = (teacherId: string): string => {
    const teacher = teachers.find(t => t.id === teacherId);
    return teacher?.fullName || 'مدرس غير معروف';
  };

  const getDepartmentName = (teacherId: string): string => {
    const teacher = teachers.find(t => t.id === teacherId);
    if (!teacher) return 'غير معروف';
    
    const department = departments.find(d => d.id === teacher.departmentId);
    return department?.name || 'غير معروف';
  };

  const handleSeeMore = (path: string) => {
    router.push(path);
  };

  const retryFetch = () => {
    setLoading(true);
    setError(null);
    fetchData();
  };

  if (loading) {
    return (
      <HomeLayout>
        <div className={`${tajawal.variable} ${notoNaskh.variable} bg-white text-gray-800 min-h-screen flex items-center justify-center`} dir="rtl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-lg">جاري تحميل البيانات...</p>
          </div>
        </div>
      </HomeLayout>
    );
  }

  if (error) {
    return (
      <HomeLayout>
        <div className={`${tajawal.variable} ${notoNaskh.variable} bg-white text-gray-800 min-h-screen flex items-center justify-center`} dir="rtl">
          <div className="text-center p-6 bg-red-50 rounded-lg max-w-md mx-auto">
            <div className="text-red-600 text-4xl mb-4">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">خطأ في النظام</h3>
            <p className="mb-4">{error}</p>
            <button 
              onClick={retryFetch}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              إعادة المحاولة
            </button>
          </div>
        </div>
      </HomeLayout>
    );
  }

  const features: Feature[] = [
    {
      title: "امتحانات إلكترونية",
      description: "اختبارات تقييمية تقدم نتائج فورية مع تحليل للأداء",
      icon: "📝"
    },
    {
      title: "بنك الأسئلة",
      description: "أكبر مجموعة من الأسئلة والاختبارات السابقة",
      icon: "📚"
    },
    {
      title: "متابعة شخصية",
      description: "تتبع تقدمك الدراسي مع تقارير أداء مفصلة",
      icon: "📊"
    },
    {
      title: "مجموعات النقاش",
      description: "مناقشة المواضيع الدراسية مع الزملاء والمعلمين",
      icon: "💬"
    }
  ];

  return (
    <HomeLayout>
      <div className={`${tajawal.variable} ${notoNaskh.variable} bg-white text-gray-800`} dir="rtl">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 space-y-8 font-sans">
                <div className="mb-6">
                  <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                    <span className="bg-white text-blue-600 px-6 py-3 rounded-full inline-block shadow-lg">
                      نُخبة
                    </span>
                  </h1>
                </div>
                <p className="text-xl md:text-2xl leading-relaxed text-white/90 font-medium">
                  منصة متكاملة بكل ما يحتاجه الطالب ليتفوق في مسيرته التعليمية
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button 
                    onClick={() => handleSeeMore('/register')}
                    className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition duration-300 shadow-md hover:shadow-lg text-lg"
                  >
                    انضم الآن
                  </button>
                  <button 
                    onClick={() => handleSeeMore('/courses')}
                    className="px-8 py-3 border-2 border-white rounded-lg font-bold hover:bg-white hover:text-blue-600 transition duration-300 text-lg"
                  >
                    تصفح الكورسات
                  </button>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/hero.jpg"
                    alt="طلاب يدرسون في المنصة"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                كورساتنا المُقترحة
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                دورات تعليمية متميزة بجودة عالية تقدم لك أفضل تجربة تعليمية
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-transform hover:-translate-y-2 border border-gray-200 flex flex-col h-full"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    {course.image ? (
                      <img
                        src={`https://elearning1.runasp.net${course.image}`}
                        alt={course.title}  
                        className="object-cover w-full h-full"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                        <span className="text-gray-500">لا توجد صورة</span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {getStageLabel(course.stage)} - {getGradeLabel(course.gradeLevel)}
                      </span>
                      <div className="flex items-center text-yellow-500">
                        <span className="ml-1 text-sm font-medium">4.5</span>
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {course.description}
                    </p>
                    <p className="text-gray-500 text-xs mb-3">
                      {getTeacherName(course.teacherId)}
                    </p>

                    <div className="mt-auto">
                      <div className="flex items-center mb-4 gap-2">
                        <span className="text-lg font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                          {course.price} جنيه
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                        onClick={() => handleSeeMore('/login')}
                         className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition">
                          اشترك الآن
                        </button>
                        <button
                        onClick={() => handleSeeMore('/login')}
                         className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-3 rounded-lg text-sm font-medium transition">
                          التفاصيل
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <button 
                onClick={() => handleSeeMore('/login')}
                className="px-6 py-3 bg-red-600 text-white border border-red-600 hover:bg-white hover:text-red-600 rounded-lg font-semibold text-base transition shadow"
              >
                عرض المزيد من الكورسات
              </button>
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              مميزات منصتنا
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl text-center border border-gray-200 hover:shadow-lg transition h-full"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-blue-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Teachers Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              معلمونا المتميزون
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {teachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition h-full flex flex-col items-center text-center p-6"
                >
                  <div className="w-32 h-32 mb-4 overflow-hidden rounded-full border-2 border-black-300 shadow-md">
                    {teacher.image ? (
                      <img
                        src={`https://elearning1.runasp.net${teacher.image}`}
                        alt={teacher.fullName}
                        className="w-full h-full inherit"
                      />
                    ) : (
                      <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                        <span className="text-gray-500">لا توجد صورة</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg md:text-xl font-semibold">
                    {teacher.fullName}
                  </h3>
                  <p className="text-blue-600 mt-2 text-sm md:text-base">
                    {getDepartmentName(teacher.id)}
                  </p>
                  <p className="text-gray-500 text-xs mt-2 line-clamp-2">
                    {teacher.bio || "مدرس متميز"}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button 
                onClick={() => handleSeeMore('/login')}
                className="px-6 py-3 bg-red-600 text-white border border-red-600 hover:bg-white hover:text-red-600 rounded-lg font-semibold text-base transition shadow"
              >
                عرض المزيد من المعلمين
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-700 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between bg-white text-blue-700 rounded-xl border border-blue-200 shadow-lg overflow-hidden">
              <div className="w-full md:w-1/2 p-8 md:p-12 text-center md:text-right">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                  تعلم في أي وقت ومن أي مكان
                </h2>
                <p className="mb-6 text-base md:text-lg">
                  استمتع بتجربة تعليمية مرنة وشاملة تساعدك على الوصول إلى أهدافك
                  الدراسية بسهولة، عبر جميع أجهزتك.
                </p>
                <button 
                  onClick={() => handleSeeMore('/register')}
                  className="px-6 py-3 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition"
                >
                  ابدأ رحلتك التعليمية الآن
                </button>
              </div>
              <div className="w-full md:w-1/2 h-64 md:h-full">
                <img
                  src="/images/about.jpg"
                  alt="تعلم في أي وقت"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </HomeLayout>
  );
}