// "use client";
// import { useState, useEffect } from "react";
// import { PlusCircle, ChevronLeft, Trash2 } from "lucide-react";
// import { useParams, useRouter } from "next/navigation";

// interface Answer {
//   id: number;
//   text: string;
//   isCorrect: boolean;
//   questionId: number;
// }

// interface Question {
//   id: number;
//   text: string;
//   type: number; // 0: MCQ, 1: True/False, 2: Multiple Choice
//   score: number;
// }

// export default function QuestionAnswersPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { teacherId, courseId, sessionId, examId, questionId } = params;
//   const [answers, setAnswers] = useState<Answer[]>([]);
//   const [question, setQuestion] = useState<Question | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [newAnswer, setNewAnswer] = useState({
//     text: "",
//     isCorrect: false
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("Authentication required");
//         }

//         // Fetch question details
//         const questionResponse = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/Questions/${examId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!questionResponse.ok) {
//           throw new Error(`Failed to fetch question: ${questionResponse.status}`);
//         }

//         const questionsData = await questionResponse.json();
//         const currentQuestion = Array.isArray(questionsData) 
//           ? questionsData.find(q => q.id === parseInt(questionId as string))
//           : null;
        
//         setQuestion(currentQuestion);

//         // Fetch answers
//         const answersResponse = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/Answers/${questionId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!answersResponse.ok) {
//           throw new Error(`Failed to fetch answers: ${answersResponse.status}`);
//         }

//         const answersData = await answersResponse.json();
//         // Ensure all answers have an id, or generate a temporary one
//         const validatedAnswers = Array.isArray(answersData) 
//           ? answersData.map((answer, index) => ({
//               ...answer,
//               id: answer.id || index + 1 // Use existing id or generate temporary one
//             }))
//           : [];
//         setAnswers(validatedAnswers);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An unknown error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [questionId, examId]);

//   const handleAddAnswer = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("Authentication required");
//       }

//       // Validate based on question type
//       if (question?.type === 1 && answers.length >= 2) {
//         throw new Error("True/False questions can only have two answers");
//       }

//       if (question?.type === 0 && newAnswer.isCorrect) {
//         // For MCQ, ensure no other correct answers exist
//         const hasCorrectAnswer = answers.some(answer => answer.isCorrect);
//         if (hasCorrectAnswer) {
//           throw new Error("MCQ can only have one correct answer");
//         }
//       }

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/AddAnswer/${questionId}`,
//         {
//           method: "POST",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             text: newAnswer.text,
//             isCorrect: newAnswer.isCorrect
//           })
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.text();
//         throw new Error(`Failed to add answer: ${response.status} ${errorData}`);
//       }

//       const data = await response.json();
//       // Ensure the new answer has an id
//       const answerWithId = {
//         ...data,
//         id: data.id || answers.length + 1 // Use server id or generate temporary one
//       };
//       setAnswers([...answers, answerWithId]);
//       setNewAnswer({
//         text: "",
//         isCorrect: false
//       });
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to add answer");
//     }
//   };

//   const handleDeleteAnswer = async (answerId: number) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("Authentication required");
//       }

//       // Prevent deletion if it's a True/False question and we'd have less than 2 answers
//       if (question?.type === 1 && answers.length <= 2) {
//         throw new Error("True/False questions must have exactly two answers");
//       }

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/DeleteAnswer/${answerId}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to delete answer: ${response.status}`);
//       }

//       setAnswers(answers.filter(answer => answer.id !== answerId));
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to delete answer");
//     }
//   };

//   const navigateBack = () => {
//     router.push(
//       `/teacher/dashboard/${teacherId}/courses/${courseId}/sessions/${sessionId}/exams/${examId}/questions`
//     );
//   };

//   const getQuestionTypeName = (type: number) => {
//     const types = ["اختيار من متعدد", "صح أو خطأ", "اختيار متعدد الإجابات"];
//     return types[type] || "غير محدد";
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
//       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//         {error}
//       </div>
//     );
//   }

//   if (!question) {
//     return <div className="text-center py-8">السؤال غير موجود</div>;
//   }

