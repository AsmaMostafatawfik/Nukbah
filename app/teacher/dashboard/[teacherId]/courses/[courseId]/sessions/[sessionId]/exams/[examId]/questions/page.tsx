
"use client";
import { useState, useEffect, Fragment } from "react";
import { PlusCircle, MessageSquarePlus, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface Question {
  id: number;
  text: string;
  type: number; // 0: MCQ, 1: True/False, 2: Multiple Choice
  score: number;
}

interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
  questionId: number;
}

export default function ExamQuestionsPage() {
  const params = useParams();
  const router = useRouter();
  const { teacherId, courseId, sessionId, examId } = params;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, Answer[]>>({});
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required");
        }

        const response = await fetch(
          `http://elearning1.runasp.net/api/Teacher/Questions/${examId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch questions: ${response.status}`);
        }

        const data = await response.json();
        setQuestions(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [examId]);

  const fetchAnswers = async (questionId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
        `http://elearning1.runasp.net/api/Teacher/Answers/${questionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch answers: ${response.status}`);
      }

      const answersData = await response.json();
      setAnswers(prev => ({
        ...prev,
        [questionId]: Array.isArray(answersData) ? answersData : []
      }));
    } catch (err) {
      console.error("Error fetching answers:", err);
      setAnswers(prev => ({
        ...prev,
        [questionId]: []
      }));
    }
  };

  const toggleQuestionExpand = (questionId: number) => {
    if (expandedQuestion === questionId) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(questionId);
      if (!answers[questionId]) {
        fetchAnswers(questionId);
      }
    }
  };

  const navigateToAddQuestion = () => {
    router.push(
      `/teacher/dashboard/${teacherId}/courses/${courseId}/sessions/${sessionId}/exams/${examId}/add-question`
    );
  };

  const navigateToAddAnswer = (questionId: number) => {
    router.push(
      `/teacher/dashboard/${teacherId}/courses/${courseId}/sessions/${sessionId}/exams/${examId}/questions/${questionId}/add-answer`
    );
  };

  const handleDeleteQuestion = async (questionId: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا السؤال؟ سيتم حذف جميع الإجابات المرتبطة به.")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
        `http://elearning1.runasp.net/api/Teacher/DeleteQuestion/${questionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete question: ${response.status}`);
      }

      setQuestions(questions.filter(q => q.id !== questionId));
      setAnswers(prev => {
        const newAnswers = {...prev};
        delete newAnswers[questionId];
        return newAnswers;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete question");
    }
  };

  const handleDeleteAnswer = async (answerId: number, questionId: number) => {
    if (!confirm("هل أنت متأكد من حذف هذه الإجابة؟")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
        `http://elearning1.runasp.net/api/Teacher/DeleteAnswer/${answerId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete answer: ${response.status}`);
      }

      setAnswers(prev => ({
        ...prev,
        [questionId]: prev[questionId]?.filter(a => a.id !== answerId) || []
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete answer");
    }
  };

  const getQuestionTypeName = (type: number) => {
    const types = ["اختيار من متعدد", "صح أو خطأ", "اختيار متعدد الإجابات"];
    return types[type] || "غير محدد";
  };

  // Calculate total score
  const totalScore = questions.reduce((sum, question) => sum + question.score, 0);

  if (loading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8" dir="rtl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">أسئلة الاختبار</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg"
          style={{ backgroundColor: "#3a5a78" }}
          onClick={navigateToAddQuestion}
        >
          <PlusCircle size={18} />
          إضافة سؤال جديد
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <h2 className="text-xl font-bold">إجمالي الأسئلة: {questions.length}</h2>
        </div>
        
        {questions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            لا توجد أسئلة متاحة لهذا الاختبار
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-right px-4">#</th>
                  <th className="pb-3 text-right px-4">نص السؤال</th>
                  <th className="pb-3 text-right px-4">النوع</th>
                  <th className="pb-3 text-right px-4">الدرجة</th>
                  <th className="pb-3 text-right px-4">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question, index) => (
                  <Fragment key={`question-wrapper-${question.id}`}>
                    <tr key={`question-${question.id}`} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">{index + 1}</td>
                      <td className="py-4 px-4 max-w-xs">
                        <button 
                          onClick={() => toggleQuestionExpand(question.id)}
                          className="flex items-center gap-2"
                        >
                          {question.text}
                          {expandedQuestion === question.id ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </button>
                      </td>
                      <td className="py-4 px-4">{getQuestionTypeName(question.type)}</td>
                      <td className="py-4 px-4">{question.score}</td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigateToAddAnswer(question.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded"
                            title="إضافة إجابة"
                          >
                            <MessageSquarePlus size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteQuestion(question.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                            title="حذف السؤال"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedQuestion === question.id && (
                      <tr key={`answer-row-${question.id}`} className="border-b">
                        <td colSpan={5} className="px-4 py-2">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-3">
                              <h3 className="font-medium">إجابات السؤال</h3>
                              <span className="text-sm text-gray-500">
                                {answers[question.id]?.length || 0} إجابة
                              </span>
                            </div>
                            {answers[question.id]?.length > 0 ? (
                              <div className="space-y-3">
                                {answers[question.id].map((answer) => (
                                  <div 
                                    key={`answer-${answer.id}`} 
                                    className={`border p-3 rounded-lg flex justify-between items-center ${answer.isCorrect ? "bg-green-50 border-green-200" : "bg-white"}`}
                                  >
                                    <div>
                                      <p>{answer.text}</p>
                                      <p className="text-sm text-gray-600">
                                        {answer.isCorrect ? "إجابة صحيحة" : "إجابة خاطئة"}
                                      </p>
                                    </div>
                                    <button
                                      onClick={() => handleDeleteAnswer(answer.id, question.id)}
                                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                                      title="حذف الإجابة"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-4 text-gray-500">
                                لا توجد إجابات لهذا السؤال
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
                {/* Total score row */}
                <tr className="border-t-2 border-gray-300">
                  <td colSpan={3} className="py-4 px-4 text-right font-bold">المجموع الكلي:</td>
                  <td className="py-4 px-4 font-bold">{totalScore}</td>
                  <td className="py-4 px-4"></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}