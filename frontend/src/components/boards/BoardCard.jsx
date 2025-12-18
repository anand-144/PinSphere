const BoardCard = ({ board }) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow">
      <h2 className="font-bold text-lg">{board.name}</h2>
      <p className="text-sm text-gray-600">{board.description}</p>
    </div>
  );
};

export default BoardCard;
