import { Link } from "react-router-dom";
import { Heart, Download, MoreHorizontal } from "lucide-react";
import { useState } from "react";

const PinCards = ({ pin }) => {
  const [liked, setLiked] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="
        relative mb-4 cursor-pointer break-inside-avoid
        overflow-hidden rounded-2xl shadow-md
        transition-all duration-300
        hover:shadow-xl hover:scale-[1.02]
        group
      "
    >
      <Link to={`/pin/${pin.slug}`} className="block relative">
        {!loaded && (
          <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
        )}

        <img
          src={pin.imageUrl}
          alt={pin.title}
          onLoad={() => setLoaded(true)}
          className={`w-full rounded-2xl transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Overlay */}
        <div
          className="
            absolute inset-0 flex items-end justify-between p-3
            bg-black/0 transition-all duration-300
            group-hover:bg-black/40
          "
        >
          <button
            className="
              opacity-0 translate-y-2
              group-hover:opacity-100 group-hover:translate-y-0
              transition-all duration-200
              bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold
            "
          >
            Save
          </button>

          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                setLiked(!liked);
              }}
              className={`
                w-9 h-9 rounded-full flex items-center justify-center
                transition-all duration-200
                ${liked ? "bg-red-600 text-white" : "bg-white/90 hover:bg-white"}
              `}
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
            </button>

            <button className="w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center">
              <Download className="w-4 h-4" />
            </button>

            <button className="w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-2">
        <h3 className="font-semibold text-sm line-clamp-2">{pin.title}</h3>

        <div className="flex items-center gap-2 mt-2">
          <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-semibold">
            {pin.createdBy?.username?.[0]?.toUpperCase() || "U"}
          </div>
          <span className="text-xs text-neutral-500">
            {pin.createdBy?.username || "Creator"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PinCards;
