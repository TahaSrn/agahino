import { FiHome, FiUser } from "react-icons/fi";
import { IoMdHeartEmpty, IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";

function MobileNav() {
  return (
    <div className="font-sansReg md:hidden fixed bottom-0 left-0 right-0 bg-dark-700 border-t border-gray-700/50 px-4 py-2 z-50">
      <div className="flex items-end justify-around max-w-md mx-auto">
        <button className="flex flex-col items-center gap-0.5 text-primary-100 hover:text-primary-200 transition-colors">
          <FiHome size={24} />
          <span className="text-[10px]">خانه</span>
        </button>

        <button className="flex flex-col items-center gap-0.5 text-primary-100 hover:text-primary-200 transition-colors">
          <IoMdHeartEmpty size={24} />
          <span className="text-[10px]">علاقه‌مندی</span>
        </button>

        <button className="flex flex-col items-center gap-0.5 text-primary-100">
          <div className="bg-primary-100 rounded-full p-3 shadow-lg shadow-primary-100/30 -mt-6">
            <AiOutlinePlusCircle size={28} className="text-dark-700" />
          </div>
          <span className="text-[10px] text-primary-100">ثبت آگهی</span>
        </button>

        <button className="flex flex-col items-center gap-0.5 text-primary-100 hover:text-primary-200 transition-colors">
          <IoMdNotificationsOutline size={24} />
          <span className="text-[10px]">اعلان‌ها</span>
        </button>

        <button className="flex flex-col items-center gap-0.5 text-primary-100 hover:text-primary-200 transition-colors">
          <FiUser size={24} />
          <span className="text-[10px]">پروفایل</span>
        </button>
      </div>
    </div>
  );
}

export default MobileNav;
