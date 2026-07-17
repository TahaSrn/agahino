// ui/Header.jsx
import { useState, useEffect, useRef } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiUser, FiLogOut, FiSettings, FiFileText } from "react-icons/fi";
import { IoMdHeartEmpty, IoMdNotificationsOutline } from "react-icons/io";
import { IoChatbubbleOutline } from "react-icons/io5";
import Button from "./Button";
import Logo from "./Logo";
import Search from "./Search";
import SelectBar from "./SelectBar";
import Modal from "../ui/Modal";
import CreateAdWizard from "../features/ads/CreateAdWizard";
import { useUser } from "../features/auth/useUser";
import supabase from "../services/supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function Header() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUserPhone = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("phone")
          .eq("id", user.id)
          .single();

        if (!error && data) {
          setUserPhone(data.phone);
        }
      }
    };
    fetchUserPhone();
  }, [user]);

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlHeader);
    return () => {
      window.removeEventListener("scroll", controlHeader);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("با موفقیت خارج شدید");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <header
        className={`bg-dark-800/95 fixed top-0 right-0 left-0 z-50 flex w-full items-center justify-center border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex w-[95%] items-center py-2 md:w-[85%] md:py-0 [&>*:nth-child(1)]:mr-4 md:[&>*:nth-child(1)]:mr-0 [&>*:nth-child(2)]:mr-10 [&>*:nth-child(3)]:mr-8 [&>*:nth-child(4)]:mr-20 [&>*:nth-child(5)]:mr-2 md:[&>*:nth-child(5)]:mr-8">
          <Logo className="w-20 md:w-40" />

          <div className="hidden md:block">
            <SelectBar onProvinceChange={setSelectedProvince} />
          </div>

          <div className="min-w-0 flex-1">
            <Search selectedProvince={selectedProvince} />
          </div>

          <div className="text-primary-100 hidden items-center gap-5 md:flex">
            {user && (
              <>
                <button
                  onClick={() => navigate("/favorites")}
                  className="cursor-pointer transition-colors hover:text-white"
                >
                  <IoMdHeartEmpty size={25} />
                </button>
                <button
                  onClick={() => navigate("/notifications")}
                  className="cursor-pointer transition-colors hover:text-white"
                >
                  <IoMdNotificationsOutline size={25} />
                </button>
                <button
                  onClick={() => navigate("/chat")}
                  className="cursor-pointer transition-colors hover:text-white"
                >
                  <IoChatbubbleOutline size={24} />
                </button>
              </>
            )}
          </div>

          <div className="hidden md:block">
            <Button
              size="small"
              variation="primary"
              className="group"
              onClick={() => setIsModalOpen(true)}
            >
              <span>ثبت آگهی</span>
              <AiOutlinePlusCircle
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
          </div>

          <div className="relative mr-4 hidden md:block" ref={dropdownRef}>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="hover:text-primary-100 flex items-center gap-2 text-gray-300 transition-colors duration-300"
                >
                  <div className="bg-primary-500/20 border-primary-500/30 flex h-8 w-8 items-center justify-center rounded-full border">
                    <FiUser size={18} className="text-primary-400" />
                  </div>
                  <span className="font-sansMed hidden text-sm lg:block">
                    {user.user_metadata?.full_name || "کاربر"}
                  </span>
                </button>

                {showDropdown && (
                  <div className="bg-dark-800 absolute left-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 shadow-xl backdrop-blur-xl">
                    <div className="border-b border-white/5 px-4 py-3">
                      <p className="font-sansBold text-sm text-white">
                        {user.user_metadata?.full_name || "کاربر"}
                      </p>
                      <p className="font-sansReg text-xs text-gray-400">
                        {userPhone || "شماره ثبت نشده"}
                      </p>
                    </div>
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          navigate("/profile");
                        }}
                        className="hover:text-primary-100 font-sansReg flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-300 transition-colors duration-200 hover:bg-white/5"
                      >
                        <FiUser size={16} />
                        پروفایل
                      </button>
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          navigate("/my-ads");
                        }}
                        className="hover:text-primary-100 font-sansReg flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-300 transition-colors duration-200 hover:bg-white/5"
                      >
                        <FiFileText size={16} />
                        آگهی‌های من
                      </button>
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          navigate("/settings");
                        }}
                        className="hover:text-primary-100 font-sansReg flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-300 transition-colors duration-200 hover:bg-white/5"
                      >
                        <FiSettings size={16} />
                        تنظیمات
                      </button>
                      <div className="my-1 border-t border-white/5"></div>
                      <button
                        onClick={handleLogout}
                        className="font-sansReg flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-400 transition-colors duration-200 hover:bg-white/5 hover:text-red-300"
                      >
                        <FiLogOut size={16} />
                        خروج
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button
                size="small"
                variation="secondary"
                className="px-4 py-2"
                onClick={() => navigate("/login")}
              >
                <FiUser size={16} />
                <span>ورود</span>
              </Button>
            )}
          </div>
        </div>

        <div className="via-primary-400/70 pointer-events-none absolute right-0 bottom-0 left-0 h-px bg-linear-to-r from-transparent to-transparent" />

        <div className="bg-primary-500/10 pointer-events-none absolute -bottom-3 left-1/2 h-8 w-[85%] -translate-x-1/2 rounded-full blur-2xl" />
      </header>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateAdWizard onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
}

export default Header;
