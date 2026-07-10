import BorderGlow from "@/components/BorderGlow";
import {
  FaCar,
  FaHome,
  FaMobile,
  FaSuitcase,
  FaBook,
  FaUtensils,
  FaTshirt,
  FaTools,
  FaGamepad,
} from "react-icons/fa";

function CategorySection() {
  const categories = [
    { id: 1, name: "خودرو", icon: FaCar },
    { id: 2, name: "املاک", icon: FaHome },
    { id: 3, name: "دیجیتال", icon: FaMobile },
    { id: 4, name: "خدمات", icon: FaSuitcase },
    { id: 5, name: "کتاب", icon: FaBook },
    { id: 6, name: "غذا", icon: FaUtensils },
    { id: 7, name: "مد و پوشاک", icon: FaTshirt },
    { id: 8, name: "ابزار", icon: FaTools },
    { id: 9, name: "بازی", icon: FaGamepad },
  ];

  return (
    <div className="w-full flex justify-center mt-6 md:mt-8">
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
        <div className="bg-dark-600/30 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-4 md:p-6 shadow-[inset_0_0_20px_color-mix(in_srgb,var(--color-primary-700)_30%,transparent)]">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-primary-100 text-lg md:text-xl font-sansBold">
              دسته بندی ها
            </h3>

            <button className="text-primary-500 hover:text-primary-300 text-sm md:text-base transition-colors font-sansBold">
              مشاهده همه &gt;
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-9 gap-4 font-sansReg">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  key={category.id}
                  className="
                  group
                  flex flex-col items-center justify-center
                  gap-3
                  p-5
                  rounded-xl
                  cursor-pointer
                  border border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:bg-white/10
                  hover:border-primary-500/40
                  hover:shadow-[0_0_18px_color-mix(in_srgb,var(--color-primary-600)_30%,transparent)]
                  active:scale-95
                "
                >
                  <Icon
                    size={32}
                    className="
                    text-white
                    transition-all duration-300
                    group-hover:text-primary-100
                    group-hover:scale-110
                    group-hover:drop-shadow-[0_0_10px_color-mix(in_srgb,var(--color-primary-500)_45%,transparent)]
                  "
                  />

                  <span className="text-white text-xs md:text-sm text-center transition-colors group-hover:text-white">
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
