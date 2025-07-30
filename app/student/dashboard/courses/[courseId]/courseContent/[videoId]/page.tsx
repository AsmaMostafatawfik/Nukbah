// "use client";
// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import React from "react";

// interface Video {
//   id: number; // Changed from string to number based on your response
//   title: string;
//   videoUrl: string;
// }

// interface Session {
//   id: number;
//   title: string;
//   videos: Video[];
// }

// interface CourseContent {
//   courseTitle: string;
//   sessions: Session[];
//   exams: any[];
// }

// export default function VideoPage() {
//   const router = useRouter();
//   const params = useParams();
//   const courseId = params.courseId as string;
//   const videoId = params.videoId as string;
  
//   const [content, setContent] = useState<CourseContent | null>(null);
//   const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

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
        
//         // Find the video with matching ID
//         let foundVideo: Video | null = null;
//         for (const session of data.sessions) {
//           const video = session.videos.find(v => v.id.toString() === videoId);
//           if (video) {
//             foundVideo = video;
//             break;
//           }
//         }
        
//         if (!foundVideo) {
//           throw new Error("Video not found");
//         }
        
//         setCurrentVideo(foundVideo);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An unknown error occurred");
//         console.error("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (courseId && videoId) {
//       fetchCourseContent();
//     }
//   }, [courseId, videoId]);

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

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
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
//           onClick={() => router.push(`/student/dashboard/courses/${courseId}`)}
//           className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
//         >
//           العودة إلى محتوى المقرر
//         </button>
//       </div>
//     );
//   }

//   if (!currentVideo) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         الفيديو غير موجود
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50" dir="rtl">
//       <div className="container mx-auto px-4 py-8">
//         <button 
//           onClick={() => router.push(`/student/dashboard/courses/${courseId}/courseContent`)}
//           className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
//           </svg>
//           العودة إلى محتوى المقرر
//         </button>

//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="p-6">
//             <h1 className="text-2xl font-bold text-gray-800 mb-2">{currentVideo.title}</h1>
//             {content && (
//               <p className="text-gray-600 mb-6">{content.courseTitle}</p>
//             )}
            
//             <div className="bg-black rounded-lg overflow-hidden shadow-lg" onContextMenu={preventDownload}>
//               {isYouTubeUrl(currentVideo.videoUrl) ? (
//                 <div className="aspect-w-16 aspect-h-9">
//                   <iframe
//                     src={`https://www.youtube.com/embed/${getYouTubeId(currentVideo.videoUrl)}?modestbranding=1&rel=0`}
//                     className="w-full h-full"
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                   ></iframe>
//                 </div>
//               ) : (
//                 <div className="aspect-w-16 aspect-h-9">
//                   <video
//                     controls
//                     controlsList="nodownload noplaybackrate"
//                     disablePictureInPicture
//                     className="w-full h-full"
//                     autoPlay
//                   >
//                     <source src={getFullVideoUrl(currentVideo.videoUrl)} type={`video/${getVideoExtension(currentVideo.videoUrl)}`} />
//                     متصفحك لا يدعم تشغيل الفيديو
//                   </video>
//                 </div>
//               )}
//             </div>
            
//             <div className="mt-6 flex flex-wrap gap-4">
//               <button
//                 onClick={() => router.push(`/student/dashboard/courses/${courseId}/courseContent`)}
//                 className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//               >
//                 جميع فيديوهات المقرر
//               </button>
//             </div>
//           </div>
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
//   return extension || 'mp4';
// }











"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import React from "react";

interface Video {
  id: number;
  title: string;
  videoUrl: string;
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
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
          onClick={() => router.push(`/student/dashboard/courses/${courseId}`)}
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
        الفيديو غير موجود
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => router.push(`/student/dashboard/courses/${courseId}/courseContent`)}
          className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          العودة إلى محتوى المقرر
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{currentVideo.title}</h1>
            {content && (
              <p className="text-gray-600 mb-6">{content.courseTitle}</p>
            )}
            
            {/* Allowed views information */}
            {allowedViews && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">معلومات المشاهدات المسموحة:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm text-gray-500">المشاهدات المسموحة</p>
                    <p className="font-bold">{allowedViews.allowedCount}</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm text-gray-500">تمت مشاهدتها</p>
                    <p className="font-bold">{allowedViews.viewedCount}</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm text-gray-500">المشاهدات المتبقية</p>
                    <p className="font-bold">{allowedViews.remainingViews}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-blue-600">
                  ملاحظة: عند الضغط على تشغيل الفيديو سيتم خصم مشاهدة من عدد المشاهدات المتبقية
                </p>
              </div>
            )}
            
            <div className="bg-black rounded-lg overflow-hidden shadow-lg" onContextMenu={preventDownload}>
              {isYouTubeUrl(currentVideo.videoUrl) ? (
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(currentVideo.videoUrl)}?modestbranding=1&rel=0`}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
                    autoPlay
                  >
                    <source src={getFullVideoUrl(currentVideo.videoUrl)} type={`video/${getVideoExtension(currentVideo.videoUrl)}`} />
                    متصفحك لا يدعم تشغيل الفيديو
                  </video>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={() => router.push(`/student/dashboard/courses/${courseId}/courseContent`)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
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