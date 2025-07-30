// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";

// export default function UpdateVideoPage() {
//   const router = useRouter();
//   const { teacherId, courseId, sessionId, videoId } = useParams() as {
//     teacherId: string;
//     courseId: string;
//     sessionId: string;
//     videoId: string;
//   };

//   const [videoData, setVideoData] = useState({
//     title: "",
//     video: "", // base64 string
//     type: 0,
//     duration: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   // Fetch all videos for the session, find the one with videoId
//   useEffect(() => {
//     const fetchVideo = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) throw new Error("Authentication required");

//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/AllVideoForSession/${sessionId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         if (!res.ok) throw new Error("Failed to fetch videos");

//         const videos = await res.json();
//         const target = videos.find((v: any) => String(v.id) === String(videoId));

//         if (!target) {
//           console.error("Available video IDs:", videos.map((v: any) => v.id));
//           throw new Error("Video not found");
//         }

//         setVideoData({
//           title: target.title || "",
//           video: "", // don't load binary back into the field
//           type: target.type || 0,
//           duration: target.duration || 0,
//         });
//       } catch (err) {
//         console.error("Error fetching video:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVideo();
//   }, [sessionId, videoId]);

//   // Convert file to base64
//   const handleVideoUpload = (file: File) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const base64String = (reader.result as string).split(",")[1];
//       setVideoData((prev) => ({ ...prev, video: base64String }));
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("Authentication required");

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/UpdateVideo/${videoId}`,
//         {
//           method: "PUT",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(videoData),
//         }
//       );

//       if (!response.ok) throw new Error("Failed to update video");

//       router.push(
//         `/teacher/dashboard/${teacherId}/courses/${courseId}/sessions/${sessionId}/videos`
//       );
//     } catch (error) {
//       console.error("Error updating video:", error);
//     }
//   };

//   if (loading) {
//     return <div className="p-4 text-center text-gray-500">جاري تحميل بيانات الفيديو...</div>;
//   }

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">تعديل الفيديو</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1 font-medium">عنوان الفيديو</label>
//           <input
//             type="text"
//             value={videoData.title}
//             onChange={(e) => setVideoData({ ...videoData, title: e.target.value })}
//             className="w-full border border-gray-300 p-2 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">تحميل فيديو جديد (اختياري)</label>
//           <input
//             type="file"
//             accept="video/*"
//             onChange={(e) => {
//               const file = e.target.files?.[0];
//               if (file) {
//                 handleVideoUpload(file);
//               }
//             }}
//             className="w-full border border-gray-300 p-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">نوع الفيديو (رقم)</label>
//           <input
//             type="number"
//             value={videoData.type}
//             onChange={(e) =>
//               setVideoData({ ...videoData, type: parseInt(e.target.value) || 0 })
//             }
//             className="w-full border border-gray-300 p-2 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">مدة الفيديو (بالثواني)</label>
//           <input
//             type="number"
//             value={videoData.duration}
//             onChange={(e) =>
//               setVideoData({ ...videoData, duration: parseInt(e.target.value) || 0 })
//             }
//             className="w-full border border-gray-300 p-2 rounded"
//             required
//           />
//         </div>

//         <div className="flex justify-between gap-4 pt-4">
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
//           >
//             حفظ التعديلات
//           </button>
//           <button
//             type="button"
//             onClick={() =>
//               router.push(
//                 `/teacher/dashboard/${teacherId}/courses/${courseId}/sessions`
//               )
//             }
//             className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 w-full"
//           >
//             إلغاء
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }









"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const videoTypes = [
  { id: 1, name: "مقدمة للكورس" },
  { id: 2, name: "المحاضرات الأساسية" },
  { id: 3, name: "شرح عملي" },
  { id: 4, name: "حل التمارين" },
  { id: 5, name: "ملخص الدرس" },
  { id: 6, name: "إعلانات وإرشادات" },
  { id: 7, name: "محتوى إضافي" },
  { id: 8, name: "مراجعة نهائية" },
  { id: 9, name: "إرشادات الاختبار" },
  { id: 10, name: "أخرى" },
];

export default function UpdateVideoPage() {
  const router = useRouter();
  const { teacherId, courseId, sessionId, videoId } = useParams() as {
    teacherId: string;
    courseId: string;
    sessionId: string;
    videoId: string;
  };

  const [videoData, setVideoData] = useState({
    title: "",
    type: 0,
    duration: 0,
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication required");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/AllVideoForSession/${sessionId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch videos");

        const videos = await res.json();
        const target = videos.find((v: any) => String(v.id) === String(videoId));

        if (!target) throw new Error("Video not found");

        setVideoData({
          title: target.title || "",
          type: target.type || 0,
          duration: target.duration || 0,
        });
      } catch (err) {
        console.error("Error fetching video:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [sessionId, videoId]);

  const handleVideoUpload = (file: File) => {
    setVideoFile(file);

    const tempVideo = document.createElement("video");
    tempVideo.preload = "metadata";
    tempVideo.onloadedmetadata = () => {
      window.URL.revokeObjectURL(tempVideo.src);
      const durationInSeconds = Math.floor(tempVideo.duration);
      setVideoData((prev) => ({ ...prev, duration: durationInSeconds }));
    };
    tempVideo.src = URL.createObjectURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication required");

      const formData = new FormData();
      formData.append("Title", videoData.title);
      formData.append("Type", videoData.type.toString());
      formData.append("Duration", videoData.duration.toString());

      if (videoFile) {
        formData.append("Video", videoFile); // assuming backend expects `VideoFile`
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/UpdateVideo/${videoId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to update video");

      router.push(`/teacher/dashboard/${teacherId}/courses/${courseId}/sessions`);
    } catch (error) {
      console.error("Error updating video:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500">
        جاري تحميل بيانات الفيديو...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        تعديل الفيديو
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">عنوان الفيديو</label>
          <input
            type="text"
            value={videoData.title}
            onChange={(e) =>
              setVideoData({ ...videoData, title: e.target.value })
            }
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            تحميل فيديو جديد (اختياري)
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleVideoUpload(file);
            }}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">نوع الفيديو</label>
          <select
            value={videoData.type}
            onChange={(e) =>
              setVideoData({ ...videoData, type: parseInt(e.target.value) })
            }
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value={0} disabled>
              اختر نوع الفيديو
            </option>
            {videoTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            مدة الفيديو (بالثواني)
          </label>
          <input
            type="number"
            value={videoData.duration}
            readOnly
            className="w-full border border-gray-300 p-2 rounded bg-gray-100 cursor-not-allowed"
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
            onClick={() =>
              router.push(
                `/teacher/dashboard/${teacherId}/courses/${courseId}/sessions`
              )
            }
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 w-full"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
}
