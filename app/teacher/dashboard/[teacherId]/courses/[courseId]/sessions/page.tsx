

"use client";
import { useState, useEffect, Fragment } from "react";
import { PlusCircle, Video, FileText, ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface Session {
  id: number;
  title: string;
  content: string;
  order: number;
  published: string;
  courseId: number;
}

interface Video {
  title: string;
  url: string;
  type: number;
  duration: number;
}

interface Exam {
  id: number;
  title: string;
  type: number;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  publishDate: string;
}

export default function CourseSessionsPage() {
  const params = useParams();
  const router = useRouter();
  const { teacherId, courseId } = params;
  const [sessions, setSessions] = useState<Session[]>([]);
  const [sessionVideos, setSessionVideos] = useState<Record<number, Video[]>>({});
  const [sessionExams, setSessionExams] = useState<Record<number, Exam[]>>({});
  const [expandedSession, setExpandedSession] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSession, setNewSession] = useState({
    title: "",
    content: "",
    order: 0,
    published: new Date().toISOString(),
    courseId: Number(courseId)
  });

  const getFullVideoUrl = (url: string) => {
    if (url.startsWith('http')) return url;
    return `https://elearning1.runasp.net${url.startsWith('/') ? url : `/${url}`}`;
  };

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/AllSessions/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Failed to fetch sessions: ${response.status} ${errorData}`);
        }

        const data = await response.json();
        const validatedSessions = data.map((session: Session, index: number) => ({
          ...session,
          id: session.id || index + 1
        }));
        setSessions(validatedSessions);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [courseId]);

  const fetchSessionVideos = async (sessionId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/AllVideoForSession/${sessionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch videos: ${response.status}`);
      }

      const videos = await response.json();
      setSessionVideos(prev => ({
        ...prev,
        [sessionId]: Array.isArray(videos) ? videos : []
      }));
    } catch (err) {
      console.error("Error fetching videos:", err);
      setSessionVideos(prev => ({
        ...prev,
        [sessionId]: []
      }));
    }
  };

  const fetchSessionExams = async (sessionId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/AllExams/${sessionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch exams: ${response.status}`);
      }

      const exams = await response.json();
      setSessionExams(prev => ({
        ...prev,
        [sessionId]: Array.isArray(exams) ? exams.map((exam: any, index: number) => ({
          ...exam,
          id: exam.id || index + 1
        })) : []
      }));
    } catch (err) {
      console.error("Error fetching exams:", err);
      setSessionExams(prev => ({
        ...prev,
        [sessionId]: []
      }));
    }
  };

  const toggleSessionExpand = (sessionId: number) => {
    if (expandedSession === sessionId) {
      setExpandedSession(null);
    } else {
      setExpandedSession(sessionId);
      if (!sessionVideos[sessionId]) {
        fetchSessionVideos(sessionId);
      }
      if (!sessionExams[sessionId]) {
        fetchSessionExams(sessionId);
      }
    }
  };

  const handleAddSession = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/AddSession/${courseId}`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSession)
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to add session: ${response.status} ${errorData}`);
      }

      const data = await response.json();
      const validatedSession = {
        ...data,
        id: data.id || sessions.length + 1
      };
      setSessions([...sessions, validatedSession]);
      setShowAddForm(false);
      setNewSession({
        title: "",
        content: "",
        order: 0,
        published: new Date().toISOString(),
        courseId: Number(courseId)
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add session");
    }
  };

  const handleDeleteSession = async (sessionId: number) => {
    if (!confirm("هل أنت متأكد من حذف هذه الجلسة؟ سيتم حذف جميع الفيديوهات والاختبارات المرتبطة بها.")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/DeleteSession/${sessionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to delete session: ${response.status} ${errorData}`);
      }

      setSessions(sessions.filter(session => session.id !== sessionId));
      
      setSessionVideos(prev => {
        const newVideos = {...prev};
        delete newVideos[sessionId];
        return newVideos;
      });
      
      setSessionExams(prev => {
        const newExams = {...prev};
        delete newExams[sessionId];
        return newExams;
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete session");
    }
  };

  const handleDeleteExam = async (examId: number, sessionId: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا الاختبار؟ سيتم حذف جميع الأسئلة المرتبطة به.")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/DeleteExam/${examId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to delete exam: ${response.status} ${errorData}`);
      }

      setSessionExams(prev => ({
        ...prev,
        [sessionId]: prev[sessionId]?.filter(exam => exam.id !== examId) || []
      }));

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete exam");
    }
  };

  const navigateToAddVideo = (sessionId: number) => {
    router.push(`/teacher/dashboard/${teacherId}/courses/${courseId}/sessions/${sessionId}/add-video`);
  };

  const navigateToAddExam = (sessionId: number) => {
    router.push(`/teacher/dashboard/${teacherId}/courses/${courseId}/sessions/${sessionId}/add-exam`);
  };

  const navigateToAddQuestions = (examId: number, currentSessionId: number) => {
    router.push(
      `/teacher/dashboard/${teacherId}/courses/${courseId}/sessions/${currentSessionId}/exams/${examId}/add-question`
    );
  };

  const navigateToQuestionsList = (examId: number, currentSessionId: number) => {
    router.push(
      `/teacher/dashboard/${teacherId}/courses/${courseId}/sessions/${currentSessionId}/exams/${examId}/questions`
    );
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getVideoTypeName = (type: number) => {
    const types = [
      "غير محدد",
      "مقدمة",
      "محاضرة",
      "شرح عملي",
      "حل تمرين",
      "ملخص",
      "إعلان",
      "محتوى إضافي",
      "مراجعة",
      "إرشاد اختبار",
      "أخرى"
    ];
    return types[type] || types[0];
  };

  const getExamTypeName = (type: number) => {
    const types = ["اختبار قصير", "اختبار منتصف الفصل", "اختبار نهائي"];
    return types[type] || "غير محدد";
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8" dir="rtl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">جلسات الدورة</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg"
          style={{ backgroundColor: "#3a5a78" }}
          onClick={() => setShowAddForm(true)}
        >
          <PlusCircle size={18} />
          إضافة جلسة جديدة
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">إضافة جلسة جديدة</h2>
          <form onSubmit={handleAddSession} className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">عنوان الجلسة</label>
              <input
                type="text"
                value={newSession.title}
                onChange={(e) => setNewSession({...newSession, title: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">المحتوى</label>
              <textarea
                value={newSession.content}
                onChange={(e) => setNewSession({...newSession, content: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">الترتيب</label>
              <input
                type="number"
                value={newSession.order}
                onChange={(e) => setNewSession({...newSession, order: parseInt(e.target.value)})}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                حفظ
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowAddForm(false)}
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <h2 className="text-xl font-bold">إجمالي الجلسات: {sessions.length}</h2>
        </div>
        
        {sessions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            لا توجد جلسات متاحة حالياً
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-right px-4">#</th>
                  <th className="pb-3 text-right px-4">العنوان</th>
                  <th className="pb-3 text-right px-4">المحتوى</th>
                  <th className="pb-3 text-right px-4">الترتيب</th>
                  <th className="pb-3 text-right px-4">تاريخ النشر</th>
                  <th className="pb-3 text-right px-4">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session, index) => (
                  <Fragment key={`session-${session.id}`}>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">{index + 1}</td>
                      <td className="py-4 px-4">
                        <button 
                          onClick={() => toggleSessionExpand(session.id)}
                          className="flex items-center gap-2"
                        >
                          {session.title}
                          {expandedSession === session.id ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </button>
                      </td>
                      <td className="py-4 px-4 max-w-xs">{session.content}</td>
                      <td className="py-4 px-4">{session.order}</td>
                      <td className="py-4 px-4">{new Date(session.published).toLocaleDateString()}</td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigateToAddVideo(session.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            title="إضافة فيديو"
                          >
                            <Video size={18} />
                          </button>
                          <button
                            onClick={() => navigateToAddExam(session.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded"
                            title="إضافة اختبار"
                          >
                            <FileText size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteSession(session.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                            title="حذف الجلسة"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedSession === session.id && (
                      <tr className="border-b">
                        <td colSpan={6} className="px-4 py-2">
                          <div className="bg-gray-50 p-4 rounded-lg space-y-6">
                            <div>
                              <h3 className="font-medium mb-3">فيديوهات الجلسة</h3>
                              {sessionVideos[session.id]?.length > 0 ? (
                                <div className="space-y-3">
                                  {sessionVideos[session.id].map((video, idx) => (
                                    <div key={`video-${session.id}-${idx}`} className="border p-3 rounded-lg">
                                      <div className="flex justify-between items-start mb-2">
                                        <div>
                                          <h4 className="font-medium">{video.title}</h4>
                                          <p className="text-sm text-gray-600">
                                            النوع: {getVideoTypeName(video.type)} | المدة: {formatDuration(video.duration)}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="mt-2">
                                        <video 
                                          controls
                                          className="w-full rounded-lg bg-black"
                                          style={{ maxHeight: '400px' }}
                                        >
                                          <source 
                                            src={getFullVideoUrl(video.url)} 
                                            type={`video/${video.url.split('.').pop()?.split('?')[0] || 'mp4'}`}
                                          />
                                          متصفحك لا يدعم تشغيل الفيديو
                                        </video>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-gray-500">لا توجد فيديوهات لهذه الجلسة</p>
                              )}
                            </div>

                            <div>
                              <h3 className="font-medium mb-3">اختبارات الجلسة</h3>
                              {sessionExams[session.id]?.length > 0 ? (
                                <div className="space-y-3">
                                  {sessionExams[session.id].map((exam, idx) => (
                                    <div key={`exam-${session.id}-${idx}`} className="border p-3 rounded-lg">
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <h4 className="font-medium">{exam.title}</h4>
                                          <p className="text-sm text-gray-600">
                                            النوع: {getExamTypeName(exam.type)} | المدة: {exam.durationMinutes} دقيقة
                                          </p>
                                          <p className="text-sm text-gray-600">
                                            وقت البدء: {formatDateTime(exam.startTime)}
                                          </p>
                                          <p className="text-sm text-gray-600">
                                            وقت الانتهاء: {formatDateTime(exam.endTime)}
                                          </p>
                                          {exam.publishDate && (
                                            <p className="text-sm text-gray-600">
                                              تاريخ النشر: {formatDateTime(exam.publishDate)}
                                            </p>
                                          )}
                                        </div>
                                        <div className="flex gap-2">
                                          <button
                                            onClick={() => navigateToQuestionsList(exam.id, session.id)}
                                            className="text-blue-600 hover:underline"
                                          >
                                            عرض التفاصيل
                                          </button>
                                          <button
                                            onClick={() => navigateToAddQuestions(exam.id, session.id)}
                                            className="p-1 text-green-600 hover:bg-green-50 rounded group relative"
                                            title="إضافة أسئلة"
                                          >
                                            <Plus size={16} />
                                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                              إضافة أسئلة
                                            </span>
                                          </button>
                                          <button
                                            onClick={() => handleDeleteExam(exam.id, session.id)}
                                            className="p-1 text-red-600 hover:bg-red-50 rounded group relative"
                                            title="حذف الاختبار"
                                          >
                                            <Trash2 size={16} />
                                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                              حذف الاختبار
                                            </span>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-gray-500">لا توجد اختبارات لهذه الجلسة</p>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}