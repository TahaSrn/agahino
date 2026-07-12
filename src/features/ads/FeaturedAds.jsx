// components/FeaturedAds.jsx
import { useRef } from "react";
import { useGetFeaturedAds } from "@/features/ads/useGetFeaturedAds";
import AdCard from "./AdCard";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";

function FeaturedAds() {
  const { featuredAds, isLoading, error } = useGetFeaturedAds();
  const scrollContainerRef = useRef(null);

  const scrollByCard = (direction) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const firstCard = container.firstElementChild;

    if (!firstCard) return;

    const cardWidth = firstCard.getBoundingClientRect().width;

    const styles = window.getComputedStyle(container);
    const gap = parseFloat(styles.columnGap || styles.gap || 0);

    container.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  const scrollRight = () => scrollByCard(1);
  const scrollLeft = () => scrollByCard(-1);

  if (isLoading) {
    return (
      <div className="mt-8 flex w-full justify-center md:mt-10">
        <div className="w-[95%] md:w-[85%]">
          <div className="mb-4 flex items-center justify-between">
            <div className="from-dark-600 via-dark-500 to-dark-600 animate-shimmer h-7 w-48 rounded-lg bg-linear-to-r md:h-8" />
            <div className="from-dark-600 via-dark-500 to-dark-600 animate-shimmer h-6 w-24 rounded-lg bg-linear-to-r" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {[...Array(4)].map((_, index) => (
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
          خطا در بارگیری آگهی‌های ویژه
        </div>
      </div>
    );
  }

  if (!featuredAds?.length) {
    return null;
  }

  return (
    <div className="mt-8 flex w-full justify-center md:mt-10">
      <div className="w-[95%] md:w-[85%]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-primary-100 font-sansBold text-lg md:text-xl">
            آگهی‌های ویژه
          </h3>
          <button className="text-primary-400 hover:text-primary-300 font-sansBold cursor-pointer text-sm whitespace-nowrap transition-colors md:text-base">
            مشاهده همه &gt;
          </button>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="hide-scrollbar flex gap-4 overflow-x-auto scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featuredAds.map((ad) => (
              <div
                key={ad.id}
                className="min-w-[calc(50%-8px)] sm:min-w-[calc(33.333%-10.667px)] md:min-w-[calc(25%-12px)]"
              >
                <AdCard ad={ad} />
              </div>
            ))}
          </div>

          <button
            onClick={scrollLeft}
            className="bg-dark-800/90 hover:bg-dark-700 text-primary-100 hover:border-primary-500/50 absolute top-1/2 left-0 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110"
          >
            <IoChevronBack size={22} />
          </button>

          <button
            onClick={scrollRight}
            className="bg-dark-800/90 hover:bg-dark-700 text-primary-100 hover:border-primary-500/50 absolute top-1/2 right-0 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110"
          >
            <IoChevronForward size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeaturedAds;
