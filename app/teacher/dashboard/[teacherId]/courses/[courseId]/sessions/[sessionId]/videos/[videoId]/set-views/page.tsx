"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function SetVideoViewsPage() {
  const params = useParams();
  const router = useRouter();
  const { teacherId, courseId,sessionId, videoId } = params;
  const [views, setViews] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSetViews = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
        "https://elearning1.runasp.net/api/Teacher/SetAllowedViews",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            videoId: Number(videoId),
            allowedViews: views
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to set views: ${response.status} ${errorData}`);
      }

      router.push(
        `/teacher/dashboard/${teacherId}/courses/${courseId}/sessions`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to set views");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow" dir="rtl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">تحديد عدد المشاهدات المسموح بها</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          عدد المشاهدات المسموح بها
        </label>
        <input
          type="number"
          value={views}
          onChange={(e) => setViews(Number(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          min="0"
          required
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => router.push(`/teacher/dashboard/${teacherId}/courses/${courseId}/sessions`)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          إلغاء
        </button>
        <button
          onClick={handleSetViews}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          {loading ? "جاري الحفظ..." : "حفظ"}
        </button>
      </div>
    </div>
  );
}