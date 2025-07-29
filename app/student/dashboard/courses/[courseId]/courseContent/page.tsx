
// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import React from "react";

// interface Video {
//   id: string; // Assuming each video has an ID
//   title: string;
//   videoUrl: string;
// }

// interface Session {
//   title: string;
//   videos: Video[];
// }

// interface CourseContent {
//   courseTitle: string;
//   sessions: Session[];
//   exams: any[];
// }

// export default function CourseContentPage({
//   params,
// }: {
//   params: Promise<{ courseId: string }>;
// }) {
//   const router = useRouter();
//   const [content, setContent] = useState<CourseContent | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [expandedSessions, setExpandedSessions] = useState<Record<number, boolean>>({});
//   const [currentVideo, setCurrentVideo] = useState<{sessionIndex: number, videoIndex: number} | null>(null);
  
//   const { courseId } = React.use(params);

//   useEffect(() => {
//     console.log("Course ID from params:", courseId);
    
//     const fetchCourseContent = async () => {
//       try {
//         if (!courseId || courseId === "undefined") {
//           throw new Error("Invalid course ID");
//         }

//         const token = localStorage.getItem("token");
//         const userData = localStorage.getItem("user");
        
//         if (!token || !userData) {
//           throw new Error("Authentication required");
//         }

//         const user = JSON.parse(userData);
//         const response = await fetch(
//           `https://elearning1.runasp.net/api/Student/StudentCourseContent/${user.id}/${courseId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch course content");
//         }

//         const data: CourseContent = await response.json();
//         setContent(data);
        
//         // Initialize all sessions as collapsed by default
//         const initialExpandedState: Record<number, boolean> = {};
//         data.sessions.forEach((_, index) => {
//           initialExpandedState[index] = false;
//         });
//         setExpandedSessions(initialExpandedState);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An unknown error occurred");
//         console.error("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourseContent();
//   }, [courseId]);

//   const toggleSession = (index: number) => {
//     setExpandedSessions(prev => ({
//       ...prev,
//       [index]: !prev[index]
//     }));
//   };

//   const getFullVideoUrl = (url: string) => {
//     if (url.startsWith("http") || url.startsWith("//")) {
//       return url;
//     }
//     return `https://elearning1.runasp.net${url.startsWith('/') ? url : `/${url}`}`;
//   };

//   const isYouTubeUrl = (url: string) => {
//     return url.includes('youtu.be') || url.includes('youtube.com');
//   };

//   const preventDownload = (e: React.MouseEvent) => {
//     e.preventDefault();
//     alert("تنزيل الفيديو غير مسموح به");
//   };

//   const playVideo = (sessionIndex: number, videoIndex: number) => {
//     setCurrentVideo({sessionIndex, videoIndex});
//   };

//   const navigateToVideoPage = (videoId: string) => {
//     router.push(`/student/dashboard/courses/${courseId}/courseContent/${videoId}`);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {error}
//         </div>
//         <button 
//           onClick={() => router.push('/student/dashboard/courses')}
//           className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
//         >
//           العودة إلى المقررات
//         </button>
//       </div>
//     );
//   }

//   if (!content) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         محتوى المقرر غير موجود
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8" dir="rtl">
//       <button 
//         onClick={() => router.back()}
//         className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
//         </svg>
//         العودة
//       </button>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">{content.courseTitle}</h1>
        
//         <div className="space-y-4">
//           {content.sessions.map((session, sessionIndex) => (
//             <div key={`session-${sessionIndex}`} className="border border-gray-200 rounded-lg overflow-hidden">
//               <button
//                 onClick={() => toggleSession(sessionIndex)}
//                 className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
//               >
//                 <h2 className="text-lg font-semibold text-gray-700">
//                   {session.title} ({session.videos.length} فيديو)
//                 </h2>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className={`h-5 w-5 text-gray-500 transform transition-transform ${expandedSessions[sessionIndex] ? 'rotate-180' : ''}`}
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//               </button>
              
//               {expandedSessions[sessionIndex] && (
//                 <div className="p-4 space-y-3">
//                   {session.videos.map((video, videoIndex) => (
//                     <div key={`video-${sessionIndex}-${videoIndex}`} className="border-b border-gray-100 last:border-b-0 pb-2 last:pb-0">
//                       <div className="flex justify-between items-center">
//                         <button
//                           onClick={() => playVideo(sessionIndex, videoIndex)}
//                           className={`flex-1 text-right p-2 rounded ${currentVideo?.sessionIndex === sessionIndex && currentVideo?.videoIndex === videoIndex ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50'}`}
//                         >
//                           {video.title}
//                         </button>
//                         <button
//                           onClick={() => navigateToVideoPage(video.id)}
//                           className="ml-2 px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors"
//                         >
//                           عرض
//                         </button>
//                       </div>
                      
