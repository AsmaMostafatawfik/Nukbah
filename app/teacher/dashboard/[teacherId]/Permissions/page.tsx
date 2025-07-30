// // "use client";
// // import { useState, useEffect } from "react";
// // import { useParams, useRouter } from "next/navigation";
// // import { Check, X, Clock, ChevronDown, ChevronUp } from "lucide-react";

// // interface Request {
// //   id: number;
// //   studentName: string;
// //   videoTitle: string;
// //   reason: string;
// //   status: "Pending" | "Approved" | "Rejected";
// // }

// // interface CourseRequests {
// //   courseTitle: string;
// //   requests: Request[];
// // }

// // export default function ViewExtensionRequestsPage() {
// //   const params = useParams();
// //   const router = useRouter();
// //   const { teacherId } = params;
// //   const [coursesData, setCoursesData] = useState<CourseRequests[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [expandedCourses, setExpandedCourses] = useState<Record<string, boolean>>({});

// //   useEffect(() => {
// //     const fetchRequests = async () => {
// //       try {
// //         const token = localStorage.getItem("token");
// //         if (!token) {
// //           throw new Error("Authentication required");
// //         }

// //         const response = await fetch(
// //           `https://elearning1.runasp.net/api/Teacher/AllRequestsForExtensionViewsGroupedByCourse/${teacherId}`,
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         );

// //         if (!response.ok) {
// //           throw new Error(`Failed to fetch requests: ${response.status}`);
// //         }

// //         const data = await response.json();
// //         setCoursesData(data);
        
// //         // Initialize expanded state for each course
// //         const initialExpandedState: Record<string, boolean> = {};
// //         data.forEach((course: CourseRequests) => {
// //           initialExpandedState[course.courseTitle] = true;
// //         });
// //         setExpandedCourses(initialExpandedState);
// //       } catch (err) {
// //         setError(err instanceof Error ? err.message : "An unknown error occurred");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchRequests();
// //   }, [teacherId]);

// //   const toggleCourseExpand = (courseTitle: string) => {
// //     setExpandedCourses(prev => ({
// //       ...prev,
// //       [courseTitle]: !prev[courseTitle]
// //     }));
// //   };

// //   const handleUpdateRequest = async (requestId: number, newStatus: "Approved" | "Rejected") => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       if (!token) {
// //         throw new Error("Authentication required");
// //       }

