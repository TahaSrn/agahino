// pages/AdDetailPage.jsx
import { useParams, useNavigate } from "react-router";
import { useGetAd } from "../features/ads/useGetAd";
import { useGetRelatedAds } from "../features/ads/useGetRelatedAds";
import AdCard from "../features/ads/AdCard";
import Button from "../ui/Button";
import {
  FaPhone,
  FaComment,
  FaEye,
  FaCalendar,
  FaMapMarkerAlt,
  FaArrowRight,
  FaUser,
  FaCopy,
  FaExpand,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

function AdDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ad, isLoading, error } = useGetAd(id);
  const { relatedAds } = useGetRelatedAds(ad?.category_id, id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showPhone, setShowPhone] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center pt-20 md:pt-24">
        <div className="w-[95%] md:w-[85%]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="bg-dark-600/50 h-96 animate-pulse rounded-xl" />
            <div className="space-y-4">
              <div className="bg-dark-600/50 h-10 w-3/4 animate-pulse rounded-lg" />
              <div className="bg-dark-600/50 h-8 w-1/2 animate-pulse rounded-lg" />
              <div className="bg-dark-600/50 h-6 w-1/3 animate-pulse rounded-lg" />
              <div className="bg-dark-600/50 h-24 w-full animate-pulse rounded-lg" />
              <div className="bg-dark-600/50 h-12 w-full animate-pulse rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !ad) {
    return (
      <div className="flex w-full justify-center pt-20 md:pt-24">
        <div className="w-[95%] text-center md:w-[85%]">
          <p className="text-primary-400 font-sansReg">
            آگهی مورد نظر یافت نشد
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-primary-400 hover:text-primary-300 font-sansBold mt-4 transition-colors"
          >
            بازگشت به صفحه اصلی
          </button>
        </div>
      </div>
    );
  }

  const images = ad.images || [];
  const mainImage = images[selectedImage] || "/placeholder.jpg";

  const reversedImages = [...images].reverse();
  const reversedSelectedIndex = images.length - 1 - selectedImage;
  const reversedMainImage =
    reversedImages[reversedSelectedIndex] || "/placeholder.jpg";

  const handleShowPhone = () => {
    setShowPhone(true);
    if (ad.profiles?.phone) {
      toast.success("شماره تماس نمایش داده شد");
    } else {
      toast.error("شماره تماسی ثبت نشده است");
    }
  };

  const copyToClipboard = () => {
    if (ad.profiles?.phone) {
      navigator.clipboard.writeText(ad.profiles.phone);
      toast.success("شماره تماس کپی شد!");
    }
  };

  const openLightbox = (index) => {
    const reversedIndex = images.length - 1 - index;
    setLightboxIndex(reversedIndex);
    setIsLightboxOpen(true);
  };

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  const lightboxSlides = images.map((src) => ({ src }));

  return (
    <div className="flex w-full justify-center pt-4 pb-10">
      <div className="w-[95%] md:w-[85%]">
        <button
          onClick={() => navigate(-1)}
          className="hover:text-primary-400 font-sansReg mb-4 flex cursor-pointer items-center gap-2 text-sm text-gray-400 transition-colors"
        >
          <FaArrowRight />
          بازگشت
        </button>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <div
              className="bg-dark-800/50 group relative cursor-pointer overflow-hidden rounded-xl border border-white/10"
              onClick={() => openLightbox(selectedImage)}
            >
              <img
                src={reversedMainImage}
                alt={ad.title}
                className="h-[500px] w-full object-cover md:h-[600px]"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/30">
                <FaExpand className="text-3xl text-white opacity-0 transition-all duration-300 group-hover:opacity-100" />
              </div>
            </div>
            {images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                {reversedImages.map((img, index) => {
                  const originalIndex = images.length - 1 - index;
                  return (
                    <button
                      key={originalIndex}
                      onClick={() => handleThumbnailClick(originalIndex)}
                      className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                        selectedImage === originalIndex
                          ? "border-primary-500"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`thumbnail-${originalIndex}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-y-4">
            {ad.is_featured && (
              <span className="font-sansReg inline-block rounded-full border border-yellow-500/30 bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 px-3 py-1 text-xs text-yellow-400">
                ⭐ ویژه
              </span>
            )}
            <h1 className="text-primary-100 font-sansBold text-2xl md:text-3xl">
              {ad.title}
            </h1>
            <p className="text-primary-300 font-sansBold text-2xl md:text-3xl">
              {ad.price?.toLocaleString()} تومان
            </p>

            <div className="font-sansReg flex flex-wrap gap-3 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <FaCalendar size={14} />
                {new Date(ad.created_at).toLocaleDateString("fa-IR")}
              </span>
              <span className="flex items-center gap-1">
                <FaEye size={14} />
                {ad.views || 0} بازدید
              </span>
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt size={14} />
                {ad.city}
              </span>
              <span className="bg-dark-700/50 rounded-full px-2 py-1 text-xs">
                {ad.categories?.name}
              </span>
            </div>

            <div className="border-t border-white/10 pt-4">
              <h3 className="text-primary-100 font-sansBold mb-2 text-sm">
                توضیحات
              </h3>
              <p className="font-sansReg text-sm leading-relaxed whitespace-pre-wrap text-gray-400">
                {ad.description}
              </p>
            </div>

            {ad.metadata && Object.keys(ad.metadata).length > 0 && (
              <div className="border-t border-white/10 pt-4">
                <h3 className="text-primary-100 font-sansBold mb-2 text-sm">
                  مشخصات
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(ad.metadata).map(([key, value]) => {
                    const labels = {
                      brand: "برند",
                      model: "مدل",
                      year: "سال تولید",
                      mileage: "کارکرد",
                      color: "رنگ",
                      fuel_type: "نوع سوخت",
                      transmission: "گیربکس",
                      area: "متراژ",
                      bedrooms: "تعداد خواب",
                      floor: "طبقه",
                      has_elevator: "آسانسور",
                      has_parking: "پارکینگ",
                      storage: "حافظه",
                      battery_health: "سلامت باتری",
                      service_type: "نوع خدمات",
                      duration: "مدت زمان",
                      has_warranty: "گارانتی",
                      author: "نویسنده",
                      publisher: "ناشر",
                      year_published: "سال انتشار",
                      pages: "تعداد صفحات",
                      restaurant_name: "نام رستوران",
                      cuisine_type: "نوع غذا",
                      delivery_time: "زمان تحویل",
                      category: "دسته",
                      size: "سایز",
                      type: "نوع",
                      power: "قدرت",
                      platform: "پلتفرم",
                      game_name: "نام بازی",
                      genre: "ژانر",
                      players: "تعداد بازیکن",
                    };
                    const label = labels[key] || key;
                    return (
                      <div
                        key={key}
                        className="bg-dark-800/30 rounded-lg px-3 py-2"
                      >
                        <p className="font-sansReg text-[10px] text-gray-500 uppercase">
                          {label}
                        </p>
                        <p className="font-sansReg text-sm text-gray-300">
                          {typeof value === "boolean"
                            ? value
                              ? "بله"
                              : "خیر"
                            : value}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="border-t border-white/10 pt-4">
              <h3 className="text-primary-100 font-sansBold mb-2 text-sm">
                اطلاعات فروشنده
              </h3>
              <div className="flex items-center gap-2">
                <FaUser className="text-gray-400" size={14} />
                <p className="font-sansReg text-sm text-gray-300">
                  {ad.profiles?.full_name
                    ? ad.profiles.full_name
                    : "کاربر آگهی‌نو"}
                </p>
              </div>
            </div>

            <div className="flex justify-start gap-3 pt-2">
              {showPhone && ad.profiles?.phone ? (
                <Button
                  size="small"
                  variation="primary"
                  className="px-8 py-3 md:px-24"
                  onClick={copyToClipboard}
                >
                  <FaCopy size={16} />
                  {ad.profiles.phone}
                </Button>
              ) : (
                <Button
                  size="small"
                  variation="primary"
                  className="px-8 py-3 md:px-24"
                  onClick={handleShowPhone}
                >
                  <FaPhone size={16} />
                  اطلاعات تماس
                </Button>
              )}
              <Button
                size="small"
                variation="secondary"
                className="px-14 py-3 md:px-30"
                onClick={() => toast.info("در حال توسعه...")}
              >
                <FaComment size={16} />
                چت
              </Button>
            </div>
          </div>
        </div>

        {relatedAds && relatedAds.length > 0 && (
          <div className="mt-10">
            <h3 className="text-primary-100 font-sansBold mb-4 text-xl">
              آگهی‌های مشابه
            </h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {relatedAds.map((relatedAd) => (
                <AdCard key={relatedAd.id} ad={relatedAd} />
              ))}
            </div>
          </div>
        )}
      </div>

      {isLightboxOpen && lightboxSlides.length > 0 && (
        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          index={lightboxIndex}
          slides={lightboxSlides}
          plugins={[Zoom, Thumbnails]}
          carousel={{
            finite: true,
          }}
          controller={{
            rtl: false,
          }}
          zoom={{
            maxZoomPixelRatio: 3,
            zoomInMultiplier: 2,
          }}
          thumbnails={{
            position: "bottom",
            width: 80,
            height: 60,
            border: 0,
            borderRadius: 4,
            padding: 4,
            gap: 8,
          }}
          styles={{
            container: {
              backgroundColor: "rgba(0,0,0,0.95)",
            },
            button: {
              filter: "none",
              color: "#fff",
            },
          }}
        />
      )}
    </div>
  );
}

export default AdDetailPage;