//                       {currentVideo?.sessionIndex === sessionIndex && currentVideo?.videoIndex === videoIndex && (
//                         <div className="mt-4 bg-black rounded overflow-hidden relative" onContextMenu={preventDownload}>
//                           {isYouTubeUrl(video.videoUrl) ? (
//                             <div className="aspect-w-16 aspect-h-9">
//                               <iframe
//                                 src={`https://www.youtube.com/embed/${getYouTubeId(video.videoUrl)}?modestbranding=1&rel=0`}
//                                 className="w-full h-full"
//                                 frameBorder="0"
//                                 allow="accelerometer; autoplay;"
//                                 allowFullScreen
//                               ></iframe>
//                             </div>
//                           ) : (
//                             <div className="aspect-w-16 aspect-h-9">
//                               <video
//                                 controls
//                                 controlsList="nodownload noplaybackrate"
//                                 disablePictureInPicture
//                                 className="w-full h-full"
//                               >
//                                 <source src={getFullVideoUrl(video.videoUrl)} type={`video/${getVideoExtension(video.videoUrl)}`} />
//                                 متصفحك لا يدعم تشغيل الفيديو
//                               </video>
//                             </div>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function getYouTubeId(url: string): string {
//   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//   const match = url.match(regExp);
//   return (match && match[2].length === 11) ? match[2] : '';
// }

// function getVideoExtension(url: string): string {
//   const extension = url.split('.').pop()?.split('?')[0];
//   return extension || 'mp4' || 'WebM' || 'Ogg';
// }

















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
  title: string;
  videos: Video[];
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSessions, setExpandedSessions] = useState<Record<number, boolean>>({});
  const [currentVideo, setCurrentVideo] = useState<{sessionIndex: number, videoIndex: number} | null>(null);

  const { courseId } = React.use(params);

  useEffect(() => {
    console.log("Course ID from params:", courseId);
    
    const fetchCourseContent = async () => {
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
        
        const initialExpandedState: Record<number, boolean> = {};
        data.sessions.forEach((_, index) => {
          initialExpandedState[index] = false;
        });
        setExpandedSessions(initialExpandedState);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseContent();
  }, [courseId]);

  const toggleSession = (index: number) => {
    setExpandedSessions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

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

  const playVideo = (sessionIndex: number, videoIndex: number) => {
    setCurrentVideo({sessionIndex, videoIndex});
  };

  const navigateToVideoPage = (videoId: string) => {
    router.push(`/student/dashboard/courses/${courseId}/courseContent/${videoId}`);
  };

  const navigateToIncreaseViews = (videoId: string) => {
    router.push(`/student/dashboard/courses/${courseId}/courseContent/${videoId}/views`);
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
          onClick={() => router.push('/student/dashboard/courses')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          العودة إلى المقررات
        </button>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        محتوى المقرر غير موجود
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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{content.courseTitle}</h1>
        
        <div className="space-y-4">
          {content.sessions.map((session, sessionIndex) => (
            <div key={`session-${sessionIndex}`} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSession(sessionIndex)}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <h2 className="text-lg font-semibold text-gray-700">
                  {session.title} ({session.videos.length} فيديو)
                </h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 text-gray-500 transform transition-transform ${expandedSessions[sessionIndex] ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {expandedSessions[sessionIndex] && (
                <div className="p-4 space-y-3">
                  {session.videos.map((video, videoIndex) => (
                    <div key={`video-${sessionIndex}-${videoIndex}`} className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0">
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => playVideo(sessionIndex, videoIndex)}
                          className={`flex-1 text-right p-2 rounded ${currentVideo?.sessionIndex === sessionIndex && currentVideo?.videoIndex === videoIndex ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50'}`}
                        >
                          {video.title}
                        </button>
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigateToVideoPage(video.id)}
                            className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors"
                          >
                            عرض
                          </button>
                          <button
                            onClick={() => navigateToIncreaseViews(video.id)}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                          >
                            زيادة المشاهدات
                          </button>
                        </div>
                      </div>
                      
                      {currentVideo?.sessionIndex === sessionIndex && currentVideo?.videoIndex === videoIndex && (
                        <div className="mt-4 bg-black rounded overflow-hidden relative" onContextMenu={preventDownload}>
                          {isYouTubeUrl(video.videoUrl) ? (
                            <div className="aspect-w-16 aspect-h-9">
                              <iframe
                                src={`https://www.youtube.com/embed/${getYouTubeId(video.videoUrl)}?modestbranding=1&rel=0`}
                                className="w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay;"
                                allowFullScreen
                              ></iframe>
                            </div>
                          ) : (
                            <div className="aspect-w-16 aspect-h-9">
                              <video
                                controls
                                controlsList="nodownload noplaybackrate"
                                disablePictureInPicture
                                className="w-full h-full"
                              >
                                <source src={getFullVideoUrl(video.videoUrl)} type={`video/${getVideoExtension(video.videoUrl)}`} />
                                متصفحك لا يدعم تشغيل الفيديو
                              </video>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
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
  return extension || 'mp4' || 'WebM' || 'Ogg';
}