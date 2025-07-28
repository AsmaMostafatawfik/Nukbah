// // "use client";
// // import { useEffect, useState, use } from "react";
// // import { useRouter } from "next/navigation";

// // interface Video {
// //   title: string;
// //   videoUrl: string;
// // }

// // interface Session {
// //   title: string;
// //   videos: Video[];
// // }

// // interface CourseContent {
// //   courseTitle: string;
// //   sessions: Session[];
// //   exams: any[];
// // }

// // export default function CourseContentPage({
// //   params,
// // }: {
// //   params: { courseId: string };
// // }) {
// //   const router = useRouter();
// //   const [content, setContent] = useState<CourseContent | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
  
// //   // Unwrap the params promise
// //   const { courseId } = params;

// //   useEffect(() => {
// //     const fetchCourseContent = async () => {
// //       try {
// //         const token = localStorage.getItem("token");
// //         const userData = localStorage.getItem("user");
        
// //         if (!token || !userData) {
// //           throw new Error("Authentication required");
// //         }

// //         const user = JSON.parse(userData);
// //         const response = await fetch(
// //           `https://elearning1.runasp.net/api/Student/StudentCourseContent/${user.id}/${courseId}`,
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         );

// //         if (!response.ok) {
// //           throw new Error("Failed to fetch course content");
// //         }

// //         const data: CourseContent = await response.json();
// //         setContent(data);
// //       } catch (err) {
// //         setError(err instanceof Error ? err.message : "An unknown error occurred");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (courseId) {
// //       fetchCourseContent();
// //     }
// //   }, [courseId]);

// //   const getFullVideoUrl = (url: string) => {
// //     if (url.startsWith("http") || url.startsWith("//")) {
// //       return url;
// //     }
// //     return `https://elearning1.runasp.net${url.startsWith('/') ? url : `/${url}`}`;
// //   };

// //   const isYouTubeUrl = (url: string) => {
// //     return url.includes('youtu.be') || url.includes('youtube.com');
// //   };

