import { FiUser } from "react-icons/fi";
import { IoMdHeartEmpty, IoMdNotificationsOutline } from "react-icons/io";

function HeaderIconBar() {
  return (
    <div className="text-primary-100 flex gap-5">
      <div>
        <IoMdHeartEmpty size={25} />
      </div>
      <div>
        <IoMdNotificationsOutline size={25} />
      </div>
      <div>
        <FiUser size={25} />
      </div>
    </div>
  );
}

export default HeaderIconBar;
