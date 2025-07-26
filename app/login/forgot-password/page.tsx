"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import HomeLayout from '../../HomeLayout';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error("الرجاء إدخال بريد إلكتروني صحيح");
      return;
    }

    setIsLoading(true);

    try {
      // Using FormData instead of JSON
      const formData = new FormData();
      formData.append('email', email);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Account/ForgotPassword`, {
        method: "POST",
        body: formData, // FormData will set the correct Content-Type header
      });

      // Check if response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the response as JSON
      const data = await response.json();
      
      toast.success(data.message || "تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني");
      router.push("/login/forgot-password/check-email");
      
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error(
        error instanceof Error ? error.message : "حدث خطأ في الاتصال بالخادم"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <HomeLayout>
      <div className="min-h-screen flex flex-col md:flex-row" dir="rtl">
        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-100">
          <Image
            src="/images/332005-PAO2M1-504.jpg"
            alt="نسيت كلمة المرور"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
            priority
          />
          <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center">
            <div className="text-center p-8">
              <h1 className="text-2xl font-bold text-white drop-shadow-md">إعادة تعيين كلمة المرور</h1>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-4">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-sm">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">نسيت كلمة المرور؟</h1>
              <p className="text-gray-600">
                لا تقلق! سوف نرسل لك رابط لإعادة تعيين كلمة المرور
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 text-right mb-2"
                >
                  البريد الإلكتروني المسجل
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="mt-1 block w-full px-4 py-3 text-sm rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-right"
                  required
                  dir="ltr"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center gap-2 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md ${
                  isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    جاري الإرسال...
                  </span>
                ) : (
                  <>
                    إرسال رابط التعيين
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center mt-6">
              <Link 
                href="/login" 
                className="text-sm text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
              >
                <ArrowRight className="w-4 h-4" />
                العودة إلى صفحة تسجيل الدخول
              </Link>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg text-center">
              <p className="text-sm text-gray-600">
                تحتاج مساعدة؟{" "}
                <Link href="/contact" className="text-blue-600 hover:underline">
                  تواصل مع الدعم الفني
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}