
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";

interface Answer {
  id: number;
  text: string;
}

interface Question {
  id: number;
  text: string;
  type: number; // 0: MCQs, 1: True/False, 2: Multiple Choice
  answers: Answer[];
}

interface Exam {
  id: number;
  title: string;
  durationMinutes: number;
  questions: Question[];
}

interface SubmitExamDto {
  examId: number;
  studentId: number;
  answers: {
    questionId: number;
    answerText: string[];
  }[];
}

export default function ExamPage() {
  const router = useRouter();
  const params = useParams();
  const { courseId, examId } = params;
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [remainingTime, setRemainingTime] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [startingExam, setStartingExam] = useState(false);
  const [startExamMessage, setStartExamMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        
        if (!token || !userData) {
          throw new Error("Authentication required");
        }

        const user = JSON.parse(userData);
        
        const response = await fetch(
          `https://elearning1.runasp.net/api/Student/GetExamQuestions/${examId}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            mode: "cors"
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch exam questions");
        }

        const questions: Question[] = await response.json();
        
        const examData: Exam = {
          id: Number(examId),
          title: "اختبار",
          durationMinutes: 60,
          questions: questions
        };
        
        setExam(examData);
        setRemainingTime(examData.durationMinutes * 60);

        const initialAnswers: Record<number, string[]> = {};
        examData.questions.forEach(question => {
          initialAnswers[question.id] = [];
        });
        setAnswers(initialAnswers);

      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [examId]);

  useEffect(() => {
    if (!examStarted || remainingTime <= 0) return;

    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime, examStarted]);

  const handleAnswerChange = (questionId: number, answer: string, isMultiple: boolean) => {
    setAnswers(prev => {
      const currentAnswers = prev[questionId] || [];
      let newAnswers;
      
      if (isMultiple) {
        newAnswers = currentAnswers.includes(answer)
          ? currentAnswers.filter(a => a !== answer)
          : [...currentAnswers, answer];
      } else {
        newAnswers = [answer];
      }
      
      return {
        ...prev,
        [questionId]: newAnswers
      };
    });
  };

  const startExam = async () => {
    try {
      setStartingExam(true);
      setStartExamMessage(null);
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      
      if (!token || !userData) {
        throw new Error("Authentication required");
      }

      const user = JSON.parse(userData);
      
      const response = await fetch(
        "https://elearning1.runasp.net/api/Student/StartExam",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            examId: Number(examId),
            studentId: user.id
          }),
          mode: "cors"
        }
      );

      const result = await response.json();
      
      if (response.ok) {
        setStartExamMessage("تم بدء الامتحان بنجاح");
        toast.success("تم بدء الامتحان");
        setExamStarted(true);
      } else {
        if (result.message && (result.message.includes("already") || result.message.includes("بدأت"))) {
          setStartExamMessage("لقد بدأت هذا الامتحان بالفعل");
          toast.success("لقد بدأت هذا الامتحان بالفعل");
          setExamStarted(true);
        } else {
          throw new Error(result.message || "لقد تم  دخول هذا الامتحان من قبل ");
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "حدث خطأ أثناء بدء الاختبار";
      setStartExamMessage(errorMessage);
      toast.error(errorMessage);
      console.error("Error starting exam:", err);
    } finally {
      setStartingExam(false);
    }
  };

  const handleSubmitExam = async () => {
    if (!exam) return;
    
    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      
      if (!token || !userData) {
        throw new Error("Authentication required");
      }

      const user = JSON.parse(userData);
      
      const submitData: SubmitExamDto = {
        examId: exam.id,
        studentId: user.id,
        answers: Object.entries(answers)
          .filter(([_, answerTexts]) => answerTexts.length > 0)
          .map(([questionId, answerTexts]) => ({
            questionId: Number(questionId),
            answerText: answerTexts
          }))
      };

      const response = await fetch(
        "https://elearning1.runasp.net/api/Student/SubmitExam",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(submitData),
          mode: "cors"
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to submit exam");
      }

      const result = await response.json();
      toast.success(result || "تم تسليم الاختبار بنجاح");
      router.push(`/student/dashboard/courses/${courseId}/courseContent/exams/${examId}/exam-degree`);
    } catch (err) {
      console.error("Error submitting exam:", err);
      toast.error(err instanceof Error ? err.message : "حدث خطأ أثناء تسليم الاختبار");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getQuestionTypeName = (type: number) => {
    switch(type) {
      case 0: return "اختيار من متعدد";
      case 1: return "صح أو خطأ";
      case 2: return "اختيار متعدد";
      default: return "سؤال";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">جاري تحميل الاختبار...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
          <button 
            onClick={() => router.push(`/student/dashboard/courses/${courseId}`)}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            العودة إلى المقرر
          </button>
        </div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <h2 className="text-xl font-medium text-gray-800 mb-4">الاختبار غير موجود</h2>
          <button 
            onClick={() => router.push(`/student/dashboard/courses/${courseId}`)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            العودة إلى المقرر
          </button>
        </div>
      </div>
    );
  }

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center">
          <div className="mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{exam.title}</h1>
          <div className="mb-6">
            <p className="text-gray-600">اضغط على زر بدء الاختبار للبدء</p>
            <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-3 inline-block">
              <p className="text-sm text-blue-700 font-medium">مدة الاختبار: {exam.durationMinutes} دقيقة</p>
            </div>
          </div>
          
          {startExamMessage && (
            <div className={`mb-4 p-3 rounded-lg ${
              examStarted ? 'bg-green-50 border border-green-100 text-green-700' : 'bg-red-50 border border-red-100 text-red-700'
            }`}>
              {startExamMessage}
            </div>
          )}
          
          <button
            onClick={startExam}
            disabled={startingExam}
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {startingExam ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                جاري التحقق...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
                بدء الاختبار
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Exam Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-0">{exam.title}</h1>
              <div className={`px-4 py-2 rounded-lg font-medium text-sm sm:text-base ${
                remainingTime > 300 ? 'bg-green-100 text-green-800' : 
                remainingTime > 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
              }`}>
                ⏱️ الوقت المتبقي: {formatTime(remainingTime)}
              </div>
            </div>
          </div>

          {/* Questions Section */}
          <div className="p-6">
            <div className="space-y-8">
              {exam.questions.map((question, index) => (
                <div key={question.id} className="border-b border-gray-100 pb-8 last:border-b-0">
                  <div className="flex items-start mb-4">
                    <span className="bg-indigo-100 text-indigo-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{question.text}</h3>
                      <span className="inline-block mt-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        {getQuestionTypeName(question.type)}
                      </span>
                    </div>
                  </div>

                  {question.type === 1 ? (
                    <div className="flex flex-col sm:flex-row gap-4">
                      {question.answers.map((answer) => (
                        <label key={answer.id} className="inline-flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            checked={answers[question.id]?.includes(answer.text)}
                            onChange={() => handleAnswerChange(question.id, answer.text, false)}
                            className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                          />
                          <span className="mr-2 text-gray-700">{answer.text}</span>
                        </label>
                      ))}
                    </div>
                  ) : question.type === 0 || question.type === 2 ? (
                    <div className="space-y-3">
                      {question.answers.map((answer) => (
                        <label key={answer.id} className="flex items-center space-x-3 space-x-reverse cursor-pointer p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <input
                            type={question.type === 2 ? "checkbox" : "radio"}
                            name={`question-${question.id}`}
                            checked={answers[question.id]?.includes(answer.text)}
                            onChange={() => handleAnswerChange(question.id, answer.text, question.type === 2)}
                            className={`h-5 w-5 text-indigo-600 focus:ring-indigo-500 ${
                              question.type === 2 ? 'rounded' : 'rounded-full'
                            }`}
                          />
                          <span className="text-gray-700">{answer.text}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <textarea
                      value={answers[question.id]?.[0] || ""}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value, false)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      rows={3}
                      placeholder="اكتب إجابتك هنا..."
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  onClick={() => window.confirm("هل أنت متأكد أنك تريد تسليم الاختبار الآن؟") && handleSubmitExam()}
                  disabled={submitting}
                  className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      جاري التسليم...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      تسليم الاختبار
                    </>
                  )}
                </button>
                <div className="text-sm text-gray-500">
                  سيتم تسليم الاختبار تلقائياً عند انتهاء الوقت
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}