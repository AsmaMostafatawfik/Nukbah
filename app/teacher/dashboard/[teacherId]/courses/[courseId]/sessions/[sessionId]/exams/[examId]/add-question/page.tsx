"use client";
import { useState, FormEvent, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { CheckCircle, XCircle, Plus, ArrowRight } from 'lucide-react';

const arabicTranslations = {
  pageTitle: 'إضافة أسئلة',
  questionText: 'نص السؤال',
  questionType: 'نوع السؤال',
  mcq: 'اختيار من متعدد (إجابة واحدة)',
  trueFalse: 'صح أو خطأ',
  multipleChoice: 'اختيار متعدد (إجابات متعددة)',
  score: 'الدرجة',
  saveQuestion: 'حفظ السؤال',
  saving: 'جاري الحفظ...',
  errorOccurred: 'حدث خطأ أثناء الحفظ',
  backToExam: 'العودة إلى الاختبار',
  savedSuccessfully: 'تم الحفظ بنجاح',
  requiredField: 'هذا الحقل مطلوب',
};

interface Question {
  text: string;
  type: number;
  score: number;
}

export default function AddQuestionsPage() {
  const router = useRouter();
  const params = useParams();

  const { teacherId, courseId, sessionId, examId } = params as {
    teacherId: string;
    courseId: string;
    sessionId: string;
    examId: string;
  };

  const [question, setQuestion] = useState<Question>({
    text: '',
    type: 0,
    score: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!teacherId || !courseId || !sessionId || !examId) {
      console.log('Missing params:', { teacherId, courseId, sessionId, examId });
      setError('معرّفات المسار غير مكتملة');
    }
  }, [teacherId, courseId, sessionId, examId]);

  const validateQuestion = () => {
    if (!question.text.trim()) {
      setError("نص السؤال مطلوب");
      return false;
    }
    if (question.score <= 0) {
      setError("الدرجة يجب أن تكون أكبر من الصفر");
      return false;
    }
    return true;
  };

  const saveQuestion = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateQuestion()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      // Verify the token is valid
      if (!token.startsWith('eyJ')) { // Simple JWT token check
        throw new Error("Invalid token format");
      }

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/AddQuestion/${examId}`;
      console.log('API Request:', {
        url: apiUrl,
        method: 'POST',
        body: {
          text: question.text,
          type: question.type,
          score: question.score // Fixed field name (was "tore" in docs)
        }
      });

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          text: question.text,
          type: question.type,
          score: question.score // Correct field name
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("غير مصرح به - يرجى التحقق من بيانات الاعتماد الخاصة بك");
        }
        if (response.status === 404) {
          throw new Error("لم يتم العثور على نقطة النهاية - يرجى التحقق من عنوان URL");
        }
        const errorData = await response.text();
        throw new Error(errorData || "فشل في إضافة السؤال");
      }

      setSuccess(arabicTranslations.savedSuccessfully);
      setTimeout(() => {
        router.push(`/teacher/dashboard/${teacherId}/courses/${courseId}/sessions/${sessionId}/exams/${examId}/questions`);
      }, 1500);

    } catch (err) {
      console.error('Error saving question:', err);
      setError(err instanceof Error ? err.message : arabicTranslations.errorOccurred);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!teacherId || !courseId || !sessionId || !examId) {
    return (
      <div className="container mx-auto px-4 py-8 text-center" dir="rtl">
        <div className="flex flex-col items-center justify-center gap-4">
          <XCircle className="text-red-500" size={48} />
          <h1 className="text-2xl font-bold text-red-600">خطأ في المسار</h1>
          <p className="text-lg">معرّفات المسار غير مكتملة</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="container mx-auto px-4 py-8 text-center" dir="rtl">
        <div className="flex flex-col items-center justify-center gap-4">
          <CheckCircle className="text-green-500" size={48} />
          <h1 className="text-2xl font-bold text-green-600">{success}</h1>
          <p className="text-lg">سيتم تحويلك إلى صفحة الأسئلة تلقائياً...</p>
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

      <form onSubmit={saveQuestion} className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">{arabicTranslations.questionText}</h3>
          <textarea
            value={question.text}
            onChange={(e) => setQuestion({...question, text: e.target.value})}
            required
            placeholder="أدخل نص السؤال هنا..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-medium mb-2">{arabicTranslations.questionType}</h3>
            <select
              value={question.type}
              onChange={(e) => setQuestion({...question, type: Number(e.target.value)})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
            >
              <option value={0}>{arabicTranslations.mcq}</option>
              <option value={1}>{arabicTranslations.trueFalse}</option>
              <option value={2}>{arabicTranslations.multipleChoice}</option>
            </select>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">{arabicTranslations.score}</h3>
            <input
              type="number"
              value={question.score}
              onChange={(e) => setQuestion({...question, score: Number(e.target.value)})}
              required
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-lg flex items-center gap-2`}
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin">↻</span>
                <span>{arabicTranslations.saving}</span>
              </>
            ) : (
              <>
                {arabicTranslations.saveQuestion}
                <ArrowRight size={18} />
              </>
            )}
          </button>
          
          <button
            type="button"
            className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 text-lg"
            onClick={() => router.push(`/teacher/dashboard/${teacherId}/courses/${courseId}/sessions/${sessionId}/exams/${examId}/questions`)}
          >
            {arabicTranslations.backToExam}
          </button>
        </div>
      </form>
    </div>
  );
}



