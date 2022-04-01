import type { NextApiRequest, NextApiResponse } from "next";
import Models from "../../models";
import connectDB from "../../utils/db_connection.handler";

const getIndexPageData = async (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const workshops = await Models.WorkshopModel.find({
    "posts.0": { $exists: true },
  });
  const workshopsCount = workshops.length;
  const postsCount = await Models.PostModel.estimatedDocumentCount();
  const firstPosts = await Models.PostModel.find().sort("-visits").limit(3);
  const firstWorkshops = await Models.WorkshopModel.find({
    "posts.0": { $exists: true },
  })
    .sort("-visits")
    .limit(3);

  res.status(200).json({
    firstWorkshops,
    firstPosts,
    workshopsCount,
    postsCount,
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      getIndexPageData(req, res);
      break;
    default:
      res.status(404).json({ error: "Resource not found" });
  }
};

export default connectDB(handler);
