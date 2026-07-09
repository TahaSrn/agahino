import { MdOutlineLocationOn } from "react-icons/md";
import Select from "./Select";
function SelectBar() {
  return (
    <div className="border border-primary-100 rounded-lg h-fit flex justify-center items-center hover:border-primary-500 transition-all duration-300 px-3">
      <Select />
      <MdOutlineLocationOn className="text-primary-100" size={18} />
    </div>
  );
}

export default SelectBar;
