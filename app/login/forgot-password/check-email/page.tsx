// "use client";

// import Link from "next/link";
// import { MailCheck } from "lucide-react";
// import HomeLayout from '../../../HomeLayout';


// export default function CheckEmailPage() {
//   return (
//     <HomeLayout>
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4" dir="rtl">
//       <div className="w-full max-w-md p-4 space-y-8 text-center">
//         {/* Large Icon */}
//         <div className="flex justify-center">
//           <MailCheck className="w-20 h-20 text-green-500" strokeWidth={1.5} />
//         </div>

//         {/* Main Message */}
//         <div className="space-y-2">
//           <h1 className="text-3xl font-bold text-gray-900">تم إرسال رابط التعيين!</h1>
//           <p className="text-gray-600 text-lg">
//             الرجاء التحقق من بريدك الإلكتروني لإكمال عملية إعادة تعيين كلمة المرور
//           </p>
//         </div>

//         {/* Email Tips */}
//         <div className="bg-blue-50 p-4 rounded-lg text-right space-y-2">
//           <p className="font-medium text-gray-700">نصائح:</p>
//           <ul className="text-sm text-gray-600 list-disc pr-5 space-y-1">
//             <li>تحقق من مجلد الرسائل غير المرغوب فيها (Spam)</li>
//             <li>ابحث عن رسالة من فريق الدعم لدينا</li>
//             <li>الرابط صالح لمدة 60 دقيقة فقط</li>
//           </ul>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col space-y-4 pt-4">
//           <button
//             onClick={() => window.location.reload()}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all"
//           >
//             إعادة إرسال الرابط
//           </button>
          
//           <Link 
//             href="/login" 
//             className="w-full inline-flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 font-medium py-2"
//           >
//             العودة إلى تسجيل الدخول
//             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M19 12H5M12 19l-7-7 7-7"/>
//             </svg>
//           </Link>
//         </div>

//         {/* Support Contact */}
//         <div className="pt-8 border-t border-gray-200">
//           <p className="text-sm text-gray-500">
//             لم تتلق البريد؟{" "}
//             <Link href="/contact" className="text-blue-600 hover:underline">
//               تواصل مع الدعم الفني
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//     </HomeLayout>
//   );
// }







"use client";

import Link from "next/link";
import { MailCheck } from "lucide-react";
import HomeLayout from '../../../HomeLayout';
import { useRouter } from "next/navigation";

export default function CheckEmailPage() {
  const router = useRouter();

  const handleResendClick = () => {
    // Navigate to reset password page
    router.push("/login/reset-password");
  };

  return (
    <HomeLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4" dir="rtl">
        <div className="w-full max-w-md p-4 space-y-8 text-center">
          {/* Large Icon */}
          <div className="flex justify-center">
            <MailCheck className="w-20 h-20 text-green-500" strokeWidth={1.5} />
          </div>

          {/* Main Message */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">تم إرسال رابط التعيين!</h1>
            <p className="text-gray-600 text-lg">
              الرجاء التحقق من بريدك الإلكتروني لإكمال عملية إعادة تعيين كلمة المرور
            </p>
          </div>

          {/* Email Tips */}
          <div className="bg-blue-50 p-4 rounded-lg text-right space-y-2">
            <p className="font-medium text-gray-700">نصائح:</p>
            <ul className="text-sm text-gray-600 list-disc pr-5 space-y-1">
              <li>تحقق من مجلد الرسائل غير المرغوب فيها (Spam)</li>
              <li>ابحث عن رسالة من فريق الدعم لدينا</li>
              <li>الرابط صالح لمدة 60 دقيقة فقط</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-4 pt-4">
            <button
              onClick={handleResendClick}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all"
            >
              إعادة تعيين كلمة المرور
            </button>
            
            <Link 
              href="/login" 
              className="w-full inline-flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 font-medium py-2"
            >
              العودة إلى تسجيل الدخول
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </Link>
          </div>

          {/* Support Contact */}
          <div className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              لم تتلق البريد؟{" "}
              <Link href="/contact" className="text-blue-600 hover:underline">
                تواصل مع الدعم الفني
              </Link>
            </p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}