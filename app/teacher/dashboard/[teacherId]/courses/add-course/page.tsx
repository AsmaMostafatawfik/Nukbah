'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState, ChangeEvent } from 'react';
import toast from 'react-hot-toast';

interface FormData {
  title: string;
  description: string;
  price: number;
  stage: number;
  gradeLevel: number;
  image: File | null; // Changed to File type for multipart/form-data
}

export default function AddCoursePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: 0,
    stage: 0, // Default to ابتدائية
    gradeLevel: 1,
    image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      if (!file.type.match('image.*')) {
        toast.error('يجب اختيار ملف صورة (JPG, PNG, JPEG)');
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        toast.error('يجب أن يكون حجم الصورة أقل من 2MB');
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData(prev => ({ ...prev, image: null }));
      setPreviewImage(null);
    }
  };

  const getGradeLevels = (): number[] => {
    return [1, 2, 3, 4, 5, 6, 7]; // Grades 1-6 + 7 for "غير ذلك"
  };

  const getGradeLabel = (grade: number): string => {
    if (grade === 7) return 'غير ذلك';
    return `الصف ${grade}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate form data
      if (!formData.title.trim()) throw new Error('عنوان الدورة مطلوب');
      if (!formData.description.trim()) throw new Error('وصف الدورة مطلوب');
      if (formData.price < 0) throw new Error('السعر يجب أن يكون رقم موجب');

      // Extract teacherId from URL
      const pathParts = window.location.pathname.split('/');
      const teacherId = pathParts[3];
      
      if (!teacherId || teacherId === 'courses') {
        throw new Error('معرف المعلم غير صالح');
      }

      const token = localStorage.getItem('token');
      if (!token) throw new Error('يجب تسجيل الدخول أولاً');

      // Create FormData for multipart/form-data
      const formDataToSend = new FormData();
      formDataToSend.append('Title', formData.title);
      formDataToSend.append('Description', formData.description);
      formDataToSend.append('Price', formData.price.toString());
      formDataToSend.append('Stage', formData.stage.toString());
      formDataToSend.append('GradeLevel', formData.gradeLevel.toString());
      if (formData.image) {
        formDataToSend.append('Image', formData.image);
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://elearning1.runasp.net';
      
      const response = await fetch(
        `${API_URL}/api/Teacher/AddCourse/${teacherId}`,
        {
          method: 'POST',
          headers: { 
            'Authorization': `Bearer ${token}`,
          },
          body: formDataToSend
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'فشل في إضافة الدورة');
      }

      toast.success('تم إضافة الدورة بنجاح!');
      router.push(`/teacher/dashboard/${teacherId}/courses`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6" dir="rtl">
      <div className="mb-6">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          <span className="font-medium">العودة</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
          </svg>
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-gray-800">إضافة دورة جديدة</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block mb-2 font-medium text-gray-700">
            عنوان الدورة *
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
            placeholder="أدخل عنوان الدورة"
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-2 font-medium text-gray-700">
            الوصف *
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[120px]"
            required
            placeholder="أدخل وصف الدورة"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block mb-2 font-medium text-gray-700">
              السعر (ج.م) *
            </label>
            <div className="relative">
              <input
                id="price"
                type="number"
                min="0"
                step="1"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 pr-12"
                required
              />
              <span className="absolute left-3 top-3 text-gray-500">ج.م</span>
            </div>
          </div>

          <div>
            <label htmlFor="stage" className="block mb-2 font-medium text-gray-700">
              المرحلة التعليمية *
            </label>
            <select
              id="stage"
              value={formData.stage}
              onChange={(e) => setFormData({ ...formData, stage: Number(e.target.value) })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value={0}>الابتدائية</option>
              <option value={1}>المتوسطة</option>
              <option value={2}>الثانوية</option>
              <option value={3}>جامعة</option>
              <option value={4}>غير ذلك</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="gradeLevel" className="block mb-2 font-medium text-gray-700">
            الصف الدراسي *
          </label>
          <select
            id="gradeLevel"
            value={formData.gradeLevel}
            onChange={(e) => setFormData({ ...formData, gradeLevel: Number(e.target.value) })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            {getGradeLevels().map(grade => (
              <option key={grade} value={grade}>
                {getGradeLabel(grade)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="image" className="block mb-2 font-medium text-gray-700">
            صورة الدورة
          </label>
          <input
            id="image"
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700"
          />
          {previewImage && (
            <div className="mt-4">
              <img 
                src={previewImage} 
                alt="معاينة الصورة" 
                className="max-w-[200px] max-h-[200px] object-contain border rounded-lg"
              />
            </div>
          )}
          <p className="mt-2 text-sm text-gray-500">JPEG أو PNG بحد أقصى 2MB</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-lg text-white font-medium ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              جاري الإضافة...
            </span>
          ) : 'إضافة الدورة'}
        </button>
      </form>
    </div>
  );
}