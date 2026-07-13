import { useNavigate } from "react-router";

function AdCard({ ad }) {
  const navigate = useNavigate();
  const firstImage = ad.images?.[0] || "/placeholder.jpg";

  return (
    <div
      onClick={() => navigate(`/ad/${ad.id}`)}
      className="bg-dark-600/50 hover:border-primary-500/40 cursor-pointer overflow-hidden rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-500"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={firstImage}
          alt={ad.title}
          className="h-full w-full object-cover transition-transform duration-[2s] ease-in-out hover:scale-105"
        />
        {ad.is_featured && (
          <div className="bg-primary-500 font-sansMed absolute top-2 right-2 rounded-full px-2 py-1 text-xs text-white">
            ویژه
          </div>
        )}
      </div>
      <div className="p-4">
        <h4 className="text-primary-100 font-sansBold line-clamp-1 text-sm">
          {ad.title}
        </h4>
        <p className="text-primary-300 font-sansReg mt-1 text-sm">
          {ad.price?.toLocaleString()} تومان
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-sansReg text-xs text-gray-400">{ad.city}</span>
          <span className="font-sansReg text-xs text-gray-500">
            {new Date(ad.created_at).toLocaleDateString("fa-IR")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AdCard;
