import { AiOutlinePlusCircle } from "react-icons/ai";
import Button from "./Button";
import HeaderIconBar from "./HeaderIconBar";
import Logo from "./Logo";
import Search from "./Search";
import SelectBar from "./SelectBar";

function Header() {
  return (
    <header className="w-full bg-dark-700 flex items-center justify-center">
      <Logo />
      <SelectBar />
      <Search />
      <HeaderIconBar />
      <Button size="small" variation="primary">
        <AiOutlinePlusCircle size={20} />
        <span>ثبت آگهی</span>
      </Button>
    </header>
  );
}

export default Header;
