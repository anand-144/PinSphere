import { Link } from "react-router-dom";

const PinCard = ({ pin }) => {
  return (
    <Link to={`/pin/${pin.slug}`}>
      <img
        src={pin.imageUrl}
        alt={pin.title}
        className="rounded-lg w-full hover:opacity-90 mb-4"
        loading="lazy"
      />
    </Link>
  );
};

export default PinCard;
