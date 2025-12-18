import { useEffect, useState } from "react";
import { fetchPins } from "../services/pinServices";
import { Link } from "react-router-dom";

const Home = () => {
  const [pins, setPins] = useState([]);

  useEffect(() => {
    fetchPins().then(res => setPins(res.data));
  }, []);

  return (
    <div className="p-6 columns-2 md:columns-4 gap-4">
      {pins.map(pin => (
        <Link to={`/pin/${pin.slug}`} key={pin._id}>
          <img
            src={pin.imageUrl}
            alt={pin.title}
            className="mb-4 rounded-lg w-full hover:opacity-90"
          />
        </Link>
      ))}
    </div>
  );
};

export default Home;
