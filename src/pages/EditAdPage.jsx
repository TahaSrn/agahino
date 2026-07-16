// pages/EditAdPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useUser } from "../features/auth/useUser";
import { useGetCategoryFields } from "../features/categories/useGetCategoryFields";
import { getAd, updateAd, uploadAdImages } from "../services/apiAds";
import Button from "../ui/Button";
import { FaCloudUploadAlt, FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";

function EditAdPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isLoading: isUserLoading } = useUser();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category_id: "",
    province_id: "",
    city: "",
    metadata: {},
    images: [],
  });
  const [imagePreview, setImagePreview] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const { fields: categoryFields, isLoading: fieldsLoading } =
    useGetCategoryFields(
      formData.category_id ? parseInt(formData.category_id) : null,
    );

  useEffect(() => {
    if (isUserLoading) return;
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchAd = async () => {
      try {
        const ad = await getAd(id);
        if (!ad || ad.user_id !== user.id) {
          toast.error("شما دسترسی به این آگهی ندارید");
          navigate("/my-ads");
          return;
        }

        setFormData({
          title: ad.title || "",
          description: ad.description || "",
          price: ad.price?.toString() || "",
          category_id: ad.category_id?.toString() || "",
          province_id: ad.province_id?.toString() || "",
          city: ad.city || "",
          metadata: ad.metadata || {},
          images: ad.images || [],
        });
        setImagePreview(ad.images || []);
        setExistingImages(ad.images || []);
        setLoading(false);
      } catch (error) {
        toast.error("خطا در بارگیری آگهی");
        navigate("/my-ads");
      }
    };

    fetchAd();
  }, [id, user, isUserLoading, navigate]);

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

    setNewImages((prev) => [...prev, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreview((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    const isExisting = index < existingImages.length;
    const actualIndex = isExisting ? index : index - existingImages.length;

    if (isExisting) {
      setExistingImages((prev) => prev.filter((_, i) => i !== actualIndex));
    } else {
      setNewImages((prev) => prev.filter((_, i) => i !== actualIndex));
    }

    setImagePreview((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMetadataChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, [fieldName]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const allImages = [...existingImages];

      if (newImages.length > 0) {
        const uploadedUrls = await uploadAdImages(newImages, user.id);
        allImages.push(...uploadedUrls);
      }

      const adData = {
        title: formData.title,
        description: formData.description,
        price: parseInt(formData.price) || 0,
        category_id: parseInt(formData.category_id),
        province_id: parseInt(formData.province_id),
        city: formData.city,
        metadata: formData.metadata,
        images: allImages,
      };

      await updateAd(id, adData);

      toast.success("آگهی با موفقیت ویرایش شد");
      navigate(`/ad/${id}`);
    } catch (error) {
      toast.error(error.message || "خطا در ویرایش آگهی");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || isUserLoading) {
    return (
      <div className="bg-dark-700 min-h-screen pt-20 pb-24 md:pt-24">
        <div className="mx-auto w-[95%] max-w-2xl md:w-[85%]">
          <div className="bg-dark-800/80 animate-pulse rounded-2xl border border-white/10 p-6">
            <div className="bg-dark-600/50 mb-6 h-8 w-32 rounded-lg" />
            <div className="space-y-4">
              <div className="bg-dark-600/50 h-40 rounded-xl" />
              <div className="bg-dark-600/50 h-12 rounded-lg" />
              <div className="bg-dark-600/50 h-12 rounded-lg" />
              <div className="bg-dark-600/50 h-32 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-700 min-h-screen pt-20 pb-24 md:pt-24">
      <div className="mx-auto w-[95%] max-w-2xl md:w-[85%]">
        <button
          onClick={() => navigate(-1)}
          className="hover:text-primary-400 font-sansReg mb-4 flex cursor-pointer items-center gap-2 text-sm text-gray-400 transition-colors"
        >
          <FaArrowLeft className="ml-2" />
          بازگشت
        </button>

        <div className="bg-dark-800/80 rounded-2xl border border-white/10 p-6 shadow-2xl backdrop-blur-sm md:p-8">
          <h1 className="text-primary-100 font-sansBold mb-6 text-2xl md:text-3xl">
            ویرایش آگهی
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  disabled={imagePreview.length >= 5}
                />
                <label
                  htmlFor="image-upload"
                  className={`block cursor-pointer ${imagePreview.length >= 5 ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <FaCloudUploadAlt
                    className="mx-auto mb-2 text-gray-400"
                    size={40}
                  />
                  <p className="font-sansReg text-sm text-gray-400">
                    {imagePreview.length >= 5
                      ? "تعداد عکس‌ها کامل است"
                      : "برای آپلود عکس کلیک کنید"}
                  </p>
                  <p className="font-sansReg mt-1 text-xs text-gray-500">
                    {imagePreview.length} / ۵ عکس
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
                        type="button"
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
                required
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
                required
              />
            </div>

            <div>
              <label className="font-sansReg mb-1.5 block text-sm text-gray-300">
                توضیحات <span className="text-primary-400">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="توضیحات کامل آگهی..."
                rows="4"
                className="bg-dark-700/50 font-sansReg focus:border-primary-500/50 w-full resize-none rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition-colors duration-300 outline-none"
                required
              />
            </div>

            <div>
              <label className="font-sansReg mb-1.5 block text-sm text-gray-300">
                دسته‌بندی <span className="text-primary-400">*</span>
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    category_id: e.target.value,
                  }));
                }}
                className="bg-dark-700/50 font-sansReg focus:border-primary-500/50 w-full rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition-colors duration-300 outline-none"
                required
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
                  setFormData((prev) => ({
                    ...prev,
                    province_id: e.target.value,
                  }));
                }}
                className="bg-dark-700/50 font-sansReg focus:border-primary-500/50 w-full rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition-colors duration-300 outline-none"
                required
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
                required
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
                            handleMetadataChange(
                              field.field_name,
                              e.target.value,
                            )
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
                            handleMetadataChange(
                              field.field_name,
                              e.target.value,
                            )
                          }
                          placeholder={`مثلاً: ${field.field_label}`}
                          className="bg-dark-700/50 font-sansReg focus:border-primary-500/50 w-full rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition-colors duration-300 outline-none"
                        />
                      )}

                      {field.field_type === "select" && (
                        <select
                          value={formData.metadata[field.field_name] || ""}
                          onChange={(e) =>
                            handleMetadataChange(
                              field.field_name,
                              e.target.value,
                            )
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
                            checked={
                              formData.metadata[field.field_name] || false
                            }
                            onChange={(e) =>
                              handleMetadataChange(
                                field.field_name,
                                e.target.checked,
                              )
                            }
                            className="bg-dark-700/50 text-primary-500 focus:ring-primary-500 h-5 w-5 rounded border border-white/10 focus:ring-2"
                          />
                          <span className="font-sansReg text-sm text-gray-400">
                            {formData.metadata[field.field_name]
                              ? "بله"
                              : "خیر"}
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                size="small"
                variation="secondary"
                className="w-1/2 justify-center py-3"
                onClick={() => navigate(-1)}
              >
                انصراف
              </Button>
              <Button
                type="submit"
                size="small"
                variation="primary"
                className="w-1/2 justify-center py-3"
                disabled={submitting}
              >
                {submitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAdPage;
