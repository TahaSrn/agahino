// components/Footer.jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  FaTelegram,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import Logo from "./Logo";
import Modal from "../ui/Modal";
import CreateAdWizard from "../features/ads/CreateAdWizard";
import Button from "./Button";

function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const openInfoModal = (title, content) => {
    setModalContent({ title, content });
    setIsInfoModalOpen(true);
  };

  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
    setModalContent(null);
  };

  const categories = [
    { id: 1, name: "خودرو" },
    { id: 2, name: "املاک" },
    { id: 3, name: "دیجیتال" },
    { id: 4, name: "خدمات" },
  ];

  return (
    <>
      <footer className="bg-dark-800/95 mt-10 w-full border-t border-white/5 md:mt-14">
        <div className="flex w-full justify-center">
          <div className="w-[95%] md:w-[85%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:items-start md:gap-8 md:py-10">
              <div className="col-span-1 sm:col-span-2 md:col-span-1">
                <div className="mr-[-3%] mb-4">
                  <Logo className="w-32 md:w-40" />
                </div>
                <p className="font-sansReg text-sm leading-relaxed text-gray-400">
                  آگهی‌نو، پلتفرم جامع خرید و فروش آنلاین. با ما تجربه‌ای امن،
                  سریع و آسان از معاملات آنلاین داشته باشید.
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <a
                    href="https://github.com/TahaSrn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors duration-300 hover:text-white"
                  >
                    <FaGithub size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/tahaahmadi0403"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors duration-300 hover:text-[#0A66C2]"
                  >
                    <FaLinkedin size={20} />
                  </a>
                  <a
                    href="https://t.me/taha_tnt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors duration-300 hover:text-[#229ED9]"
                  >
                    <FaTelegram size={20} />
                  </a>
                </div>
              </div>

              <div className="py-6 md:py-8">
                <h4 className="font-sansBold mb-4 text-base text-white">
                  دسترسی سریع
                </h4>
                <ul className="space-y-2.5">
                  <li>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="hover:text-primary-400 font-sansReg cursor-pointer text-sm text-gray-400 transition-colors duration-300"
                    >
                      ثبت آگهی
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        openInfoModal(
                          "راهنمای خرید",
                          "برای خرید مطمئن در آگهی‌نو این نکات را رعایت کنید:\n\n۱. قبل از خرید، اطلاعات آگهی را به دقت بررسی کنید.\n۲. با فروشنده تماس بگیرید و جزئیات را بپرسید.\n۳. در صورت امکان، کالا را حضوری مشاهده کنید.\n۴. از صحت شماره تماس فروشنده اطمینان حاصل کنید.\n۵. در معاملات بزرگ، حتماً قرارداد کتبی تنظیم کنید.\n۶. در صورت مشاهده هرگونه تخلف، به پشتیبانی گزارش دهید.\n\nخرید امن را با آگهی‌نو تجربه کنید.",
                        )
                      }
                      className="hover:text-primary-400 font-sansReg cursor-pointer text-sm text-gray-400 transition-colors duration-300"
                    >
                      راهنمای خرید
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        openInfoModal(
                          "راهنمای فروش",
                          "برای فروش موفق در آگهی‌نو این نکات را رعایت کنید:\n\n۱. توضیحات دقیق و کامل از کالا بنویسید.\n۲. از عکس‌های با کیفیت استفاده کنید.\n۳. قیمت منصفانه و رقابتی تعیین کنید.\n۴. سریعاً به پیام‌ها و تماس‌ها پاسخ دهید.\n۵. در صورت فروش، آگهی را غیرفعال کنید.\n۶. با خریدار صادق و شفاف باشید.\n\nبا رعایت این نکات، فروش سریع‌تری خواهید داشت.",
                        )
                      }
                      className="hover:text-primary-400 font-sansReg cursor-pointer text-sm text-gray-400 transition-colors duration-300"
                    >
                      راهنمای فروش
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        openInfoModal(
                          "سوالات متداول",
                          "پاسخ به سوالات رایج شما:\n\nسوال: آیا ثبت آگهی رایگان است؟\nپاسخ: بله، ثبت آگهی در آگهی‌نو کاملاً رایگان است.\n\nسوال: چگونه آگهی خود را ویژه کنم؟\nپاسخ: در فرم ثبت آگهی، گزینه ویژه کردن را فعال کنید.\n\nسوال: آیا امکان ویرایش آگهی وجود دارد؟\nپاسخ: بله، از طریق پنل کاربری می‌توانید آگهی خود را ویرایش کنید.\n\nسوال: چگونه با فروشنده ارتباط برقرار کنم؟\nپاسخ: از طریق شماره تماس یا چت داخل برنامه می‌توانید ارتباط برقرار کنید.\n\nسوال: آیا آگهی‌ها تاریخ انقضا دارند؟\nپاسخ: بله، آگهی‌ها پس از ۹۰ روز به‌صورت خودکار غیرفعال می‌شوند.",
                        )
                      }
                      className="hover:text-primary-400 font-sansReg cursor-pointer text-sm text-gray-400 transition-colors duration-300"
                    >
                      سوالات متداول
                    </button>
                  </li>
                </ul>
              </div>

              <div className="md:py-8">
                <h4 className="font-sansBold mb-4 text-base text-white">
                  دسته‌بندی‌ها
                </h4>
                <ul className="space-y-2.5">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <button
                        onClick={() => navigate(`/ads?category=${cat.id}`)}
                        className="hover:text-primary-400 font-sansReg cursor-pointer text-sm text-gray-400 transition-colors duration-300"
                      >
                        {cat.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="py-6 md:py-8">
                <h4 className="font-sansBold mb-4 text-base text-white">
                  تماس با ما
                </h4>
                <ul className="space-y-3">
                  <li className="font-sansReg flex items-start gap-3 text-sm text-gray-400">
                    <FaMapMarkerAlt className="text-primary-400 mt-0.5 flex-shrink-0" />
                    <span>مازندران، نور</span>
                  </li>
                  <li className="font-sansReg flex items-center gap-3 text-sm text-gray-400">
                    <FaPhone className="text-primary-400 flex-shrink-0" />
                    <span>۰۹۳۰۴۱۳۰۲۲۹</span>
                  </li>
                  <li className="font-sansReg flex items-center gap-3 text-sm text-gray-400">
                    <FaEnvelope className="text-primary-400 flex-shrink-0" />
                    <span>tahaahmadi0403@gmail.com</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
              <p className="font-sansReg text-xs text-gray-500">
                &copy; {currentYear} آگهی‌نو. تمامی حقوق محفوظ است.
              </p>
              <div className="flex items-center gap-6">
                <button
                  onClick={() =>
                    openInfoModal(
                      "حریم خصوصی",
                      "آگهی‌نو به حریم خصوصی کاربران خود احترام می‌گذارد:\n\n۱. اطلاعات شخصی کاربران تنها برای ارائه خدمات استفاده می‌شود.\n۲. اطلاعات کاربران بدون رضایت آنها به هیچ شخص ثالثی منتقل نمی‌شود.\n۳. کاربران می‌توانند در هر زمان درخواست حذف اطلاعات خود را بدهند.\n۴. تمامی اطلاعات به صورت رمزنگاری شده در سرورهای امن ذخیره می‌شود.",
                    )
                  }
                  className="hover:text-primary-400 font-sansReg cursor-pointer text-xs text-gray-500 transition-colors duration-300"
                >
                  حریم خصوصی
                </button>
                <button
                  onClick={() =>
                    openInfoModal(
                      "قوانین و مقررات",
                      "استفاده از سامانه آگهی‌نو به معنی پذیرش کامل قوانین زیر است:\n\n۱. مسئولیت صحت اطلاعات درج شده در آگهی بر عهده کاربر است.\n۲. هرگونه سوءاستفاده از سامانه پیگرد قانونی دارد.\n۳. آگهی‌نو هیچ گونه مسئولیتی در قبال معاملات انجام شده بین کاربران ندارد.\n۴. کاربران موظف به رعایت قوانین جمهوری اسلامی ایران هستند.",
                    )
                  }
                  className="hover:text-primary-400 font-sansReg cursor-pointer text-xs text-gray-500 transition-colors duration-300"
                >
                  قوانین و مقررات
                </button>
                <button
                  onClick={() => navigate("/about-us")}
                  className="hover:text-primary-400 font-sansReg cursor-pointer text-xs text-gray-500 transition-colors duration-300"
                >
                  درباره ما
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateAdWizard onClose={() => setIsModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isInfoModalOpen}
        onClose={closeInfoModal}
        title={modalContent?.title}
      >
        <div className="space-y-4">
          <p className="font-sansReg text-sm leading-relaxed whitespace-pre-wrap text-gray-400">
            {modalContent?.content}
          </p>
          <Button
            size="small"
            variation="primary"
            className="w-full justify-center py-3"
            onClick={closeInfoModal}
          >
            بستن
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default Footer;
