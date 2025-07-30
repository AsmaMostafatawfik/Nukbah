// 'use client';

// import { useState, FormEvent } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import { CheckCircle, XCircle } from 'lucide-react';

// type ExamType = 0 | 1 | 2;

// interface ExamFormData {
//   title: string;
//   type: ExamType;
//   startTime: string;
//   endTime: string;
//   durationMinutes: number;
//   publishDate: string;
// }

// const arabicTranslations = {
//   pageTitle: 'إضافة اختبار جديد',
//   examTitle: 'عنوان الاختبار',
//   examType: 'نوع الاختبار',
//   quiz: 'اختبار قصير',
//   midterm: 'اختبار منتصف الفصل',
//   final: 'اختبار نهائي',
//   startDate: 'تاريخ ووقت البدء',
//   endDate: 'تاريخ ووقت الانتهاء',
//   publishDate: 'تاريخ النشر',
//   duration: 'المدة (دقائق)',
//   createExam: 'إنشاء الاختبار',
//   creatingExam: 'جاري إنشاء الاختبار...',
//   errorOccurred: 'حدث خطأ أثناء إنشاء الاختبار',
//   backToSession: 'العودة إلى الجلسة',
//   examCreated: 'تم إنشاء الاختبار بنجاح',
//   requiredField: 'هذا الحقل مطلوب',
// };

// function InputField({ id, type = 'text', value, onChange, required = false, placeholder = '', min, disabled = false }: any) {
//   return (
//     <div className="mb-4">
//       <input
//         type={type}
//         id={id}
//         name={id}
//         value={value}
//         onChange={onChange}
//         required={required}
//         min={min}
//         disabled={disabled}
//         placeholder={placeholder}
//         className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right ${disabled ? 'bg-gray-100' : ''}`}
//       />
//     </div>
//   );
// }

// function SelectField({ id, value, onChange, options }: any) {
//   return (
//     <div className="mb-4">
//       <select
//         id={id}
//         name={id}
//         value={value}
//         onChange={onChange}
//         className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
//       >
//         {options.map((opt: any) => (
//           <option key={opt.value} value={opt.value}>{opt.label}</option>
//         ))}
//       </select>
//     </div>
//   );
// }

// export default function AddExamToSession() {
//   const router = useRouter();
//   const params = useParams();

//   const { teacherId, courseId, sessionId } = params as {
//     teacherId: string;
//     courseId: string;
//     sessionId: string;
//   };

//   const [formData, setFormData] = useState<ExamFormData>({
//     title: '',
//     type: 0,
//     startTime: new Date().toISOString().slice(0, 16),
//     endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16),
//     durationMinutes: 60,
//     publishDate: new Date().toISOString().slice(0, 16),
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);

//   const validateForm = () => {
//     if (!formData.title.trim()) {
//       setError("عنوان الاختبار مطلوب");
//       return false;
//     }
//     if (new Date(formData.endTime) <= new Date(formData.startTime)) {
//       setError("وقت الانتهاء يجب أن يكون بعد وقت البدء");
//       return false;
//     }
//     if (formData.durationMinutes <= 0) {
//       setError("المدة يجب أن تكون أكبر من الصفر");
//       return false;
//     }
//     if (!formData.publishDate) {
//       setError("تاريخ النشر مطلوب");
//       return false;
//     }
//     return true;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: name === 'type' || name === 'durationMinutes' ? parseInt(value) as any : value,
//     }));
//     setError(null);
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);
    
//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("Authentication required");
//       }

//       // Format dates exactly like in your working session update page
//       const apiData = {
//         title: formData.title,
//         type: formData.type,
//         startTime: `${formData.startTime}:00.000Z`,
//         endTime: `${formData.endTime}:00.000Z`,
//         durationMinutes: formData.durationMinutes,
//         publishDate: `${formData.publishDate}:00.000Z`,
//       };

