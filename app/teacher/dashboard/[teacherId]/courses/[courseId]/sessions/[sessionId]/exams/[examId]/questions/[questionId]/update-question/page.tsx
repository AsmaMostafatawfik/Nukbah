'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const arabicTranslations = {
  mcq: "اختيار من متعدد",
  trueFalse: "صح أو خطأ",
  multipleChoice: "اختيار متعدد الإجابات",
  pageTitle: "تعديل السؤال",
  questionText: "نص السؤال",
  questionType: "نوع السؤال",
  questionScore: "درجة السؤال",
  saveChanges: "حفظ التعديلات",
  cancel: "إلغاء",
  loading: "جاري تحميل بيانات السؤال...",
};

export default function UpdateQuestionPage() {
  const router = useRouter();
  const { teacherId, courseId, sessionId, examId, questionId } = useParams() as {
    teacherId: string;
    courseId: string;
    sessionId: string;
    examId: string;
    questionId: string;
  };

  const [question, setQuestion] = useState({
    text: "",
    type: 0,
    score: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication required");

        // Fetch all questions for the exam
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/Questions/${examId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch questions");

        const data = await response.json();
        console.log("Fetched questions:", data);
        console.log("Looking for questionId:", questionId);

        // Find the specific question
        const targetQuestion = data.find((q: any) => String(q.id) === String(questionId));

        if (!targetQuestion) {
          console.error("Available question IDs:", data.map((q: any) => q.id));
          throw new Error("Question not found");
        }

        setQuestion({
          text: targetQuestion.text || "",
          type: targetQuestion.type || 0,
          score: targetQuestion.score || 0,
        });
      } catch (error) {
        console.error("Error fetching question:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [examId, questionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication required");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/UpdateQuestion/${questionId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: question.text,
            type: question.type,
            score: question.score,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update question");

      // Redirect back to questions list
      router.push(
        `/teacher/dashboard/${teacherId}/courses/${courseId}/sessions/${sessionId}/exams/${examId}/questions`
      );
    } catch (err) {
      console.error("Error updating question:", err);
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
            {arabicTranslations.questionText}
          </label>
          <textarea
            value={question.text}
            onChange={(e) => setQuestion({ ...question, text: e.target.value })}
            placeholder="أدخل نص السؤال هنا..."
            className="w-full border border-gray-300 p-2 rounded min-h-[100px]"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            {arabicTranslations.questionType}
          </label>
          <select
            value={question.type}
            onChange={(e) => setQuestion({ ...question, type: parseInt(e.target.value) })}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value={0}>{arabicTranslations.mcq}</option>
            <option value={1}>{arabicTranslations.trueFalse}</option>
            <option value={2}>{arabicTranslations.multipleChoice}</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            {arabicTranslations.questionScore}
          </label>
          <input
            type="number"
            value={question.score}
            onChange={(e) =>
              setQuestion({ ...question, score: parseInt(e.target.value) || 0 })
            }
            min="0"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
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