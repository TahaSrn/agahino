import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Search() {
  return (
    <Select defaultValue="تهران">
      <SelectTrigger className="flex-row-reverse rounded-xl border-none bg-transparent text-primary-100 transition-all duration-200 font-sansMed cursor-pointer">
        <SelectValue placeholder="انتخاب استان" />
      </SelectTrigger>

      <SelectContent className="rounded-xl border border-dark-700 bg-dark-800 text-primary-100 font-sansMed">
        <SelectItem
          value="tehran"
          className="data-highlighted:bg-primary-500/50 data-highlighted:text-white cursor-pointer"
        >
          تهران
        </SelectItem>
        <SelectItem
          value="mazandaran"
          className="data-highlighted:bg-primary-500/50 data-highlighted:text-white cursor-pointer"
        >
          مازندران
        </SelectItem>
        <SelectItem
          value="alborz"
          className="data-highlighted:bg-primary-500/50 data-highlighted:text-white cursor-pointer"
        >
          البرز
        </SelectItem>
        <SelectItem
          value="isfahan"
          className="data-highlighted:bg-primary-500/50 data-highlighted:text-white cursor-pointer"
        >
          اصفهان
        </SelectItem>
        <SelectItem
          value="khorasan-razavi"
          className="data-highlighted:bg-primary-500/50 data-highlighted:text-white cursor-pointer"
        >
          خراسان رضوی
        </SelectItem>
        <SelectItem
          value="fars"
          className="data-highlighted:bg-primary-500/50 data-highlighted:text-white cursor-pointer"
        >
          فارس
        </SelectItem>
        <SelectItem
          value="east-azerbaijan"
          className="data-highlighted:bg-primary-500/50 data-highlighted:text-white cursor-pointer"
        >
          آذربایجان شرقی
        </SelectItem>
        <SelectItem
          value="west-azerbaijan"
          className="data-highlighted:bg-primary-500/50 data-highlighted:text-white cursor-pointer"
        >
          آذربایجان غربی
        </SelectItem>
        <SelectItem
          value="gilan"
          className="data-highlighted:bg-primary-500/50 data-highlighted:text-white cursor-pointer"
        >
          گیلان
        </SelectItem>
        <SelectItem
          value="khuzestan"
          className="data-highlighted:bg-primary-500/50 data-highlighted:text-white cursor-pointer"
        >
          خوزستان
        </SelectItem>
        <SelectItem
          value="kerman"
          className="data-highlighted:bg-primary-500/50 data-highlighted:text-white cursor-pointer"
        >
          کرمان
        </SelectItem>
        <SelectItem
          value="qom"
          className="data-highlighted:bg-primary-500/50 data-highlighted:text-white cursor-pointer"
        >
          قم
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export default Search;