//       console.log("Submitting exam data:", apiData);

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/AddExamToSession/${sessionId}`,
//         {
//           method: 'POST',
//           headers: { 
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json' 
//           },
//           body: JSON.stringify(apiData),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || arabicTranslations.errorOccurred);
//       }

//       setSuccess(arabicTranslations.examCreated);
      
//       // Reset form with current datetime
//       setFormData({
//         title: '',
//         type: 0,
//         startTime: new Date().toISOString().slice(0, 16),
//         endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16),
//         durationMinutes: 60,
//         publishDate: new Date().toISOString().slice(0, 16),
//       });

//       // Redirect after 2 seconds
//       setTimeout(() => {
//         router.push(`/teacher/dashboard/${teacherId}/courses/${courseId}/sessions`);
//       }, 2000);

//     } catch (err) {
//       console.error("Error creating exam:", err);
//       setError(err instanceof Error ? err.message : arabicTranslations.errorOccurred);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (success) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center" dir="rtl">
//         <div className="flex flex-col items-center justify-center gap-4">
//           <CheckCircle className="text-green-500" size={48} />
//           <h1 className="text-2xl font-bold text-green-600">{success}</h1>
//           <p className="text-lg">سيتم تحويلك إلى صفحة الجلسة تلقائياً...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8" dir="rtl">
//       <h1 className="text-2xl font-bold mb-6 text-right">{arabicTranslations.pageTitle}</h1>
      
//       {error && (
//         <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           <XCircle className="text-red-500" size={20} />
//           <span>{error}</span>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-4">عنوان الاختبار</h2>
//           <InputField
//             id="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//             placeholder="أدخل عنوان الاختبار"
//           />
//         </div>

//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-4">نوع الاختبار</h2>
//           <SelectField
//             id="type"
//             value={formData.type}
//             onChange={handleChange}
//             options={[
//               { value: 0, label: arabicTranslations.quiz },
//               { value: 1, label: arabicTranslations.midterm },
//               { value: 2, label: arabicTranslations.final },
//             ]}
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div>
//             <h2 className="text-xl font-semibold mb-4">{arabicTranslations.startDate}</h2>
//             <InputField
//               id="startTime"
//               type="datetime-local"
//               value={formData.startTime}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <h2 className="text-xl font-semibold mb-4">{arabicTranslations.endDate}</h2>
//             <InputField
//               id="endTime"
//               type="datetime-local"
//               value={formData.endTime}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>

//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-4">{arabicTranslations.duration}</h2>
//           <InputField
//             id="durationMinutes"
//             type="number"
//             value={formData.durationMinutes}
//             onChange={handleChange}
//             required
//             min="1"
//           />
//         </div>

//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-4">{arabicTranslations.publishDate}</h2>
//           <InputField
//             id="publishDate"
//             type="datetime-local"
//             value={formData.publishDate}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="flex justify-end gap-4">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-lg flex items-center gap-2`}
//           >
//             {isSubmitting ? (
//               <>
//                 <span className="animate-spin">↻</span>
//                 <span>{arabicTranslations.creatingExam}</span>
//               </>
//             ) : (
//               arabicTranslations.createExam
//             )}
//           </button>
//           <button
//             type="button"
//             className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 text-lg"
//             onClick={() => router.push(`/teacher/dashboard/${teacherId}/courses/${courseId}/sessions`)}
//           >
//             إلغاء
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }













'use client';

