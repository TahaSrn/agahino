// pages/AdsPage.jsx
import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router";
import { useGetAds } from "../features/ads/useGetAds";
import AdCard from "../features/ads/AdCard";
import { FaSearch, FaTimes } from "react-icons/fa";

function AdsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const initialProvince = searchParams.get("province") || "";
  const initialFeatured = searchParams.get("featured") === "true";
  const initialCategory = searchParams.get("category") || "";
  const initialSort = searchParams.get("sort") || "newest";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedProvince, setSelectedProvince] = useState(initialProvince);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(initialFeatured);
  const [sortBy, setSortBy] = useState(initialSort);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    if (initialProvince) {
      setSelectedProvince(initialProvince);
    }
    if (initialFeatured) {
      setShowFeaturedOnly(true);
    }
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
    if (initialSort) {
      setSortBy(initialSort);
    }
  }, [initialProvince, initialFeatured, initialCategory, initialSort]);

  const { ads, isLoading, error } = useGetAds();

  let filteredAds = ads?.filter((ad) => {
    let match = true;

    if (showFeaturedOnly && !ad.is_featured) {
      match = false;
    }

    if (selectedCategory && ad.category_id !== parseInt(selectedCategory)) {
      match = false;
    }

    if (selectedProvince && ad.province_id !== parseInt(selectedProvince)) {
      match = false;
    }

    if (priceMin && ad.price < parseInt(priceMin)) {
      match = false;
    }

    if (priceMax && ad.price > parseInt(priceMax)) {
      match = false;
    }

    if (searchQuery && !ad.title.includes(searchQuery)) {
      match = false;
    }

    return match;
  });

  // اعمال سورت
  if (filteredAds) {
    if (sortBy === "newest") {
      filteredAds = [...filteredAds].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
    } else if (sortBy === "expensive") {
      filteredAds = [...filteredAds].sort((a, b) => b.price - a.price);
    } else if (sortBy === "cheapest") {
      filteredAds = [...filteredAds].sort((a, b) => a.price - b.price);
    }
  }

  if (isLoading) {
    return (
      <div className="mt-20 flex w-full justify-center md:mt-24">
        <div className="w-[95%] md:w-[85%]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="bg-dark-600/50 h-96 animate-pulse rounded-xl" />
            </div>
            <div className="md:col-span-3">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-dark-600/50 h-64 animate-pulse rounded-xl"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 flex w-full justify-center md:mt-24">
        <div className="text-primary-400 font-sansReg w-[95%] text-center md:w-[85%]">
          خطا در بارگیری آگهی‌ها
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 flex w-full justify-center md:mt-20">
      <div className="w-[95%] md:w-[85%]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="bg-dark-800/50 sticky top-20 rounded-xl border border-white/10 p-4 backdrop-blur-sm md:p-5">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-primary-100 font-sansBold text-base">
                  فیلترها
                </h4>
                <button
                  onClick={() => {
                    setSelectedCategory("");
                    setSelectedProvince("");
                    setPriceMin("");
                    setPriceMax("");
                    setSearchQuery("");
                    setShowFeaturedOnly(false);
                    setSortBy("newest");
                    setSearchParams({ sort: "newest" });
                  }}
                  className="hover:text-primary-400 font-sansReg text-xs text-gray-400 transition-colors duration-300"
                >
                  حذف همه
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-sansReg mb-1.5 block text-sm text-gray-300">
                    جستجو
                  </label>
                  <div className="relative">
                    <FaSearch
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                      size={16}
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="جستجو در آگهی‌ها..."
                      className="bg-dark-700/50 font-sansReg focus:border-primary-500/50 w-full rounded-lg border border-white/10 px-3 py-2 pr-10 text-sm text-gray-300 transition-colors duration-300 outline-none"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                      >
                        <FaTimes size={14} />
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="font-sansReg mb-1.5 block text-sm text-gray-300">
                    دسته‌بندی
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      if (e.target.value) {
                        setSearchParams({
                          category: e.target.value,
                          sort: sortBy,
                        });
                      } else {
                        const params = new URLSearchParams(searchParams);
                        params.delete("category");
                        setSearchParams(params);
                      }
                    }}
                    className="bg-dark-700/50 font-sansReg focus:border-primary-500/50 w-full rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 transition-colors duration-300 outline-none"
                  >
                    <option value="">همه دسته‌ها</option>
                    <option value="1">خودرو</option>
                    <option value="2">املاک</option>
                    <option value="3">دیجیتال</option>
                    <option value="4">خدمات</option>
                    <option value="5">کتاب</option>
                    <option value="6">غذا</option>
                    <option value="7">مد و پوشاک</option>
                    <option value="8">ابزار</option>
                    <option value="9">بازی</option>
                  </select>
                </div>

                <div>
                  <label className="font-sansReg mb-1.5 block text-sm text-gray-300">
                    استان
                  </label>
                  <select
                    value={selectedProvince}
                    onChange={(e) => {
                      setSelectedProvince(e.target.value);
                      if (e.target.value) {
                        setSearchParams({
                          province: e.target.value,
                          sort: sortBy,
                        });
                      } else {
                        const params = new URLSearchParams(searchParams);
                        params.delete("province");
                        setSearchParams(params);
                      }
                    }}
                    className="bg-dark-700/50 font-sansReg focus:border-primary-500/50 w-full rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 transition-colors duration-300 outline-none"
                  >
                    <option value="">همه استان‌ها</option>
                    <option value="1">تهران</option>
                    <option value="2">مازندران</option>
                    <option value="3">خراسان رضوی</option>
                    <option value="4">اصفهان</option>
                    <option value="5">فارس</option>
                    <option value="6">گیلان</option>
                    <option value="7">آذربایجان شرقی</option>
                    <option value="8">البرز</option>
                    <option value="9">خوزستان</option>
                  </select>
                </div>

                <div>
                  <label className="font-sansReg mb-1.5 block text-sm text-gray-300">
                    مرتب‌سازی
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setSearchParams({
                        ...Object.fromEntries(searchParams),
                        sort: e.target.value,
                      });
                    }}
                    className="bg-dark-700/50 font-sansReg focus:border-primary-500/50 w-full rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 transition-colors duration-300 outline-none"
                  >
                    <option value="newest">جدیدترین</option>
                    <option value="expensive">گران‌ترین</option>
                    <option value="cheapest">ارزان‌ترین</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-sansReg mb-1.5 block text-sm text-gray-300">
                      قیمت از
                    </label>
                    <input
                      type="number"
                      value={priceMin}
                      onChange={(e) => setPriceMin(e.target.value)}
                      placeholder="۰"
                      className="bg-dark-700/50 font-sansReg focus:border-primary-500/50 w-full rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 transition-colors duration-300 outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-sansReg mb-1.5 block text-sm text-gray-300">
                      قیمت تا
                    </label>
                    <input
                      type="number"
                      value={priceMax}
                      onChange={(e) => setPriceMax(e.target.value)}
                      placeholder="۰"
                      className="bg-dark-700/50 font-sansReg focus:border-primary-500/50 w-full rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 transition-colors duration-300 outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <label className="relative inline-flex cursor-pointer items-center gap-3">
                    <span className="font-sansReg text-sm text-gray-300">
                      فقط آگهی‌های ویژه
                    </span>
                    <input
                      type="checkbox"
                      checked={showFeaturedOnly}
                      onChange={(e) => {
                        setShowFeaturedOnly(e.target.checked);
                        if (e.target.checked) {
                          setSearchParams({
                            ...Object.fromEntries(searchParams),
                            featured: "true",
                          });
                        } else {
                          const params = new URLSearchParams(searchParams);
                          params.delete("featured");
                          setSearchParams(params);
                        }
                      }}
                      className="peer sr-only"
                    />
                    <div className="peer peer-checked:bg-primary-500 relative h-5 w-9 rounded-full bg-neutral-400 transition-all duration-300 after:absolute after:top-[1.8px] after:right-[1.8px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:duration-300 peer-checked:after:-translate-x-4"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            {filteredAds?.length === 0 ? (
              <div className="py-10 text-center">
                <p className="font-sansReg text-base text-gray-400">
                  هیچ آگهی‌ای با این فیلترها پیدا نشد
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredAds?.map((ad) => (
                  <AdCard key={ad.id} ad={ad} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdsPage;