//   return (
//     <div className="space-y-8" dir="rtl">
//       <div className="flex justify-between items-center">
//         <button
//           onClick={navigateBack}
//           className="flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg border"
//         >
//           <ChevronLeft size={18} />
//           العودة إلى الأسئلة
//         </button>
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">إدارة الإجابات</h1>
//           <p className="text-gray-600">نوع السؤال: {getQuestionTypeName(question.type)}</p>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow">
//         <h2 className="text-xl font-bold mb-4">إضافة إجابة جديدة</h2>
//         <form onSubmit={handleAddAnswer} className="space-y-4">
//           <div>
//             <label className="block mb-2 font-medium">نص الإجابة</label>
//             <textarea
//               value={newAnswer.text}
//               onChange={(e) => setNewAnswer({...newAnswer, text: e.target.value})}
//               className="w-full p-2 border rounded"
//               rows={3}
//               required
//             />
//           </div>
//           {question.type !== 1 && (
//             <div className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 id="isCorrect"
//                 checked={newAnswer.isCorrect}
//                 onChange={(e) => setNewAnswer({...newAnswer, isCorrect: e.target.checked})}
//                 className="w-4 h-4"
//                 disabled={question.type === 0 && answers.some(a => a.isCorrect)}
//               />
//               <label htmlFor="isCorrect" className="font-medium">
//                 إجابة صحيحة
//                 {question.type === 0 && answers.some(a => a.isCorrect) && (
//                   <span className="text-sm text-gray-500 mr-2"> (يوجد إجابة صحيحة بالفعل)</span>
//                 )}
//               </label>
//             </div>
//           )}
//           <button
//             type="submit"
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded"
//             disabled={question.type === 1 && answers.length >= 2}
//           >
//             <PlusCircle size={18} />
//             إضافة الإجابة
//             {question.type === 1 && answers.length >= 2 && (
//               <span className="text-sm mr-2"> (يوجد إجابتان بالفعل)</span>
//             )}
//           </button>
//         </form>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow">
//         <div className="mb-4">
//           <h2 className="text-xl font-bold">إجمالي الإجابات: {answers.length}</h2>
//         </div>
        
