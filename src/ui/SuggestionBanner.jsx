function SuggestionBanner() {
  return (
    <div className="mt-8 flex w-full justify-center md:mt-10">
      <div className="w-[95%] overflow-hidden rounded-2xl md:w-[85%]">
        <img
          src="banner3.jpg"
          alt="agahino banner"
          className="h-32 w-full scale-150 rounded-2xl object-cover object-[-250%_center] md:h-48 md:scale-100 md:object-[center_45%] lg:h-56"
        />
      </div>
    </div>
  );
}

export default SuggestionBanner;
