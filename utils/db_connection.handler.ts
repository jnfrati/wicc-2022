import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

type HandlerFunction = (req: NextApiRequest, res: NextApiResponse) => unknown;

const connectDB = (handler: HandlerFunction) => async (
  req: NextApiRequest,
  res: NextApiResponse
  // eslint-disable-next-line consistent-return
): Promise<unknown> => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  try {
    // Use new db connection
    await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
    });
    return handler(req, res);
  } catch (error) {
    res.status(500).json(error);
    res.end();
  }
};

export default connectDB;
