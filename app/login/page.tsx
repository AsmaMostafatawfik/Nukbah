// // "use client";

// // import { useState } from "react";
// // import Link from "next/link";
// // import { useRouter } from "next/navigation";
// // import { Eye, EyeOff } from "lucide-react";
// // import Image from "next/image";
// // import HomeLayout from '../HomeLayout';

// // interface LoginResponse {
// //   message: string | null;
// //   isAuthenticated: boolean;
// //   username: string;
// //   email: string;
// //   roles: string[];
// //   token: string;
// //   expireon: string;
// // }

// // interface ErrorResponse {
// //   type?: string;
// //   title?: string;
// //   status?: number;
// //   errors?: {
// //     Email?: string[];
// //     Password?: string[];
// //   };
// //   detail?: string;
// //   message?: string;
// // }

// // export default function LoginPage() {
// //   const router = useRouter();
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
  
// //   const [formData, setFormData] = useState({
// //     Email: "",
// //     Password: "",
// //   });

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError(null);
// //     setIsSubmitting(true);

// //     try {
// //       // Validate required fields
// //       if (!formData.Email.trim()) {
// //         throw new Error("البريد الإلكتروني مطلوب");
// //       }
// //       if (!formData.Password.trim()) {
// //         throw new Error("كلمة المرور مطلوبة");
// //       }

// //       // Create FormData for multipart/form-data
// //       const formDataToSend = new FormData();
// //       formDataToSend.append('Email', formData.Email.trim());
// //       formDataToSend.append('Password', formData.Password);

// //       console.log('FormData entries:');
// //       for (let [key, value] of formDataToSend.entries()) {
// //         console.log(key, value);
// //       }

// //       const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://elearning1.runasp.net';
      
// //       const response = await fetch(
// //         `${API_URL}/api/Account/Login`,
// //         {
// //           method: 'POST',
// //           // Let browser set Content-Type with boundary
// //           body: formDataToSend,
// //         }
// //       );

// //       let responseData;
// //       try {
// //         responseData = await response.json();
// //       } catch (jsonError) {
// //         console.error('Failed to parse JSON response:', jsonError);
// //         throw new Error('استجابة غير صالحة من الخادم');
// //       }

// //       console.log('API Response:', responseData);

// //       if (!response.ok) {
// //         // Handle validation errors from ASP.NET
// //         if (responseData.errors) {
// //           const errorMessages = Object.entries(responseData.errors)
// //             .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
// //             .join('\n');
// //           throw new Error(errorMessages);
// //         } else {
// //           throw new Error(responseData.message || responseData.title || 'فشل في تسجيل الدخول');
// //         }
// //       }

// //       const loginData = responseData as LoginResponse;

// //       if (loginData.isAuthenticated) {
// //         // Store token and user data
// //         localStorage.setItem("token", loginData.token);
// //         localStorage.setItem("user", JSON.stringify({
// //           username: loginData.username,
// //           email: loginData.email,
// //           roles: loginData.roles,
// //         }));

// //         // Redirect based on role
// //         if (loginData.roles.includes("Admin")) {
// //           router.push("/admin/dashboard");
// //         } else if (loginData.roles.includes("Teacher")) {
// //           router.push("/teacher/dashboard");
// //         } else if (loginData.roles.includes("Student")) {
// //           router.push("/student/dashboard");
// //         } else {
// //           router.push("/");
// //         }
// //       } else {
// //         throw new Error("المصادقة فشلت. يرجى التحقق من بياناتك.");
// //       }
// //     } catch (err) {
// //       console.error('Login error:', err);
// //       setError(
// //         err instanceof Error 
// //           ? err.message 
// //           : 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى'
// //       );
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <HomeLayout>
// //       <div dir="rtl" className="min-h-screen flex bg-gray-50">
// //         {/* Image Section - Full Height */}
// //         <div className="hidden md:block w-1/2 bg-blue-600 relative">
// //           <Image
// //             src="/images/20944201.jpg"
// //             alt="تسجيل الدخول"
// //             fill
// //             className="object-cover"
// //             priority
// //           />
// //           <div className="absolute inset-0 bg-blue-900/30 flex items-center justify-center p-6 text-center">
// //             <div>
// //               <h2 className="text-3xl font-bold text-white mb-4">
// //                 مرحباً بعودتك
// //               </h2>
// //               <p className="text-white/90 text-lg">
// //                 سجل دخولك للوصول إلى حسابك
// //               </p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Form Section - Full Height */}
// //         <div className="w-full md:w-1/2 p-6 md:p-12 overflow-y-auto">
// //           <h1 className="text-3xl font-bold text-gray-900 mb-2">
// //             تسجيل الدخول
// //           </h1>
// //           <p className="text-gray-600 mb-8">
// //             أدخل بياناتك للوصول إلى حسابك
// //           </p>

