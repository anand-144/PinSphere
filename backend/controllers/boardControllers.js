import Board from "../models/BoardModel.js";

export const createBoard = async (req, res) => {
  const board = await Board.create({
    name: req.body.name,
    description: req.body.description,
    createdBy: req.user.id
  });

  res.json(board);
};
