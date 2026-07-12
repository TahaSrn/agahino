import PopularProvinces from "../features/provinces/PopularProvinces";
import FeaturedAds from "../features/ads/FeaturedAds";
import BannersSlideshow from "./BannersSlideshow";
import CategorySection from "./CategorySection";
import SuggestionBanner from "./SuggestionBanner";

function Main() {
  return (
    <main className="bg-dark-700 min-h-screen pb-24 md:pb-0">
      <BannersSlideshow />
      <CategorySection />
      <SuggestionBanner />
      <FeaturedAds />
      <PopularProvinces />
    </main>
  );
}

export default Main;
