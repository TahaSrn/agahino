// pages/MyAdsPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../features/auth/useUser";
import supabase from "../services/supabase";
import AdCard from "../features/ads/AdCard";
import { FaPlus, FaTrash, FaEdit, FaEye } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import CreateAdWizard from "../features/ads/CreateAdWizard";

function MyAdsPage() {
  const navigate = useNavigate();
  const { user, isLoading: isUserLoading } = useUser();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isUserLoading) return;

    if (!user) {
      navigate("/login");
      return;
    }

    const fetchMyAds = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("ads")
        .select(
          `
          *,
          categories (
            name
          )
        `,
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setAds(data);
      }
      setLoading(false);
    };

    fetchMyAds();
  }, [user, isUserLoading, navigate]);

  const handleDelete = async (adId) => {
    if (!window.confirm("آیا از حذف این آگهی مطمئن هستید؟")) return;

    const { error } = await supabase
      .from("ads")
      .delete()
      .eq("id", adId)
      .eq("user_id", user.id);

    if (error) {
      toast.error("خطا در حذف آگهی");
      return;
    }

    setAds((prev) => prev.filter((ad) => ad.id !== adId));
    toast.success("آگهی با موفقیت حذف شد");
  };

  const handleStatusChange = async (adId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    const { error } = await supabase
      .from("ads")
      .update({ status: newStatus })
      .eq("id", adId)
      .eq("user_id", user.id);

    if (error) {
      toast.error("خطا در تغییر وضعیت آگهی");
      return;
    }

    setAds((prev) =>
      prev.map((ad) => (ad.id === adId ? { ...ad, status: newStatus } : ad)),
    );
    toast.success("وضعیت آگهی تغییر کرد");
  };

  const filteredAds = ads.filter((ad) => {
    if (filter === "active") return ad.status === "active";
    if (filter === "inactive") return ad.status === "inactive";
    return true;
  });

  if (isUserLoading || loading) {
    return (
      <div className="bg-dark-700 min-h-screen pt-20 pb-24 md:pt-24">
        <div className="mx-auto w-[95%] md:w-[85%]">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-dark-600/50 h-64 animate-pulse rounded-xl"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="bg-dark-700 min-h-screen pt-20 pb-24 md:pt-24">
        <div className="mx-auto w-[95%] md:w-[85%]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-primary-100 font-sansBold text-2xl md:text-3xl">
              آگهی‌های من
            </h1>
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

          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setFilter("all")}
              className={`font-sansReg rounded-full px-4 py-1.5 text-sm transition-colors ${
                filter === "all"
                  ? "bg-primary-500 text-white"
                  : "bg-dark-700 hover:bg-dark-600 text-gray-400"
              }`}
            >
              همه
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`font-sansReg rounded-full px-4 py-1.5 text-sm transition-colors ${
                filter === "active"
                  ? "bg-primary-500 text-white"
                  : "bg-dark-700 hover:bg-dark-600 text-gray-400"
              }`}
            >
              فعال
            </button>
            <button
              onClick={() => setFilter("inactive")}
              className={`font-sansReg rounded-full px-4 py-1.5 text-sm transition-colors ${
                filter === "inactive"
                  ? "bg-primary-500 text-white"
                  : "bg-dark-700 hover:bg-dark-600 text-gray-400"
              }`}
            >
              غیرفعال
            </button>
          </div>

          {filteredAds.length === 0 ? (
            <div className="bg-dark-800/30 mt-8 flex flex-col items-center justify-center rounded-xl border border-white/10 py-16">
              <p className="font-sansReg text-gray-400">
                {ads.length === 0
                  ? "هنوز آگهی ثبت نکرده‌اید"
                  : "هیچ آگهی با این فیلتر پیدا نشد"}
              </p>
              {ads.length === 0 && (
                <Button
                  size="small"
                  variation="primary"
                  className="mt-4 px-6 py-2"
                  onClick={() => setIsModalOpen(true)}
                >
                  ثبت آگهی جدید
                </Button>
              )}
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {filteredAds.map((ad) => (
                <div key={ad.id} className="group relative">
                  <AdCard ad={ad} />

                  <div className="absolute top-2 left-2">
                    <button
                      onClick={() => handleStatusChange(ad.id, ad.status)}
                      className={`font-sansMed rounded-full px-2 py-1 text-xs transition-colors ${
                        ad.status === "active"
                          ? "bg-green-900/70 text-green-400 hover:bg-green-500/30"
                          : "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30"
                      }`}
                    >
                      {ad.status === "active" ? "فعال" : "غیرفعال"}
                    </button>
                  </div>

                  <div className="absolute bottom-27 left-1/2 flex -translate-x-1/2 gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => navigate(`/ad/${ad.id}`)}
                      className="bg-dark-800/90 hover:bg-dark-700 cursor-pointer rounded-full p-2 text-gray-300 transition-colors hover:text-white"
                      title="مشاهده"
                    >
                      <FaEye size={14} />
                    </button>
                    <button
                      onClick={() => navigate(`/edit-ad/${ad.id}`)}
                      className="bg-dark-800/90 hover:bg-dark-700 cursor-pointer rounded-full p-2 text-gray-300 transition-colors hover:text-white"
                      title="ویرایش"
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(ad.id)}
                      className="bg-dark-800/90 cursor-pointer rounded-full p-2 text-red-400 transition-colors hover:bg-red-500/30 hover:text-red-300"
                      title="حذف"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateAdWizard onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
}

export default MyAdsPage;
