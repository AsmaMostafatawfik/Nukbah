// "use client";
// import React, { useEffect, useState } from 'react';

// interface PaymentRequest {
//   requestId: number;
//   fullName: string;
//   email: string;
//   paymentReference: string;
//   paymentMethod: string;
//   coursePrice: number;
//   screenShotUrl: string;
//   status: number; // 0: Pending, 1: Approved, 2: Rejected
// }

// export default function PaymentsPage() {
//   const [requests, setRequests] = useState<PaymentRequest[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [updatingStatus, setUpdatingStatus] = useState<{requestId: number, status: number} | null>(null);

//   useEffect(() => {
//     fetchPaymentRequests();
//   }, []);

//   const fetchPaymentRequests = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("Authentication required");
//       }

//       const response = await fetch(
//         "https://elearning1.runasp.net/api/Admin/StudentRequests",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch payment requests");
//       }

//       const data: PaymentRequest[] = await response.json();
//       setRequests(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An unknown error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateRequestStatus = async (requestId: number, newStatus: number) => {
//     try {
//       setUpdatingStatus({requestId, status: newStatus});
//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("Authentication required");
//       }

//       const response = await fetch(
//         `https://elearning1.runasp.net/api/Admin/RequestStatus/${requestId}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ status: newStatus }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update status");
//       }

//       // Update local state to reflect the change
//       setRequests(prevRequests =>
//         prevRequests.map(request =>
//           request.requestId === requestId
//             ? { ...request, status: newStatus }
//             : request
//         )
//       );
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to update status");
//     } finally {
//       setUpdatingStatus(null);
//     }
//   };

//   const getStatusText = (status: number): string => {
//     switch (status) {
//       case 0: return "Pending";
//       case 1: return "Approved";
//       case 2: return "Rejected";
//       default: return "Unknown";
//     }
//   };

//   const getStatusColor = (status: number): string => {
//     switch (status) {
//       case 0: return "bg-yellow-100 text-yellow-800";
//       case 1: return "bg-green-100 text-green-800";
//       case 2: return "bg-red-100 text-red-800";
//       default: return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getFullImageUrl = (url: string) => {
//     if (url.startsWith("http") || url.startsWith("//")) {
//       return url;
//     }
//     return `https://elearning1.runasp.net${url.startsWith('/') ? url : `/${url}`}`;
//   };

//   const openImageModal = (imageUrl: string) => {
//     setSelectedImage(getFullImageUrl(imageUrl));
//   };

//   const closeImageModal = () => {
//     setSelectedImage(null);
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
//           onClick={() => window.location.reload()}
//           className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//         >
//           إعادة تحميل
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8" dir="rtl">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">طلبات الدفع</h1>
      
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الرقم</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاسم</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">البريد الإلكتروني</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رقم المرجع</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">طريقة الدفع</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">السعر</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">حالة الطلب</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">صورة الإيصال</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراءات</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {requests.map((request) => (
//                 <tr key={request.requestId}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.requestId}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.fullName}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.email}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.paymentReference}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {request.paymentMethod === "Fawry" ? "فوري" : "فودافون كاش"}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.coursePrice} ج.م</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
//                       {getStatusText(request.status)}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <button
//                       onClick={() => openImageModal(request.screenShotUrl)}
//                       className="text-indigo-600 hover:text-indigo-900"
//                     >
//                       عرض الصورة
//                     </button>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => updateRequestStatus(request.requestId, 0)}
//                         disabled={request.status === 0 || (updatingStatus?.requestId === request.requestId && updatingStatus?.status !== 0)}
//                         className={`px-2 py-1 text-xs rounded ${request.status === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}
//                       >
//                         {updatingStatus?.requestId === request.requestId && updatingStatus?.status === 0 ? 'جاري...' : 'إعادة إلى قيد الانتظار'}
//                       </button>
//                       <button
//                         onClick={() => updateRequestStatus(request.requestId, 1)}
//                         disabled={request.status === 1 || (updatingStatus?.requestId === request.requestId && updatingStatus?.status !== 1)}
//                         className={`px-2 py-1 text-xs rounded ${request.status === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
//                       >
//                         {updatingStatus?.requestId === request.requestId && updatingStatus?.status === 1 ? 'جاري...' : 'موافقة'}
//                       </button>
//                       <button
//                         onClick={() => updateRequestStatus(request.requestId, 2)}
//                         disabled={request.status === 2 || (updatingStatus?.requestId === request.requestId && updatingStatus?.status !== 2)}
//                         className={`px-2 py-1 text-xs rounded ${request.status === 2 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-red-100 text-red-800 hover:bg-red-200'}`}
//                       >
//                         {updatingStatus?.requestId === request.requestId && updatingStatus?.status === 2 ? 'جاري...' : 'رفض'}
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Image Modal */}
//       {selectedImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
//             <div className="flex justify-between items-center p-4 border-b">
//               <h3 className="text-lg font-medium">صورة إيصال الدفع</h3>
//               <button 
//                 onClick={closeImageModal}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//             <div className="p-4">
//               <img 
//                 src={selectedImage} 
//                 alt="Payment Receipt" 
//                 className="max-w-full h-auto mx-auto"
//               />
//             </div>
//             <div className="p-4 border-t flex justify-end">
//               <button
//                 onClick={closeImageModal}
//                 className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//               >
//                 إغلاق
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }













