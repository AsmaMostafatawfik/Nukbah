// app/teacher/dashboard/[teacherId]/courses/[courseId]/sessions/add-session/page.tsx
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AddSessionPage() {
  const params = useParams();
  const router = useRouter();
  const { teacherId, courseId } = params;

  const [newSession, setNewSession] = useState({
    title: "",
    content: "",
    order: 1,
    isPublished: false,
   publishDate: "", // Will be manually filled
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false); // optional spinner

  const handleAddSession = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication required");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/AddSession/${courseId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newSession.title,
            content: newSession.content,
            order: newSession.order,
            isPublished: newSession.isPublished,
            published: newSession.publishDate || null, // Optional or nullable
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to add session");

      router.push(
        `/teacher/dashboard/${teacherId}/courses/${courseId}/sessions`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add session");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8" dir="rtl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">إضافة جلسة جديدة</h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleAddSession} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">عنوان الجلسة *</label>
            <input
              type="text"
              value={newSession.title}
              onChange={(e) =>
                setNewSession({ ...newSession, title: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">المحتوى *</label>
            <textarea
              value={newSession.content}
              onChange={(e) =>
                setNewSession({ ...newSession, content: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">الترتيب *</label>
            <input
              type="number"
              min="1"
              value={newSession.order}
              onChange={(e) =>
                setNewSession({
                  ...newSession,
                  order: parseInt(e.target.value, 10),
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newSession.isPublished}
              onChange={(e) =>
                setNewSession({
                  ...newSession,
                  isPublished: e.target.checked,
                })
              }
              id="isPublished"
              className="accent-blue-600"
            />
            <label htmlFor="isPublished" className="font-medium">
              نشر الجلسة؟
            </label>
          </div>

          <div>
            <label className="block mb-2 font-medium">تاريخ النشر</label>
            <input
              type="datetime-local"
              value={newSession.publishDate}
              onChange={(e) =>
                setNewSession({ ...newSession, publishDate: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="yyyy-mm-ddThh:mm"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 text-white rounded ${
                isSubmitting ? "bg-gray-400" : "bg-blue-600"
              }`}
            >
              {isSubmitting ? "جاري الحفظ..." : "حفظ"}
            </button>

            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={() =>
                router.push(
                  `/teacher/dashboard/${teacherId}/courses/${courseId}/sessions`
                )
              }
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
