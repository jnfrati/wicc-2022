/* eslint-disable no-underscore-dangle */
import type { NextApiRequest, NextApiResponse } from "next";
import AuthMiddleware from "../../../utils/auth_middleware";
import PostModel from "../../../models/post.model";
import connectDB from "../../../utils/db_connection.handler";
import Models from "../../../models";

const getAllPosts = async (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const posts = await PostModel.find();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json(error);
  }
};

const createPost = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const { body } = req;
    // eslint-disable-next-line camelcase
    const {
      title,
      workshop_id,
      author,
      article_id,
      description,
      audio,
      pdf,
      discord_link,
    } = JSON.parse(body);

    const newPost = new PostModel({
      title,
      workshop: workshop_id,
      pdf,
      audio,
      article_id,
      author: author || {},
      description,
      discord_link,
    });
    await newPost.save();
    await Models.WorkshopModel.findByIdAndUpdate(
      workshop_id,
      { $push: { posts: newPost._id as never } },
      { upsert: true }
    );
    res.status(200).json({ success: true, newPost: newPost.toObject() });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      getAllPosts(req, res);
      break;
    case "POST":
      AuthMiddleware(createPost)(req, res);
      break;
    default:
      res.status(404).json({ error: "Resource not found" });
  }
};

export default connectDB(handler);
