import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Heart,
  Download,
  Share2,
  MoreHorizontal,
  ArrowLeft,
} from "lucide-react";
import { mockPins } from "../data/mockPins";
import Loader from "../components/Loader";
import gsap from "gsap";

const PinDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [pin, setPin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Fetch pin (mock)
  useEffect(() => {
    const timer = setTimeout(() => {
      const foundPin = mockPins.find((p) => p.slug === slug);
      setPin(foundPin || null);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [slug]);

  // GSAP animation
  useEffect(() => {
    if (pin && imageLoaded) {
      gsap.fromTo(
        ".pin-detail-content",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
      );
    }
  }, [pin, imageLoaded]);

  if (loading) return <Loader />;

  if (!pin) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Pin not found</h1>
        <Link to="/" className="btn-primary">
          Go back home
        </Link>
      </div>
    );
  }

  const relatedPins = mockPins
    .filter((p) => p._id !== pin._id)
    .slice(0, 6);

  return (
    <>
      <Helmet>
        <title>{pin.title} | PinSphere</title>
        <meta name="description" content={pin.description} />
      </Helmet>

      <div className="min-h-screen pb-12">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="fixed top-24 left-4 z-10 w-12 h-12 bg-background shadow-lg rounded-full 
                     flex items-center justify-center hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-card rounded-3xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="relative bg-secondary">
                {!imageLoaded && (
                  <div className="absolute inset-0 animate-pulse" />
                )}
                <img
                  src={pin.imageUrl}
                  alt={pin.title}
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>

              {/* Details */}
              <div className="p-6 md:p-8 flex flex-col">
                {/* Actions */}
                <div className="flex items-center justify-between mb-6 pin-detail-content">
                  <div className="flex items-center gap-2">
                    <button className="icon-btn">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                    <button className="icon-btn">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="icon-btn">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isLiked
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isLiked ? "fill-current" : ""
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => setIsSaved(!isSaved)}
                      className={`px-6 py-3 rounded-full font-semibold transition-all ${
                        isSaved
                          ? "bg-foreground text-background"
                          : "btn-primary"
                      }`}
                    >
                      {isSaved ? "Saved" : "Save"}
                    </button>
                  </div>
                </div>

                {/* Title */}
                <div className="flex-1 pin-detail-content">
                  <h1 className="text-2xl md:text-3xl font-bold mb-4">
                    {pin.title}
                  </h1>
                  <p className="text-muted-foreground">{pin.description}</p>
                </div>

                {/* Author (SAFE) */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-border pin-detail-content">
                  <div className="flex items-center gap-3">
                    <img
                      src={pin.author?.avatar}
                      alt={pin.author?.username}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">
                        {pin.author?.username}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {pin.likes?.length || 0} likes
                      </p>
                    </div>
                  </div>
                  <button className="btn-secondary text-sm">Follow</button>
                </div>
              </div>
            </div>
          </div>

          {/* Related pins */}
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-6">More like this</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {relatedPins.map((p) => (
                <Link key={p._id} to={`/pin/${p.slug}`} className="group">
                  <div className="rounded-2xl overflow-hidden">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-sm font-medium mt-2 line-clamp-2">
                    {p.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PinDetails;