// //       const response = await fetch(
// //         `https://elearning1.runasp.net/api/Teacher/UpdateRequestForExtensionViews/${requestId}`,
// //         {
// //           method: "PUT",
// //           headers: {
// //             "Authorization": `Bearer ${token}`,
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({
// //             status: newStatus
// //           })
// //         }
// //       );

// //       if (!response.ok) {
// //         throw new Error(`Failed to update request: ${response.status}`);
// //       }

// //       // Update local state
// //       setCoursesData(prev => prev.map(course => ({
// //         ...course,
// //         requests: course.requests.map(request => 
// //           request.id === requestId ? { ...request, status: newStatus } : request
// //         )
// //       })));
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : "Failed to update request");
// //     }
// //   };

// //   const getStatusIcon = (status: string) => {
// //     switch (status) {
// //       case "Approved":
// //         return <Check className="text-green-500" size={18} />;
// //       case "Rejected":
// //         return <X className="text-red-500" size={18} />;
// //       default:
// //         return <Clock className="text-yellow-500" size={18} />;
// //     }
// //   };

// //   const getStatusColor = (status: string) => {
// //     switch (status) {
// //       case "Approved":
// //         return "bg-green-100 text-green-800";
// //       case "Rejected":
// //         return "bg-red-100 text-red-800";
// //       default:
// //         return "bg-yellow-100 text-yellow-800";
// //     }
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
// //       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mx-4">
// //         {error}
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6 p-4 md:p-8" dir="rtl">
// //       <h1 className="text-2xl md:text-3xl font-bold text-gray-800">طلبات تمديد مشاهدات الفيديوهات</h1>
      
// //       {coursesData.length === 0 ? (
// //         <div className="text-center py-8 text-gray-500">
// //           لا توجد طلبات متاحة حالياً
// //         </div>
// //       ) : (
// //         <div className="space-y-4">
// //           {coursesData.map((course, index) => (
// //             <div key={`course-${index}`} className="border rounded-lg overflow-hidden">
// //               <div 
// //                 className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
// //                 onClick={() => toggleCourseExpand(course.courseTitle)}
// //               >
// //                 <h2 className="font-bold text-lg text-gray-800">
// //                   {course.courseTitle}
// //                   <span className="text-sm font-normal text-gray-600 mr-2">
// //                     ({course.requests.length} طلب)
// //                   </span>
// //                 </h2>
// //                 {expandedCourses[course.courseTitle] ? (
// //                   <ChevronUp className="text-gray-500" />
// //                 ) : (
// //                   <ChevronDown className="text-gray-500" />
// //                 )}
// //               </div>
              
// //               {expandedCourses[course.courseTitle] && (
// //                 <div className="divide-y">
// //                   {course.requests.map((request) => (
// //                     <div key={`request-${request.id}`} className="p-4">
// //                       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
// //                         <div className="flex-1">
// //                           <div className="flex items-center gap-2 mb-2">
// //                             <h3 className="font-medium text-gray-800">{request.videoTitle}</h3>
// //                             <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(request.status)}`}>
// //                               {request.status === "Pending" ? "قيد الانتظار" : 
// //                                request.status === "Approved" ? "مقبول" : "مرفوض"}
// //                             </span>
// //                           </div>
// //                           <p className="text-gray-600 mb-2">
// //                             <span className="font-medium">الطالب:</span> {request.studentName}
// //                           </p>
// //                           <p className="text-gray-600">
// //                             <span className="font-medium">السبب:</span> {request.reason}
// //                           </p>
// //                         </div>
                        
// //                         {request.status === "Pending" && (
// //                           <div className="flex gap-2">
// //                             <button
// //                               onClick={() => handleUpdateRequest(request.id, "Approved")}
// //                               className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
// //                             >
// //                               <Check size={16} />
// //                               قبول
// //                             </button>
// //                             <button
// //                               onClick={() => handleUpdateRequest(request.id, "Rejected")}
// //                               className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
// //                             >
// //                               <X size={16} />
// //                               رفض
// //                             </button>
// //                           </div>
// //                         )}
                        
// //                         {request.status !== "Pending" && (
// //                           <div className="flex items-center gap-1 text-sm">
// //                             {getStatusIcon(request.status)}
// //                             <span>
// //                               {request.status === "Approved" ? "تم القبول" : "تم الرفض"}
// //                             </span>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }













// "use client";
// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { Check, X, Clock, ChevronDown, ChevronUp } from "lucide-react";

// interface Request {
//   id: number;
//   studentName: string;
//   videoTitle: string;
//   reason: string;
//   status: "Pending" | "Approved" | "Rejected"; // Keeping string for UI, will map to numbers for API
// }

// interface CourseRequests {
//   courseTitle: string;
//   requests: Request[];
// }

// export default function ViewExtensionRequestsPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { teacherId } = params;
//   const [coursesData, setCoursesData] = useState<CourseRequests[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [expandedCourses, setExpandedCourses] = useState<Record<string, boolean>>({});
//   const [showApproveModal, setShowApproveModal] = useState(false);
//   const [currentRequestId, setCurrentRequestId] = useState<number | null>(null);
//   const [extraViews, setExtraViews] = useState<number>(1);

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("Authentication required");
//         }

//         const response = await fetch(
//           `https://elearning1.runasp.net/api/Teacher/AllRequestsForExtensionViewsGroupedByCourse/${teacherId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`Failed to fetch requests: ${response.status}`);
//         }

//         const data = await response.json();
//         setCoursesData(data);
        
//         // Initialize expanded state for each course
//         const initialExpandedState: Record<string, boolean> = {};
//         data.forEach((course: CourseRequests) => {
//           initialExpandedState[course.courseTitle] = true;
//         });
//         setExpandedCourses(initialExpandedState);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An unknown error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, [teacherId]);

//   const toggleCourseExpand = (courseTitle: string) => {
//     setExpandedCourses(prev => ({
//       ...prev,
//       [courseTitle]: !prev[courseTitle]
//     }));
//   };

//   const handleApproveClick = (requestId: number) => {
//     setCurrentRequestId(requestId);
//     setShowApproveModal(true);
//   };

//   const handleRejectClick = async (requestId: number) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("Authentication required");
//       }

//       const response = await fetch(
//         `https://elearning1.runasp.net/api/Teacher/ApproveRejectRequest/${requestId}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             status: 2, // Rejected
//             extraViews: 0
//           })
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to reject request: ${response.status}`);
//       }

//       // Update local state
//       setCoursesData(prev => prev.map(course => ({
//         ...course,
//         requests: course.requests.map(request => 
//           request.id === requestId ? { ...request, status: "Rejected" } : request
//         )
//       })));
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to reject request");
//     }
//   };

//   const handleApproveConfirm = async () => {
//     if (!currentRequestId) return;

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("Authentication required");
//       }

//       const response = await fetch(
//         `https://elearning1.runasp.net/api/Teacher/ApproveRejectRequest/${currentRequestId}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             status: 1, // Approved
//             extraViews: extraViews
//           })
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to approve request: ${response.status}`);
//       }

//       // Update local state
//       setCoursesData(prev => prev.map(course => ({
//         ...course,
//         requests: course.requests.map(request => 
//           request.id === currentRequestId ? { ...request, status: "Approved" } : request
//         )
//       })));

//       // Close modal
//       setShowApproveModal(false);
//       setCurrentRequestId(null);
//       setExtraViews(1);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to approve request");
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "Approved":
//         return <Check className="text-green-500" size={18} />;
//       case "Rejected":
//         return <X className="text-red-500" size={18} />;
//       default:
//         return <Clock className="text-yellow-500" size={18} />;
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "Approved":
//         return "bg-green-100 text-green-800";
//       case "Rejected":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-yellow-100 text-yellow-800";
//     }
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
//       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mx-4">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 p-4 md:p-8" dir="rtl">
//       <h1 className="text-2xl md:text-3xl font-bold text-gray-800">طلبات تمديد مشاهدات الفيديوهات</h1>
      
//       {coursesData.length === 0 ? (
//         <div className="text-center py-8 text-gray-500">
//           لا توجد طلبات متاحة حالياً
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {coursesData.map((course, index) => (
//             <div key={`course-${index}`} className="border rounded-lg overflow-hidden">
//               <div 
//                 className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
//                 onClick={() => toggleCourseExpand(course.courseTitle)}
//               >
//                 <h2 className="font-bold text-lg text-gray-800">
//                   {course.courseTitle}
//                   <span className="text-sm font-normal text-gray-600 mr-2">
//                     ({course.requests.length} طلب)
//                   </span>
//                 </h2>
//                 {expandedCourses[course.courseTitle] ? (
//                   <ChevronUp className="text-gray-500" />
//                 ) : (
//                   <ChevronDown className="text-gray-500" />
//                 )}
//               </div>
              
//               {expandedCourses[course.courseTitle] && (
//                 <div className="divide-y">
//                   {course.requests.map((request) => (
//                     <div key={`request-${request.id}`} className="p-4">
//                       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2 mb-2">
//                             <h3 className="font-medium text-gray-800">{request.videoTitle}</h3>
//                             <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(request.status)}`}>
//                               {request.status === "Pending" ? "قيد الانتظار" : 
//                                request.status === "Approved" ? "مقبول" : "مرفوض"}
//                             </span>
//                           </div>
//                           <p className="text-gray-600 mb-2">
//                             <span className="font-medium">الطالب:</span> {request.studentName}
//                           </p>
//                           <p className="text-gray-600">
//                             <span className="font-medium">السبب:</span> {request.reason}
//                           </p>
//                         </div>
                        