// //   // Prevent right-click and other download methods
// //   const preventDownload = (e: React.MouseEvent) => {
// //     e.preventDefault();
// //     alert("تنزيل الفيديو غير مسموح به");
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="container mx-auto px-4 py-8">
// //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
// //           {error}
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!content) {
// //     return (
// //       <div className="container mx-auto px-4 py-8 text-center">
// //         محتوى المقرر غير موجود
// //       </div>
// //     );
// //   }

// //   return (
// //     <div 
// //       className="container mx-auto px-4 py-8" 
// //       dir="rtl"
// //       onContextMenu={preventDownload}
// //     >
// //       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //         <h1 className="text-2xl font-bold text-gray-800 mb-6">{content.courseTitle}</h1>
        
// //         <div className="space-y-8">
// //           {content.sessions.map((session, sessionIndex) => (
// //             <div 
// //               key={`session-${sessionIndex}`} 
// //               className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
// //             >
// //               <h2 className="text-xl font-semibold text-gray-700 mb-4">{session.title}</h2>
              
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 {session.videos.map((video, videoIndex) => (
// //                   <div 
// //                     key={`video-${sessionIndex}-${videoIndex}`} 
// //                     className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200"
// //                   >
// //                     <div className="p-4">
// //                       <h3 className="font-medium text-gray-800 mb-2">{video.title}</h3>
                      
// //                       <div 
// //                         className="aspect-w-16 aspect-h-9 bg-black rounded overflow-hidden relative"
// //                         onContextMenu={preventDownload}
// //                       >
// //                         {isYouTubeUrl(video.videoUrl) ? (
// //                           <iframe
// //                             src={`https://www.youtube.com/embed/${getYouTubeId(video.videoUrl)}?modestbranding=1&rel=0`}
// //                             className="w-full h-full"
// //                             frameBorder="0"
// //                             allow="accelerometer; autoplay;"
// //                             allowFullScreen
// //                           ></iframe>
// //                         ) : (
// //                           <div className="relative w-full h-full">
// //                             <video
// //                               controls
// //                               controlsList="nodownload noplaybackrate "
// //                               disablePictureInPicture
// //                               className="w-full h-full"
// //                             >
// //                               <source src={getFullVideoUrl(video.videoUrl)} type={`video/${getVideoExtension(video.videoUrl)}`} />
// //                               متصفحك لا يدعم تشغيل الفيديو
// //                             </video>
// //                             {/* Overlay to prevent right-click */}
// //                             <div className="absolute inset-0 pointer-events-none"></div>
// //                           </div>
// //                         )}
// //                       </div>
                      
// //                       <div className="mt-3">
// //                         <span className="text-xs text-gray-500">
// //                           {isYouTubeUrl(video.videoUrl) ? "يوتيوب" : "مقطع مباشر"}
// //                         </span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // Helper function to extract YouTube ID
// // function getYouTubeId(url: string): string {
// //   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
// //   const match = url.match(regExp);
// //   return (match && match[2].length === 11) ? match[2] : '';
// // }

// // // Helper function to get video extension
// // function getVideoExtension(url: string): string {
// //   const extension = url.split('.').pop()?.split('?')[0];
// //   return extension || 'mp4' || 'WebM' || 'Ogg';
// // }










// "use client";
// import { useEffect, useState, use } from "react";
// import { useRouter } from "next/navigation";

// interface Video {
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
  
//   // Properly unwrap the params promise using React.use()
//   const { courseId } = use(params);

//   useEffect(() => {
//     const fetchCourseContent = async () => {
//       try {
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
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An unknown error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (courseId) {
//       fetchCourseContent();
//     }
//   }, [courseId]);

//   const getFullVideoUrl = (url: string) => {
//     if (url.startsWith("http") || url.startsWith("//")) {
//       return url;
//     }
//     return `https://elearning1.runasp.net${url.startsWith('/') ? url : `/${url}`}`;
//   };

//   const isYouTubeUrl = (url: string) => {
//     return url.includes('youtu.be') || url.includes('youtube.com');
//   };

//   // Prevent right-click and other download methods
//   const preventDownload = (e: React.MouseEvent) => {
//     e.preventDefault();
//     alert("تنزيل الفيديو غير مسموح به");
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
//     <div 
//       className="container mx-auto px-4 py-8" 
//       dir="rtl"
//       onContextMenu={preventDownload}
//     >
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">{content.courseTitle}</h1>
        
//         <div className="space-y-8">
//           {content.sessions.map((session, sessionIndex) => (
//             <div 
//               key={`session-${sessionIndex}`} 
//               className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
//             >
//               <h2 className="text-xl font-semibold text-gray-700 mb-4">{session.title}</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {session.videos.map((video, videoIndex) => (
//                   <div 
//                     key={`video-${sessionIndex}-${videoIndex}`} 
//                     className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200"
//                   >
//                     <div className="p-4">
//                       <h3 className="font-medium text-gray-800 mb-2">{video.title}</h3>
                      
//                       <div 
//                         className="aspect-w-16 aspect-h-9 bg-black rounded overflow-hidden relative"
//                         onContextMenu={preventDownload}
//                       >
//                         {isYouTubeUrl(video.videoUrl) ? (
//                           <iframe
//                             src={`https://www.youtube.com/embed/${getYouTubeId(video.videoUrl)}?modestbranding=1&rel=0`}
//                             className="w-full h-full"
//                             frameBorder="0"
//                             allow="accelerometer; autoplay;"
//                             allowFullScreen
//                           ></iframe>
//                         ) : (
//                           <div className="relative w-full h-full">
//                             <video
//                               controls
//                               controlsList="nodownload noplaybackrate "
//                               disablePictureInPicture
//                               className="w-full h-full"
//                             >
//                               <source src={getFullVideoUrl(video.videoUrl)} type={`video/${getVideoExtension(video.videoUrl)}`} />
//                               متصفحك لا يدعم تشغيل الفيديو
//                             </video>
//                             {/* Overlay to prevent right-click */}
//                             <div className="absolute inset-0 pointer-events-none"></div>
//                           </div>
//                         )}
//                       </div>
                      
//                       <div className="mt-3">
//                         <span className="text-xs text-gray-500">
//                           {isYouTubeUrl(video.videoUrl) ? "يوتيوب" : "مقطع مباشر"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // Helper function to extract YouTube ID
// function getYouTubeId(url: string): string {
//   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//   const match = url.match(regExp);
//   return (match && match[2].length === 11) ? match[2] : '';
// }

// // Helper function to get video extension
// function getVideoExtension(url: string): string {
//   const extension = url.split('.').pop()?.split('?')[0];
//   return extension || 'mp4' || 'WebM' || 'Ogg';
// }







"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

interface Video {
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
  params: Promise<{ courseId: string }>; // Now properly typed as Promise
}) {
  const router = useRouter();
  const [content, setContent] = useState<CourseContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Properly unwrap params using React.use()
  const { courseId } = React.use(params);

  useEffect(() => {
    console.log("Course ID from params:", courseId); // Debug log
    
    const fetchCourseContent = async () => {
      try {
        // Validate courseId
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
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseContent();
  }, [courseId]);

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
        
        <div className="space-y-8">
          {content.sessions.map((session, sessionIndex) => (
            <div key={`session-${sessionIndex}`} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">{session.title}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {session.videos.map((video, videoIndex) => (
                  <div key={`video-${sessionIndex}-${videoIndex}`} className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                    <div className="p-4">
                      <h3 className="font-medium text-gray-800 mb-2">{video.title}</h3>
                      
                      <div className="aspect-w-16 aspect-h-9 bg-black rounded overflow-hidden relative" onContextMenu={preventDownload}>
                        {isYouTubeUrl(video.videoUrl) ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${getYouTubeId(video.videoUrl)}?modestbranding=1&rel=0`}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay;"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <div className="relative w-full h-full">
                            <video
                              controls
                              controlsList="nodownload noplaybackrate"
                              disablePictureInPicture
                              className="w-full h-full"
                            >
                              <source src={getFullVideoUrl(video.videoUrl)} type={`video/${getVideoExtension(video.videoUrl)}`} />
                              متصفحك لا يدعم تشغيل الفيديو
                            </video>
                            <div className="absolute inset-0 pointer-events-none"></div>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-3">
                        <span className="text-xs text-gray-500">
                          {isYouTubeUrl(video.videoUrl) ? "يوتيوب" : "مقطع مباشر"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
  return extension || 'mp4';
}