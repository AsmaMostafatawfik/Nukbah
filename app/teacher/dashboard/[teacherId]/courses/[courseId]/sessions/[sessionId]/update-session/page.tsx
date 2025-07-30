"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function UpdateSessionPage() {
  const router = useRouter();
  const { teacherId, courseId, sessionId } = useParams() as {
    teacherId: string;
    courseId: string;
    sessionId: string;
  };

  const [session, setSession] = useState({
    title: "",
    content: "",
    order: 0,
    publishDate: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication required");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/AllSessions/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch sessions");

        const data = await response.json();
        console.log("Fetched sessions:", data);
        console.log("Looking for sessionId:", sessionId);

        // Ensure both sides are strings for accurate comparison
        const targetSession = data.find((s: any) => String(s.id) === String(sessionId));

        if (!targetSession) {
          console.error("Available session IDs:", data.map((s: any) => s.id));
          throw new Error("Session not found");
        }

        setSession({
          title: targetSession.title || "",
          content: targetSession.content || "",
          order: targetSession.order || 0,
          publishDate: targetSession.published
            ? targetSession.published.substring(0, 16)
            : "",
        });
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [courseId, sessionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication required");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/UpdateSession/${sessionId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(session),
        }
      );

      if (!response.ok) throw new Error("Failed to update session");

      router.push(`/teacher/dashboard/${teacherId}/courses/${courseId}/sessions`);
    } catch (err) {
      console.error("Error updating session:", err);
    }
  };

  if (loading) {
    return <div className="p-4 text-center text-gray-500">جاري تحميل بيانات الجلسة...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">تعديل الجلسة</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">عنوان الجلسة</label>
          <input
            type="text"
            value={session.title}
            onChange={(e) => setSession({ ...session, title: e.target.value })}
            placeholder="مثال: مقدمة الدورة"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">محتوى الجلسة</label>
          <textarea
            value={session.content}
            onChange={(e) => setSession({ ...session, content: e.target.value })}
            placeholder="اكتب وصف الجلسة هنا..."
            className="w-full border border-gray-300 p-2 rounded min-h-[100px]"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">الترتيب</label>
          <input
            type="number"
            value={session.order}
            onChange={(e) =>
              setSession({ ...session, order: parseInt(e.target.value) || 0 })
            }
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">تاريخ ووقت النشر</label>
          <input
            type="datetime-local"
            value={session.publishDate}
            onChange={(e) => setSession({ ...session, publishDate: e.target.value })}
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
