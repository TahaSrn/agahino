import PopularProvinces from "../features/provinces/PopularProvinces";
import FeaturedAds from "../features/ads/FeaturedAds";
import BannersSlideshow from "./BannersSlideshow";
import CategorySection from "./CategorySection";
import SuggestionBanner from "./SuggestionBanner";
import LatestAds from "@/features/ads/LatestAds";
import TrustBanner from "./TrustBanner";
import Footer from "./Footer";

function Main() {
  return (
    <main className="bg-dark-700 min-h-screen pb-24 md:pb-0">
      <BannersSlideshow />
      <PopularProvinces />
      <SuggestionBanner />
      <FeaturedAds />
      <CategorySection />
      <LatestAds />
      <TrustBanner />
      <Footer />
    </main>
  );
}

export default Main;
