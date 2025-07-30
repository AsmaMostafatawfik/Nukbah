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
          title: "Exam",
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
        // Check if exam was already started
        if (result.message && (result.message.includes("already") || result.message.includes("بدأت"))) {
          setStartExamMessage("لقد بدأت هذا الامتحان بالفعل");
          toast.success("لقد بدأت هذا الامتحان بالفعل");
          setExamStarted(true);
        } else {
          throw new Error(result.message || "Failed to start exam");
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
      
      // Prepare the submission data according to the backend API
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

  if (!exam) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        الاختبار غير موجود
      </div>
    );
  }

  if (!examStarted) {
    return (
      <div className="container mx-auto px-4 py-8" dir="rtl">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">{exam.title}</h1>
          <div className="mb-6">
            <p className="text-gray-600">اضغط على زر بدء الاختبار للبدء</p>
            <p className="text-sm text-gray-500 mt-2">مدة الاختبار: {exam.durationMinutes} دقيقة</p>
          </div>
          
          {startExamMessage && (
            <div className={`mb-4 p-3 rounded-lg ${
              examStarted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {startExamMessage}
            </div>
          )}
          
          <button
            onClick={startExam}
            disabled={startingExam}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {startingExam ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                جاري التحقق...
              </span>
            ) : (
              "بدء الاختبار"
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{exam.title}</h1>
          <div className={`px-4 py-2 rounded-lg font-medium ${
            remainingTime > 300 ? 'bg-green-100 text-green-800' : 
            remainingTime > 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
          }`}>
            الوقت المتبقي: {formatTime(remainingTime)}
          </div>
        </div>

        <div className="space-y-8">
          {exam.questions.map((question, index) => (
            <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-start mb-4">
                <span className="bg-indigo-100 text-indigo-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{question.text}</h3>
                  <span className="text-sm text-gray-500">{getQuestionTypeName(question.type)}</span>
                </div>
              </div>

              {question.type === 1 ? (
                <div className="flex space-x-4 space-x-reverse">
                  {question.answers.map((answer) => (
                    <label key={answer.id} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        checked={answers[question.id]?.includes(answer.text)}
                        onChange={() => handleAnswerChange(question.id, answer.text, false)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-gray-700">{answer.text}</span>
                    </label>
                  ))}
                </div>
              ) : question.type === 0 || question.type === 2 ? (
                <div className="space-y-2">
                  {question.answers.map((answer) => (
                    <label key={answer.id} className="flex items-center space-x-3 space-x-reverse">
                      <input
                        type={question.type === 2 ? "checkbox" : "radio"}
                        name={`question-${question.id}`}
                        checked={answers[question.id]?.includes(answer.text)}
                        onChange={() => handleAnswerChange(question.id, answer.text, question.type === 2)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
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

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmitExam}
            disabled={submitting}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {submitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                جاري التسليم...
              </span>
            ) : (
              "تسليم الاختبار"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}