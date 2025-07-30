// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useParams } from "next/navigation";
// import { toast } from "react-hot-toast";

// interface Answer {
//   id: number;
//   text: string;
// }

// interface Question {
//   id: number;
//   text: string;
//   type: number; // 0: MCQs, 1: True/False, 2: Multiple Choice
//   answers: Answer[];
// }

// interface Exam {
//   id: number;
//   title: string;
//   durationMinutes: number;
//   questions: Question[];
// }

// export default function ExamPage() {
//   const router = useRouter();
//   const params = useParams();
//   const { courseId, examId } = params;
//   const [exam, setExam] = useState<Exam | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [answers, setAnswers] = useState<Record<number, string[]>>({});
//   const [remainingTime, setRemainingTime] = useState(0);
//   const [submitting, setSubmitting] = useState(false);
//   const [examStarted, setExamStarted] = useState(false);
//   const [startingExam, setStartingExam] = useState(false);

//   useEffect(() => {
//     const fetchExam = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const userData = localStorage.getItem("user");
        
//         if (!token || !userData) {
//           throw new Error("Authentication required");
//         }

//         const user = JSON.parse(userData);
        
//         // Fetch exam questions
//         const response = await fetch(
//           `https://elearning1.runasp.net/api/Student/GetExamQuestions/${examId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch exam questions");
//         }

//         const questions: Question[] = await response.json();
        
//         // Create exam object with the questions
//         const examData: Exam = {
//           id: Number(examId),
//           title: "Exam", // You might want to fetch this separately
//           durationMinutes: 60, // Default duration, adjust as needed
//           questions: questions
//         };
        
//         setExam(examData);
//         setRemainingTime(examData.durationMinutes * 60); // Convert to seconds

//         // Initialize empty answers
//         const initialAnswers: Record<number, string[]> = {};
//         examData.questions.forEach(question => {
//           initialAnswers[question.id] = [];
//         });
//         setAnswers(initialAnswers);

//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An unknown error occurred");
//         console.error("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExam();
//   }, [examId]);

//   useEffect(() => {
//     if (!examStarted || remainingTime <= 0) return;

//     const timer = setInterval(() => {
//       setRemainingTime(prev => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleSubmitExam(); // Auto-submit when time runs out
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [remainingTime, examStarted]);

//   const handleAnswerChange = (questionId: number, answer: string, isMultiple: boolean) => {
//     setAnswers(prev => {
//       const currentAnswers = prev[questionId] || [];
//       let newAnswers;
      
//       if (isMultiple) {
//         // For multiple choice, toggle the answer
//         newAnswers = currentAnswers.includes(answer)
//           ? currentAnswers.filter(a => a !== answer)
//           : [...currentAnswers, answer];
//       } else {
//         // For single choice, replace the answer
//         newAnswers = [answer];
//       }
      
//       return {
//         ...prev,
//         [questionId]: newAnswers
//       };
//     });
//   };

//   const startExam = async () => {
//     try {
//       setStartingExam(true);
//       const token = localStorage.getItem("token");
//       const userData = localStorage.getItem("user");
      
//       if (!token || !userData) {
//         throw new Error("Authentication required");
//       }

//       const user = JSON.parse(userData);
      
//       const response = await fetch(
//         "https://elearning1.runasp.net/api/Student/StartExam",
//         {
//           method: "POST",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             examId: Number(examId),
//             studentId: user.id
//           })
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to start exam");
//       }

//       setExamStarted(true);
//     } catch (err) {
//       console.error("Error starting exam:", err);
//       toast.error(err instanceof Error ? err.message : "حدث خطأ أثناء بدء الاختبار");
//     } finally {
//       setStartingExam(false);
//     }
//   };

//   const handleSubmitExam = async () => {
//     try {
//       setSubmitting(true);
//       const token = localStorage.getItem("token");
//       const userData = localStorage.getItem("user");
      
//       if (!token || !userData) {
//         throw new Error("Authentication required");
//       }

//       const user = JSON.parse(userData);
      
//       // Prepare answers for submission
//       const submissionAnswers = Object.entries(answers).map(([questionId, answerTexts]) => ({
//         questionId: Number(questionId),
//         answerText: answerTexts
//       }));

//       const response = await fetch(
//         "https://elearning1.runasp.net/api/Student/SubmitExam",
//         {
//           method: "POST",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             studentId: user.id,
//             examId: Number(examId),
//             answers: submissionAnswers
//           })
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to submit exam");
//       }

//       toast.success("تم تسليم الاختبار بنجاح");
//       router.push(`/student/dashboard/courses/${courseId}/courseContent/exams/${examId}/exam-degree`);
//     } catch (err) {
//       console.error("Error submitting exam:", err);
//       toast.error(err instanceof Error ? err.message : "حدث خطأ أثناء تسليم الاختبار");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   const getQuestionTypeName = (type: number) => {
//     switch(type) {
//       case 0: return "اختيار من متعدد";
//       case 1: return "صح أو خطأ";
//       case 2: return "اختيار متعدد";
//       default: return "سؤال";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {error}
//         </div>
//         <button 
//           onClick={() => router.push(`/student/dashboard/courses/${courseId}`)}
//           className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
//         >
//           العودة إلى المقرر
//         </button>
//       </div>
//     );
//   }

//   if (!exam) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         الاختبار غير موجود
//       </div>
//     );
//   }

