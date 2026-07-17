// components/SelectBar.jsx
import { useState } from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import SelectInput from "./Select";

function SelectBar({ onProvinceChange }) {
  const [selectedProvince, setSelectedProvince] = useState("");

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    if (onProvinceChange) {
      onProvinceChange(value);
    }
  };

  return (
    <div className="border-dark-300/30 hover:border-primary-500/30 focus:border-primary-500/30 flex h-fit items-center justify-center rounded-lg border px-3 py-1.5 transition-all duration-300">
      <SelectInput
        value={selectedProvince}
        onValueChange={handleProvinceChange}
      />
      <MdOutlineLocationOn className="text-primary-100" size={18} />
    </div>
  );
}

export default SelectBar;
