// // // app/teacher/dashboard/[teacherId]/courses/[courseId]/sessions/[sessionId]/add-video/page.tsx
// // "use client";
// // import { useState } from "react";
// // import { useParams, useRouter } from "next/navigation";

// // export default function AddVideoPage() {
// //   const params = useParams();
// //   const router = useRouter();
// //   const { teacherId, courseId, sessionId } = params;
  
// //   const [newVideo, setNewVideo] = useState({
// //     title: "",
// //     url: "",
// //     type: 1, // Default to Intro (1)
// //     duration: 0, // Duration in seconds
// //     operation: 0
// //   });
// //   const [error, setError] = useState<string | null>(null);
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const videoTypes = [
// //     { id: 1, name: "مقدمة للكورس أو للمحتوى" },
// //     { id: 2, name: "المحاضرات الأساسية" },
// //     { id: 3, name: "شرح عملي / تطبيقي" },
// //     { id: 4, name: "حل التمرين" },
// //     { id: 5, name: "ملخص الشابتر أو المحاضرة" },
// //     { id: 6, name: "إعلان أو توجيه من المحاضر" },
// //     { id: 7, name: "محتوى إضافي أو اختياري" },
// //     { id: 8, name: "مراجعة نهائية" },
// //     { id: 9, name: "شرح أو إرشاد للاختبار" },
// //     { id: 10, name: "أخرى" }
// //   ];

// //   const handleAddVideo = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setIsSubmitting(true);
// //     setError(null);

// //     try {
// //       const token = localStorage.getItem("token");
// //       if (!token) {
// //         throw new Error("Authentication required");
// //       }

// //       const response = await fetch(
// //         `http://elearning1.runasp.net/api/Teacher/AddVideoToSession/${sessionId}`,
// //         {
// //           method: "POST",
// //           headers: {
// //             "Authorization": `Bearer ${token}`,
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({
// //             title: newVideo.title,
// //             url: newVideo.url,
// //             type: newVideo.type,
// //             duration: newVideo.duration,
// //             operation: newVideo.operation
// //           })
// //         }
// //       );

// //       if (!response.ok) {
// //         throw new Error("Failed to add video");
// //       }

// //       // Redirect back to session details after successful addition
// //       router.push(`/teacher/dashboard/${teacherId}/courses/${courseId}/sessions/${sessionId}`);
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : "Failed to add video");
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const formatDuration = (seconds: number) => {
// //     const hours = Math.floor(seconds / 3600);
// //     const minutes = Math.floor((seconds % 3600) / 60);
// //     const secs = seconds % 60;
// //     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
// //   };

// //   const parseDuration = (durationString: string) => {
// //     const [hours, minutes, seconds] = durationString.split(':').map(Number);
// //     return hours * 3600 + minutes * 60 + seconds;
// //   };

// //   return (
// //     <div className="space-y-8" dir="rtl">
// //       <div className="flex justify-between items-center">
// //         <h1 className="text-3xl font-bold text-gray-800">إضافة فيديو جديد</h1>
// //       </div>

// //       {error && (
// //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
// //           {error}
// //         </div>
// //       )}

// //       <div className="bg-white p-6 rounded-lg shadow">
// //         <form onSubmit={handleAddVideo} className="space-y-4">
// //           <div>
// //             <label className="block mb-2 font-medium">عنوان الفيديو *</label>
// //             <input
// //               type="text"
// //               value={newVideo.title}
// //               onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
// //               className="w-full p-2 border rounded"
// //               required
// //             />
// //           </div>
// //           <div>
// //             <label className="block mb-2 font-medium">رابط الفيديو *</label>
// //             <input
// //               type="url"
// //               value={newVideo.url}
// //               onChange={(e) => setNewVideo({...newVideo, url: e.target.value})}
// //               className="w-full p-2 border rounded"
// //               placeholder="https://example.com/video.mp4"
// //               required
// //             />
// //           </div>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //             <div>
// //               <label className="block mb-2 font-medium">نوع الفيديو *</label>
// //               <select
// //                 value={newVideo.type}
// //                 onChange={(e) => setNewVideo({...newVideo, type: parseInt(e.target.value)})}
// //                 className="w-full p-2 border rounded"
// //                 required
// //               >
// //                 {videoTypes.map((type) => (
// //                   <option key={type.id} value={type.id}>
// //                     {type.name}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //             <div>
// //               <label className="block mb-2 font-medium">المدة (س:د:ث) *</label>
// //               <input
// //                 type="text"
// //                 value={formatDuration(newVideo.duration)}
// //                 onChange={(e) => {
// //                   const dur = parseDuration(e.target.value) || 0;
// //                   setNewVideo({...newVideo, duration: dur});
// //                 }}
// //                 className="w-full p-2 border rounded"
// //                 placeholder="00:00:00"
// //                 pattern="\d{1,2}:\d{2}:\d{2}"
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block mb-2 font-medium">العملية</label>
// //               <select
// //                 value={newVideo.operation}
// //                 onChange={(e) => setNewVideo({...newVideo, operation: parseInt(e.target.value)})}
// //                 className="w-full p-2 border rounded"
// //               >
// //                 <option value="0">عملية أساسية</option>
// //                 <option value="1">عملية إضافية 1</option>
// //                 <option value="2">عملية إضافية 2</option>
// //               </select>
// //             </div>
// //           </div>
// //           <div className="flex gap-4">
// //             <button
// //               type="submit"
// //               disabled={isSubmitting}
// //               className={`px-4 py-2 text-white rounded ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600'}`}
// //             >
// //               {isSubmitting ? 'جاري الحفظ...' : 'حفظ'}
// //             </button>
// //             <button
// //               type="button"
// //               className="px-4 py-2 bg-gray-300 rounded"
// //               onClick={() => router.push(`/teacher/dashboard/${teacherId}/courses/${courseId}/sessions/${sessionId}`)}
// //             >
// //               إلغاء
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }













// "use client";
// import { useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { CheckCircle, XCircle } from "lucide-react";

// export default function AddVideoPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { teacherId, courseId, sessionId } = params;
  
//   const [newVideo, setNewVideo] = useState({
//     title: "",
//     url: "",
//     type: 0, // Changed default to 0 to match API schema
//     duration: 0,
//   });
//   const [durationInput, setDurationInput] = useState("00:00:00");
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const videoTypes = [
//     { id: 0, name: "اختر نوع الفيديو" }, // Added default option
//     { id: 1, name: "مقدمة للكورس أو للمحتوى" },
//     { id: 2, name: "المحاضرات الأساسية" },
//     { id: 3, name: "شرح عملي / تطبيقي" },
//     { id: 4, name: "حل التمرين" },
//     { id: 5, name: "ملخص الشابتر أو المحاضرة" },
//     { id: 6, name: "إعلان أو توجيه من المحاضر" },
//     { id: 7, name: "محتوى إضافي أو اختياري" },
//     { id: 8, name: "مراجعة نهائية" },
//     { id: 9, name: "شرح أو إرشاد للاختبار" },
//     { id: 10, name: "أخرى" }
//   ];

//   const validateForm = () => {
//     if (!newVideo.title.trim()) {
//       setError("عنوان الفيديو مطلوب");
//       return false;
//     }
//     if (!newVideo.url.trim()) {
//       setError("رابط الفيديو مطلوب");
//       return false;
//     }
//     if (!newVideo.url.match(/^https?:\/\/.+/)) {
//       setError("الرجاء إدخال رابط صحيح يبدأ بـ http:// أو https://");
//       return false;
//     }
//     if (newVideo.type === 0) {
//       setError("الرجاء اختيار نوع الفيديو");
//       return false;
//     }
//     if (newVideo.duration <= 0) {
//       setError("المدة يجب أن تكون أكبر من الصفر");
//       return false;
//     }
//     return true;
//   };

//   const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     let value = e.target.value;
//     value = value.replace(/[^0-9:]/g, '');
//     if (value.length > 8) value = value.substring(0, 8);
//     if (value.length > 2 && value[2] !== ':') {
//       value = value.substring(0, 2) + ':' + value.substring(2);
//     }
//     if (value.length > 5 && value[5] !== ':') {
//       value = value.substring(0, 5) + ':' + value.substring(5);
//     }
//     setDurationInput(value);
    
//     if (value.match(/^\d{0,2}:?\d{0,2}:?\d{0,2}$/)) {
//       const [h = '0', m = '0', s = '0'] = value.split(':');
//       const hours = parseInt(h) || 0;
//       const minutes = parseInt(m) || 0;
//       const seconds = parseInt(s) || 0;
//       const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
      
//       setNewVideo(prev => ({
//         ...prev,
//         duration: totalSeconds
//       }));
//       setError(null);
//     }
//   };

//   const handleAddVideo = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);
    
//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("Authentication required");
//       }

//       // Ensure sessionId is a number
//       const numericSessionId = Number(sessionId);
//       if (isNaN(numericSessionId)) {
//         throw new Error("Invalid session ID");
//       }

//       const response = await fetch(
//         `http://elearning1.runasp.net/api/Teacher/AddVideoToSession/${numericSessionId}`,
//         {
//           method: "POST",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             title: newVideo.title,
//             url: newVideo.url,
//             type: newVideo.type,
//             duration: newVideo.duration
//           })
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || "Failed to add video");
//       }

//       setSuccess("تمت إضافة الفيديو بنجاح!");
//       setNewVideo({
//         title: "",
//         url: "",
//         type: 0,
//         duration: 0,
//       });
//       setDurationInput("00:00:00");
      
//       setTimeout(() => {
//         router.push(`/teacher/dashboard/${teacherId}/courses/${courseId}/sessions/${sessionId}`);
//       }, 2000);

//     } catch (err) {
//       setError(err instanceof Error ? err.message : "حدث خطأ أثناء إضافة الفيديو");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="space-y-8" dir="rtl">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-gray-800">إضافة فيديو جديد</h1>
//       </div>

//       {error && (
//         <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           <XCircle className="text-red-500" size={20} />
//           <span>{error}</span>
//         </div>
//       )}

//       {success && (
//         <div className="flex items-center gap-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
//           <CheckCircle className="text-green-500" size={20} />
//           <span>{success}</span>
//         </div>
//       )}

//       <div className="bg-white p-6 rounded-lg shadow">
//         <form onSubmit={handleAddVideo} className="space-y-4">
//           <div>
//             <label className="block mb-2 font-medium">عنوان الفيديو *</label>
//             <input
//               type="text"
//               value={newVideo.title}
//               onChange={(e) => {
//                 setNewVideo({...newVideo, title: e.target.value});
//                 setError(null);
//               }}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="block mb-2 font-medium">رابط الفيديو *</label>
//             <input
//               type="url"
//               value={newVideo.url}
//               onChange={(e) => {
//                 setNewVideo({...newVideo, url: e.target.value});
//                 setError(null);
//               }}
//               className="w-full p-2 border rounded"
//               placeholder="https://example.com/video.mp4"
//               required
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-2 font-medium">نوع الفيديو *</label>
//               <select
//                 value={newVideo.type}
//                 onChange={(e) => {
//                   setNewVideo({...newVideo, type: parseInt(e.target.value)});
//                   setError(null);
//                 }}
//                 className="w-full p-2 border rounded"
//                 required
//               >
//                 {videoTypes.map((type) => (
//                   <option key={type.id} value={type.id}>
//                     {type.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block mb-2 font-medium">المدة (س:د:ث) *</label>
//               <input
//                 type="text"
//                 value={durationInput}
//                 onChange={handleDurationChange}
//                 className="w-full p-2 border rounded"
//                 placeholder="00:00:00"
//                 required
//               />
//             </div>
//           </div>
//           <div className="flex gap-4">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`px-4 py-2 text-white rounded flex items-center gap-2 ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
//             >
//               {isSubmitting ? (
//                 <>
//                   <span className="animate-spin">↻</span>
//                   <span>جاري الحفظ...</span>
//                 </>
//               ) : (
//                 "حفظ"
//               )}
//             </button>
//             <button
//               type="button"
//               className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//               onClick={() => router.push(`/teacher/dashboard/${teacherId}/courses/${courseId}/sessions/${sessionId}`)}
//             >
//               إلغاء
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }








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
        `http://elearning1.runasp.net/api/Teacher/AddVideoToSession/${numericSessionId}`,
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
        router.push(`/teacher/dashboard/${teacherId}/courses/${courseId}/sessions/${sessionId}`);
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