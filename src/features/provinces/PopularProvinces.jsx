import { useNavigate } from "react-router";
import { useGetPopularProvinces } from "@/features/provinces/useGetPopularProvinces";

function PopularProvinces() {
  const navigate = useNavigate();
  const { popularProvinces, isLoading, error } = useGetPopularProvinces();

  const handleProvinceClick = (provinceId) => {
    navigate(`/ads?province=${provinceId}`);
  };

  if (isLoading) {
    return (
      <div className="mt-8 flex w-full justify-center md:mt-10">
        <div className="w-[95%] md:w-[85%]">
          <div className="from-dark-600 via-dark-500 to-dark-600 animate-shimmer mb-4 h-7 w-48 rounded-lg bg-gradient-to-r md:h-8" />

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-4 md:gap-4 lg:grid-cols-9">
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-white/5 bg-white/5 backdrop-blur-xl"
              >
                <div className="from-dark-600 via-dark-500 to-dark-600 animate-shimmer h-24 w-full bg-gradient-to-r md:h-28" />

                <div className="flex justify-center p-2">
                  <div className="from-dark-600 via-dark-500 to-dark-600 animate-shimmer h-3 w-12 rounded-full bg-gradient-to-r md:h-4 md:w-16" />
                </div>
              </div>
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
          خطا در بارگیری استان‌های محبوب
        </div>
      </div>
    );
  }

  if (!popularProvinces?.length) {
    return null;
  }

  return (
    <div className="mt-8 flex w-full justify-center md:mt-10">
      <div className="w-[95%] md:w-[85%]">
        <h3 className="text-primary-100 font-sansBold mb-4 text-lg md:text-xl">
          استان‌های محبوب
        </h3>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-4 md:gap-4 lg:grid-cols-9">
          {popularProvinces.map((province) => (
            <div
              key={province.id}
              onClick={() => handleProvinceClick(province.id)}
              className="group relative cursor-pointer overflow-hidden rounded-xl"
            >
              <img
                src={province.image_url || "/placeholder.jpg"}
                alt={province.name}
                className="h-24 w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-110 md:h-28"
              />
              <div className="from-dark-900/80 via-dark-900/20 absolute inset-0 rounded-xl bg-gradient-to-t to-transparent" />
              <div className="absolute right-2 bottom-2 left-2">
                <p className="font-sansBold text-center text-xs text-white md:text-sm">
                  {province.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularProvinces;
