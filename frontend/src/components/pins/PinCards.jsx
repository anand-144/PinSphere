import { Link } from "react-router-dom";

const PinCard = ({ pin }) => {
  return (
    <Link to={`/pin/${pin.slug}`}>
      <img
        src={pin.imageUrl}
        alt={pin.title}
        loading="lazy"
        className="w-full mb-4 rounded-lg hover:opacity-90"
      />
    </Link>
  );
};

export default PinCard;
