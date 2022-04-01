import { model, Schema, models } from "mongoose";
import { IPost } from "./post.model";

const { Types } = Schema;

export interface IWorkshop {
  title: string;
  _id: string;
  posts: IPost[];
  discord_link?: string;
  discord_title?: string;
  enable_discord?: boolean;
  enable_comments?: boolean;
  mozhubs_link?: string;
}

const WorkshopSchema = new Schema({
  title: Types.String,
  posts: { type: [{ type: Types.ObjectId, ref: "post" }], default: [] },
  discord_link: { type: Types.String, default: "" },
  discord_title: { type: Types.String, default: "" },
  mozhubs_link: { type: Types.String, default: "" },
  enable_discord: { type: Types.Boolean, default: false },
  enable_comments: { type: Types.Boolean, default: false },
  visits: Types.Number,
});

export default models.workshop || model("workshop", WorkshopSchema);
