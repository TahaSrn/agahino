import { FiUser } from "react-icons/fi";
import { IoMdHeartEmpty, IoMdNotificationsOutline } from "react-icons/io";

function HeaderIconBar() {
  return (
    <div className="text-primary-100 flex gap-3 border">
      <div>
        <IoMdHeartEmpty size={20} />
      </div>
      <div>
        <IoMdNotificationsOutline size={20} />
      </div>
      <div>
        <FiUser size={20} />
      </div>
    </div>
  );
}

export default HeaderIconBar;
