import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/db_connection.handler";
import Models from "../../../models";

const countWorkshop = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { id },
  } = req;
  try {
    let newVisits = 1;

    const { visits } = await Models.WorkshopModel.findById(id);

    if (visits) {
      newVisits = visits + 1;
    }

    const updateQuery: { [key: string]: unknown } = {
      visits: newVisits,
    };

    const newWorkshop = await Models.WorkshopModel.findByIdAndUpdate(
      id,
      updateQuery,
      {
        new: true,
      }
    );

    res.status(200).json({ message: "ok", newWorkshop });
  } catch (err) {
    res.status(500).json(err);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST":
      countWorkshop(req, res);
      break;
    default:
      res.status(404).json({ error: "Resource not found" });
  }
};

export default connectDB(handler);