//                         {request.status === "Pending" && (
//                           <div className="flex gap-2">
//                             <button
//                               onClick={() => handleApproveClick(request.id)}
//                               className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//                             >
//                               <Check size={16} />
//                               قبول
//                             </button>
//                             <button
//                               onClick={() => handleRejectClick(request.id)}
//                               className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                             >
//                               <X size={16} />
//                               رفض
//                             </button>
//                           </div>
//                         )}
                        
//                         {request.status !== "Pending" && (
//                           <div className="flex items-center gap-1 text-sm">
//                             {getStatusIcon(request.status)}
//                             <span>
//                               {request.status === "Approved" ? "تم القبول" : "تم الرفض"}
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Approve Modal */}
//       {showApproveModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <h3 className="text-lg font-bold mb-4">إعدادات الموافقة</h3>
//             <div className="mb-4">
//               <label className="block mb-2 text-sm font-medium text-gray-700">
//                 عدد المشاهدات الإضافية
//               </label>
//               <input
//                 type="number"
//                 min="1"
//                 value={extraViews}
//                 onChange={(e) => setExtraViews(Number(e.target.value) || 1)}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//             </div>
//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => {
//                   setShowApproveModal(false);
//                   setExtraViews(1);
//                 }}
//                 className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
//               >
//                 إلغاء
//               </button>
//               <button
//                 onClick={handleApproveConfirm}
//                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//               >
//                 تأكيد
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }













