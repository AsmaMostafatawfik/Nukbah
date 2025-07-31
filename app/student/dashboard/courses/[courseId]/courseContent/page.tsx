
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

interface Video {
  id: string;
  title: string;
  videoUrl: string;
}

interface Session {
  id: number;
  title: string;
  videos: Video[];
}

interface Exam {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  sessionTitle: string;
  courseTitle: string;
  sessionId: number;
  courseId: number;
}

interface CourseContent {
  courseTitle: string;
  sessions: Session[];
  exams: any[];
}

export default function CourseContentPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const router = useRouter();
  const [content, setContent] = useState<CourseContent | null>(null);
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSessions, setExpandedSessions] = useState<Record<number, boolean>>({});

  const { courseId } = React.use(params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!courseId || courseId === "undefined") {
          throw new Error("Invalid course ID");
        }

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

        const contentData: CourseContent = await contentResponse.json();
        setContent(contentData);
        
        const initialExpandedState: Record<number, boolean> = {};
        contentData.sessions.forEach((_, index) => {
          initialExpandedState[index] = false;
        });
        setExpandedSessions(initialExpandedState);

        // Fetch exams
        const examsResponse = await fetch(
          `https://elearning1.runasp.net/api/Student/AvailableExamsInSessions/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!examsResponse.ok) {
          throw new Error("Failed to fetch exams");
        }

        const examsData: Exam[] = await examsResponse.json();
        const courseExams = examsData.filter(exam => 
          exam.courseId.toString() === courseId
        );
        setExams(courseExams);

      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const toggleSession = (index: number) => {
    setExpandedSessions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const trackVideoView = async (videoId: string) => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      
      if (!token || !userData) {
        throw new Error("Authentication required");
      }

      const user = JSON.parse(userData);
      
      const response = await fetch(
        `https://elearning1.runasp.net/api/Student/TrackView`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            studentId: user.id,
            videoId: parseInt(videoId)
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to track video view");
      }

      return true;
    } catch (err) {
      console.error("Error tracking view:", err);
      return false;
    }
  };

  const handleViewVideo = async (videoId: string) => {
    const tracked = await trackVideoView(videoId);
    if (tracked) {
      router.push(`/student/dashboard/courses/${courseId}/courseContent/${videoId}`);
    } else {
      alert("تم استنفاذ جميع مرات المشاهدة .");
    }
  };

  const navigateToIncreaseViews = (videoId: string) => {
    router.push(`/student/dashboard/courses/${courseId}/courseContent/${videoId}/views`);
  };

  const startExam = (examId: number) => {
    router.push(`/student/dashboard/courses/${courseId}/courseContent/exams/${examId}`);
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getExamStatus = (startTime: string, endTime: string) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (now < start) return { text: "لم يبدأ بعد", color: "bg-yellow-100 text-yellow-800" };
    if (now > end) return { text: "انتهى", color: "bg-red-100 text-red-800" };
    return { text: "جاري الآن", color: "bg-green-100 text-green-800" };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
        <button 
          onClick={() => router.push('/student/dashboard/courses')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          العودة إلى المقررات
        </button>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-600">
        محتوى المقرر غير موجود
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6" dir="rtl">
      <button 
        onClick={() => router.back()}
        className="mb-4 flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-sm md:text-base"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        العودة
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">{content.courseTitle}</h1>
          <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
            {content.sessions.length} جلسة
          </span>
        </div>
        
        <div className="space-y-4">
          {content.sessions.map((session, sessionIndex) => {
            const sessionExams = exams.filter(exam => exam.sessionId === session.id);
            
            return (
              <div key={`session-${session.id}`} className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-sm">
                <button
                  onClick={() => toggleSession(sessionIndex)}
                  className="w-full flex justify-between items-center p-3 md:p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  aria-expanded={expandedSessions[sessionIndex]}
                >
                  <div className="flex items-center gap-2">
                    <h2 className="text-base md:text-lg font-semibold text-gray-700 text-right">
                      {session.title}
                    </h2>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {session.videos.length} فيديو
                    </span>
                    {sessionExams.length > 0 && (
                      <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                        {sessionExams.length} اختبار
                      </span>
                    )}
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 ${
                      expandedSessions[sessionIndex] ? 'rotate-180' : ''
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {expandedSessions[sessionIndex] && (
                  <div className="p-3 md:p-4 space-y-4 bg-white">
                    {/* Videos Section */}
                    {session.videos.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="font-medium text-gray-700 text-sm md:text-base flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                          </svg>
                          الفيديوهات
                        </h3>
                        <div className="grid gap-2">
                          {session.videos.map((video) => (
                            <div 
                              key={`video-${video.id}`} 
                              className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                                <h4 className="text-sm md:text-base text-gray-800 font-medium text-right">
                                  {video.title}
                                </h4>
                                <div className="flex gap-2 justify-end">
                                  <button
                                    onClick={() => handleViewVideo(video.id)}
                                    className="px-3 py-1 bg-indigo-600 text-white text-xs md:text-sm rounded hover:bg-indigo-700 transition-colors flex items-center gap-1"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                    عرض
                                  </button>
                                  <button
                                    onClick={() => navigateToIncreaseViews(video.id)}
                                    className="px-3 py-1 bg-green-600 text-white text-xs md:text-sm rounded hover:bg-green-700 transition-colors flex items-center gap-1"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                    المشاهدات
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Exams Section */}
                    {sessionExams.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="font-medium text-gray-700 text-sm md:text-base flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clipRule="evenodd" />
                          </svg>
                          الاختبارات
                        </h3>
                        <div className="grid gap-3">
                          {sessionExams.map((exam) => {
                            const status = getExamStatus(exam.startTime, exam.endTime);
                            const isExamActive = new Date() >= new Date(exam.startTime) && new Date() <= new Date(exam.endTime);
                            
                            return (
                              <div 
                                key={`exam-${exam.id}`} 
                                className="border border-gray-200 rounded-lg p-3 md:p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                              >
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800 text-sm md:text-base">{exam.title}</h3>
                                    <p className="text-xs text-gray-500 mt-1">للجلسة: {exam.sessionTitle}</p>
                                  </div>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color} self-start`}>
                                    {status.text}
                                  </span>
                                </div>
                                
                                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                                  <div className="bg-white p-2 rounded border border-gray-100">
                                    <p className="text-gray-500 text-xs">وقت البدء:</p>
                                    <p className="font-medium">{formatDateTime(exam.startTime)}</p>
                                  </div>
                                  <div className="bg-white p-2 rounded border border-gray-100">
                                    <p className="text-gray-500 text-xs">وقت الانتهاء:</p>
                                    <p className="font-medium">{formatDateTime(exam.endTime)}</p>
                                  </div>
                                  <div className="bg-white p-2 rounded border border-gray-100">
                                    <p className="text-gray-500 text-xs">المدة:</p>
                                    <p className="font-medium">{exam.durationMinutes} دقيقة</p>
                                  </div>
                                </div>
                                
                                <button
                                  onClick={() => startExam(exam.id)}
                                  disabled={!isExamActive}
                                  className={`mt-3 w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
                                    isExamActive
                                      ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                  }`}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                  </svg>
                                  {new Date() < new Date(exam.startTime) ? 'الاختبار لم يبدأ بعد' : 
                                   new Date() > new Date(exam.endTime) ? 'الاختبار انتهى' : 'بدء الاختبار'}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}