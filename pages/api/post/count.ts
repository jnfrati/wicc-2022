import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/db_connection.handler";
import Models from "../../../models";

const countPost = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { id },
  } = req;
  try {
    let newVisits = 1;

    const { visits } = await Models.PostModel.findById(id);

    if (visits) {
      newVisits = visits + 1;
    }

    const updateQuery: { [key: string]: unknown } = {
      visits: newVisits,
    };

    const newPost = await Models.PostModel.findByIdAndUpdate(id, updateQuery, {
      new: true,
    });

    res.status(200).json({ message: "ok", newPost });
  } catch (err) {
    res.status(500).json(err);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST":
      countPost(req, res);
      break;
    default:
      res.status(404).json({ error: "Resource not found" });
  }
};

export default connectDB(handler);
