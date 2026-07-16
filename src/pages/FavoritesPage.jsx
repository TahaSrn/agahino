// pages/FavoritesPage.jsx
import { useNavigate } from "react-router";
import { useUser } from "../features/auth/useUser";
import { useGetFavorites } from "../features/favorites/useGetFavorites";
import AdCard from "../features/ads/AdCard";
import { FaHeart } from "react-icons/fa";

function FavoritesPage() {
  const navigate = useNavigate();
  const { user, isLoading: isUserLoading } = useUser();
  const { favorites, isLoading } = useGetFavorites(user?.id);

  if (isUserLoading) {
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
    navigate("/login");
    return null;
  }

  if (isLoading) {
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

  const favoriteAds = favorites?.map((item) => item.ads) || [];

  return (
    <div className="bg-dark-700 min-h-screen pt-20 pb-24 md:pt-24">
      <div className="mx-auto w-[95%] md:w-[85%]">
        <div className="mb-6 flex items-center gap-3">
          <FaHeart size={28} className="text-red-500" />
          <h1 className="text-primary-100 font-sansBold text-2xl md:text-3xl">
            علاقه‌مندی‌ها
          </h1>
        </div>

        {favoriteAds.length === 0 ? (
          <div className="bg-dark-800/30 flex flex-col items-center justify-center rounded-xl border border-white/10 py-16">
            <FaHeart size={48} className="text-gray-600" />
            <p className="font-sansReg mt-4 text-gray-400">
              هنوز آگهی به علاقه‌مندی‌ها اضافه نکرده‌اید
            </p>
            <button
              onClick={() => navigate("/")}
              className="text-primary-400 hover:text-primary-300 font-sansBold mt-2 text-sm transition-colors"
            >
              مشاهده آگهی‌ها
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {favoriteAds.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;