"use client";
import React, { useEffect, useState } from 'react';

interface PaymentRequest {
  requestId: number;
  fullName: string;
  email: string;
  paymentReference: string;
  paymentMethod: string;
  coursePrice: number;
  screenShotUrl: string;
  status: number; // 0: Pending, 1: Approved, 2: Rejected
}

export default function PaymentsPage() {
  const [requests, setRequests] = useState<PaymentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<{requestId: number, status: number} | null>(null);

  useEffect(() => {
    fetchPaymentRequests();
  }, []);

  const fetchPaymentRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
        "https://elearning1.runasp.net/api/Admin/StudentRequests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch payment requests");
      }

      const data: PaymentRequest[] = await response.json();
      setRequests(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (requestId: number, newStatus: number) => {
    try {
      setUpdatingStatus({requestId, status: newStatus});
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
        `https://elearning1.runasp.net/api/Admin/RequestStatus/${requestId}`,
        {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setRequests(prevRequests =>
        prevRequests.map(request =>
          request.requestId === requestId
            ? { ...request, status: newStatus }
            : request
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusText = (status: number): string => {
    switch (status) {
      case 0: return "Pending";
      case 1: return "Approved";
      case 2: return "Rejected";
      default: return "Unknown";
    }
  };

  const getStatusColor = (status: number): string => {
    switch (status) {
      case 0: return "bg-yellow-100 text-yellow-800";
      case 1: return "bg-green-100 text-green-800";
      case 2: return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getFullImageUrl = (url: string) => {
    if (url.startsWith("http") || url.startsWith("//")) {
      return url;
    }
    return `https://elearning1.runasp.net${url.startsWith('/') ? url : `/${url}`}`;
  };

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(getFullImageUrl(imageUrl));
  };

  const closeImageModal = () => {
    setSelectedImage(null);
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
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          إعادة تحميل
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">طلبات الدفع</h1>
      
      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الرقم</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاسم</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">البريد الإلكتروني</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رقم المرجع</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">طريقة الدفع</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">السعر</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">حالة الطلب</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">صورة الإيصال</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request.requestId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.requestId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.paymentReference}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.paymentMethod === "Fawry" ? "فوري" : "فودافون كاش"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.coursePrice} ج.م</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
                      {getStatusText(request.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => openImageModal(request.screenShotUrl)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      عرض الصورة
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateRequestStatus(request.requestId, 0)}
                        disabled={request.status === 0 || (updatingStatus?.requestId === request.requestId && updatingStatus?.status !== 0)}
                        className={`px-2 py-1 text-xs rounded ${request.status === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}
                      >
                        {updatingStatus?.requestId === request.requestId && updatingStatus?.status === 0 ? 'جاري...' : 'إعادة إلى قيد الانتظار'}
                      </button>
                      <button
                        onClick={() => updateRequestStatus(request.requestId, 1)}
                        disabled={request.status === 1 || (updatingStatus?.requestId === request.requestId && updatingStatus?.status !== 1)}
                        className={`px-2 py-1 text-xs rounded ${request.status === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
                      >
                        {updatingStatus?.requestId === request.requestId && updatingStatus?.status === 1 ? 'جاري...' : 'موافقة'}
                      </button>
                      <button
                        onClick={() => updateRequestStatus(request.requestId, 2)}
                        disabled={request.status === 2 || (updatingStatus?.requestId === request.requestId && updatingStatus?.status !== 2)}
                        className={`px-2 py-1 text-xs rounded ${request.status === 2 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-red-100 text-red-800 hover:bg-red-200'}`}
                      >
                        {updatingStatus?.requestId === request.requestId && updatingStatus?.status === 2 ? 'جاري...' : 'رفض'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {requests.map((request) => (
          <div key={request.requestId} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">الرقم:</span>
                <span className="text-sm text-gray-900">{request.requestId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">الاسم:</span>
                <span className="text-sm text-gray-900">{request.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">البريد:</span>
                <span className="text-sm text-gray-500 break-all">{request.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">رقم المرجع:</span>
                <span className="text-sm text-gray-500">{request.paymentReference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">طريقة الدفع:</span>
                <span className="text-sm text-gray-500">
                  {request.paymentMethod === "Fawry" ? "فوري" : "فودافون كاش"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">السعر:</span>
                <span className="text-sm text-gray-500">{request.coursePrice} ج.م</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">الحالة:</span>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
                  {getStatusText(request.status)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">صورة الإيصال:</span>
                <button
                  onClick={() => openImageModal(request.screenShotUrl)}
                  className="text-sm text-indigo-600 hover:text-indigo-900"
                >
                  عرض
                </button>
              </div>
              <div className="pt-2 mt-2 border-t border-gray-200">
                <div className="flex flex-wrap gap-2 justify-end">
                  <button
                    onClick={() => updateRequestStatus(request.requestId, 0)}
                    disabled={request.status === 0 || (updatingStatus?.requestId === request.requestId && updatingStatus?.status !== 0)}
                    className={`px-2 py-1 text-xs rounded ${request.status === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}
                  >
                    {updatingStatus?.requestId === request.requestId && updatingStatus?.status === 0 ? 'جاري...' : 'إعادة إلى قيد الانتظار'}
                  </button>
                  <button
                    onClick={() => updateRequestStatus(request.requestId, 1)}
                    disabled={request.status === 1 || (updatingStatus?.requestId === request.requestId && updatingStatus?.status !== 1)}
                    className={`px-2 py-1 text-xs rounded ${request.status === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
                  >
                    {updatingStatus?.requestId === request.requestId && updatingStatus?.status === 1 ? 'جاري...' : 'موافقة'}
                  </button>
                  <button
                    onClick={() => updateRequestStatus(request.requestId, 2)}
                    disabled={request.status === 2 || (updatingStatus?.requestId === request.requestId && updatingStatus?.status !== 2)}
                    className={`px-2 py-1 text-xs rounded ${request.status === 2 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-red-100 text-red-800 hover:bg-red-200'}`}
                  >
                    {updatingStatus?.requestId === request.requestId && updatingStatus?.status === 2 ? 'جاري...' : 'رفض'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">صورة إيصال الدفع</h3>
              <button 
                onClick={closeImageModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <img 
                src={selectedImage} 
                alt="Payment Receipt" 
                className="max-w-full h-auto mx-auto"
              />
            </div>
            <div className="p-4 border-t flex justify-end">
              <button
                onClick={closeImageModal}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}