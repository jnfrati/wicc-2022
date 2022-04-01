import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

type HandlerFunction = (req: NextApiRequest, res: NextApiResponse) => unknown;

const AuthMiddleware = (handler: HandlerFunction) => async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const session = await getSession({ req });
  if (session) {
    // Signed in
    await handler(req, res);
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};

export default AuthMiddleware;
