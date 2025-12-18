import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPinBySlug, toggleLike } from "../services/pinServices";
import { Helmet } from "react-helmet-async";

const PinDetail = () => {
  const { slug } = useParams();
  const [pin, setPin] = useState(null);

  useEffect(() => {
    fetchPinBySlug(slug).then(res => setPin(res.data));
  }, [slug]);

  if (!pin) return null;

  return (
    <>
      <Helmet>
        <title>{pin.title} | PinSphere</title>
        <meta name="description" content={pin.description} />
      </Helmet>

      <div className="max-w-3xl mx-auto p-6">
        <img src={pin.imageUrl} alt={pin.title} className="rounded-lg w-full" />
        <h1 className="text-3xl font-bold mt-4">{pin.title}</h1>
        <p className="mt-2">{pin.description}</p>

        <button
          onClick={() => toggleLike(pin._id)}
          className="mt-4 btn"
        >
          ❤️ {pin.likes.length}
        </button>
      </div>
    </>
  );
};

export default PinDetail;
