import { MdOutlineLocationOn } from "react-icons/md";
import Select from "./Select";
function SelectBar() {
  return (
    <div className="border border-dark-300/30 rounded-lg h-fit flex justify-center items-center hover:border-primary-500/30 focus:border-primary-500/30 transition-all duration-300 px-3 py-1.5">
      <Select />
      <MdOutlineLocationOn className="text-primary-100" size={18} />
    </div>
  );
}

export default SelectBar;
