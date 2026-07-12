// components/Footer.jsx
import {
  FaTelegram,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import Logo from "./Logo";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-800/95 mt-10 w-full border-t border-white/5 md:mt-14">
      <div className="flex w-full justify-center">
        <div className="w-[95%] md:w-[85%]">
          <div className="grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 md:grid-cols-4 md:items-start">
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

            <div className="py-8">
              <h4 className="font-sansBold mb-4 text-base text-white">
                دسترسی سریع
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-400 font-sansReg text-sm text-gray-400 transition-colors duration-300"
                  >
                    ثبت آگهی
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-400 font-sansReg text-sm text-gray-400 transition-colors duration-300"
                  >
                    راهنمای خرید
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-400 font-sansReg text-sm text-gray-400 transition-colors duration-300"
                  >
                    راهنمای فروش
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-400 font-sansReg text-sm text-gray-400 transition-colors duration-300"
                  >
                    سوالات متداول
                  </a>
                </li>
              </ul>
            </div>

            <div className="py-8">
              <h4 className="font-sansBold mb-4 text-base text-white">
                دسته‌بندی‌ها
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-400 font-sansReg text-sm text-gray-400 transition-colors duration-300"
                  >
                    خودرو
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-400 font-sansReg text-sm text-gray-400 transition-colors duration-300"
                  >
                    املاک
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-400 font-sansReg text-sm text-gray-400 transition-colors duration-300"
                  >
                    دیجیتال
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-400 font-sansReg text-sm text-gray-400 transition-colors duration-300"
                  >
                    خدمات
                  </a>
                </li>
              </ul>
            </div>

            <div className="py-8">
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
              <a
                href="#"
                className="hover:text-primary-400 font-sansReg text-xs text-gray-500 transition-colors duration-300"
              >
                حریم خصوصی
              </a>
              <a
                href="#"
                className="hover:text-primary-400 font-sansReg text-xs text-gray-500 transition-colors duration-300"
              >
                قوانین و مقررات
              </a>
              <a
                href="#"
                className="hover:text-primary-400 font-sansReg text-xs text-gray-500 transition-colors duration-300"
              >
                درباره ما
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
