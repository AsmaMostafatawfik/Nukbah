// // "use client";

// // import { useState } from "react";
// // import Link from "next/link";
// // import { Eye, EyeOff, CheckCircle } from "lucide-react";
// // import HomeLayout from '../../HomeLayout';


// // export default function ConfirmPasswordPage() {
// //   const [password, setPassword] = useState("");
// //   const [confirmPassword, setConfirmPassword] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //   const [isSuccess, setIsSuccess] = useState(false);

// //   const handleSubmit = (e: { preventDefault: () => void; }) => {
// //     e.preventDefault();
// //     // Add your password confirmation logic here
// //     setIsSuccess(true);
// //   };

// //   if (isSuccess) {
// //     return (
      
// //       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4" dir="rtl">
// //         <div className="w-full max-w-md p-6 text-center">
// //           <div className="flex justify-center mb-6">
// //             <CheckCircle className="w-16 h-16 text-green-500" strokeWidth={1.5} />
// //           </div>
// //           <h1 className="text-2xl font-bold text-gray-900 mb-4">تم تغيير كلمة المرور بنجاح!</h1>
// //           <p className="text-gray-600 mb-6">يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة</p>
// //           <Link
// //             href="/login"
// //             className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all"
// //           >
// //             الذهاب إلى تسجيل الدخول
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4" dir="rtl">
// //       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
// //         <div className="text-center mb-8">
// //           <h1 className="text-2xl font-bold text-gray-900">تعيين كلمة مرور جديدة</h1>
// //           <p className="text-gray-600 mt-2">الرجاء إدخال كلمة المرور الجديدة وتأكيدها</p>
// //         </div>

// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           {/* New Password Field */}
// //           <div>
// //             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 text-right">
// //               كلمة المرور الجديدة
// //             </label>
// //             <div className="relative">
// //               <input
// //                 type={showPassword ? "text" : "password"}
// //                 id="password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-right"
// //                 placeholder="أدخل كلمة المرور الجديدة"
// //                 required
// //                 minLength={8}
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => setShowPassword(!showPassword)}
// //                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
// //               >
// //                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// //               </button>
// //             </div>
// //             <p className="text-xs text-gray-500 mt-1 text-right">
// //               يجب أن تحتوي على 8 أحرف على الأقل
// //             </p>
// //           </div>

// //           {/* Confirm Password Field */}
// //           <div>
// //             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1 text-right">
// //               تأكيد كلمة المرور
// //             </label>
// //             <div className="relative">
// //               <input
// //                 type={showConfirmPassword ? "text" : "password"}
// //                 id="confirmPassword"
// //                 value={confirmPassword}
// //                 onChange={(e) => setConfirmPassword(e.target.value)}
// //                 className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-right"
// //                 placeholder="أعد إدخال كلمة المرور الجديدة"
// //                 required
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
// //               >
// //                 {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// //               </button>
// //             </div>
// //           </div>

// //           {/* Password Match Indicator */}
// //           {password && confirmPassword && (
// //             <div className={`text-sm ${password === confirmPassword ? 'text-green-600' : 'text-red-600'}`}>
// //               {password === confirmPassword ? (
// //                 <span>✓ كلمات المرور متطابقة</span>
// //               ) : (
// //                 <span>✗ كلمات المرور غير متطابقة</span>
// //               )}
// //             </div>
// //           )}

// //           {/* Submit Button */}
// //           <button
// //             type="submit"
// //             disabled={!password || !confirmPassword || password !== confirmPassword}
// //             className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all disabled:opacity-100 disabled:cursor-not-allowed"
// //           >
// //             تأكيد كلمة المرور
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }






// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Eye, EyeOff, CheckCircle } from "lucide-react";
// import HomeLayout from '../../HomeLayout';
// import { useRouter, useSearchParams } from "next/navigation";
// import { toast } from "react-hot-toast";

// export default function ConfirmPasswordPage() {
//   const [email, setEmail] = useState("");
//   const [token, setToken] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     // Pre-fill email and token from URL if available
//     const urlEmail = searchParams.get('email');
//     const urlToken = searchParams.get('token');
//     if (urlEmail) setEmail(urlEmail);
//     if (urlToken) setToken(urlToken);
//   }, [searchParams]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!email || !token) {
//       toast.error("الرجاء إدخال البريد الإلكتروني ورمز التحقق");
//       return;
//     }

//     if (password !== confirmPassword) {
//       toast.error("كلمات المرور غير متطابقة");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const formData = new FormData();
//       formData.append('Email', email);
//       formData.append('Token', token);
//       formData.append('NewPassword', password);
//       formData.append('ConfirmPassword', confirmPassword);

