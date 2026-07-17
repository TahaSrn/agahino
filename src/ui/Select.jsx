// components/Select.jsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectInput({ value, onValueChange }) {
  const provinces = [
    { id: "", name: "همه شهرها" },
    { id: "1", name: "تهران" },
    { id: "2", name: "مازندران" },
    { id: "3", name: "خراسان رضوی" },
    { id: "4", name: "اصفهان" },
    { id: "5", name: "فارس" },
    { id: "6", name: "گیلان" },
    { id: "7", name: "آذربایجان شرقی" },
    { id: "8", name: "البرز" },
    { id: "9", name: "خوزستان" },
  ];

  const getDisplayValue = (val) => {
    const province = provinces.find((p) => p.id === val);
    return province ? province.name : "همه شهرها";
  };

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="text-primary-100 font-sansMed cursor-pointer flex-row-reverse rounded-xl border-none bg-transparent transition-all duration-200">
        <SelectValue placeholder="همه شهرها">
          {getDisplayValue(value)}
        </SelectValue>
      </SelectTrigger>

      <SelectContent className="border-dark-700 bg-dark-800 text-primary-100 font-sansMed rounded-xl border">
        {provinces.map((province) => (
          <SelectItem
            key={province.id}
            value={province.id}
            className="data-highlighted:bg-primary-500/50 cursor-pointer data-highlighted:text-white"
          >
            {province.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectInput;
