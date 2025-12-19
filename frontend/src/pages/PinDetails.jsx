import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Heart, Download, Share2 } from "lucide-react";
import Loader from "../components/Loader";
import api from "../services/api";

const PinDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [pin, setPin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchPin = async () => {
      try {
        const { data } = await api.get(`/pins/${slug}`);
        setPin(data);
      } finally {
        setLoading(false);
      }
    };
    fetchPin();
  }, [slug]);

  if (loading) return <Loader />;
  if (!pin) return <p className="text-center mt-20">Pin not found</p>;

  return (
    <>
      <Helmet>
        <title>{pin.title} | PinSphere</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">
          <img
            src={pin.imageUrl}
            alt={pin.title}
            className="w-full h-full object-cover"
          />

          <div className="p-6 flex flex-col">
            <div className="flex justify-between mb-6">
              <div className="flex gap-2">
                <button className="p-2 rounded-full hover:bg-neutral-100">
                  <Share2 />
                </button>
                <button className="p-2 rounded-full hover:bg-neutral-100">
                  <Download />
                </button>
              </div>

              <button
                onClick={() => setLiked(!liked)}
                className={`p-2 rounded-full ${
                  liked ? "bg-red-600 text-white" : "hover:bg-neutral-100"
                }`}
              >
                <Heart className={liked ? "fill-current" : ""} />
              </button>
            </div>

            <h1 className="text-2xl font-bold mb-3">{pin.title}</h1>
            <p className="text-neutral-600">{pin.description}</p>

            <div className="mt-auto pt-6 border-t flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center font-semibold">
                  {pin.createdBy?.username?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="font-semibold">
                  {pin.createdBy?.username || "Creator"}
                </span>
              </div>
              <button className="px-5 py-2 rounded-full bg-neutral-900 text-white font-semibold">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PinDetails;
