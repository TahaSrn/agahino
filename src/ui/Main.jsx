import BannersSlideshow from "./BannersSlideshow";
import CategorySection from "./CategorySection";
import SuggestionBanner from "./SuggestionBanner";

function Main() {
  return (
    <main className="bg-dark-700 min-h-screen">
      <BannersSlideshow />
      <CategorySection />
      <SuggestionBanner />
    </main>
  );
}

export default Main;
