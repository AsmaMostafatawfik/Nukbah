
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

      const res = await fetch("https://elearning1.runasp.net/api/Account/ResetPassword", {
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
