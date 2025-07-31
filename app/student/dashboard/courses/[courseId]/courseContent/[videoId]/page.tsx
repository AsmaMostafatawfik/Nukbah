
"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import React from "react";

interface Video {
  id: number;
  title: string;
  videoUrl: string;
  description?: string;
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

interface AllowedViews {
  videoId: number;
  videoTitle: string;
  allowedCount: number;
  viewedCount: number;
  remainingViews: number;
}

export default function VideoPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;
  const videoId = params.videoId as string;
  
  const [content, setContent] = useState<CourseContent | null>(null);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [allowedViews, setAllowedViews] = useState<AllowedViews | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        
        if (!token || !userData) {
          throw new Error("Authentication required");
        }

        const user = JSON.parse(userData);

        // Fetch course content
        const contentResponse = await fetch(
          `https://elearning1.runasp.net/api/Student/StudentCourseContent/${user.id}/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!contentResponse.ok) {
          throw new Error("Failed to fetch course content");
        }

        const data: CourseContent = await contentResponse.json();
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

        // Fetch allowed views
        const viewsResponse = await fetch(
          `https://elearning1.runasp.net/api/Student/AllowedViews/${user.id}/${videoId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!viewsResponse.ok) {
          throw new Error("Failed to fetch allowed views");
        }

        const viewsData: AllowedViews = await viewsResponse.json();
        setAllowedViews(viewsData);

      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId && videoId) {
      fetchData();
    }
  }, [courseId, videoId]);

  const getFullVideoUrl = (url: string) => {
    if (url.startsWith("http") || url.startsWith("//")) {
      return url;
    }
    return `https://elearning1.runasp.net${url.startsWith('/') ? url : `/${url}`}`;
  };

  const isYouTubeUrl = (url: string) => {
    return url.includes('youtu.be') || url.includes('youtube.com');
  };

  const preventDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("تنزيل الفيديو غير مسموح به");
  };

  const handlePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      // Here you would typically track the view with your API
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
          <button 
            onClick={() => router.push(`/student/dashboard/courses/${courseId}`)}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            العودة إلى محتوى المقرر
          </button>
        </div>
      </div>
    );
  }

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <h2 className="text-xl font-medium text-gray-800 mb-4">الفيديو غير موجود</h2>
          <button 
            onClick={() => router.push(`/student/dashboard/courses/${courseId}`)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            العودة إلى المقرر
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 py-6">
        {/* Header with Back Button */}
        <div className="mb-6">
          <button 
            onClick={() => router.push(`/student/dashboard/courses/${courseId}/courseContent`)}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span>العودة إلى محتوى المقرر</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Video Info Header */}
          <div className="p-4 md:p-6 border-b border-gray-100">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">{currentVideo.title}</h1>
            {content && (
              <p className="text-gray-600 text-sm md:text-base">{content.courseTitle}</p>
            )}
          </div>

          {/* Allowed Views Info */}
          {allowedViews && (
            <div className="p-4 md:p-6 bg-blue-50 border-b border-blue-100">
              <h3 className="font-semibold text-blue-800 mb-3 text-sm md:text-base">معلومات المشاهدات المسموحة</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-lg border border-gray-200 text-center">
                  <p className="text-xs text-gray-500 mb-1">المسموحة</p>
                  <p className="font-bold text-blue-600">{allowedViews.allowedCount}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200 text-center">
                  <p className="text-xs text-gray-500 mb-1">تمت مشاهدتها</p>
                  <p className="font-bold text-blue-600">{allowedViews.viewedCount}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200 text-center">
                  <p className="text-xs text-gray-500 mb-1">المتبقية</p>
                  <p className="font-bold text-blue-600">{allowedViews.remainingViews}</p>
                </div>
              </div>
              {allowedViews.remainingViews === 0 && (
                <p className="mt-3 text-xs text-red-600">
                  لقد استنفذت جميع المشاهدات المسموحة لهذا الفيديو
                </p>
              )}
            </div>
          )}

          {/* Video Player Section */}
          <div className="p-4 md:p-6">
            <div className="relative bg-black rounded-lg overflow-hidden shadow-xl aspect-w-16 aspect-h-9" onContextMenu={preventDownload}>
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                  <button 
                    onClick={handlePlay}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 transition-all transform hover:scale-105"
                    disabled={allowedViews?.remainingViews === 0}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}

              {isPlaying ? (
                isYouTubeUrl(currentVideo.videoUrl) ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(currentVideo.videoUrl)}?autoplay=1&modestbranding=1&rel=0`}
                    className="w-full h-full min-h-[300px] md:min-h-[450px]"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    controls
                    controlsList="nodownload noplaybackrate"
                    disablePictureInPicture
                    className="w-full h-full min-h-[300px] md:min-h-[450px]"
                    autoPlay
                  >
                    <source src={getFullVideoUrl(currentVideo.videoUrl)} type={`video/${getVideoExtension(currentVideo.videoUrl)}`} />
                    متصفحك لا يدعم تشغيل الفيديو
                  </video>
                )
              ) : (
                <div className="w-full h-full min-h-[300px] md:min-h-[450px] bg-gray-900 flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg font-medium mb-2">اضغط على زر التشغيل لمشاهدة الفيديو</p>
                    {allowedViews?.remainingViews !== undefined && (
                      <p className="text-sm text-gray-400">
                        المشاهدات المتبقية: {allowedViews.remainingViews}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Video Description */}
            {currentVideo.description && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-2">وصف الفيديو</h3>
                <p className="text-gray-600 text-sm">{currentVideo.description}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => router.push(`/student/dashboard/courses/${courseId}/courseContent`)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                جميع فيديوهات المقرر
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getYouTubeId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}

function getVideoExtension(url: string): string {
  const extension = url.split('.').pop()?.split('?')[0];
  return extension || 'mp4';
}