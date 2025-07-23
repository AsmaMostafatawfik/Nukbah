"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { User, Mail, Phone, School, BookOpen, Calendar, CheckCircle, XCircle } from 'lucide-react';

interface TeacherProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  schoolName: string;
  bio: string;
  departmentId: number;
  isAcivated: boolean;
  image: string;
  registrationDate: string;
}

export default function TeacherProfilePage() {
  const params = useParams();
  const { teacherId } = params;
  const [profile, setProfile] = useState<TeacherProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required");
        }

        const response = await fetch(
          `http://elearning1.runasp.net/api/Teacher/TeacherProfile/${teacherId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.status}`);
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [teacherId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
        {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-8 text-gray-500">
        لا توجد بيانات متاحة للعرض
      </div>
    );
  }

  return (
    <div  dir="rtl">
      {/* Profile Header */}
      <div className="bg-[#3a5a78] p-6 text-white rounded-t-lg">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            {profile.image ? (
              <img 
                src={`data:image/jpeg;base64,${profile.image}`} 
                alt={profile.fullName}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-[#3a5a78]">
                {profile.fullName.charAt(0)}
              </div>
            )}
            <div className="absolute bottom-0 right-0 bg-white rounded-full p-1">
              {profile.isAcivated ? (
                <CheckCircle className="text-green-500" size={20} />
              ) : (
                <XCircle className="text-red-500" size={20} />
              )}
            </div>
          </div>
          <div className="text-center md:text-right">
            <h1 className="text-2xl font-bold">{profile.fullName}</h1>
            <p className="text-blue-100">{profile.bio}</p>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-white p-6 rounded-b-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Professional Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-[#3a5a78] border-b-2 border-[#3a5a78] pb-2">
              المعلومات المهنية
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <School className="text-[#3a5a78]" size={20} />
                <div>
                  <p className="text-sm text-gray-500">المدرسة</p>
                  <p className="font-medium">{profile.schoolName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="text-[#3a5a78]" size={20} />
                <div>
                  <p className="text-sm text-gray-500">القسم</p>
                  <p className="font-medium">
                    {profile.departmentId === 5 ? "الرياضيات" : "غير محدد"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {profile.isAcivated ? (
                  <CheckCircle className="text-green-500" size={20} />
                ) : (
                  <XCircle className="text-red-500" size={20} />
                )}
                <div>
                  <p className="text-sm text-gray-500">حالة الحساب</p>
                  <p className="font-medium">
                    {profile.isAcivated ? "مفعل" : "غير مفعل"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-[#3a5a78] border-b-2 border-[#3a5a78] pb-2">
              المعلومات الشخصية
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-[#3a5a78]" size={20} />
                <div>
                  <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                  <p className="font-medium">{profile.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-[#3a5a78]" size={20} />
                <div>
                  <p className="text-sm text-gray-500">رقم الهاتف</p>
                  <p className="font-medium">{profile.phoneNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-[#3a5a78]" size={20} />
                <div>
                  <p className="text-sm text-gray-500">تاريخ التسجيل</p>
                  <p className="font-medium">{formatDate(profile.registrationDate)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4 text-[#3a5a78] border-b-2 border-[#3a5a78] pb-2">
            السيرة الذاتية
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 leading-relaxed">
              {profile.bio || "لا توجد سيرة ذاتية متاحة"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}