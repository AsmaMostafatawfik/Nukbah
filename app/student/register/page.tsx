"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import HomeLayout from '../../HomeLayout';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    FullName: "",
    UserName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    PhoneNumber: "",
    Gender: 0, // 0 for male, 1 for female
    Age: 0,
    ParentPhoneNumber: "",
    SchoolName: "",
    EducationalStage: 0, // 0 for elementary, 1 for middle, 2 for high school, 3 for university, 4 for other
    GradeLevel: 1, // Start with grade 1 as default
    //Image: null as File | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "Gender" || name === "Age" || name === "EducationalStage" || name === "GradeLevel" ? parseInt(value) : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({
        ...prev,
        Image: e.target.files![0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Validate password match
      if (formData.Password !== formData.ConfirmPassword) {
        throw new Error("كلمتا المرور غير متطابقتين");
      }

      // Validate required fields
      const requiredFields = {
        'الاسم الكامل': formData.FullName,
        'اسم المستخدم': formData.UserName,
        'البريد الإلكتروني': formData.Email,
        'كلمة المرور': formData.Password,
        'رقم الهاتف': formData.PhoneNumber,
        'رقم ولي الأمر': formData.ParentPhoneNumber,
        'اسم المدرسة': formData.SchoolName
      };

      for (const [fieldName, value] of Object.entries(requiredFields)) {
        if (!value?.toString()?.trim()) {
          throw new Error(`حقل ${fieldName} مطلوب`);
        }
      }

      // Validate phone number format
      const phoneRegex = /^[0-9]{11}$/;
      if (!phoneRegex.test(formData.PhoneNumber)) {
        throw new Error("رقم الهاتف يجب أن يتكون من 11 أرقام");
      }

      if (!phoneRegex.test(formData.ParentPhoneNumber)) {
        throw new Error("رقم هاتف ولي الأمر يجب أن يتكون من 11 أرقام");
      }

      // Validate age range
      if (formData.Age < 5 || formData.Age > 100) {
        throw new Error("العمر يجب أن يكون بين 5 و 100 سنة");
      }

      // Create FormData and append fields
      const formDataToSend = new FormData();
      
      // Required fields
      formDataToSend.append('FullName', formData.FullName.trim());
      formDataToSend.append('UserName', formData.UserName.trim());
      formDataToSend.append('Email', formData.Email.trim());
      formDataToSend.append('Password', formData.Password);
      formDataToSend.append('ConfirmPassword', formData.ConfirmPassword);
      formDataToSend.append('PhoneNumber', formData.PhoneNumber.trim());
      formDataToSend.append('Gender', formData.Gender.toString());
      formDataToSend.append('Age', formData.Age.toString());
      formDataToSend.append('ParentPhoneNumber', formData.ParentPhoneNumber.trim());
      formDataToSend.append('SchoolName', formData.SchoolName.trim());
      formDataToSend.append('EducationalStage', formData.EducationalStage.toString());
      formDataToSend.append('GradeLevel', formData.GradeLevel.toString());
      
      // Optional image
    //  if (formData.Image) {
    //    formDataToSend.append('Image', formData.Image, formData.Image.name);
    //  }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://elearning1.runasp.net';
      
      const response = await fetch(
        `${API_URL}/api/Account/StudentRegister`,
        {
          method: 'POST',
          body: formDataToSend,
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        let errorMessage = 'فشل في تسجيل الحساب';
        
        if (responseData.errors) {
          errorMessage = Object.entries(responseData.errors)
            .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
            .join('\n');
        } else if (responseData.message) {
          errorMessage = responseData.message;
        } else if (responseData.title) {
          errorMessage = responseData.title;
        }
        
        throw new Error(errorMessage);
      }

      // Success - redirect to login
      toast.success('تم إنشاء الحساب بنجاح!');
      router.push('/login');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get grade levels based on selected educational stage
  const getGradeLevels = (): number[] => {
    return [1, 2, 3, 4, 5, 6, 7]; // Grades 1-6 + 7 for "غير ذلك"
  };

  const getGradeLabel = (grade: number): string => {
    if (grade === 7) return 'غير ذلك';
    return `الصف ${grade}`;
  };

  return (
    <HomeLayout>
      <div dir="rtl" className="min-h-screen flex bg-gray-50">
        {/* Image Section - Full Height */}
        <div className="hidden md:block w-1/2 bg-blue-600 relative">
          <Image
            src="/images/8502868.jpg"
            alt="تسجيل حساب جديد"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-blue-900/30 flex items-center justify-center p-6 text-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                انضم إلى منصتنا التعليمية
              </h2>
              <p className="text-white/90 text-lg">
                سجل بياناتك لتبدأ رحلتك التعليمية
              </p>
            </div>
          </div>
        </div>

        {/* Form Section - Full Height */}
        <div className="w-full md:w-1/2 p-6 md:p-12 overflow-y-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            طلب إنشاء حساب طالب
          </h1>
          <p className="text-gray-600 mb-8">
            املأ النموذج أدناه لإنشاء حساب جديد
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p className="font-bold">خطأ!</p>
              <p className="whitespace-pre-line">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الاسم الكامل *
              </label>
              <input
                type="text"
                name="FullName"
                value={formData.FullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Username and Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اسم المستخدم *
              </label>
              <input
                type="text"
                name="UserName"
                value={formData.UserName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                البريد الإلكتروني *
              </label>
              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Password Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  كلمة المرور (6 أحرف على الأقل) *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="Password"
                    value={formData.Password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تأكيد كلمة المرور *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="ConfirmPassword"
                    value={formData.ConfirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Phone and Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رقم الهاتف *
                </label>
                <input
                  type="tel"
                  name="PhoneNumber"
                  value={formData.PhoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  pattern="[0-9]{11}"
                  title="يجب أن يتكون رقم الهاتف من 11 أرقام"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الجنس *
                </label>
                <select
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value={0}>ذكر</option>
                  <option value={1}>أنثى</option>
                </select>
              </div>
            </div>

            {/* Age and Parent Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  العمر (5-100) *
                </label>
                <input
                  type="number"
                  name="Age"
                  value={formData.Age || ''}
                  onChange={handleChange}
                  min="5"
                  max="100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رقم هاتف ولي الأمر *
                </label>
                <input
                  type="tel"
                  name="ParentPhoneNumber"
                  value={formData.ParentPhoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  pattern="[0-9]{11}"
                  title="يجب أن يتكون رقم الهاتف من 11 أرقام"
                />
              </div>
            </div>

            {/* School, Educational Stage, and Grade Level */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  اسم المدرسة *
                </label>
                <input
                  type="text"
                  name="SchoolName"
                  value={formData.SchoolName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  المرحلة التعليمية *
                </label>
                <select
                  name="EducationalStage"
                  value={formData.EducationalStage}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value={0}>الابتدائية</option>
                  <option value={1}>المتوسطة</option>
                  <option value={2}>الثانوية</option>
                  <option value={3}>جامعة</option>
                  <option value={4}>غير ذلك</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الصف الدراسي *
                </label>
                <select
                  name="GradeLevel"
                  value={formData.GradeLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  {getGradeLevels().map(grade => (
                    <option key={grade} value={grade}>
                      {getGradeLabel(grade)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image Upload */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                صورة الشخصية (اختياري)
              </label>
              <input
                type="file"
                name="Image"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                accept="image/*"
              />
              {formData.Image && (
                <p className="text-sm text-green-600 mt-1">تم اختيار صورة</p>
              )}
            </div> */}

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
              ) : 'إنشاء الحساب'}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            لديك حساب بالفعل؟{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </HomeLayout>
  );
}