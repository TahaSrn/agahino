import { useNavigate } from "react-router";
import BorderGlow from "@/components/BorderGlow";
import { useGetCategories } from "../features/categories/useGetCategories";
import * as Icons from "react-icons/fa";

function CategorySection() {
  const navigate = useNavigate();
  const { categories, isLoading, error } = useGetCategories();

  const handleCategoryClick = (categoryId) => {
    navigate(`/ads?category=${categoryId}`);
  };

  const handleViewAll = () => {
    navigate("/ads");
  };

  if (isLoading) {
    return (
      <div className="mt-8 flex w-full justify-center md:mt-10">
        <BorderGlow
          className="w-[95%] md:w-[85%]"
          edgeSensitivity={30}
          glowColor="0 100 65"
          backgroundColor="#120F17"
          borderRadius={24}
          glowRadius={40}
          glowIntensity={1}
          coneSpread={25}
          animated={false}
          colors={["#c084fc", "#f472b6", "#38bdf8"]}
        >
          <div className="bg-dark-600/30 border-primary-500/20 rounded-2xl border p-4 shadow-[inset_0_0_20px_color-mix(in_srgb,var(--color-primary-700)_30%,transparent)] backdrop-blur-sm md:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div className="from-dark-600 via-dark-500 to-dark-600 animate-shimmer h-7 w-40 rounded-lg bg-linear-to-r md:h-8" />
              <div className="from-dark-600 via-dark-500 to-dark-600 animate-shimmer h-5 w-24 rounded-lg bg-linear-to-r md:h-6" />
            </div>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-4 md:gap-4 lg:grid-cols-9">
              {[...Array(9)].map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 p-3 backdrop-blur-xl md:gap-3 md:p-5"
                >
                  <div className="rounded-ful l from-dark-600 via-dark-500 to-dark-600 animate-shimmer h-7 w-7 bg-linear-to-r md:h-8 md:w-8" />
                  <div className="from-dark-600 via-dark-500 to-dark-600 animate-shimmer h-3 w-10 rounded-lg bg-linear-to-r md:h-4" />
                </div>
              ))}
            </div>
          </div>
        </BorderGlow>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 flex w-full justify-center md:mt-10">
        <div className="font-sansMed text-primary-400 w-[95%] text-center md:w-[85%]">
          خطا در بارگیری دسته بندی ها
        </div>
      </div>
    );
  }

  const iconMap = {
    FaCar: Icons.FaCar,
    FaHome: Icons.FaHome,
    FaMobile: Icons.FaMobile,
    FaSuitcase: Icons.FaSuitcase,
    FaBook: Icons.FaBook,
    FaUtensils: Icons.FaUtensils,
    FaTshirt: Icons.FaTshirt,
    FaTools: Icons.FaTools,
    FaGamepad: Icons.FaGamepad,
  };

  return (
    <div className="mt-8 flex w-full justify-center md:mt-10">
      <BorderGlow
        className="w-[95%] md:w-[85%]"
        edgeSensitivity={30}
        glowColor="0 100 65"
        backgroundColor="#120F17"
        borderRadius={24}
        glowRadius={40}
        glowIntensity={1}
        coneSpread={25}
        animated={false}
        colors={["#c084fc", "#f472b6", "#38bdf8"]}
      >
        <div className="bg-dark-600/30 border-primary-500/20 rounded-2xl border p-4 shadow-[inset_0_0_20px_color-mix(in_srgb,var(--color-primary-700)_30%,transparent)] backdrop-blur-sm md:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-primary-100 font-sansBold text-lg md:text-xl">
              دسته بندی ها
            </h3>

            <button
              onClick={handleViewAll}
              className="text-primary-500 hover:text-primary-300 font-sansBold cursor-pointer text-sm whitespace-nowrap transition-colors md:text-base"
            >
              مشاهده همه &gt;
            </button>
          </div>

          <div className="font-sansReg grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-4 md:gap-4 lg:grid-cols-9">
            {categories?.map((category) => {
              const Icon = iconMap[category.icon_name] || Icons.FaCircle;

              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="group hover:border-primary-500/40 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_0_18px_color-mix(in_srgb,var(--color-primary-600)_30%,transparent)] active:scale-95 md:gap-3 md:p-5"
                >
                  <Icon
                    size={28}
                    className="group-hover:text-primary-100 text-white transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_color-mix(in_srgb,var(--color-primary-500)_45%,transparent)]"
                  />

                  <span className="text-center text-[10px] text-white transition-colors group-hover:text-white md:text-sm">
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </BorderGlow>
    </div>
  );
}

export default CategorySection;