'use client';
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Check, X, Clock, ChevronDown, ChevronUp } from "lucide-react";

// Interfaces for video extension requests
interface VideoRequest {
  id: number;
  studentName: string;
  videoTitle: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

interface CourseVideoRequests {
  courseTitle: string;
  requests: VideoRequest[];
}

// Interfaces for exam retake requests
interface RetakeRequest {
  id: number;
  examId: number;
  examTitle: string;
  studentId: string;
  studentName: string;
  reason: string;
  status: number; // 0: Pending, 1: Approved, 2: Rejected
  requestDate: string;
}

interface ExamDetails {
  title: string;
  type: number;
  durationMinutes: number;
  questions: {
    question: string;
    questionType: number;
    score: number;
    answers: string[];
  }[];
}

export default function CombinedRequestsPage() {
  const params = useParams();
  const { teacherId ,examId } = params;
  const [activeTab, setActiveTab] = useState<'video' | 'exam'>('video');
  
  // Video requests state
  const [videoRequests, setVideoRequests] = useState<CourseVideoRequests[]>([]);
  const [videoExpanded, setVideoExpanded] = useState<Record<string, boolean>>({});
  
  // Exam requests state
  const [examRequests, setExamRequests] = useState<RetakeRequest[]>([]);
  const [examDetails, setExamDetails] = useState<Record<number, ExamDetails>>({});
  const [examExpanded, setExamExpanded] = useState<Record<number, boolean>>({});
  
  // Common state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState<number | null>(null);
  const [extraViews, setExtraViews] = useState<number>(1);
  const [currentRequestType, setCurrentRequestType] = useState<'video' | 'exam'>('video');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required");
        }

        // Fetch video requests if on video tab or first load
        if (activeTab === 'video') {
          const videoResponse = await fetch(
            `https://elearning1.runasp.net/api/Teacher/AllRequestsForExtensionViewsGroupedByCourse/${teacherId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (!videoResponse.ok) throw new Error("Failed to fetch video requests");
          const videoData = await videoResponse.json();
          setVideoRequests(videoData);
          
          const initialExpanded: Record<string, boolean> = {};
          videoData.forEach((course: CourseVideoRequests) => {
            initialExpanded[course.courseTitle] = true;
          });
          setVideoExpanded(initialExpanded);
        }

        // Fetch exam requests if on exam tab or first load
        if (activeTab === 'exam') {
          const examResponse = await fetch(
            `https://elearning1.runasp.net/api/Teacher/teacher-retake-requests/${teacherId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (!examResponse.ok) throw new Error("Failed to fetch exam requests");
          const examData = await examResponse.json();
          setExamRequests(examData);
          
          const initialExpanded: Record<number, boolean> = {};
          examData.forEach((request: RetakeRequest) => {
            initialExpanded[request.id] = false;
          });
          setExamExpanded(initialExpanded);

          // Fetch exam details for each unique exam
          const uniqueExamIds = [...new Set(examData.map((r: RetakeRequest) => r.examId))];
          const details: Record<number, ExamDetails> = {};
          
          for (const examId of uniqueExamIds) {
            const examDetailsResponse = await fetch(
              `https://elearning1.runasp.net/api/Teacher/ExamDetails/${examId}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            // if (examDetailsResponse.ok) {
            //   details[examId] = await examDetailsResponse.json();
            // }
          }
          setExamDetails(details);
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teacherId, activeTab]);

  // Common helper functions
  const getStatusIcon = (status: string | number) => {
    const statusNum = typeof status === 'string' ? 
      (status === "Approved" ? 1 : status === "Rejected" ? 2 : 0) : status;
    
    switch (statusNum) {
      case 1: return <Check className="text-green-500" size={18} />;
      case 2: return <X className="text-red-500" size={18} />;
      default: return <Clock className="text-yellow-500" size={18} />;
    }
  };

  const getStatusText = (status: string | number) => {
    const statusNum = typeof status === 'string' ? 
      (status === "Approved" ? 1 : status === "Rejected" ? 2 : 0) : status;
    
    switch (statusNum) {
      case 1: return "مقبول";
      case 2: return "مرفوض";
      default: return "قيد الانتظار";
    }
  };

  const getStatusColor = (status: string | number) => {
    const statusNum = typeof status === 'string' ? 
      (status === "Approved" ? 1 : status === "Rejected" ? 2 : 0) : status;
    
    switch (statusNum) {
      case 1: return "bg-green-100 text-green-800";
      case 2: return "bg-red-100 text-red-800";
      default: return "bg-yellow-100 text-yellow-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Video request handlers
  const toggleVideoCourseExpand = (courseTitle: string) => {
    setVideoExpanded(prev => ({ ...prev, [courseTitle]: !prev[courseTitle] }));
  };

  const handleVideoApproveClick = (requestId: number) => {
    setCurrentRequestId(requestId);
    setCurrentRequestType('video');
    setShowApproveModal(true);
  };

  const handleVideoRejectClick = async (requestId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication required");

      const response = await fetch(
        `https://elearning1.runasp.net/api/Teacher/UpdateRequestForExtensionViews/${requestId}`,
        {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Rejected" })
        }
      );

      if (!response.ok) throw new Error("Failed to reject request");

      setVideoRequests(prev => prev.map(course => ({
        ...course,
        requests: course.requests.map(req => 
          req.id === requestId ? { ...req, status: "Rejected" } : req
        )
      })));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reject request");
    }
  };

  // Exam request handlers
  const toggleExamRequestExpand = (requestId: number) => {
    setExamExpanded(prev => ({ ...prev, [requestId]: !prev[requestId] }));
  };

  const handleExamApproveClick = (requestId: number) => {
    setCurrentRequestId(requestId);
    setCurrentRequestType('exam');
    setShowApproveModal(true);
  };

  const handleExamRejectClick = async (requestId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication required");

      const response = await fetch(
        `https://elearning1.runasp.net/api/Teacher/approve-reject-retake/${requestId}`,
        {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: 2 }) // Rejected
        }
      );

