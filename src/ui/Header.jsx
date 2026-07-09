import { AiOutlinePlusCircle } from "react-icons/ai";
import Button from "./Button";
import HeaderIconBar from "./HeaderIconBar";
import Logo from "./Logo";
import Search from "./Search";
import SelectBar from "./SelectBar";
import MobileBottomNav from "./MobileBottomNav";

function Header() {
  return (
    <>
      <header className="w-full bg-dark-700 flex justify-center items-center py-2 md:py-0 fixed top-0 left-0 right-0 z-50">
        <div className="w-[95%] md:w-[85%] flex items-center [&>*:nth-child(1)]:mr-0 [&>*:nth-child(2)]:mr-10 [&>*:nth-child(3)]:mr-8 [&>*:nth-child(4)]:mr-20 [&>*:nth-child(5)]:mr-8">
          <Logo />

          <div className="hidden md:block">
            <SelectBar />
          </div>

          <div className="flex-1">
            <Search />
          </div>

          <div className="hidden md:flex">
            <HeaderIconBar />
          </div>

          <Button size="small" variation="primary" className="px-2! md:px-4!">
            <AiOutlinePlusCircle size={20} />
            <span>ثبت آگهی</span>
          </Button>
        </div>
      </header>

      <MobileBottomNav />

      <div className="h-16 md:h-20" />
      <div className="md:hidden h-16" />
    </>
  );
}

export default Header;
