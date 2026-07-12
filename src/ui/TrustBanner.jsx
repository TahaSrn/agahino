// components/TrustBanner.jsx
import {
  FaShieldAlt,
  FaRocket,
  FaCity,
  FaRegGem,
  FaArrowLeft,
} from "react-icons/fa";
import Button from "./Button";

function TrustBanner() {
  const items = [
    {
      id: 1,
      title: "امنیت و اعتماد",
      icon: FaShieldAlt,
      description: "محیط امن برای خرید و فروش",
      gradient: "from-emerald-500/20 to-emerald-600/10",
      color: "text-emerald-400",
      border: "hover:border-emerald-500/40",
      shadow: "hover:shadow-emerald-500/10",
    },
    {
      id: 2,
      title: "سریع و آسان",
      icon: FaRocket,
      description: "ثبت آگهی در کمتر از ۲ دقیقه",
      gradient: "from-blue-500/20 to-blue-600/10",
      color: "text-blue-400",
      border: "hover:border-blue-500/40",
      shadow: "hover:shadow-blue-500/10",
    },
    {
      id: 3,
      title: "در همه شهرها",
      icon: FaCity,
      description: "پوشش سراسری در سراسر کشور",
      gradient: "from-purple-500/20 to-purple-600/10",
      color: "text-purple-400",
      border: "hover:border-purple-500/40",
      shadow: "hover:shadow-purple-500/10",
    },
    {
      id: 4,
      title: "رایگان ثبت کن",
      icon: FaRegGem,
      description: "ثبت آگهی کاملاً رایگان",
      gradient: "from-amber-500/20 to-amber-600/10",
      color: "text-amber-400",
      border: "hover:border-amber-500/40",
      shadow: "hover:shadow-amber-500/10",
    },
  ];

  return (
    <div className="mt-8 flex w-full justify-center md:mt-12">
      <div className="w-[95%] md:w-[85%]">
        <div className="from-dark-800 via-dark-700 to-dark-800 relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br p-8 shadow-2xl md:p-10">
          <div className="from-primary-500/5 absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] via-transparent to-transparent" />

          <div className="from-primary-500/20 to-primary-600/5 absolute top-0 -right-20 h-80 w-80 rounded-full bg-gradient-to-br blur-3xl" />
          <div className="from-primary-600/10 to-primary-500/5 absolute bottom-0 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr blur-3xl" />
          <div className="bg-primary-500/5 absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />

          <div className="relative">
            <div className="mb-8 text-center md:mb-10">
              <div className="bg-primary-500/10 border-primary-500/20 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2">
                <span className="text-primary-400 font-sansBold text-xs tracking-wider">
                  ✦ مزایای آگهی‌نو
                </span>
              </div>
              <h3 className="font-sansBold text-2xl text-white md:text-4xl">
                چرا{" "}
                <span className="from-primary-400 to-primary-300 bg-gradient-to-r bg-clip-text text-transparent">
                  آگهی‌نو
                </span>
                ؟
              </h3>
              <p className="font-sansReg mx-auto mt-2 max-w-md text-sm text-gray-400 md:text-base">
                تجربه‌ای متفاوت از خرید و فروش آنلاین
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className={`group relative flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br p-5 text-center md:p-6 ${item.gradient} border border-white/5 backdrop-blur-sm ${item.border} transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${item.shadow} cursor-default`}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 via-white/0 to-white/0 transition-all duration-500 group-hover:from-white/5 group-hover:via-white/5 group-hover:to-white/10" />

                    <div className="relative flex flex-col items-center justify-center">
                      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/5 bg-gradient-to-br from-white/10 to-white/5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:border-white/10 group-hover:shadow-xl md:h-20 md:w-20">
                        <Icon
                          size={32}
                          className={`${item.color} transition-all duration-500 group-hover:text-white`}
                        />
                      </div>
                      <h4 className="font-sansBold group-hover:text-primary-100 relative text-sm text-white transition-colors duration-300 md:text-base">
                        {item.title}
                      </h4>
                      <p className="font-sansReg relative mt-1.5 text-[10px] text-gray-400 transition-colors duration-300 group-hover:text-gray-300 md:text-xs">
                        {item.description}
                      </p>

                      <div className="via-primary-400 absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent transition-all duration-500 group-hover:w-full" />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-center md:mt-10">
              <Button size="small" variation="primary" className="group">
                شروع کن
                <FaArrowLeft className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrustBanner;
