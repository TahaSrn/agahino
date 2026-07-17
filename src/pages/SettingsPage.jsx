// pages/SettingsPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../features/auth/useUser";
import supabase from "../services/supabase";
import {
  FaUser,
  FaShieldAlt,
  FaInfoCircle,
  FaQuestionCircle,
  FaFileAlt,
  FaLock,
  FaTimes,
} from "react-icons/fa";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

function SettingsPage() {
  const navigate = useNavigate();
  const { user, isLoading: isUserLoading } = useUser();
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isUserLoading) return;
    if (!user) {
      navigate("/login");
      return;
    }
  }, [user, isUserLoading, navigate]);

  const openModal = (title, content) => {
    setModalContent({ title, content });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "آیا از حذف حساب کاربری خود مطمئن هستید؟ این عمل غیرقابل بازگشت است و تمام اطلاعات شما حذف خواهد شد.",
      )
    ) {
      return;
    }

    try {
      const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", user.id);

      if (profileError) throw profileError;

      const { error: authError } = await supabase.auth.admin.deleteUser(
        user.id,
      );

      if (authError) throw authError;

      toast.success("حساب کاربری شما با موفقیت حذف شد");
      await supabase.auth.signOut();
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("خطا در حذف حساب:", error);
      toast.error("خطا در حذف حساب کاربری. لطفاً دوباره تلاش کنید.");
    }
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
    <>
      <div className="bg-dark-700 min-h-screen pt-8 pb-10 md:pt-10">
        <div className="mx-auto w-[95%] max-w-3xl md:w-[85%]">
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <h1 className="text-primary-100 font-sansBold text-2xl md:text-3xl">
              تنظیمات
            </h1>
          </div>

          <div className="space-y-4">
            <div className="bg-dark-800/80 rounded-2xl border border-white/10 p-6 shadow-2xl backdrop-blur-sm">
              <h2 className="text-primary-100 font-sansBold mb-4 flex items-center gap-2 text-lg">
                <FaUser size={18} className="text-primary-400" />
                حساب کاربری
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 py-2">
                  <div>
                    <p className="font-sansReg text-sm text-gray-300">
                      نام کاربری
                    </p>
                    <p className="font-sansReg text-xs text-gray-500">
                      {user.user_metadata?.full_name || "ثبت نشده"}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("/profile")}
                    className="text-primary-400 hover:text-primary-300 font-sansReg text-sm transition-colors"
                  >
                    ویرایش
                  </button>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 py-2">
                  <div>
                    <p className="font-sansReg text-sm text-gray-300">
                      شماره موبایل
                    </p>
                    <p className="font-sansReg text-xs text-gray-500">
                      {user.user_metadata?.phone || "ثبت نشده"}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("/profile")}
                    className="text-primary-400 hover:text-primary-300 font-sansReg text-sm transition-colors"
                  >
                    ویرایش
                  </button>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-sansReg text-sm text-gray-300">ایمیل</p>
                    <p className="font-sansReg text-xs text-gray-500">
                      {user.email || "ثبت نشده"}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("/profile")}
                    className="text-primary-400 hover:text-primary-300 font-sansReg text-sm transition-colors"
                  >
                    ویرایش
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-dark-800/80 rounded-2xl border border-white/10 p-6 shadow-2xl backdrop-blur-sm">
              <h2 className="text-primary-100 font-sansBold mb-4 flex items-center gap-2 text-lg">
                <FaInfoCircle size={18} className="text-primary-400" />
                درباره آگهی‌نو
              </h2>
              <div className="space-y-2">
                <button
                  onClick={() =>
                    openModal(
                      "قوانین و مقررات",
                      "استفاده از سامانه آگهی‌نو به معنی پذیرش کامل قوانین زیر است:\n\n۱. مسئولیت صحت اطلاعات درج شده در آگهی بر عهده کاربر است.\n۲. هرگونه سوءاستفاده از سامانه پیگرد قانونی دارد.\n۳. آگهی‌نو هیچ گونه مسئولیتی در قبال معاملات انجام شده بین کاربران ندارد.\n۴. کاربران موظف به رعایت قوانین جمهوری اسلامی ایران هستند.\n۵. ثبت آگهی‌های غیرمجاز و مغایر با شئونات اسلامی ممنوع است.\n۶. هرگونه کپی‌برداری از محتوای سایت بدون ذکر منبع ممنوع می‌باشد.",
                    )
                  }
                  className="hover:text-primary-100 flex w-full items-center justify-between border-b border-white/5 py-2 transition-colors"
                >
                  <span className="font-sansReg text-sm text-gray-300">
                    قوانین و مقررات
                  </span>
                  <FaFileAlt size={14} className="text-gray-500" />
                </button>
                <button
                  onClick={() =>
                    openModal(
                      "حریم خصوصی",
                      "آگهی‌نو به حریم خصوصی کاربران خود احترام می‌گذارد:\n\n۱. اطلاعات شخصی کاربران تنها برای ارائه خدمات استفاده می‌شود.\n۲. اطلاعات کاربران بدون رضایت آنها به هیچ شخص ثالثی منتقل نمی‌شود.\n۳. کاربران می‌توانند در هر زمان درخواست حذف اطلاعات خود را بدهند.\n۴. تمامی اطلاعات به صورت رمزنگاری شده در سرورهای امن ذخیره می‌شود.\n۵. شماره تماس کاربران تنها در صورت تایید آنها در آگهی‌ها نمایش داده می‌شود.\n۶. کاربران می‌توانند تنظیمات حریم خصوصی خود را در بخش تنظیمات تغییر دهند.",
                    )
                  }
                  className="hover:text-primary-100 flex w-full items-center justify-between border-b border-white/5 py-2 transition-colors"
                >
                  <span className="font-sansReg text-sm text-gray-300">
                    حریم خصوصی
                  </span>
                  <FaLock size={14} className="text-gray-500" />
                </button>
                <button
                  onClick={() =>
                    openModal(
                      "راهنما و پشتیبانی",
                      "برای دریافت راهنمایی و پشتیبانی می‌توانید از روش‌های زیر استفاده کنید:\n\n۱. ارسال تیکت پشتیبانی از طریق ایمیل: tahaahmadi0403@gmail.com\n۲. تماس با پشتیبانی: ۰۹۳۰۴۱۳۰۲۲۹\n۳. پاسخ به سوالات متداول در بخش راهنمای سایت\n۴. چت آنلاین با پشتیبانی (ساعت ۹ تا ۱۷)\n\nساعات پاسخگویی: شنبه تا چهارشنبه ۹ الی ۱۷",
                    )
                  }
                  className="hover:text-primary-100 flex w-full items-center justify-between border-b border-white/5 py-2 transition-colors"
                >
                  <span className="font-sansReg text-sm text-gray-300">
                    راهنما و پشتیبانی
                  </span>
                  <FaQuestionCircle size={14} className="text-gray-500" />
                </button>
                <button
                  onClick={() => navigate("/about-us")}
                  className="hover:text-primary-100 flex w-full items-center justify-between py-2 transition-colors"
                >
                  <span className="font-sansReg text-sm text-gray-300">
                    درباره ما
                  </span>
                  <FaInfoCircle size={14} className="text-gray-500" />
                </button>
              </div>
            </div>

            <div className="bg-dark-800/80 rounded-2xl border border-white/10 p-6 shadow-2xl backdrop-blur-sm">
              <h2 className="text-primary-100 font-sansBold mb-4 flex items-center gap-2 text-lg">
                <FaShieldAlt size={18} className="text-primary-400" />
                خطر
              </h2>
              <button
                onClick={handleDeleteAccount}
                className="font-sansMed w-full rounded-lg bg-red-500/20 py-2.5 text-sm text-red-400 transition-colors hover:bg-red-500/30 hover:text-red-300"
              >
                حذف حساب کاربری
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalContent?.title}
      >
        <div className="space-y-4">
          <p className="font-sansReg text-sm leading-relaxed whitespace-pre-wrap text-gray-400">
            {modalContent?.content}
          </p>
          <Button
            size="small"
            variation="primary"
            className="w-full justify-center py-3"
            onClick={closeModal}
          >
            <FaTimes size={16} className="ml-2" />
            بستن
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default SettingsPage;
