'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function UpdateExamPage() {
  const router = useRouter();
  const { teacherId, courseId, sessionId, examId } = useParams() as {
    teacherId: string;
    courseId: string;
    sessionId: string;
    examId: string;
  };

  const [exam, setExam] = useState({
    title: "",
    type: 0,
    startTime: "",
    endTime: "",
    durationMinutes: 60,
    publishDate: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication required");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/AllExams/${sessionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch exams");

        const data = await response.json();
        console.log("Fetched exams:", data);
        console.log("Looking for examId:", examId);

        // Find the target exam
        const targetExam = data.find((e: any) => String(e.id) === String(examId));

        if (!targetExam) {
          console.error("Available exam IDs:", data.map((e: any) => e.id));
          throw new Error("Exam not found");
        }

        setExam({
          title: targetExam.title || "",
          type: targetExam.type || 0,
          startTime: targetExam.startTime ? targetExam.startTime.substring(0, 16) : "",
          endTime: targetExam.endTime ? targetExam.endTime.substring(0, 16) : "",
          durationMinutes: targetExam.durationMinutes || 60,
          publishDate: targetExam.publishDate 
            ? targetExam.publishDate.substring(0, 16) 
            : new Date().toISOString().slice(0, 16),
        });
      } catch (error) {
        console.error("Error fetching exam:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [sessionId, examId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication required");

      // Format dates for API
      const requestData = {
        title: exam.title,
        type: exam.type,
        startTime: exam.startTime ? `${exam.startTime}:00.000Z` : null,
        endTime: exam.endTime ? `${exam.endTime}:00.000Z` : null,
        durationMinutes: exam.durationMinutes,
        publishDate: exam.publishDate ? `${exam.publishDate}:00.000Z` : null,
      };

      console.log("Submitting exam data:", requestData);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/UpdateExam/${examId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) throw new Error("Failed to update exam");

      router.push(`/teacher/dashboard/${teacherId}/courses/${courseId}/sessions`);
    } catch (err) {
      console.error("Error updating exam:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExam(prev => ({
      ...prev,
      [name]: name === 'type' || name === 'durationMinutes' ? parseInt(value) : value,
    }));
  };

  if (loading) {
    return <div className="p-4 text-center text-gray-500">جاري تحميل بيانات الاختبار...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8" dir="rtl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">تعديل الاختبار</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">عنوان الاختبار</label>
          <input
            type="text"
            name="title"
            value={exam.title}
            onChange={handleChange}
            placeholder="أدخل عنوان الاختبار"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">نوع الاختبار</label>
          <select
            name="type"
            value={exam.type}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value={0}>اختبار قصير</option>
            <option value={1}>اختبار منتصف الفصل</option>
            <option value={2}>اختبار نهائي</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">وقت البدء</label>
          <input
            type="datetime-local"
            name="startTime"
            value={exam.startTime}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">وقت الانتهاء</label>
          <input
            type="datetime-local"
            name="endTime"
            value={exam.endTime}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">المدة (دقائق)</label>
          <input
            type="number"
            name="durationMinutes"
            value={exam.durationMinutes}
            onChange={handleChange}
            min="1"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">تاريخ ووقت النشر</label>
          <input
            type="datetime-local"
            name="publishDate"
            value={exam.publishDate}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div className="flex justify-between gap-4 pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            حفظ التعديلات
          </button>
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 w-full"
            onClick={() =>
              router.push(`/teacher/dashboard/${teacherId}/courses/${courseId}/sessions`)
            }
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
}