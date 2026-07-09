import { AiOutlinePlusCircle } from "react-icons/ai";
import Button from "./Button";
import HeaderIconBar from "./HeaderIconBar";
import Logo from "./Logo";
import Search from "./Search";
import SelectBar from "./SelectBar";

function Header() {
  return (
    <header className="w-full bg-dark-700 flex justify-center items-center">
      <div className="w-[85%] flex items-center border border-red-500 [&>*:nth-child(1)]:mr-0 [&>*:nth-child(2)]:mr-10 [&>*:nth-child(3)]:mr-8 [&>*:nth-child(4)]:mr-20 [&>*:nth-child(5)]:mr-8">
        <Logo />
        <SelectBar />
        <div className="flex-1">
          <Search />
        </div>
        <HeaderIconBar />
        <Button size="small" variation="primary">
          <AiOutlinePlusCircle size={20} />
          <span>ثبت آگهی</span>
        </Button>
      </div>
    </header>
  );
}

export default Header;
