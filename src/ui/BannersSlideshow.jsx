import { useState, useEffect, useRef } from "react";

function BannersSlideshow() {
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
    <div className="w-full flex justify-center pt-20 md:pt-24 pb-4">
      <div
        ref={containerRef}
        className="w-[95%] md:w-[85%] relative overflow-hidden rounded-lg"
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
              className="w-full flex-shrink-0 h-52 md:h-[450px] lg:h-[550px] object-cover"
            />
          ))}
        </div>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === index
                  ? "bg-primary-100 w-6"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BannersSlideshow;