//         {answers.length === 0 ? (
//           <div className="text-center py-8 text-gray-500">
//             لا توجد إجابات متاحة
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {answers.map((answer) => (
//               <div 
//                 key={`answer-${answer.id || Math.random()}`} // Fallback to random if id is missing
//                 className={`border p-4 rounded-lg flex justify-between items-center ${
//                   answer.isCorrect ? "bg-green-50 border-green-200" : "bg-white"
//                 }`}
//               >
//                 <div className="flex items-start gap-3">
//                   <div className={`mt-1 w-4 h-4 rounded-full ${answer.isCorrect ? "bg-green-500" : "bg-gray-300"}`}></div>
//                   <div>
//                     <p className="text-lg">{answer.text}</p>
//                     <p className="text-sm text-gray-600">
//                       {answer.isCorrect ? "إجابة صحيحة" : "إجابة خاطئة"}
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => handleDeleteAnswer(answer.id)}
//                   className="p-2 text-red-600 hover:bg-red-50 rounded"
//                   title="حذف الإجابة"
//                   disabled={question.type === 1 && answers.length <= 2}
//                 >
//                   <Trash2 size={18} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }









"use client";
import { useState, useEffect } from "react";
import { PlusCircle, ChevronLeft, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
  questionId: number;
}

interface Question {
  id: number;
  text: string;
  type: number; // 0: MCQ, 1: True/False, 2: Multiple Choice
  score: number;
}

export default function QuestionAnswersPage() {
  const params = useParams();
  const router = useRouter();
  const { teacherId, courseId, sessionId, examId, questionId } = params;
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newAnswer, setNewAnswer] = useState({
    text: "",
    isCorrect: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required");
        }

        // Fetch question details
        const questionResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/Questions/${examId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!questionResponse.ok) {
          throw new Error(`Failed to fetch question: ${questionResponse.status}`);
        }

        const questionsData = await questionResponse.json();
        const currentQuestion = Array.isArray(questionsData) 
          ? questionsData.find(q => q.id === parseInt(questionId as string))
          : null;
        
        setQuestion(currentQuestion);

        // Fetch answers
        const answersResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/Answers/${questionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!answersResponse.ok) {
          throw new Error(`Failed to fetch answers: ${answersResponse.status}`);
        }

        const answersData = await answersResponse.json();
        const validatedAnswers = Array.isArray(answersData) 
          ? answersData.map((answer, index) => ({
              ...answer,
              id: answer.id || index + 1
            }))
          : [];
        setAnswers(validatedAnswers);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [questionId, examId]);

  const handleAddAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      if (question?.type === 1 && answers.length >= 2) {
        throw new Error("True/False questions can only have two answers");
      }

      if (question?.type === 0 && newAnswer.isCorrect) {
        const hasCorrectAnswer = answers.some(answer => answer.isCorrect);
        if (hasCorrectAnswer) {
          throw new Error("MCQ can only have one correct answer");
        }
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/AddAnswer/${questionId}`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: newAnswer.text,
            isCorrect: newAnswer.isCorrect
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to add answer: ${response.status} ${errorData}`);
      }

      const data = await response.json();
      const answerWithId = {
        ...data,
        id: data.id || answers.length + 1
      };
      setAnswers([...answers, answerWithId]);
      setNewAnswer({
        text: "",
        isCorrect: false
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add answer");
    }
  };

  const handleDeleteAnswer = async (answerId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      if (question?.type === 1 && answers.length <= 2) {
        throw new Error("True/False questions must have exactly two answers");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/DeleteAnswer/${answerId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete answer: ${response.status}`);
      }

      setAnswers(answers.filter(answer => answer.id !== answerId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete answer");
    }
  };

  const navigateBack = () => {
    router.push(
      `/teacher/dashboard/${teacherId}/courses/${courseId}/sessions/${sessionId}/exams/${examId}/questions`
    );
  };

  const getQuestionTypeName = (type: number) => {
    const types = ["اختيار من متعدد", "صح أو خطأ", "اختيار متعدد الإجابات"];
    return types[type] || "غير محدد";
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
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mx-4">
        {error}
      </div>
    );
  }

  if (!question) {
    return <div className="text-center py-8">السؤال غير موجود</div>;
  }

  return (
    <div className="space-y-8 p-4 md:p-8" dir="rtl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <button
          onClick={navigateBack}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg border w-full md:w-auto justify-center"
        >
          <ChevronLeft size={18} />
          <span>العودة إلى الأسئلة</span>
        </button>
        <div className="text-center md:text-right">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">إدارة الإجابات</h1>
          <p className="text-gray-600">نوع السؤال: {getQuestionTypeName(question.type)}</p>
        </div>
      </div>

      {/* Add Answer Form */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">إضافة إجابة جديدة</h2>
        <form onSubmit={handleAddAnswer} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">نص الإجابة</label>
            <textarea
              value={newAnswer.text}
              onChange={(e) => setNewAnswer({...newAnswer, text: e.target.value})}
              className="w-full p-2 border rounded"
              rows={3}
              required
            />
          </div>
          {question.type !== 1 && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isCorrect"
                checked={newAnswer.isCorrect}
                onChange={(e) => setNewAnswer({...newAnswer, isCorrect: e.target.checked})}
                className="w-4 h-4"
                disabled={question.type === 0 && answers.some(a => a.isCorrect)}
              />
              <label htmlFor="isCorrect" className="font-medium">
                إجابة صحيحة
                {question.type === 0 && answers.some(a => a.isCorrect) && (
                  <span className="text-sm text-gray-500 mr-2"> (يوجد إجابة صحيحة بالفعل)</span>
                )}
              </label>
            </div>
          )}
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded w-full md:w-auto justify-center"
            disabled={question.type === 1 && answers.length >= 2}
          >
            <PlusCircle size={18} />
            <span>
              إضافة الإجابة
              {question.type === 1 && answers.length >= 2 && (
                <span className="text-sm mr-2"> (يوجد إجابتان بالفعل)</span>
              )}
            </span>
          </button>
        </form>
      </div>

      {/* Answers List */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow">
        <div className="mb-4">
          <h2 className="text-xl font-bold">إجمالي الإجابات: {answers.length}</h2>
        </div>
        
        {answers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            لا توجد إجابات متاحة
          </div>
        ) : (
          <div className="space-y-3">
            {answers.map((answer) => (
              <div 
                key={`answer-${answer.id || Math.random()}`}
                className={`border p-3 md:p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-3 ${
                  answer.isCorrect ? "bg-green-50 border-green-200" : "bg-white"
                }`}
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className={`mt-1 w-4 h-4 rounded-full flex-shrink-0 ${
                    answer.isCorrect ? "bg-green-500" : "bg-gray-300"
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-lg break-words">{answer.text}</p>
                    <p className="text-sm text-gray-600">
                      {answer.isCorrect ? "إجابة صحيحة" : "إجابة خاطئة"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteAnswer(answer.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded self-end md:self-auto"
                  title="حذف الإجابة"
                  disabled={question.type === 1 && answers.length <= 2}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}