'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { User, Mail, Phone, School, BookOpen, Calendar, CheckCircle, XCircle, Edit, Save, X } from 'lucide-react';

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

interface Department {
  id: number;
  name: string;
}

export default function TeacherProfilePage() {
  const params = useParams();
  const { teacherId } = params;
  const [profile, setProfile] = useState<TeacherProfile | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<TeacherProfile>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required");
        }

        // Fetch profile
        const profileResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/TeacherProfile/${teacherId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!profileResponse.ok) {
          throw new Error(`Failed to fetch profile: ${profileResponse.status}`);
        }

        const profileData = await profileResponse.json();
        setProfile(profileData);
        setEditedProfile(profileData);

        // Fetch departments
        const deptResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/Account/Departments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (deptResponse.ok) {
          const deptData = await deptResponse.json();
          setDepartments(deptData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teacherId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProfile(profile || {});
    setImageFile(null);
    setImagePreview(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication required");

      const formData = new FormData();
      formData.append('FullName', editedProfile.fullName || '');
      formData.append('PhoneNumber', editedProfile.phoneNumber || '');
      formData.append('SchoolName', editedProfile.schoolName || '');
      formData.append('Bio', editedProfile.bio || '');
      formData.append('DepartmentId', String(editedProfile.departmentId || 0));
      if (imageFile) {
        formData.append('Image', imageFile);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/UpdateTeacher/${teacherId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.status}`);
      }

      // Refresh profile data
      const updatedResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Teacher/TeacherProfile/${teacherId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (updatedResponse.ok) {
        const updatedData = await updatedResponse.json();
        setProfile(updatedData);
        setEditedProfile(updatedData);
        setIsEditing(false);
        setImageFile(null);
        setImagePreview(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
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
    <div dir="rtl">
      {/* Profile Header */}
      <div className="bg-[#3a5a78] p-6 text-white rounded-t-lg relative">
        {!isEditing && (
          <button 
            onClick={handleEditClick}
            className="absolute top-4 left-4 bg-white text-[#3a5a78] p-2 rounded-full shadow-md hover:bg-gray-100 transition"
          >
            <Edit size={20} />
          </button>
        )}
        
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            {isEditing ? (
              <div className="relative">
                <label htmlFor="image-upload" className="cursor-pointer">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Preview"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                    />
                  ) : profile.image ? (
                    <img 
                      src={`https://elearning1.runasp.net${profile.image}`} 
                      alt={profile.fullName}
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-[#3a5a78]">
                      {profile.fullName.charAt(0)}
                    </div>
                  )}
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            ) : profile.image ? (
              <img 
                src={`https://elearning1.runasp.net${profile.image}`} 
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
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={editedProfile.fullName || ''}
                onChange={handleInputChange}
                className="text-2xl font-bold bg-transparent border-b border-white text-white mb-2 w-full"
              />
            ) : (
              <h1 className="text-2xl font-bold">{profile.fullName}</h1>
            )}
            {isEditing ? (
              <textarea
                name="bio"
                value={editedProfile.bio || ''}
                onChange={handleInputChange}
                className="text-blue-100 bg-transparent border-b border-blue-100 w-full"
                rows={2}
              />
            ) : (
              <p className="text-blue-100">{profile.bio}</p>
            )}
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-white p-6 rounded-b-lg shadow-md">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Professional Information */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-[#3a5a78] border-b-2 border-[#3a5a78] pb-2">
                  المعلومات المهنية
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <School className="text-[#3a5a78]" size={20} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">المدرسة</p>
                      <input
                        type="text"
                        name="schoolName"
                        value={editedProfile.schoolName || ''}
                        onChange={handleInputChange}
                        className="w-full border-b border-gray-300 focus:border-[#3a5a78] outline-none py-1"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="text-[#3a5a78]" size={20} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">القسم</p>
                      <select
                        name="departmentId"
                        value={editedProfile.departmentId || 0}
                        onChange={handleInputChange}
                        className="w-full border-b border-gray-300 focus:border-[#3a5a78] outline-none py-1"
                      >
                        {departments.map(dept => (
                          <option key={dept.id} value={dept.id}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
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
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                      <p className="font-medium">{profile.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-[#3a5a78]" size={20} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">رقم الهاتف</p>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={editedProfile.phoneNumber || ''}
                        onChange={handleInputChange}
                        className="w-full border-b border-gray-300 focus:border-[#3a5a78] outline-none py-1"
                      />
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
                <textarea
                  name="bio"
                  value={editedProfile.bio || ''}
                  onChange={handleInputChange}
                  className="w-full text-gray-700 leading-relaxed bg-transparent border border-gray-300 rounded p-2"
                  rows={4}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                <X size={18} />
                إلغاء
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-[#3a5a78] text-white rounded hover:bg-[#2d4560]"
              >
                <Save size={18} />
                حفظ التغييرات
              </button>
            </div>
          </form>
        ) : (
          <>
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
                        {departments.find(d => d.id === profile.departmentId)?.name || "غير محدد"}
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
          </>
        )}
      </div>
    </div>
  );
}