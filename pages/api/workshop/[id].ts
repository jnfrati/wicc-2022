import type { NextApiRequest, NextApiResponse } from "next";
import AuthMiddleware from "../../../utils/auth_middleware";
import Models from "../../../models";
import connectDB from "../../../utils/db_connection.handler";

const getWorkshopById = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { id },
  } = req;
  try {
    const workshop = await Models.WorkshopModel.findById(id).populate(
      "posts",
      // select fields
      ["title", "author"]
    );
    res.status(200).json({ workshop });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateWorkshopById = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const {
      query: { id },
    } = req;
    const {
      title,
      discord_link,
      mozhubs_link,
      discord_title,
      enable_discord,
      enable_comments,
    } = JSON.parse(req.body);

    const newWorkshop = await Models.WorkshopModel.findByIdAndUpdate(
      id,
      {
        title,
        discord_link,
        mozhubs_link,
        discord_title,
        enable_discord,
        enable_comments,
      },
      { new: true }
    );
    res.status(200).json(newWorkshop);
  } catch (error) {
    res.status(500).json(error);
  }
};

const removeWorkshopById = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { id },
  } = req;
  const removedQuantity = await Models.WorkshopModel.deleteOne({ _id: id });
  res.status(200).json({ success: !!removedQuantity });
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      getWorkshopById(req, res);
      break;
    case "PUT":
      AuthMiddleware(updateWorkshopById)(req, res);
      break;
    case "DELETE":
      AuthMiddleware(removeWorkshopById)(req, res);
      break;
    default:
      res.status(404).json({ error: "Resource not found" });
  }
};

export default connectDB(handler);
