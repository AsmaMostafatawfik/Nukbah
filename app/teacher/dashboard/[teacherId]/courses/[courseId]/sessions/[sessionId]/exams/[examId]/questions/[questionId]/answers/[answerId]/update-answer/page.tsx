'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const arabicTranslations = {
  pageTitle: "تعديل الإجابة",
  answerText: "نص الإجابة",
  isCorrect: "الإجابة الصحيحة",
  saveChanges: "حفظ التعديلات",
  cancel: "إلغاء",
  loading: "جاري تحميل بيانات الإجابة...",
  correctAnswer: "إجابة صحيحة",
  incorrectAnswer: "إجابة خاطئة",
};

export default function UpdateAnswerPage() {
  const router = useRouter();
  const { teacherId, courseId, sessionId, examId, questionId, answerId } = useParams() as {
    teacherId: string;
    courseId: string;
    sessionId: string;
    examId: string;
    questionId: string;
    answerId: string;
  };

  const [answer, setAnswer] = useState({
    text: "",
    isCorrect: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication required");

        // Fetch all answers for the question
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/Answers/${questionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch answers");

        const data = await response.json();
        console.log("Fetched answers:", data);
        console.log("Looking for answerId:", answerId);

        // Find the specific answer
        const targetAnswer = data.find((a: any) => String(a.id) === String(answerId));

        if (!targetAnswer) {
          console.error("Available answer IDs:", data.map((a: any) => a.id));
          throw new Error("Answer not found");
        }

        setAnswer({
          text: targetAnswer.text || "",
          isCorrect: targetAnswer.isCorrect || false,
        });
      } catch (error) {
        console.error("Error fetching answer:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnswer();
  }, [questionId, answerId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication required");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/UpdateAnswer/${answerId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: answer.text,
            isCorrect: answer.isCorrect,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update answer");

      // Redirect back to questions list
      router.push(
        `/teacher/dashboard/${teacherId}/courses/${courseId}/sessions/${sessionId}/exams/${examId}/questions`
      );
    } catch (err) {
      console.error("Error updating answer:", err);
    }
  };

  if (loading) {
    return <div className="p-4 text-center text-gray-500">{arabicTranslations.loading}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8" dir="rtl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        {arabicTranslations.pageTitle}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">
            {arabicTranslations.answerText}
          </label>
          <textarea
            value={answer.text}
            onChange={(e) => setAnswer({ ...answer, text: e.target.value })}
            placeholder="أدخل نص الإجابة هنا..."
            className="w-full border border-gray-300 p-2 rounded min-h-[100px]"
            required
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="block font-medium">
            {arabicTranslations.isCorrect}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="correct"
              name="isCorrect"
              checked={answer.isCorrect === true}
              onChange={() => setAnswer({ ...answer, isCorrect: true })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="correct" className="text-green-600">
              {arabicTranslations.correctAnswer}
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="incorrect"
              name="isCorrect"
              checked={answer.isCorrect === false}
              onChange={() => setAnswer({ ...answer, isCorrect: false })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="incorrect" className="text-red-600">
              {arabicTranslations.incorrectAnswer}
            </label>
          </div>
        </div>

        <div className="flex justify-between gap-4 pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            {arabicTranslations.saveChanges}
          </button>
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 w-full"
            onClick={() =>
              router.push(
                `/teacher/dashboard/${teacherId}/courses/${courseId}/sessions/${sessionId}/exams/${examId}/questions`
              )
            }
          >
            {arabicTranslations.cancel}
          </button>
        </div>
      </form>
    </div>
  );
}