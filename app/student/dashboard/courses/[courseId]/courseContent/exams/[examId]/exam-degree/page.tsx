"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";

interface ExamResult {
  examTitle: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
}

export default function ExamResultsPage() {
  const router = useRouter();
  const params = useParams();
  const { courseId, examId } = params;
  const [result, setResult] = useState<ExamResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExamResult = async () => {
      try {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        
        if (!token || !userData) {
          throw new Error("Authentication required");
        }

        const user = JSON.parse(userData);
        
        // Fetch exam result
        const response = await fetch(
          `https://elearning1.runasp.net/api/Student/StudentExamGrade?studentId=${user.id}&examId=${examId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch exam result");
        }

        const resultData: ExamResult = await response.json();
        setResult(resultData);

      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExamResult();
  }, [examId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <button 
          onClick={() => router.push(`/student/dashboard/courses/${courseId}`)}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          العودة إلى المقرر
        </button>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        نتائج الاختبار غير متوفرة
      </div>
    );
  }

  const getGradeColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getGradeMessage = (percentage: number) => {
    if (percentage >= 90) return "ممتاز!";
    if (percentage >= 80) return "جيد جداً";
    if (percentage >= 70) return "جيد";
    if (percentage >= 50) return "مقبول";
    return "ضعيف";
  };

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">نتيجة الاختبار</h1>
          <h2 className="text-xl text-indigo-600">{result.examTitle}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <h3 className="text-gray-500 mb-2">الدرجة الكلية</h3>
            <p className="text-3xl font-bold">
              {result.totalScore} / {result.maxScore}
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <h3 className="text-gray-500 mb-2">النسبة المئوية</h3>
            <p className={`text-3xl font-bold ${getGradeColor(result.percentage)}`}>
              {result.percentage}%
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <h3 className="text-gray-500 mb-2">التقدير</h3>
            <p className={`text-2xl font-bold ${getGradeColor(result.percentage)}`}>
              {getGradeMessage(result.percentage)}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">التقدم</span>
            <span className="text-sm font-medium text-gray-700">{result.percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full ${getGradeColor(result.percentage).replace('text', 'bg')}`}
              style={{ width: `${result.percentage}%` }}
            ></div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => router.push(`/student/dashboard/courses/${courseId}/courseContent`)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            العودة إلى المقرر الدراسي
          </button>
        </div>
      </div>
    </div>
  );
}