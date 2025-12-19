import { Link } from "react-router-dom";
import { Heart, Download, MoreHorizontal } from "lucide-react";
import { useState } from "react";

const PinCards = ({ pin }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="pin-card mb-4 break-inside-avoid">
      <Link to={`/pin/${pin.slug}`} className="block relative group">
        {/* Skeleton loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-secondary animate-pulse rounded-2xl" />
        )}

        <img
          src={pin.imageUrl}
          alt={pin.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full rounded-2xl transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Overlay */}
        <div className="pin-overlay rounded-2xl">
          {/* Save Button */}
          <button
            className="pin-action-btn btn-primary py-2 px-4 text-sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            Save
          </button>

          {/* Action buttons */}
          <div className="flex gap-2 pin-action-btn">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isLiked
                  ? "bg-primary text-primary-foreground"
                  : "bg-background/90 hover:bg-background"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="w-8 h-8 rounded-full bg-background/90 hover:bg-background flex items-center justify-center transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="w-8 h-8 rounded-full bg-background/90 hover:bg-background flex items-center justify-center transition-colors"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>

      {/* Pin info */}
      <div className="p-2">
        <h3 className="font-semibold text-sm line-clamp-2">{pin.title}</h3>
        <div className="flex items-center gap-2 mt-2">
          <img
            src={pin.author.avatar}
            alt={pin.author.username}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-xs text-muted-foreground">
            {pin.author.username}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PinCards;