//       const response = await fetch('http://elearning1.runasp.net/api/Account/ResetPassword', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         toast.success("تم إعادة تعيين كلمة المرور بنجاح", {
//           duration: 4000,
//           position: 'top-center'
//         });
//         setIsSuccess(true);
//         setTimeout(() => {
//           router.push('/login');
//         }, 3000);
//       } else {
//         const errorData = await response.text();
//         throw new Error(errorData || "فشل إعادة تعيين كلمة المرور");
//       }
//     } catch (error) {
//       console.error("Password reset error:", error);
//       toast.error(
//         error instanceof Error ? error.message : "حدث خطأ أثناء إعادة تعيين كلمة المرور"
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (isSuccess) {
//     return (
//       <HomeLayout>
//         <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4" dir="rtl">
//           <div className="w-full max-w-md p-6 text-center">
//             <div className="flex justify-center mb-6">
//               <CheckCircle className="w-16 h-16 text-green-500" strokeWidth={1.5} />
//             </div>
//             <h1 className="text-2xl font-bold text-gray-900 mb-4">تم تغيير كلمة المرور بنجاح!</h1>
//             <p className="text-gray-600 mb-6">سيتم تحويلك إلى صفحة تسجيل الدخول تلقائياً...</p>
//             <Link
//               href="/login"
//               className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all"
//             >
//               الذهاب إلى تسجيل الدخول الآن
//             </Link>
//           </div>
//         </div>
//       </HomeLayout>
//     );
//   }

//   return (
//     <HomeLayout>
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4" dir="rtl">
//         <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
//           <div className="text-center mb-8">
//             <h1 className="text-2xl font-bold text-gray-900">تعيين كلمة مرور جديدة</h1>
//             <p className="text-gray-600 mt-2">الرجاء إدخال المعلومات المطلوبة لإعادة تعيين كلمة المرور</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Email Field */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 text-right">
//                 البريد الإلكتروني *
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-right"
//                 placeholder="أدخل البريد الإلكتروني"
//                 required
//                 dir="ltr"
//               />
//             </div>

//             {/* Token Field */}
//             <div>
//               <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1 text-right">
//                 رمز التحقق *
//               </label>
//               <input
//                 type="text"
//                 id="token"
//                 value={token}
//                 onChange={(e) => setToken(e.target.value)}
//                 className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-right"
//                 placeholder="أدخل رمز التحقق المرسل إليك"
//                 required
//                 dir="ltr"
//               />
//             </div>

//             {/* New Password Field */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 text-right">
//                 كلمة المرور الجديدة *
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-right"
//                   placeholder="أدخل كلمة المرور الجديدة"
//                   required
//                   minLength={8}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//               <p className="text-xs text-gray-500 mt-1 text-right">
//                 يجب أن تحتوي على 8 أحرف على الأقل
//               </p>
//             </div>

//             {/* Confirm Password Field */}
//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1 text-right">
//                 تأكيد كلمة المرور *
//               </label>
//               <div className="relative">
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   id="confirmPassword"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-right"
//                   placeholder="أعد إدخال كلمة المرور الجديدة"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                 >
//                   {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             {/* Password Match Indicator */}
//             {password && confirmPassword && (
//               <div className={`text-sm ${password === confirmPassword ? 'text-green-600' : 'text-red-600'}`}>
//                 {password === confirmPassword ? (
//                   <span>✓ كلمات المرور متطابقة</span>
//                 ) : (
//                   <span>✗ كلمات المرور غير متطابقة</span>
//                 )}
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={!email || !token || !password || !confirmPassword || password !== confirmPassword || isSubmitting}
//               className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all ${
//                 isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
//               }`}
//             >
//               {isSubmitting ? (
//                 <span className="flex items-center justify-center">
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   جاري المعالجة...
//                 </span>
//               ) : (
//                 "تأكيد كلمة المرور"
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </HomeLayout>
//   );
// }












// app/login/reset-password/ResetPasswordForm.tsx
'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import HomeLayout from '../../HomeLayout';

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlEmail = searchParams.get("email");
    const urlToken = searchParams.get("token");
    if (urlEmail) setEmail(urlEmail);
    if (urlToken) setToken(urlToken);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !token) {
      toast.error("الرجاء إدخال البريد الإلكتروني ورمز التحقق");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("كلمات المرور غير متطابقة");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("Email", email);
      formData.append("Token", token);
      formData.append("NewPassword", password);
      formData.append("ConfirmPassword", confirmPassword);

      const res = await fetch("http://elearning1.runasp.net/api/Account/ResetPassword", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(await res.text());

      toast.success("تم إعادة تعيين كلمة المرور بنجاح");
      setIsSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: any) {
      toast.error(err?.message || "حدث خطأ أثناء إعادة التعيين");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <HomeLayout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4" dir="rtl">
          <div className="w-full max-w-md p-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">تم تغيير كلمة المرور!</h1>
            <p className="text-gray-600 mb-6">سيتم تحويلك تلقائيًا إلى تسجيل الدخول...</p>
            <Link href="/login" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              تسجيل الدخول الآن
            </Link>
          </div>
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4" dir="rtl">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">تعيين كلمة مرور جديدة</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block mb-1 text-sm text-gray-700 text-right">البريد الإلكتروني</label>
              <input
                type="email"
                className="w-full border px-4 py-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Token */}
            <div>
              <label className="block mb-1 text-sm text-gray-700 text-right">رمز التحقق</label>
              <input
                type="text"
                className="w-full border px-4 py-2 rounded"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm text-gray-700 text-right">كلمة المرور الجديدة</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border px-4 py-2 rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-1 text-sm text-gray-700 text-right">تأكيد كلمة المرور</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full border px-4 py-2 rounded"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Match Warning */}
            {password && confirmPassword && (
              <p className={`text-sm ${password === confirmPassword ? "text-green-600" : "text-red-600"}`}>
                {password === confirmPassword ? "✓ متطابقة" : "✗ غير متطابقة"}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || password !== confirmPassword}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              {isSubmitting ? "جارٍ الإرسال..." : "تأكيد كلمة المرور"}
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
}
