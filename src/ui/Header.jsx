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
      <header className="from-dark-800 via-dark-800 to-dark-200/15 border-dark-400/70 fixed top-0 right-0 left-0 z-50 flex w-full items-center justify-center overflow-x-hidden border-b bg-linear-to-b py-2 md:py-0">
        <div className="flex w-[95%] items-center md:w-[85%] [&>*:nth-child(1)]:mr-4 md:[&>*:nth-child(1)]:mr-0 [&>*:nth-child(2)]:mr-10 [&>*:nth-child(3)]:mr-8 [&>*:nth-child(4)]:mr-20 [&>*:nth-child(5)]:mr-2 md:[&>*:nth-child(5)]:mr-8">
          <Logo />

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
            <Button size="small" variation="primary">
              <AiOutlinePlusCircle size={20} />
              <span>ثبت آگهی</span>
            </Button>
          </div>
        </div>
      </header>

      <MobileNav />
    </>
  );
}

export default Header;
