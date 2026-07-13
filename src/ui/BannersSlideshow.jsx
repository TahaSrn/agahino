import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

function BannersSlideshow() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const containerRef = useRef(null);
  const banners = [
    { id: 1, src: "/banner1.jpg", alt: "banner 1" },
    { id: 2, src: "/banner2.jpg", alt: "banner 2" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      if (currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      }
    }

    if (touchStartX - touchEndX < -50) {
      if (currentSlide < banners.length - 1) {
        setCurrentSlide(currentSlide + 1);
      }
    }

    setTouchStartX(0);
    setTouchEndX(0);
  };

  return (
    <div className="flex w-full justify-center pt-20 md:pt-24">
      <div
        ref={containerRef}
        className="relative w-[95%] overflow-hidden rounded-lg md:w-[85%]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${currentSlide * 100}%)` }}
        >
          {banners.map((banner) => (
            <img
              key={banner.id}
              src={banner.src}
              alt={banner.alt}
              className="h-52 w-full flex-shrink-0 object-cover md:h-[450px] lg:h-[550px]"
            />
          ))}
        </div>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 cursor-pointer rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-primary-100 w-6"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => navigate("/ads")}
          className="from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 font-sansBold shadow-primary-500/30 hover:shadow-primary-500/40 border-primary-400/30 absolute top-4 right-4 flex animate-pulse cursor-pointer items-center gap-2 rounded-full border bg-gradient-to-r px-5 py-2.5 text-sm text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 md:top-6 md:right-6 md:px-6 md:py-3 md:text-base"
        >
          <span>مشاهده همه آگهی‌ها</span>
          <FaArrowLeft size={16} />
        </button>
      </div>
    </div>
  );
}

export default BannersSlideshow;