// //           {error && (
// //             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
// //               <p className="font-bold">خطأ!</p>
// //               <p className="whitespace-pre-line">{error}</p>
// //             </div>
// //           )}

// //           <form onSubmit={handleSubmit} className="space-y-4">
// //             {/* Email Field */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 البريد الإلكتروني *
// //               </label>
// //               <input
// //                 type="email"
// //                 name="Email"
// //                 value={formData.Email}
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                 required
// //               />
// //             </div>

// //             {/* Password Field */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 كلمة المرور *
// //               </label>
// //               <div className="relative">
// //                 <input
// //                   type={showPassword ? "text" : "password"}
// //                   name="Password"
// //                   value={formData.Password}
// //                   onChange={handleChange}
// //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
// //                   required
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowPassword(!showPassword)}
// //                   className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
// //                 >
// //                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Remember Me & Forgot Password */}
// //             <div className="flex items-center justify-between">
// //               <div className="flex items-center">
// //                 <input
// //                   id="remember-me"
// //                   name="remember-me"
// //                   type="checkbox"
// //                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
// //                 />
// //                 <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-700">
// //                   تذكرني
// //                 </label>
// //               </div>
// //               <div className="text-sm">
// //                 <Link
// //                   href="/login/forgot-password"
// //                   className="text-blue-600 hover:underline"
// //                 >
// //                   نسيت كلمة المرور؟
// //                 </Link>
// //               </div>
// //             </div>

// //             {/* Submit Button */}
// //             <button
// //               type="submit"
// //               disabled={isSubmitting}
// //               className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors mt-6 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
// //             >
// //               {isSubmitting ? (
// //                 <span className="flex items-center justify-center">
// //                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                   </svg>
// //                   جاري المعالجة...
// //                 </span>
// //               ) : 'تسجيل الدخول'}
// //             </button>
// //           </form>

// //           <p className="text-sm text-center text-gray-600 mt-6">
// //             ليس لديك حساب؟{" "}
// //             <Link href="/you-are" className="text-blue-600 hover:underline">
// //               إنشاء حساب جديد
// //             </Link>
// //           </p>
// //         </div>
// //       </div>
// //     </HomeLayout>
// //   );
// // }








// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Eye, EyeOff } from "lucide-react";
// import Image from "next/image";
// import HomeLayout from '../HomeLayout';

// interface LoginResponse {
//   message: string | null;
//   isAuthenticated: boolean;
//   username: string;
//   email: string;
//   roles: string[];
//   token: string;
//   expireon: string;
// }

// interface ErrorResponse {
//   type?: string;
//   title?: string;
//   status?: number;
//   errors?: {
//     Email?: string[];
//     Password?: string[];
//   };
//   detail?: string;
//   message?: string;
// }

// export default function LoginPage() {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState<{
//     Email?: string;
//     Password?: string;
//     general?: string;
//   }>({});
  
//   const [formData, setFormData] = useState({
//     Email: "",
//     Password: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear error when user starts typing
//     setErrors(prev => ({ ...prev, [name]: undefined }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrors({});
//     setIsSubmitting(true);

//     try {
//       // Validate required fields
//       if (!formData.Email.trim()) {
//         throw new Error("البريد الإلكتروني مطلوب");
//       }
//       if (!formData.Password.trim()) {
//         throw new Error("كلمة المرور مطلوبة");
//       }

//       // Create URL-encoded form data
//       const formDataToSend = new URLSearchParams();
//       formDataToSend.append('Email', formData.Email.trim());
//       formDataToSend.append('Password', formData.Password);

//       const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://elearning1.runasp.net';
      
//       const response = await fetch(
//         `${API_URL}/api/Account/Login`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//           body: formDataToSend.toString(),
//         }
//       );

//       let responseData;
      