//   if (!examStarted) {
//     return (
//       <div className="container mx-auto px-4 py-8" dir="rtl">
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
//           <h1 className="text-2xl font-bold text-gray-800 mb-6">{exam.title}</h1>
//           <button
//             onClick={startExam}
//             disabled={startingExam}
//             className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
//           >
//             {startingExam ? (
//               <span className="flex items-center justify-center">
//                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 جاري البدء...
//               </span>
//             ) : (
//               "بدء الاختبار"
//             )}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8" dir="rtl">
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">{exam.title}</h1>
//           <div className={`px-4 py-2 rounded-lg font-medium ${
//             remainingTime > 300 ? 'bg-green-100 text-green-800' : 
//             remainingTime > 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
//           }`}>
//             الوقت المتبقي: {formatTime(remainingTime)}
//           </div>
//         </div>

//         <div className="space-y-8">
//           {exam.questions.map((question, index) => (
//             <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
//               <div className="flex items-start mb-4">
//                 <span className="bg-indigo-100 text-indigo-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
//                   {index + 1}
//                 </span>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800">{question.text}</h3>
//                   <span className="text-sm text-gray-500">{getQuestionTypeName(question.type)}</span>
//                 </div>
//               </div>

//               {question.type === 1 ? ( // True/False
//                 <div className="flex space-x-4 space-x-reverse">
//                   {question.answers.map((answer) => (
//                     <label key={answer.id} className="flex items-center space-x-2">
//                       <input
//                         type="radio"
//                         name={`question-${question.id}`}
//                         checked={answers[question.id]?.includes(answer.text)}
//                         onChange={() => handleAnswerChange(question.id, answer.text, false)}
//                         className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
//                       />
//                       <span className="text-gray-700">{answer.text}</span>
//                     </label>
//                   ))}
//                 </div>
//               ) : question.type === 0 || question.type === 2 ? ( // MCQs or Multiple Choice
//                 <div className="space-y-2">
//                   {question.answers.map((answer) => (
//                     <label key={answer.id} className="flex items-center space-x-3 space-x-reverse">
//                       <input
//                         type={question.type === 2 ? "checkbox" : "radio"}
//                         name={`question-${question.id}`}
//                         checked={answers[question.id]?.includes(answer.text)}
//                         onChange={() => handleAnswerChange(question.id, answer.text, question.type === 2)}
//                         className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
//                       />
//                       <span className="text-gray-700">{answer.text}</span>
//                     </label>
//                   ))}
//                 </div>
//               ) : (
//                 <textarea
//                   value={answers[question.id]?.[0] || ""}
//                   onChange={(e) => handleAnswerChange(question.id, e.target.value, false)}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
//                   rows={3}
//                   placeholder="اكتب إجابتك هنا..."
//                 />
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="mt-8 flex justify-end">
//           <button
//             onClick={handleSubmitExam}
//             disabled={submitting}
//             className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
//           >
//             {submitting ? (
//               <span className="flex items-center">
//                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 جاري التسليم...
//               </span>
//             ) : (
//               "تسليم الاختبار"
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }













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

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        
        if (!token || !userData) {
          throw new Error("Authentication required");
        }

        const user = JSON.parse(userData);
        
        // Fetch exam questions
        const response = await fetch(
          `https://elearning1.runasp.net/api/Student/GetExamQuestions/${examId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch exam questions");
        }

        const questions: Question[] = await response.json();
        
        // Create exam object with the questions
        const examData: Exam = {
          id: Number(examId),
          title: "Exam", // You might want to fetch this separately
          durationMinutes: 60, // Default duration, adjust as needed
          questions: questions
        };
        
        setExam(examData);
        setRemainingTime(examData.durationMinutes * 60); // Convert to seconds

        // Initialize empty answers
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
          handleSubmitExam(); // Auto-submit when time runs out
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
        // For multiple choice, toggle the answer
        newAnswers = currentAnswers.includes(answer)
          ? currentAnswers.filter(a => a !== answer)
          : [...currentAnswers, answer];
      } else {
        // For single choice, replace the answer
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
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            examId: Number(examId),
            studentId: user.id
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to start exam");
      }

      setExamStarted(true);
    } catch (err) {
      console.error("Error starting exam:", err);
      toast.error(err instanceof Error ? err.message : "حدث خطأ أثناء بدء الاختبار");
    } finally {
      setStartingExam(false);
    }
  };

  const handleSubmitExam = async () => {
    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      
      if (!token || !userData) {
        throw new Error("Authentication required");
      }

      const user = JSON.parse(userData);
      
      // Prepare answers for submission according to API requirements
      const submissionAnswers = Object.entries(answers)
        .filter(([_, answerTexts]) => answerTexts.length > 0) // Only include answered questions
        .map(([questionId, answerTexts]) => ({
          questionId: Number(questionId),
          answerText: answerTexts.map(text => text.trim()) // Trim answers as API does comparison with trimmed values
        }));

      const response = await fetch(
        "https://elearning1.runasp.net/api/Student/SubmitExam",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            studentId: user.id,
            examId: Number(examId),
            answers: submissionAnswers
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
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
                جاري البدء...
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

              {question.type === 1 ? ( // True/False
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
              ) : question.type === 0 || question.type === 2 ? ( // MCQs or Multiple Choice
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