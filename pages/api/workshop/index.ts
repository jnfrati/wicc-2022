import type { NextApiRequest, NextApiResponse } from "next";
import AuthMiddleware from "../../../utils/auth_middleware";
import Models from "../../../models";
import connectDB from "../../../utils/db_connection.handler";

const getAllWorkshops = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const {
      query: { all },
    } = req;
    if (all) {
      const workshops = await Models.WorkshopModel.find().populate(
        "posts",
        "_id"
      );
      res.status(200).json({ workshops });
    } else {
      const workshops = await Models.WorkshopModel.find({
        "posts.0": { $exists: true },
      }).populate("posts", "_id");
      res.status(200).json({ workshops });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const createWorkshop = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const {
      title,
      discord_link,
      mozhubs_link,
      discord_title,
      enable_discord,
      enable_comments,
    } = JSON.parse(req.body);

    const newWorkshop = new Models.WorkshopModel({
      title,
      discord_link,
      mozhubs_link,
      discord_title,
      enable_discord,
      enable_comments,
    });
    await newWorkshop.save();
    res
      .status(200)
      .json({ success: true, newWorkshop: newWorkshop.toObject() });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      await getAllWorkshops(req, res);
      break;
    case "POST":
      await AuthMiddleware(createWorkshop)(req, res);
      break;
    default:
      res.status(404).json({ error: "Resource not found" });
  }
  res.end();
};

export default connectDB(handler);
