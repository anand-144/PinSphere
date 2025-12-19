const BoardCard = ({ board }) => {
  return (
    <div className="border rounded-2xl p-4 hover:shadow-md transition-shadow">
      <h2 className="font-bold text-lg">{board.name}</h2>
      {board.description && (
        <p className="text-sm text-neutral-600 mt-1">
          {board.description}
        </p>
      )}
    </div>
  );
};

export default BoardCard;
