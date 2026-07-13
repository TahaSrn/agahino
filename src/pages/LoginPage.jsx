// pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../services/supabase";
import {
  FaMobile,
  FaLock,
  FaUser,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import toast from "react-hot-toast";

function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    fullName: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        console.log("شماره وارد شده:", formData.phone);

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("id, phone")
          .eq("phone", formData.phone.trim());

        console.log("نتیجه جستجو:", profile);
        console.log("خطا:", profileError);

        if (profileError) {
          console.error("خطای جستجو:", profileError);
          toast.error("خطا در جستجوی کاربر");
          setLoading(false);
          return;
        }

        if (!profile || profile.length === 0) {
          toast.error("کاربری با این شماره پیدا نشد");
          setLoading(false);
          return;
        }

        const { error } = await supabase.auth.signInWithPassword({
          email: `${formData.phone.trim()}@agahino.com`,
          password: formData.password,
        });

        if (error) {
          console.error("خطای لاگین:", error);
          throw error;
        }

        toast.success("ورود موفقیت‌آمیز بود!");
        navigate("/");
        window.location.reload();
      } else {
        const { data: existingUser, error: checkError } = await supabase
          .from("profiles")
          .select("phone")
          .eq("phone", formData.phone.trim())
          .maybeSingle();

        if (existingUser) {
          toast.error("این شماره موبایل قبلاً ثبت‌نام شده است");
          setLoading(false);
          return;
        }

        const email = formData.email || `${formData.phone.trim()}@agahino.com`;

        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              phone: formData.phone.trim(),
            },
          },
        });

        if (error) throw error;

        if (data?.user) {
          const { error: profileError } = await supabase
            .from("profiles")
            .upsert({
              id: data.user.id,
              phone: formData.phone.trim(),
              full_name: formData.fullName,
            });

          if (profileError) throw profileError;

          toast.success("ثبت‌نام موفقیت‌آمیز بود!");
          setIsLogin(true);
          setFormData({ phone: "", password: "", fullName: "", email: "" });
        }
      }
    } catch (error) {
      console.error("خطا:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark-700 flex min-h-screen items-center justify-center px-4 pt-20 md:pt-24">
      <div className="bg-dark-800/80 w-full max-w-md rounded-2xl border border-white/10 p-6 shadow-2xl backdrop-blur-sm md:p-8">
        <div className="mb-6 text-center">
          <h1 className="text-primary-100 font-sansBold text-2xl md:text-3xl">
            {isLogin ? "ورود" : "ثبت‌نام"}
          </h1>
          <p className="font-sansReg mt-1 text-sm text-gray-400">
            {isLogin ? "به آگهی‌نو خوش برگشتی!" : "به آگهی‌نو خوش اومدی!"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-sansReg mb-1.5 block text-sm text-gray-300">
              شماره موبایل <span className="text-primary-400">*</span>
            </label>
            <div className="relative">
              <FaMobile className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                className="bg-dark-700/50 font-sansReg focus:border-primary-500/50 w-full rounded-lg border border-white/10 px-4 py-2.5 pr-10 text-sm text-gray-300 transition-colors duration-300 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-sansReg mb-1.5 block text-sm text-gray-300">
              رمز عبور <span className="text-primary-400">*</span>
            </label>
            <div className="relative">
              <FaLock className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="bg-dark-700/50 font-sansReg focus:border-primary-500/50 w-full rounded-lg border border-white/10 px-4 py-2.5 pr-10 text-sm text-gray-300 transition-colors duration-300 outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 transition-colors duration-300 hover:text-gray-300"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <>
              <div>
                <label className="font-sansReg mb-1.5 block text-sm text-gray-300">
                  نام و نام خانوادگی <span className="text-primary-400">*</span>
                </label>
                <div className="relative">
                  <FaUser className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="احمد رضایی"
                    className="bg-dark-700/50 font-sansReg focus:border-primary-500/50 w-full rounded-lg border border-white/10 px-4 py-2.5 pr-10 text-sm text-gray-300 transition-colors duration-300 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-sansReg mb-1.5 block text-sm text-gray-300">
                  ایمیل <span className="text-xs text-gray-500">(اختیاری)</span>
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className="bg-dark-700/50 font-sansReg focus:border-primary-500/50 w-full rounded-lg border border-white/10 px-4 py-2.5 pr-10 text-sm text-gray-300 transition-colors duration-300 outline-none"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 font-sansBold hover:shadow-primary-500/30 w-full rounded-lg bg-gradient-to-r py-2.5 text-white transition-all duration-300 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "در حال پردازش..." : isLogin ? "ورود" : "ثبت‌نام"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setFormData({ phone: "", password: "", fullName: "", email: "" });
            }}
            className="hover:text-primary-400 font-sansReg text-sm text-gray-400 transition-colors duration-300"
          >
            {isLogin
              ? "حساب کاربری ندارید؟ ثبت‌نام کنید"
              : "قبلاً ثبت‌نام کردید؟ وارد شوید"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
