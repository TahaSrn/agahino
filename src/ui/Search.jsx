// components/Search.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useGetAds } from "../features/ads/useGetAds";
import AdCard from "../features/ads/AdCard";

function Search({ selectedProvince }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const { ads } = useGetAds();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim() && ads) {
      let results = ads.filter((ad) => ad.title.includes(query.trim()));

      if (selectedProvince) {
        results = results.filter(
          (ad) => ad.province_id === parseInt(selectedProvince),
        );
      }

      setSearchResults(results.slice(0, 6));
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [query, ads, selectedProvince]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      const params = new URLSearchParams();
      params.set("q", query.trim());
      if (selectedProvince) {
        params.set("province", selectedProvince);
      }
      navigate(`/ads?${params.toString()}`);
      setShowResults(false);
    }
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="border-dark-300/30 font-sansReg hover:border-primary-500/30 focus:border-primary-500/30 flex h-11.5 w-full items-center gap-2 overflow-hidden rounded-md border bg-transparent pr-1 transition-all duration-300 md:pr-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 30 30"
          fill="#6B7280"
        >
          <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.trim() && searchResults.length > 0) {
              setShowResults(true);
            }
          }}
          placeholder="جستجو در آگهی‌نو..."
          className="text-primary-100 h-full w-full text-[12px] placeholder-gray-500 outline-none md:text-sm"
        />
      </div>

      {showResults && searchResults.length > 0 && (
        <div className="bg-dark-800/95 absolute top-full right-0 left-0 z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-white/10 shadow-2xl backdrop-blur-xl">
          {searchResults.map((ad) => (
            <div
              key={ad.id}
              onClick={() => {
                navigate(`/ad/${ad.id}`);
                setShowResults(false);
                setQuery("");
              }}
              className="flex cursor-pointer items-center gap-3 border-b border-white/5 p-3 transition-colors last:border-none hover:bg-white/5"
            >
              <img
                src={ad.images?.[0] || "/placeholder.jpg"}
                alt={ad.title}
                className="h-12 w-12 flex-shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="font-sansReg truncate text-sm text-white">
                  {ad.title}
                </p>
                <p className="text-primary-300 font-sansReg text-xs">
                  {ad.price?.toLocaleString()} تومان
                </p>
              </div>
              <span className="font-sansReg text-xs whitespace-nowrap text-gray-500">
                {ad.city}
              </span>
            </div>
          ))}
          <div className="border-t border-white/5 p-2">
            <button
              onClick={() => {
                const params = new URLSearchParams();
                params.set("q", query.trim());
                if (selectedProvince) {
                  params.set("province", selectedProvince);
                }
                navigate(`/ads?${params.toString()}`);
                setShowResults(false);
              }}
              className="text-primary-400 hover:text-primary-300 font-sansReg w-full py-1.5 text-center text-sm transition-colors"
            >
              مشاهده همه نتایج ({searchResults.length} مورد)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
