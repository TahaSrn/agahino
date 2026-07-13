// components/MobileNav.jsx
import {
  FiHome,
  FiUser,
  FiSettings,
  FiFileText,
  FiMoreHorizontal,
  FiLogIn,
} from "react-icons/fi";
import { IoMdHeartEmpty, IoMdNotificationsOutline } from "react-icons/io";
import { IoChatbubbleOutline } from "react-icons/io5";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router";
import { useUser } from "../features/auth/useUser";
import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import CreateAdWizard from "../features/ads/CreateAdWizard";

function MobileNav() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showMore, setShowMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (showMore) {
      setAnimate(true);
    }
  }, [showMore]);

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => {
      setShowMore(false);
    }, 300);
  };

  return (
    <>
      <div className="font-sansReg bg-dark-700 fixed inset-x-0 right-0 bottom-0 left-0 z-50 border-t border-gray-700/50 px-4 py-2 md:hidden">
        <div className="mx-auto flex max-w-md items-end justify-around">
          <button
            onClick={() => navigate("/")}
            className="text-primary-100 hover:text-primary-200 flex flex-col items-center gap-0.5 transition-colors"
          >
            <FiHome size={24} />
            <span className="text-[10px]">خانه</span>
          </button>

          {user && (
            <button className="text-primary-100 hover:text-primary-200 flex flex-col items-center gap-0.5 transition-colors">
              <IoChatbubbleOutline size={24} />
              <span className="text-[10px]">چت</span>
            </button>
          )}

          <button
            onClick={() => setIsModalOpen(true)}
            className="text-primary-100 flex flex-col items-center gap-0.5"
          >
            <div className="bg-primary-100 shadow-primary-100/30 -mt-6 rounded-full p-3 shadow-lg">
              <AiOutlinePlusCircle size={28} className="text-dark-700" />
            </div>
            <span className="text-primary-100 text-[10px]">ثبت آگهی</span>
          </button>

          {user && (
            <button className="text-primary-100 hover:text-primary-200 flex flex-col items-center gap-0.5 transition-colors">
              <IoMdNotificationsOutline size={24} />
              <span className="text-[10px]">اعلان‌ها</span>
            </button>
          )}

          <button
            onClick={() => (user ? setShowMore(!showMore) : navigate("/login"))}
            className="text-primary-100 hover:text-primary-200 flex flex-col items-center gap-0.5 transition-colors"
          >
            {user ? (
              <>
                <FiMoreHorizontal size={24} />
                <span className="text-[10px]">بیشتر</span>
              </>
            ) : (
              <>
                <FiLogIn size={24} />
                <span className="text-[10px]">ورود</span>
              </>
            )}
          </button>
        </div>

        {user && showMore && (
          <>
            <div
              className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
                animate ? "opacity-100" : "opacity-0"
              }`}
              onClick={handleClose}
            />
            <div
              className={`bg-dark-800 absolute right-0 bottom-16 left-0 z-50 rounded-t-2xl border-t border-gray-700/50 px-4 py-3 shadow-2xl transition-all duration-300 ${
                animate
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <div className="mx-auto grid max-w-md grid-cols-4 gap-4">
                <button
                  onClick={() => {
                    handleClose();
                    navigate("/profile");
                  }}
                  className="hover:text-primary-100 flex flex-col items-center gap-1 text-gray-400 transition-colors"
                >
                  <FiUser size={22} />
                  <span className="text-[9px]">پروفایل</span>
                </button>
                <button
                  onClick={() => {
                    handleClose();
                    navigate("/my-ads");
                  }}
                  className="hover:text-primary-100 flex flex-col items-center gap-1 text-gray-400 transition-colors"
                >
                  <FiFileText size={22} />
                  <span className="text-[9px]">آگهی‌های من</span>
                </button>
                <button
                  onClick={() => {
                    handleClose();
                    navigate("/favorites");
                  }}
                  className="hover:text-primary-100 flex flex-col items-center gap-1 text-gray-400 transition-colors"
                >
                  <IoMdHeartEmpty size={22} />
                  <span className="text-[9px]">علاقه‌مندی</span>
                </button>
                <button
                  onClick={() => {
                    handleClose();
                    navigate("/settings");
                  }}
                  className="hover:text-primary-100 flex flex-col items-center gap-1 text-gray-400 transition-colors"
                >
                  <FiSettings size={22} />
                  <span className="text-[9px]">تنظیمات</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateAdWizard onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
}

export default MobileNav;
