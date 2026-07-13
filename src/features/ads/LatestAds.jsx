import { useNavigate } from "react-router";
import { useGetLatestAds } from "../ads/useGetLatestAds";
import AdCard from "./AdCard";

function LatestAds() {
  const navigate = useNavigate();
  const { latestAds, isLoading, error } = useGetLatestAds();

  const handleViewAll = () => {
    navigate("/ads?sort=newest");
  };

  if (isLoading) {
    return (
      <div className="mt-8 flex w-full justify-center md:mt-10">
        <div className="w-[95%] md:w-[85%]">
          <div className="mb-4 flex items-center justify-between">
            <div className="from-dark-600 via-dark-500 to-dark-600 animate-shimmer h-7 w-48 rounded-lg bg-linear-to-r md:h-8" />
            <div className="from-dark-600 via-dark-500 to-dark-600 animate-shimmer h-6 w-24 rounded-lg bg-linear-to-r" />
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="from-dark-600 via-dark-500 to-dark-600 animate-shimmer h-64 rounded-xl bg-linear-to-r"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 flex w-full justify-center md:mt-10">
        <div className="text-primary-400 font-sansReg w-[95%] text-center md:w-[85%]">
          خطا در بارگیری جدیدترین آگهی‌ها
        </div>
      </div>
    );
  }

  if (!latestAds?.length) {
    return null;
  }

  const displayAds = latestAds.slice(0, 4);

  return (
    <div className="mt-8 flex w-full justify-center md:mt-10">
      <div className="w-[95%] md:w-[85%]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-primary-100 font-sansBold text-lg md:text-xl">
            جدیدترین آگهی‌ها
          </h3>
          <button
            onClick={handleViewAll}
            className="text-primary-400 hover:text-primary-300 font-sansBold text-sm whitespace-nowrap transition-colors md:text-base"
          >
            مشاهده همه &gt;
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 md:hidden">
          {displayAds.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>

        <div className="hidden gap-4 md:grid md:grid-cols-3 lg:grid-cols-6">
          {latestAds.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LatestAds;