//       // First check if response is OK before trying to parse JSON
//       if (!response.ok) {
//         // Try to get error message from response
//         const errorText = await response.text();
//         try {
//           // If the error is in JSON format
//           responseData = JSON.parse(errorText);
//           if (responseData.errors) {
//             const serverErrors: typeof errors = {};
//             if (responseData.errors.Email) {
//               serverErrors.Email = responseData.errors.Email.join(', ');
//             }
//             if (responseData.errors.Password) {
//               serverErrors.Password = responseData.errors.Password.join(', ');
//             }
//             setErrors(serverErrors);
//             return;
//           }
//           throw new Error(responseData.message || responseData.title || 'فشل في تسجيل الدخول');
//         } catch {
//           // If the error is plain text
//           throw new Error(errorText || 'فشل في تسجيل الدخول');
//         }
//       } else {
//         // If response is OK, parse as JSON
//         responseData = await response.json();
//       }

//       const loginData = responseData as LoginResponse;

//       if (loginData.isAuthenticated) {
//         // Store token and user data
//         localStorage.setItem("token", loginData.token);
//         localStorage.setItem("user", JSON.stringify({
//           username: loginData.username,
//           email: loginData.email,
//           roles: loginData.roles,
//         }));

//         // Redirect based on role
//         if (loginData.roles.includes("Admin")) {
//           router.push("/admin/dashboard");
//         } else if (loginData.roles.includes("Teacher")) {
//           router.push("/teacher/dashboard");
//         } else if (loginData.roles.includes("Student")) {
//           router.push("/student/dashboard");
//         } else {
//           router.push("/");
//         }
//       } else {
//         throw new Error("المصادقة فشلت. يرجى التحقق من بياناتك.");
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       setErrors({
//         general: err instanceof Error 
//           ? err.message 
//           : 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى'
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <HomeLayout>
//       <div dir="rtl" className="min-h-screen flex bg-gray-50">
//         {/* Image Section - Full Height */}
//         <div className="hidden md:block w-1/2 bg-blue-600 relative">
//           <Image
//             src="/images/20944201.jpg"
//             alt="تسجيل الدخول"
//             fill
//             className="object-cover"
//             priority
//           />
//           <div className="absolute inset-0 bg-blue-900/30 flex items-center justify-center p-6 text-center">
//             <div>
//               <h2 className="text-3xl font-bold text-white mb-4">
//                 مرحباً بعودتك
//               </h2>
//               <p className="text-white/90 text-lg">
//                 سجل دخولك للوصول إلى حسابك
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Form Section - Full Height */}
//         <div className="w-full md:w-1/2 p-6 md:p-12 overflow-y-auto">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             تسجيل الدخول
//           </h1>
//           <p className="text-gray-600 mb-8">
//             أدخل بياناتك للوصول إلى حسابك
//           </p>

//           {errors.general && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//               <p className="font-bold">خطأ!</p>
//               <p className="whitespace-pre-line">{errors.general}</p>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Email Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 البريد الإلكتروني *
//               </label>
//               <input
//                 type="email"
//                 name="Email"
//                 value={formData.Email}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 border ${errors.Email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//                 required
//               />
//               {errors.Email && (
//                 <p className="mt-1 text-sm text-red-600">{errors.Email}</p>
//               )}
//             </div>

//             {/* Password Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 كلمة المرور *
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="Password"
//                   value={formData.Password}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 border ${errors.Password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10`}
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//               {errors.Password && (
//                 <p className="mt-1 text-sm text-red-600">{errors.Password}</p>
//               )}
//             </div>

//             {/* Remember Me & Forgot Password */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-700">
//                   تذكرني
//                 </label>
//               </div>
//               <div className="text-sm">
//                 <Link
//                   href="/login/forgot-password"
//                   className="text-blue-600 hover:underline"
//                 >
//                   نسيت كلمة المرور؟
//                 </Link>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors mt-6 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
//             >
//               {isSubmitting ? (
//                 <span className="flex items-center justify-center">
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   جاري المعالجة...
//                 </span>
//               ) : 'تسجيل الدخول'}
//             </button>
//           </form>

//           <p className="text-sm text-center text-gray-600 mt-6">
//             ليس لديك حساب؟{" "}
//             <Link href="/you-are" className="text-blue-600 hover:underline">
//               إنشاء حساب جديد
//             </Link>
//           </p>
//         </div>
//       </div>
//     </HomeLayout>
//   );
// }







"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import HomeLayout from '../HomeLayout';

interface LoginResponse {
  message: string | null;
  isAuthenticated: boolean;
  username: string;
  email: string;
  id: string;
  roles: string[];
  token: string;
  expireon: string;
}

interface ErrorResponse {
  type?: string;
  title?: string;
  status?: number;
  errors?: {
    Email?: string[];
    Password?: string[];
  };
  detail?: string;
  message?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    Email?: string;
    Password?: string;
    general?: string;
  }>({});
  
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.Email.trim()) {
        throw new Error("البريد الإلكتروني مطلوب");
      }
      if (!formData.Password.trim()) {
        throw new Error("كلمة المرور مطلوبة");
      }

      // Create URL-encoded form data
      const formDataToSend = new URLSearchParams();
      formDataToSend.append('Email', formData.Email.trim());
      formDataToSend.append('Password', formData.Password);

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://elearning1.runasp.net';
      
      const response = await fetch(
        `${API_URL}/api/Account/Login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formDataToSend.toString(),
        }
      );

      let responseData;
      
      if (!response.ok) {
        const errorText = await response.text();
        try {
          responseData = JSON.parse(errorText);
          if (responseData.errors) {
            const serverErrors: typeof errors = {};
            if (responseData.errors.Email) {
              serverErrors.Email = responseData.errors.Email.join(', ');
            }
            if (responseData.errors.Password) {
              serverErrors.Password = responseData.errors.Password.join(', ');
            }
            setErrors(serverErrors);
            return;
          }
          throw new Error(responseData.message || responseData.title || 'فشل في تسجيل الدخول');
        } catch {
          throw new Error(errorText || 'فشل في تسجيل الدخول');
        }
      } else {
        responseData = await response.json();
      }

      const loginData = responseData as LoginResponse;

      if (loginData.isAuthenticated) {
        // Store token and user data including ID
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("user", JSON.stringify({
          id: loginData.id, // Added ID here
          username: loginData.username,
          email: loginData.email,
          roles: loginData.roles,
        }));

        // Redirect based on role
        if (loginData.roles.includes("Admin")) {
          router.push("/admin/dashboard");
        } else if (loginData.roles.includes("Teacher")) {
          router.push(`/teacher/dashboard/${loginData.id}`); // Use ID in route
        } else if (loginData.roles.includes("Student")) {
          router.push(`/student/dashboard/${loginData.id}`);
        } else {
          router.push("/");
        }
      } else {
        throw new Error("المصادقة فشلت. يرجى التحقق من بياناتك.");
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrors({
        general: err instanceof Error 
          ? err.message 
          : 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <HomeLayout>
      <div dir="rtl" className="min-h-screen flex bg-gray-50">
        {/* Image Section - Full Height */}
        <div className="hidden md:block w-1/2 bg-blue-600 relative">
          <Image
            src="/images/20944201.jpg"
            alt="تسجيل الدخول"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-blue-900/30 flex items-center justify-center p-6 text-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                مرحباً بعودتك
              </h2>
              <p className="text-white/90 text-lg">
                سجل دخولك للوصول إلى حسابك
              </p>
            </div>
          </div>
        </div>

        {/* Form Section - Full Height */}
        <div className="w-full md:w-1/2 p-6 md:p-12 overflow-y-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            تسجيل الدخول
          </h1>
          <p className="text-gray-600 mb-8">
            أدخل بياناتك للوصول إلى حسابك
          </p>

          {errors.general && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p className="font-bold">خطأ!</p>
              <p className="whitespace-pre-line">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                البريد الإلكتروني *
              </label>
              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors.Email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                required
              />
              {errors.Email && (
                <p className="mt-1 text-sm text-red-600">{errors.Email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                كلمة المرور *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.Password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.Password && (
                <p className="mt-1 text-sm text-red-600">{errors.Password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-700">
                  تذكرني
                </label>
              </div>
              <div className="text-sm">
                <Link
                  href="/login/forgot-password"
                  className="text-blue-600 hover:underline"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors mt-6 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري المعالجة...
                </span>
              ) : 'تسجيل الدخول'}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            ليس لديك حساب؟{" "}
            <Link href="/you-are" className="text-blue-600 hover:underline">
              إنشاء حساب جديد
            </Link>
          </p>
        </div>
      </div>
    </HomeLayout>
  );
}