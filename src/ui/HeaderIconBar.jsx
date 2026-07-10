import { FiUser } from "react-icons/fi";
import { IoMdHeartEmpty, IoMdNotificationsOutline } from "react-icons/io";

function HeaderIconBar() {
  return (
    <div className="text-primary-100 flex gap-5">
      <div className="cursor-pointer">
        <IoMdHeartEmpty size={25} />
      </div>
      <div className="cursor-pointer">
        <IoMdNotificationsOutline size={25} />
      </div>
      <div className="cursor-pointer">
        <FiUser size={25} />
      </div>
    </div>
  );
}

export default HeaderIconBar;
