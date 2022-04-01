import type { NextApiRequest, NextApiResponse } from "next";
import AuthMiddleware from "../../../utils/auth_middleware";
import Models from "../../../models";
import connectDB from "../../../utils/db_connection.handler";

const getPostById = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { id },
  } = req;
  try {
    const post = await Models.PostModel.findById(id).populate(
      "workshop",
      // select fields
      [
        "title",
        "discord_link",
        "discord_title",
        "enable_discord",
        "enable_comments",
      ]
    );
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updatePostTitleById = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const {
      query: { id },
    } = req;
    const { body } = req;
    const {
      title,
      workshop_id,
      article_id,
      author,
      description,
      audio,
      pdf,
      discord_link,
    } = JSON.parse(body);
    const oldPost = await Models.PostModel.findById(id);

    let updateQuery: { [key: string]: unknown } = {};

    if (title) {
      updateQuery.title = title;
    }

    if (workshop_id) {
      updateQuery.workshop = workshop_id;
    }

    if (article_id) {
      updateQuery.article_id = article_id;
    }

    if (description) {
      updateQuery.description = description;
    }

    if (author) {
      const parsedAuthor = author;
      const isAuthorEmpty =
        parsedAuthor &&
        Object.keys(parsedAuthor).length === 0 &&
        parsedAuthor.constructor === Object;
      if (!isAuthorEmpty) {
        updateQuery.author = parsedAuthor;
      }
    }

    if (audio) {
      updateQuery.audio = audio;
    }

    if (pdf) {
      updateQuery.pdf = pdf;
    }

    if (discord_link) {
      updateQuery.discord_link = discord_link;
    }

    const newPost = await Models.PostModel.findByIdAndUpdate(id, updateQuery, {
      new: true,
    });

    if (workshop_id && oldPost.workshop !== workshop_id) {
      const oldWorkshop = await Models.WorkshopModel.findById(oldPost.workshop);

      oldWorkshop.posts.pull(oldPost.id);

      await oldWorkshop.save();

      await Models.WorkshopModel.findByIdAndUpdate(
        workshop_id,
        { $push: { posts: newPost._id as never } },
        { upsert: true }
      );
    }

    res.status(200).json({ success: true, newPost: newPost.toObject() });
  } catch (error) {
    res.status(500).json(error);
  }
};

const removePostById = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const {
      query: { id },
    } = req;

    const removedQuantity = await Models.PostModel.deleteOne({ _id: id });
    res.status(200).json({ success: !!removedQuantity });
  } catch (error) {
    res.status(500).json(error);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      getPostById(req, res);
      break;
    case "PUT":
      AuthMiddleware(updatePostTitleById)(req, res);
      break;
    case "DELETE":
      AuthMiddleware(removePostById)(req, res);
      break;
    default:
      res.status(404).json({ error: "Resource not found" });
  }
};

export default connectDB(handler);