import { useState, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { CheckCircle, XCircle } from 'lucide-react';

type ExamType = 0 | 1 | 2;

interface ExamFormData {
  title: string;
  type: ExamType;
  startTime: string;
  endTime: string;
  durationMinutes: number;
}

const arabicTranslations = {
  pageTitle: 'إضافة اختبار جديد',
  examTitle: 'عنوان الاختبار',
  examType: 'نوع الاختبار',
  quiz: 'اختبار قصير',
  midterm: 'اختبار منتصف الفصل',
  final: 'اختبار نهائي',
  startDate: 'تاريخ ووقت البدء',
  endDate: 'تاريخ ووقت الانتهاء',
  duration: 'المدة (دقائق)',
  createExam: 'إنشاء الاختبار',
  creatingExam: 'جاري إنشاء الاختبار...',
  errorOccurred: 'حدث خطأ أثناء إنشاء الاختبار',
  backToSession: 'العودة إلى الجلسة',
  examCreated: 'تم إنشاء الاختبار بنجاح',
  requiredField: 'هذا الحقل مطلوب',
};

function InputField({ id, type = 'text', value, onChange, required = false, placeholder = '', min, disabled = false }: any) {
  return (
    <div className="mb-4">
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        min={min}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right ${disabled ? 'bg-gray-100' : ''}`}
      />
    </div>
  );
}

function SelectField({ id, value, onChange, options }: any) {
  return (
    <div className="mb-4">
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

export default function AddExamToSession() {
  const router = useRouter();
  const params = useParams();

  const { teacherId, courseId, sessionId } = params as {
    teacherId: string;
    courseId: string;
    sessionId: string;
  };

  const [formData, setFormData] = useState<ExamFormData>({
    title: '',
    type: 0,
    startTime: new Date().toISOString().slice(0, 16),
    endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16),
    durationMinutes: 60,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError("عنوان الاختبار مطلوب");
      return false;
    }
    if (new Date(formData.endTime) <= new Date(formData.startTime)) {
      setError("وقت الانتهاء يجب أن يكون بعد وقت البدء");
      return false;
    }
    if (formData.durationMinutes <= 0) {
      setError("المدة يجب أن تكون أكبر من الصفر");
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'type' || name === 'durationMinutes' ? parseInt(value) as any : value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const apiData = {
        title: formData.title,
        type: formData.type,
        startTime: `${formData.startTime}:00.000Z`,
        endTime: `${formData.endTime}:00.000Z`,
        durationMinutes: formData.durationMinutes,
      };

      console.log("Submitting exam data:", apiData);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/AddExamToSession/${sessionId}`,
        {
          method: 'POST',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(apiData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || arabicTranslations.errorOccurred);
      }

      setSuccess(arabicTranslations.examCreated);
      
      // Reset form with current datetime
      setFormData({
        title: '',
        type: 0,
        startTime: new Date().toISOString().slice(0, 16),
        endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16),
        durationMinutes: 60,
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push(`/teacher/dashboard/${teacherId}/courses/${courseId}/sessions`);
      }, 2000);

    } catch (err) {
      console.error("Error creating exam:", err);
      setError(err instanceof Error ? err.message : arabicTranslations.errorOccurred);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="container mx-auto px-4 py-8 text-center" dir="rtl">
        <div className="flex flex-col items-center justify-center gap-4">
          <CheckCircle className="text-green-500" size={48} />
          <h1 className="text-2xl font-bold text-green-600">{success}</h1>
          <p className="text-lg">سيتم تحويلك إلى صفحة الجلسة تلقائياً...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <h1 className="text-2xl font-bold mb-6 text-right">{arabicTranslations.pageTitle}</h1>
      
      {error && (
        <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <XCircle className="text-red-500" size={20} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">عنوان الاختبار</h2>
          <InputField
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="أدخل عنوان الاختبار"
          />
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">نوع الاختبار</h2>
          <SelectField
            id="type"
            value={formData.type}
            onChange={handleChange}
            options={[
              { value: 0, label: arabicTranslations.quiz },
              { value: 1, label: arabicTranslations.midterm },
              { value: 2, label: arabicTranslations.final },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">{arabicTranslations.startDate}</h2>
            <InputField
              id="startTime"
              type="datetime-local"
              value={formData.startTime}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">{arabicTranslations.endDate}</h2>
            <InputField
              id="endTime"
              type="datetime-local"
              value={formData.endTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">{arabicTranslations.duration}</h2>
          <InputField
            id="durationMinutes"
            type="number"
            value={formData.durationMinutes}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-lg flex items-center gap-2`}
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin">↻</span>
                <span>{arabicTranslations.creatingExam}</span>
              </>
            ) : (
              arabicTranslations.createExam
            )}
          </button>
          <button
            type="button"
            className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 text-lg"
            onClick={() => router.push(`/teacher/dashboard/${teacherId}/courses/${courseId}/sessions`)}
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
}