// pages/ProfilePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../features/auth/useUser";
import supabase from "../services/supabase";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendar,
  FaEdit,
  FaSave,
  FaTimes,
  FaSignOutAlt,
  FaCamera,
} from "react-icons/fa";
import toast from "react-hot-toast";
import Button from "../ui/Button";

function ProfilePage() {
  const navigate = useNavigate();
  const { user, isLoading: isUserLoading } = useUser();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    email: "",
    avatar_url: "",
    created_at: "",
  });
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isUserLoading) return;

    if (!user) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!error && data) {
        setProfile({
          full_name: data.full_name || "",
          phone: data.phone || "",
          email: user.email || "",
          avatar_url: data.avatar_url || "",
          created_at: data.created_at || user.created_at,
        });
        setFormData({
          full_name: data.full_name || "",
          phone: data.phone || "",
        });
      }
    };

    fetchProfile();
  }, [user, isUserLoading, navigate]);

  const handleSave = async () => {
    if (!formData.full_name.trim()) {
      toast.error("نام و نام خانوادگی را وارد کنید");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name.trim(),
          phone: formData.phone.trim(),
        })
        .eq("id", user.id);

      if (error) throw error;

      setProfile((prev) => ({
        ...prev,
        full_name: formData.full_name.trim(),
        phone: formData.phone.trim(),
      }));

      setIsEditing(false);
      toast.success("اطلاعات با موفقیت ذخیره شد");
    } catch (error) {
      toast.error(error.message || "خطا در ذخیره اطلاعات");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("حجم عکس نباید بیشتر از ۲ مگابایت باشد");
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("profiles")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("profiles")
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: urlData.publicUrl })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setProfile((prev) => ({ ...prev, avatar_url: urlData.publicUrl }));
      toast.success("عکس پروفایل با موفقیت آپلود شد");
    } catch (error) {
      toast.error(error.message || "خطا در آپلود عکس");
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("با موفقیت خارج شدید");
    navigate("/");
    window.location.reload();
  };

  if (isUserLoading) {
    return (
      <div className="bg-dark-700 flex min-h-screen items-center justify-center pt-20 md:pt-24">
        <div className="text-center text-gray-400">در حال بارگیری...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="bg-dark-700 min-h-screen pt-20 pb-24 md:pt-24">
      <div className="mx-auto w-[95%] max-w-2xl md:w-[85%]">
        <div className="bg-dark-800/80 rounded-2xl border border-white/10 p-6 shadow-2xl backdrop-blur-sm md:p-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h1 className="text-primary-100 font-sansBold text-2xl md:text-3xl">
              پروفایل
            </h1>
            {!isEditing ? (
              <Button
                size="small"
                variation="secondary"
                className="px-4 py-2"
                onClick={() => setIsEditing(true)}
              >
                <FaEdit size={16} className="ml-2" />
                ویرایش
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  size="small"
                  variation="secondary"
                  className="px-4 py-2"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      full_name: profile.full_name,
                      phone: profile.phone,
                    });
                  }}
                >
                  <FaTimes size={16} className="ml-2" />
                  انصراف
                </Button>
                <Button
                  size="small"
                  variation="primary"
                  className="px-4 py-2"
                  onClick={handleSave}
                  disabled={loading}
                >
                  <FaSave size={16} className="ml-2" />
                  {loading ? "در حال ذخیره..." : "ذخیره"}
                </Button>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-col items-center">
            <div className="relative">
              <div className="border-primary-500/30 bg-dark-700 h-24 w-24 overflow-hidden rounded-full border-2">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name || "کاربر"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="bg-primary-500/10 flex h-full w-full items-center justify-center">
                    <FaUser size={40} className="text-primary-400" />
                  </div>
                )}
              </div>
              <label
                htmlFor="avatar-upload"
                className="bg-primary-500 hover:bg-primary-600 absolute right-0 bottom-0 cursor-pointer rounded-full p-2 transition-colors"
              >
                <FaCamera size={14} className="text-white" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                  disabled={isUploading}
                />
              </label>
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                  <div className="border-primary-400 h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
                </div>
              )}
            </div>

            <div className="mt-4 w-full space-y-4">
              <div>
                <label className="font-sansReg mb-1 block text-sm text-gray-400">
                  نام و نام خانوادگی
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        full_name: e.target.value,
                      }))
                    }
                    className="bg-dark-700/50 font-sansReg focus:border-primary-500/50 w-full rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition-colors duration-300 outline-none"
                  />
                ) : (
                  <p className="font-sansReg text-base text-white">
                    {profile.full_name || "ثبت نشده"}
                  </p>
                )}
              </div>
              <div>
                <label className="font-sansReg mb-1 block text-sm text-gray-400">
                  <FaPhone size={14} className="ml-1 inline" />
                  شماره موبایل
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="bg-dark-700/50 font-sansReg focus:border-primary-500/50 w-full rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition-colors duration-300 outline-none"
                  />
                ) : (
                  <p className="font-sansReg text-base text-white">
                    {profile.phone || "ثبت نشده"}
                  </p>
                )}
              </div>

              <div>
                <label className="font-sansReg mb-1 block text-sm text-gray-400">
                  <FaEnvelope size={14} className="ml-1 inline" />
                  ایمیل
                </label>
                <p className="font-sansReg text-base text-white">
                  {profile.email ? profile.email : "—"}
                </p>
              </div>
              <div>
                <label className="font-sansReg mb-1 block text-sm text-gray-400">
                  <FaCalendar size={14} className="ml-1 inline" />
                  تاریخ عضویت
                </label>
                <p className="font-sansReg text-base text-white">
                  {profile.created_at
                    ? new Date(profile.created_at).toLocaleDateString("fa-IR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "ثبت نشده"}
                </p>
              </div>
            </div>

            <div className="mt-6 w-full border-t border-white/10 pt-4">
              <button
                onClick={handleLogout}
                className="font-sansMed flex w-full items-center justify-center gap-2 rounded-lg bg-red-500/20 py-2.5 text-sm text-red-400 transition-colors hover:bg-red-500/30 hover:text-red-300"
              >
                <FaSignOutAlt size={16} />
                خروج از حساب کاربری
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
