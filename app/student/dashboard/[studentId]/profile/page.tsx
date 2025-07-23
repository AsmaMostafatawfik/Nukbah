"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

interface StudentProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  schoolName: string;
  gender: number; // 0: male, 1: female
  age: number;
  parentPhoneNumber: string;
  educationalStage: number; // 0: elementary, 1: middle, 2: high school, 3: university, 4: other
  gradeLevel: number;
  image: string | null;
}

export default function ProfilePage() {
  const params = useParams();
  const studentId = params.studentId as string;
  const [profile, setProfile] = useState<StudentProfile | null>(null);
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
          `http://elearning1.runasp.net/api/Student/StudentProfile/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
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
  }, [studentId]);

  const getGradeLevels = (): number[] => {
    return [1, 2, 3, 4, 5, 6, 7]; // Grades 1-6 + 7 for "غير ذلك"
  };

  const getGradeLabel = (grade: number): string => {
    if (grade === 7) return 'غير ذلك';
    return `الصف ${grade}`;
  };

  const getEducationalStageName = (stage: number): string => {
    switch(stage) {
      case 0: return "الابتدائية";
      case 1: return "المتوسطة";
      case 2: return "الثانوية";
      case 3: return "جامعة";
      case 4: return "غير ذلك";
      default: return "غير محدد";
    }
  };

  const getGenderName = (gender: number): string => {
    return gender === 0 ? "ذكر" : "أنثى";
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

  if (!profile) {
    return <div className="text-center py-8">الملف الشخصي غير موجود</div>;
  }

  return (
    <div className="space-y-8" dir="rtl">
      <h1 className="text-3xl font-bold text-gray-800">الملف الشخصي</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-105">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full border-4 border-indigo-100 overflow-hidden">
              {profile.image ? (
                <Image 
                  src={`data:image/jpeg;base64,${profile.image}`}
                  alt="صورة الطالب"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">لا توجد صورة</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div className="text-right">
                <h2 className="text-2xl font-bold text-gray-800">{profile.fullName}</h2>
                <p className="text-indigo-600 font-medium">
                  {getEducationalStageName(profile.educationalStage)} - {getGradeLabel(profile.gradeLevel)}
                </p>
              </div>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
                تعديل الملف
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
              <div>
                <h3 className="font-medium text-gray-500 mb-2">معلومات الاتصال</h3>
                <div className="space-y-2">
                  <p className="text-gray-800">{profile.email}</p>
                  <p className="text-gray-800">{profile.phoneNumber}</p>
                  <p className="text-gray-800">الجنس: {getGenderName(profile.gender)}</p>
                  <p className="text-gray-800">العمر: {profile.age} سنة</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-500 mb-2">المعلومات الأكاديمية</h3>
                <div className="space-y-2">
                  <p className="text-gray-800">المدرسة: {profile.schoolName}</p>
                  <p className="text-gray-800">رقم ولي الأمر: {profile.parentPhoneNumber}</p>
                  <p className="text-gray-800">المرحلة: {getEducationalStageName(profile.educationalStage)}</p>
                  <p className="text-gray-800">الصف: {getGradeLabel(profile.gradeLevel)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}