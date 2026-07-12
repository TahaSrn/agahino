import { AiOutlinePlusCircle } from "react-icons/ai";
import Button from "./Button";
import HeaderIconBar from "./HeaderIconBar";
import Logo from "./Logo";
import Search from "./Search";
import SelectBar from "./SelectBar";
import MobileNav from "./MobileNav";

function Header() {
  return (
    <>
      <header className="bg-dark-800/95 fixed top-0 right-0 left-0 z-50 flex w-full items-center justify-center border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300">
        <div className="flex w-[95%] items-center py-2 md:w-[85%] md:py-0 [&>*:nth-child(1)]:mr-4 md:[&>*:nth-child(1)]:mr-0 [&>*:nth-child(2)]:mr-10 [&>*:nth-child(3)]:mr-8 [&>*:nth-child(4)]:mr-20 [&>*:nth-child(5)]:mr-2 md:[&>*:nth-child(5)]:mr-8">
          <Logo className="w-20 md:w-40" />

          <div className="hidden md:block">
            <SelectBar />
          </div>

          <div className="min-w-0 flex-1">
            <Search />
          </div>

          <div className="hidden md:flex">
            <HeaderIconBar />
          </div>

          <div className="hidden md:block">
            <Button size="small" variation="primary" className="group">
              <span>ثبت آگهی</span>
              <AiOutlinePlusCircle
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
          </div>
        </div>

        <div className="via-primary-400/70 pointer-events-none absolute right-0 bottom-0 left-0 h-px bg-linear-to-r from-transparent to-transparent" />

        <div className="bg-primary-500/10 pointer-events-none absolute -bottom-3 left-1/2 h-8 w-[85%] -translate-x-1/2 rounded-full blur-2xl" />
      </header>

      <MobileNav />
    </>
  );
}

export default Header;
