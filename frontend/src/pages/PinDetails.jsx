import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Loader from "../components/Loader";

const PinDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [pin, setPin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPin = async () => {
      const res = await fetch(`http://localhost:5000/api/pins/${slug}`);
      const data = await res.json();
      setPin(data);
      setLoading(false);
    };
    fetchPin();
  }, [slug]);

  if (loading) return <Loader />;
  if (!pin) return <p>Pin not found</p>;

  return (
    <>
      <Helmet><title>{pin.title}</title></Helmet>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="btn-ghost mb-4">
          Back
        </button>

        <img src={pin.imageUrl} className="rounded-3xl mb-6" />
        <h1 className="text-3xl font-bold">{pin.title}</h1>
        <p className="text-muted-foreground mt-2">{pin.description}</p>
      </div>
    </>
  );
};

export default PinDetails;
