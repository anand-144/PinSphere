import PinCard from "../pins/PinCards";

const MasonryGrid = ({ pins }) => {
  return (
    <div className="columns-2 sm:columns-3 md:columns-4 gap-4 p-6">
      {pins.map((pin) => (
        <PinCard key={pin._id} pin={pin} />
      ))}
    </div>
  );
};

export default MasonryGrid;
