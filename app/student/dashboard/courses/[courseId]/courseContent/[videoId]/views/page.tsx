"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import React from "react";

interface Video {
  id: number;
  title: string;
  videoUrl: string;
  viewsCount?: number; // Added optional viewsCount
}

interface Session {
  id: number;
  title: string;
  videos: Video[];
}

interface CourseContent {
  courseTitle: string;
  sessions: Session[];
  exams: any[];
}

export default function IncreaseViewsPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;
  const videoId = params.videoId as string;
  
  const [content, setContent] = useState<CourseContent | null>(null);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewsIncreased, setViewsIncreased] = useState(false);
  const [isIncreasing, setIsIncreasing] = useState(false);
  const [reason, setReason] = useState("");

  useEffect(() => {
    const fetchCourseContent = async () => {
      try {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        
        if (!token || !userData) {
          throw new Error("Authentication required");
        }

        const user = JSON.parse(userData);
        const response = await fetch(
          `https://elearning1.runasp.net/api/Student/StudentCourseContent/${user.id}/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch course content");
        }

        const data: CourseContent = await response.json();
        setContent(data);
        
        // Find the video with matching ID
        let foundVideo: Video | null = null;
        for (const session of data.sessions) {
          const video = session.videos.find(v => v.id.toString() === videoId);
          if (video) {
            foundVideo = video;
            break;
          }
        }
        
        if (!foundVideo) {
          throw new Error("Video not found");
        }
        
        setCurrentVideo(foundVideo);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId && videoId) {
      fetchCourseContent();
    }
  }, [courseId, videoId]);

  const handleIncreaseViews = async () => {
    if (!reason.trim()) {
      setError("الرجاء إدخال سبب زيادة المشاهدات");
      return;
    }

    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (!token || !userData) {
      setError("Authentication required");
      return;
    }

    try {
      setIsIncreasing(true);
      setError(null);
      
      const user = JSON.parse(userData);
      const requestData = {
        studentId: user.id,
        videoId: videoId,
        reason: reason.trim()
      };

      const response = await fetch(
        "https://elearning1.runasp.net/api/Student/RequestForExtensionViews",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestData)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to increase views");
      }

      setViewsIncreased(true);
      
      // Optionally refresh video data if needed
      // You might need to implement a separate endpoint to get updated view count
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to increase views");
    } finally {
      setIsIncreasing(false);
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
          onClick={() => router.push(`/student/dashboard/courses/${courseId}/courseContent`)}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          العودة إلى محتوى المقرر
        </button>
      </div>
    );
  }

  if (!currentVideo) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        بيانات الفيديو غير متوفرة
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <button 
        onClick={() => router.back()}
        className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        العودة
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">زيادة مشاهدات الفيديو</h1>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">{currentVideo.title}</h2>
            <p className="text-sm text-gray-600">
              عدد المشاهدات الحالي: {currentVideo.viewsCount || "غير متوفر"}
            </p>
          </div>

          {viewsIncreased ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg">
              <p>تم إرسال طلب زيادة المشاهدات بنجاح!</p>
              <button
                onClick={() => router.push(`/student/dashboard/courses/${courseId}/courseContent`)}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                العودة إلى محتوى المقرر
              </button>
            </div>
          ) : (
            <>
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                  سبب طلب زيادة المشاهدات
                </label>
                <textarea
                  id="reason"
                  rows={4}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full p-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                  placeholder="أدخل سبباً واضحاً لطلب زيادة المشاهدات..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => router.push(`/student/dashboard/courses/${courseId}/courseContent`)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleIncreaseViews}
                  disabled={isIncreasing}
                  className="px-5 py-2 text-sm rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                >
                  {isIncreasing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.3 0 0 5.3 0 12h4z"></path>
                      </svg>
                      جارٍ المعالجة...
                    </span>
                  ) : (
                    "طلب زيادة المشاهدات"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}