"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";

export default function AddVideoPage() {
  const params = useParams();
  const router = useRouter();
  const { teacherId, courseId, sessionId } = params;
  
  const [newVideo, setNewVideo] = useState({
    title: "",
    url: "",
    type: 0, // Default to 0 (Intro)
    duration: 0,
  });
  const [durationInput, setDurationInput] = useState("00:00:00");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const videoTypes = [
    { id: 0, name: "مقدمة للكورس" },          // Intro
    { id: 1, name: "المحاضرات الأساسية" },    // Main Lectures
    { id: 2, name: "شرح عملي" },              // Practical Explanation
    { id: 3, name: "حل التمارين" },           // Exercises Solution
    { id: 4, name: "ملخص الدرس" },            // Lesson Summary
    { id: 5, name: "إعلانات وإرشادات" },      // Announcements
    { id: 6, name: "محتوى إضافي" },           // Additional Content
    { id: 7, name: "مراجعة نهائية" },         // Final Review
    { id: 8, name: "إرشادات الاختبار" },      // Exam Guidance
    { id: 9, name: "أخرى" }                   // Other
  ];

  const validateForm = () => {
    if (!newVideo.title.trim()) {
      setError("عنوان الفيديو مطلوب");
      return false;
    }
    if (!newVideo.url.trim()) {
      setError("رابط الفيديو مطلوب");
      return false;
    }
    if (!newVideo.url.match(/^https?:\/\/.+/)) {
      setError("الرجاء إدخال رابط صحيح يبدأ بـ http:// أو https://");
      return false;
    }
    if (newVideo.duration <= 0) {
      setError("المدة يجب أن تكون أكبر من الصفر");
      return false;
    }
    return true;
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^0-9:]/g, '');
    if (value.length > 8) value = value.substring(0, 8);
    if (value.length > 2 && value[2] !== ':') {
      value = value.substring(0, 2) + ':' + value.substring(2);
    }
    if (value.length > 5 && value[5] !== ':') {
      value = value.substring(0, 5) + ':' + value.substring(5);
    }
    setDurationInput(value);
    
    if (value.match(/^\d{0,2}:?\d{0,2}:?\d{0,2}$/)) {
      const [h = '0', m = '0', s = '0'] = value.split(':');
      const hours = parseInt(h) || 0;
      const minutes = parseInt(m) || 0;
      const seconds = parseInt(s) || 0;
      const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
      
      setNewVideo(prev => ({
        ...prev,
        duration: totalSeconds
      }));
      setError(null);
    }
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const numericSessionId = Number(sessionId);
      if (isNaN(numericSessionId)) {
        throw new Error("Invalid session ID");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/AddVideoToSession/${numericSessionId}`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newVideo.title,
            url: newVideo.url,
            type: newVideo.type,
            duration: newVideo.duration
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to add video");
      }

      setSuccess("تمت إضافة الفيديو بنجاح!");
      setNewVideo({
        title: "",
        url: "",
        type: 0,
        duration: 0,
      });
      setDurationInput("00:00:00");
      
      setTimeout(() => {
        router.push(`/teacher/dashboard/${teacherId}/courses/${courseId}/sessions/`);
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ أثناء إضافة الفيديو");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8" dir="rtl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">إضافة فيديو جديد</h1>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <XCircle className="text-red-500" size={20} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <CheckCircle className="text-green-500" size={20} />
          <span>{success}</span>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleAddVideo} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">عنوان الفيديو *</label>
            <input
              type="text"
              value={newVideo.title}
              onChange={(e) => {
                setNewVideo({...newVideo, title: e.target.value});
                setError(null);
              }}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">رابط الفيديو *</label>
            <input
              type="url"
              value={newVideo.url}
              onChange={(e) => {
                setNewVideo({...newVideo, url: e.target.value});
                setError(null);
              }}
              className="w-full p-2 border rounded"
              placeholder="https://example.com/video.mp4"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">نوع الفيديو *</label>
              <select
                value={newVideo.type}
                onChange={(e) => {
                  setNewVideo({...newVideo, type: parseInt(e.target.value)});
                  setError(null);
                }}
                className="w-full p-2 border rounded"
                required
              >
                {videoTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium">المدة (س:د:ث) *</label>
              <input
                type="text"
                value={durationInput}
                onChange={handleDurationChange}
                className="w-full p-2 border rounded"
                placeholder="00:00:00"
                required
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 text-white rounded flex items-center gap-2 ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">↻</span>
                  <span>جاري الحفظ...</span>
                </>
              ) : (
                "حفظ"
              )}
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => router.push(`/teacher/dashboard/${teacherId}/courses/${courseId}/sessions/${sessionId}`)}
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}