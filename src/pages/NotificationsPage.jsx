// pages/NotificationsPage.jsx
import { FaBell } from "react-icons/fa";

function NotificationsPage() {
  return (
    <div className="bg-dark-700 min-h-screen pt-20 pb-24 md:pt-24">
      <div className="mx-auto w-[95%] md:w-[85%]">
        <div className="mb-6 flex items-center gap-3">
          <FaBell size={28} className="text-primary-400" />
          <h1 className="text-primary-100 font-sansBold text-2xl md:text-3xl">
            اعلان‌ها
          </h1>
        </div>

        <div className="bg-dark-800/30 flex flex-col items-center justify-center rounded-xl border border-white/10 py-16">
          <FaBell size={48} className="text-gray-600" />
          <p className="font-sansReg mt-4 text-gray-400">
            هنوز اعلانی دریافت نکرده‌اید
          </p>
          <p className="font-sansReg text-sm text-gray-500">
            با فعال شدن اعلان‌ها، پیام‌ها و به‌روزرسانی‌ها را اینجا مشاهده
            خواهید کرد
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;