      if (!response.ok) throw new Error("Failed to reject request");

      setExamRequests(prev => prev.map(req => 
        req.id === requestId ? { ...req, status: 2 } : req
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reject request");
    }
  };

  // Common modal handler
  const handleApproveConfirm = async () => {
    if (!currentRequestId) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication required");

      if (currentRequestType === 'video') {
        const response = await fetch(
          `https://elearning1.runasp.net/api/Teacher/UpdateRequestForExtensionViews/${currentRequestId}`,
          {
            method: "PUT",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              status: "Approved",
              extraViews: extraViews
            })
          }
        );

        if (!response.ok) throw new Error("Failed to approve video request");

        setVideoRequests(prev => prev.map(course => ({
          ...course,
          requests: course.requests.map(req => 
            req.id === currentRequestId ? { ...req, status: "Approved" } : req
          )
        })));
      } else {
        const response = await fetch(
          `https://elearning1.runasp.net/api/Teacher/approve-reject-retake/${currentRequestId}`,
          {
            method: "PATCH",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: 1 }) // Approved
          }
        );

        if (!response.ok) throw new Error("Failed to approve exam request");

        setExamRequests(prev => prev.map(req => 
          req.id === currentRequestId ? { ...req, status: 1 } : req
        ));
      }

      setShowApproveModal(false);
      setCurrentRequestId(null);
      setExtraViews(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to approve request");
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
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mx-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-8" dir="rtl">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">طلبات الطلاب</h1>
      
      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'video' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('video')}
        >
          طلبات تمديد المشاهدة
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'exam' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('exam')}
        >
          طلبات إعادة الاختبار
        </button>
      </div>

      {/* Video Requests Tab */}
      {activeTab === 'video' && (
        <div className="space-y-4">
          {videoRequests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              لا توجد طلبات تمديد مشاهدة متاحة حالياً
            </div>
          ) : (
            videoRequests.map((course, index) => (
              <div key={`video-course-${index}`} className="border rounded-lg overflow-hidden">
                <div 
                  className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                  onClick={() => toggleVideoCourseExpand(course.courseTitle)}
                >
                  <h2 className="font-bold text-lg text-gray-800">
                    {course.courseTitle}
                    <span className="text-sm font-normal text-gray-600 mr-2">
                      ({course.requests.length} طلب)
                    </span>
                  </h2>
                  {videoExpanded[course.courseTitle] ? (
                    <ChevronUp className="text-gray-500" />
                  ) : (
                    <ChevronDown className="text-gray-500" />
                  )}
                </div>
                
                {videoExpanded[course.courseTitle] && (
                  <div className="divide-y">
                    {course.requests.map((request) => (
                      <div key={`video-request-${request.id}`} className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-medium text-gray-800">{request.videoTitle}</h3>
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(request.status)}`}>
                                {getStatusText(request.status)}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-2">
                              <span className="font-medium">الطالب:</span> {request.studentName}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-medium">السبب:</span> {request.reason}
                            </p>
                          </div>
                          
                          {request.status === "Pending" && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleVideoApproveClick(request.id)}
                                className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                              >
                                <Check size={16} />
                                قبول
                              </button>
                              <button
                                onClick={() => handleVideoRejectClick(request.id)}
                                className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                              >
                                <X size={16} />
                                رفض
                              </button>
                            </div>
                          )}
                          
                          {request.status !== "Pending" && (
                            <div className="flex items-center gap-1 text-sm">
                              {getStatusIcon(request.status)}
                              <span>
                                {request.status === "Approved" ? "تم القبول" : "تم الرفض"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Exam Requests Tab */}
      {activeTab === 'exam' && (
        <div className="space-y-4">
          {examRequests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              لا توجد طلبات إعادة اختبار متاحة حالياً
            </div>
          ) : (
            examRequests.map((request) => (
              <div key={`exam-request-${request.id}`} className="border rounded-lg overflow-hidden">
                <div 
                  className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                  onClick={() => toggleExamRequestExpand(request.id)}
                >
                  <div>
                    <h2 className="font-bold text-gray-800">
                      {request.examTitle}
                      <span className="text-sm font-normal text-gray-600 mr-2">
                        (طلب من: {request.studentName})
                      </span>
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(request.status)}`}>
                        {getStatusText(request.status)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(request.requestDate)}
                      </span>
                    </div>
                  </div>
                  {examExpanded[request.id] ? (
                    <ChevronUp className="text-gray-500" />
                  ) : (
                    <ChevronDown className="text-gray-500" />
                  )}
                </div>
                
                {examExpanded[request.id] && (
                  <div className="p-4 space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-800">تفاصيل الاختبار</h3>
                      {examDetails[request.examId] ? (
                        <div className="mt-2 text-gray-600">
                          <p>المدة: {examDetails[request.examId].durationMinutes} دقيقة</p>
                          <p>عدد الأسئلة: {examDetails[request.examId].questions.length}</p>
                          <p>النوع: {examDetails[request.examId].type === 0 ? "اختيار من متعدد" : 
                                    examDetails[request.examId].type === 1 ? "صح أو خطأ" : "متعدد الإجابات"}</p>
                        </div>
                      ) : (
                        <p className="text-gray-500 mt-2">جاري تحميل تفاصيل الاختبار...</p>
                      )}
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-800">سبب الطلب</h3>
                      <p className="mt-2 text-gray-600">{request.reason}</p>
                    </div>

                    <div className="pt-2">
                      {request.status === 0 ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleExamApproveClick(request.id)}
                            className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            <Check size={16} />
                            قبول
                          </button>
                          <button
                            onClick={() => handleExamRejectClick(request.id)}
                            className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            <X size={16} />
                            رفض
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-sm">
                          {getStatusIcon(request.status)}
                          <span>
                            {request.status === 1 ? "تم قبول الطلب" : "تم رفض الطلب"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Approve Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {currentRequestType === 'video' ? 'إعدادات الموافقة' : 'تأكيد الموافقة على الطلب'}
            </h3>
            
            {currentRequestType === 'video' ? (
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  عدد المشاهدات الإضافية
                </label>
                <input
                  type="number"
                  min="1"
                  value={extraViews}
                  onChange={(e) => setExtraViews(Number(e.target.value) || 1)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            ) : (
              <p className="mb-4">هل أنت متأكد من الموافقة على طلب إعادة الاختبار؟</p>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowApproveModal(false);
                  setExtraViews(1);
                }}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
              >
                إلغاء
              </button>
              <button
                onClick={handleApproveConfirm}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                تأكيد
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}