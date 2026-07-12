// features/ads/CreateAdWizard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../auth/useUser";
import { useGetCategoryFields } from "../categories/useGetCategoryFields";
import Button from "../../ui/Button";
import {
  FaCloudUploadAlt,
  FaArrowLeft,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { createAd, uploadAdImages } from "@/services/apiAds";
import supabase from "@/services/supabase";

function CreateAdWizard({ onClose }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useUser();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    images: [],
    category_id: "",
    province_id: "",
    city: "",
    metadata: {},
    contact_method: "both",
  });
  const [imagePreview, setImagePreview] = useState([]);

  const { fields: categoryFields, isLoading: fieldsLoading } =
    useGetCategoryFields(
      formData.category_id ? parseInt(formData.category_id) : null,
    );

  useEffect(() => {
    const savedData = localStorage.getItem("adFormData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData((prev) => ({ ...prev, ...parsed }));
      if (parsed.imagePreviews) {
        setImagePreview(parsed.imagePreviews);
      }
      localStorage.removeItem("adFormData");
    }
  }, []);

  useEffect(() => {
    const fetchUserPhone = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("phone")
          .eq("id", user.id)
          .single();

        if (!error && data) {
          setUserPhone(data.phone);
        }
      }
    };
    fetchUserPhone();
  }, [user]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const currentCount = formData.images.length;
    const maxAllowed = 5 - currentCount;

    if (files.length > maxAllowed) {
      toast.error(
        `حداکثر ۵ عکس میتوانید آپلود کنید (${currentCount} عکس قبلاً آپلود شده)`,
      );
      return;
    }

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreview((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleMetadataChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, [fieldName]: value },
    }));
  };

  const handleNext = () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("لطفاً همه فیلدها را پر کنید");
      return;
    }

    if (!formData.price.trim()) {
      toast.error("لطفاً قیمت را وارد کنید");
      return;
    }

    if (!user) {
      const dataToSave = {
        ...formData,
        imagePreviews: imagePreview,
      };
      localStorage.setItem("adFormData", JSON.stringify(dataToSave));
      onClose();
      navigate("/login");
      return;
    }

    setStep(2);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    if (!formData.category_id) {
      toast.error("لطفاً دسته‌بندی را انتخاب کنید");
      return;
    }

    if (!formData.province_id) {
      toast.error("لطفاً استان را انتخاب کنید");
      return;
    }

    if (!formData.city.trim()) {
      toast.error("لطفاً شهر را وارد کنید");
      return;
    }

    const requiredFields = categoryFields?.filter((f) => f.is_required) || [];
    for (const field of requiredFields) {
      if (!formData.metadata[field.field_name]) {
        toast.error(`لطفاً ${field.field_label} را وارد کنید`);
        return;
      }
    }

    setStep(3);
  };

  const handleFinalSubmit = async () => {
    if (!formData.contact_method) {
      toast.error("لطفاً راه تماس را انتخاب کنید");
      return;
    }

    setLoading(true);

    try {
      let imageUrls = [];
      if (formData.images.length > 0) {
        imageUrls = await uploadAdImages(formData.images, user.id);
      }

      const adData = {
        title: formData.title,
        description: formData.description,
        price: parseInt(formData.price) || 0,
        category_id: parseInt(formData.category_id),
        user_id: user.id,
        province_id: parseInt(formData.province_id),
        city: formData.city,
        metadata: formData.metadata,
        images: imageUrls,
        status: "active",
        is_featured: isFeatured,
        contact_method: formData.contact_method,
      };

      const newAd = await createAd(adData);

      queryClient.invalidateQueries({ queryKey: ["latest-ads"] });
      queryClient.invalidateQueries({ queryKey: ["featured-ads"] });
      queryClient.invalidateQueries({ queryKey: ["ads"] });

      toast.success("آگهی با موفقیت ثبت شد!");
      onClose();
      navigate(`/ad/${newAd.id}`);
    } catch (error) {
      toast.error(error.message || "خطا در ثبت آگهی");
    } finally {
      setLoading(false);
    }
  };

  if (step === 1) {
    return (
      <div className="space-y-4">
        <div>
          <label className="font-sansReg mb-1.5 block text-sm text-gray-300">
            تصاویر آگهی
          </label>
          <div className="hover:border-primary-500/50 cursor-pointer rounded-xl border-2 border-dashed border-white/10 p-6 text-center transition-colors duration-300">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
              disabled={formData.images.length >= 5}
            />
            <label
              htmlFor="image-upload"
              className={`block cursor-pointer ${formData.images.length >= 5 ? "cursor-not-allowed opacity-50" : ""}`}
            >
              <FaCloudUploadAlt
                className="mx-auto mb-2 text-gray-400"
                size={40}
              />
              <p className="font-sansReg text-sm text-gray-400">
                {formData.images.length >= 5
                  ? "تعداد عکس‌ها کامل است"
                  : "برای آپلود عکس کلیک کنید"}
              </p>
              <p className="font-sansReg mt-1 text-xs text-gray-500">
                {formData.images.length} / ۵ عکس
              </p>
            </label>
          </div>
          {imagePreview.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {imagePreview.map((src, index) => (
                <div key={index} className="relative">
                  <img
                    src={src}
                    alt={`preview-${index}`}
                    className="h-16 w-16 rounded-lg border border-white/10 object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white transition-colors hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="font-sansReg mb-1.5 block text-sm text-gray-300">
            نام محصول <span className="text-primary-400">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="مثلاً: آیفون ۱۵ پرو مکس"
            className="bg-dark-700/50 font-sansReg focus:border-primary-500/50 w-full rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition-colors duration-300 outline-none"
          />
        </div>

        <div>
          <label className="font-sansReg mb-1.5 block text-sm text-gray-300">
            قیمت (تومان) <span className="text-primary-400">*</span>
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, price: e.target.value }))
            }
            placeholder="مثلاً: ۱۵۰۰۰۰۰۰"
            className="bg-dark-700/50 font-sansReg focus:border-primary-500/50 w-full rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition-colors duration-300 outline-none"
          />
        </div>

        <div>
          <label className="font-sansReg mb-1.5 block text-sm text-gray-300">
            توضیحات <span className="text-primary-400">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="توضیحات کامل آگهی..."
            rows="4"
            className="bg-dark-700/50 font-sansReg focus:border-primary-500/50 w-full resize-none rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition-colors duration-300 outline-none"
          />
        </div>

        <Button
          size="small"
          variation="primary"
          className="w-full justify-center py-3"
          onClick={handleNext}
          disabled={loading}
        >
          مرحله بعد
        </Button>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="space-y-4">
        <div>
          <label className="font-sansReg mb-1.5 block text-sm text-gray-300">
            دسته‌بندی <span className="text-primary-400">*</span>
          </label>
          <select
            value={formData.category_id}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, category_id: e.target.value }));
            }}
            className="bg-dark-700/50 font-sansReg focus:border-primary-500/50 w-full rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition-colors duration-300 outline-none"
          >
            <option value="">انتخاب دسته‌بندی</option>
            <option value="1">خودرو</option>
            <option value="2">املاک</option>
            <option value="3">دیجیتال</option>
            <option value="4">خدمات</option>
            <option value="5">کتاب</option>
            <option value="6">غذا</option>
            <option value="7">مد و پوشاک</option>
            <option value="8">ابزار</option>
            <option value="9">بازی</option>
          </select>
        </div>

        <div>
          <label className="font-sansReg mb-1.5 block text-sm text-gray-300">
            استان <span className="text-primary-400">*</span>
          </label>
          <select
            value={formData.province_id}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, province_id: e.target.value }));
            }}
            className="bg-dark-700/50 font-sansReg focus:border-primary-500/50 w-full rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition-colors duration-300 outline-none"
          >
            <option value="">انتخاب استان</option>
            <option value="1">تهران</option>
            <option value="2">مازندران</option>
            <option value="3">خراسان رضوی</option>
            <option value="4">اصفهان</option>
            <option value="5">فارس</option>
            <option value="6">گیلان</option>
            <option value="7">آذربایجان شرقی</option>
            <option value="8">البرز</option>
            <option value="9">خوزستان</option>
          </select>
        </div>

        <div>
          <label className="font-sansReg mb-1.5 block text-sm text-gray-300">
            شهر <span className="text-primary-400">*</span>
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, city: e.target.value }))
            }
            placeholder="مثلاً: تهران"
            className="bg-dark-700/50 font-sansReg focus:border-primary-500/50 w-full rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition-colors duration-300 outline-none"
          />
        </div>

        {categoryFields?.length > 0 && (
          <div className="space-y-3 border-t border-white/10 pt-3">
            <p className="font-sansBold text-primary-100 text-sm">
              مشخصات تکمیلی
            </p>
            {fieldsLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-dark-600/50 h-10 animate-pulse rounded-lg"
                  />
                ))}
              </div>
            ) : (
              categoryFields.map((field) => (
                <div key={field.id}>
                  <label className="font-sansReg mb-1 block text-sm text-gray-300">
                    {field.field_label}
                    {field.is_required && (
                      <span className="text-primary-400 mr-1">*</span>
                    )}
                  </label>

                  {field.field_type === "text" && (
                    <input
                      type="text"
                      value={formData.metadata[field.field_name] || ""}
                      onChange={(e) =>
                        handleMetadataChange(field.field_name, e.target.value)
                      }
                      placeholder={`مثلاً: ${field.field_label}`}
                      className="bg-dark-700/50 font-sansReg focus:border-primary-500/50 w-full rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition-colors duration-300 outline-none"
                    />
                  )}

                  {field.field_type === "number" && (
                    <input
                      type="number"
                      value={formData.metadata[field.field_name] || ""}
                      onChange={(e) =>
                        handleMetadataChange(field.field_name, e.target.value)
                      }
                      placeholder={`مثلاً: ${field.field_label}`}
                      className="bg-dark-700/50 font-sansReg focus:border-primary-500/50 w-full rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition-colors duration-300 outline-none"
                    />
                  )}

                  {field.field_type === "select" && (
                    <select
                      value={formData.metadata[field.field_name] || ""}
                      onChange={(e) =>
                        handleMetadataChange(field.field_name, e.target.value)
                      }
                      className="bg-dark-700/50 font-sansReg focus:border-primary-500/50 w-full rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition-colors duration-300 outline-none"
                    >
                      <option value="">انتخاب کنید</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}

                  {field.field_type === "boolean" && (
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={formData.metadata[field.field_name] || false}
                        onChange={(e) =>
                          handleMetadataChange(
                            field.field_name,
                            e.target.checked,
                          )
                        }
                        className="bg-dark-700/50 text-primary-500 focus:ring-primary-500 h-5 w-5 rounded border border-white/10 focus:ring-2"
                      />
                      <span className="font-sansReg text-sm text-gray-400">
                        {formData.metadata[field.field_name] ? "بله" : "خیر"}
                      </span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        <div className="flex gap-3">
          <Button
            size="small"
            variation="primary"
            className="w-1/2 justify-center py-3"
            onClick={handleBack}
          >
            <FaArrowLeft className="ml-2" />
            قبلی
          </Button>
          <Button
            size="small"
            variation="primary"
            className="w-1/2 justify-center py-3"
            onClick={handleSubmit}
          >
            مرحله بعد
          </Button>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="space-y-4">
        <p className="font-sansBold text-primary-100 text-sm">راه‌های تماس</p>
        <p className="font-sansReg text-sm text-gray-400">
          نحوه ارتباط آگهی‌بیننده با شما را انتخاب کنید
        </p>

        <div className="space-y-3">
          <label
            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors duration-300 ${
              formData.contact_method === "phone" ||
              formData.contact_method === "both"
                ? "border-primary-500/50 bg-primary-500/10"
                : "bg-dark-700/30 hover:border-primary-500/50 border-white/10"
            } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
          >
            <input
              type="checkbox"
              checked={
                formData.contact_method === "phone" ||
                formData.contact_method === "both"
              }
              onChange={(e) => {
                if (e.target.checked) {
                  if (formData.contact_method === "chat") {
                    setFormData((prev) => ({
                      ...prev,
                      contact_method: "both",
                    }));
                  } else {
                    setFormData((prev) => ({
                      ...prev,
                      contact_method: "phone",
                    }));
                  }
                } else {
                  if (formData.contact_method === "both") {
                    setFormData((prev) => ({
                      ...prev,
                      contact_method: "chat",
                    }));
                  } else {
                    setFormData((prev) => ({ ...prev, contact_method: "" }));
                  }
                }
              }}
              disabled={loading}
              className="text-primary-500 focus:ring-primary-500 h-4 w-4 rounded border border-white/10 focus:ring-2"
            />
            <div>
              <p className="font-sansReg text-sm text-gray-300">شماره تماس</p>
              <p className="font-sansReg mt-1 text-xs text-gray-400">
                {userPhone || "شماره تماس شما"}
              </p>
            </div>
          </label>

          <label
            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors duration-300 ${
              formData.contact_method === "chat" ||
              formData.contact_method === "both"
                ? "border-primary-500/50 bg-primary-500/10"
                : "bg-dark-700/30 hover:border-primary-500/50 border-white/10"
            } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
          >
            <input
              type="checkbox"
              checked={
                formData.contact_method === "chat" ||
                formData.contact_method === "both"
              }
              onChange={(e) => {
                if (e.target.checked) {
                  if (formData.contact_method === "phone") {
                    setFormData((prev) => ({
                      ...prev,
                      contact_method: "both",
                    }));
                  } else {
                    setFormData((prev) => ({
                      ...prev,
                      contact_method: "chat",
                    }));
                  }
                } else {
                  if (formData.contact_method === "both") {
                    setFormData((prev) => ({
                      ...prev,
                      contact_method: "phone",
                    }));
                  } else {
                    setFormData((prev) => ({ ...prev, contact_method: "" }));
                  }
                }
              }}
              disabled={loading}
              className="text-primary-500 focus:ring-primary-500 h-4 w-4 rounded border border-white/10 focus:ring-2"
            />
            <div>
              <p className="font-sansReg text-sm text-gray-300">
                چت در آگهی‌نو
              </p>
              <p className="font-sansReg text-xs text-gray-500">
                کاربران از طریق پیام با شما ارتباط می‌گیرند
              </p>
            </div>
          </label>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div
            className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-300 ${
              isFeatured
                ? "border-yellow-500/50 bg-gradient-to-r from-yellow-500/20 to-amber-500/10 shadow-lg shadow-yellow-500/10"
                : "bg-dark-700/30 border-white/10 hover:border-yellow-500/30"
            } ${loading ? "opacity-50" : ""}`}
          >
            {isFeatured && (
              <>
                <div className="absolute top-0 right-0">
                  <div className="h-32 w-32 rounded-full bg-gradient-to-l from-yellow-500/20 to-transparent blur-2xl" />
                </div>
                <div className="absolute -top-6 -right-6 text-yellow-500/10">
                  <FaStar size={80} />
                </div>
                <div className="absolute -bottom-6 -left-6 text-yellow-500/10">
                  <FaStar size={60} />
                </div>
              </>
            )}

            <label
              className={`relative flex cursor-pointer items-center gap-3 ${loading ? "cursor-not-allowed" : ""}`}
            >
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                disabled={loading}
                className="h-5 w-5 rounded border border-white/10 text-yellow-500 focus:ring-2 focus:ring-yellow-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p
                    className={`font-sansBold text-sm transition-colors duration-300 ${
                      isFeatured ? "text-yellow-400" : "text-primary-100"
                    }`}
                  >
                    ویژه کردن آگهی
                  </p>
                  {isFeatured ? (
                    <div className="flex items-center gap-1">
                      <FaStar
                        className="animate-pulse text-yellow-400"
                        size={16}
                      />
                      <FaStar
                        className="animate-pulse text-yellow-400 delay-100"
                        size={14}
                      />
                      <FaStar
                        className="animate-pulse text-yellow-400 delay-200"
                        size={12}
                      />
                    </div>
                  ) : (
                    <FaRegStar className="text-gray-500" size={16} />
                  )}
                </div>
                <p
                  className={`font-sansReg text-xs transition-colors duration-300 ${
                    isFeatured ? "text-yellow-400/80" : "text-gray-400"
                  }`}
                >
                  {isFeatured
                    ? "✨ آگهی شما در بخش ویژه نمایش داده می‌شود و بازدید بیشتری دریافت می‌کند"
                    : "آگهی شما در بخش آگهی‌های ویژه نمایش داده می‌شود و بازدید بیشتری دریافت می‌کند"}
                </p>
                {isFeatured && (
                  <div className="font-sansReg mt-2 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/20 px-2 py-0.5 text-[10px] text-yellow-400">
                      <FaStar size={10} />
                      ویژه
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] text-green-400">
                      بازدید بیشتر
                    </span>
                  </div>
                )}
              </div>
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            size="small"
            variation="primary"
            className="w-1/2 justify-center py-3"
            onClick={handleBack}
            disabled={loading}
          >
            <FaArrowLeft className="ml-2" />
            قبلی
          </Button>
          <Button
            size="small"
            variation="primary"
            className="w-1/2 justify-center py-3"
            onClick={handleFinalSubmit}
            disabled={loading}
          >
            {loading ? "در حال ثبت..." : "ثبت آگهی"}
          </Button>
        </div>
      </div>
    );
  }

  return null;
}

export default CreateAdWizard;
