import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const PRIVATEKEYSECRET = process.env.PUBLIC_NEXT_PRIVATEKEYSECRET;

export default function profileHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { token } = req.cookies;
      if (!token) {
        return res.status(401).json({ status: false, message: "No token" });
      }

      const user: any = verify(String(token), String(PRIVATEKEYSECRET));

      return res.status(201).json({
        status: true,
        user: { email: user.email, username: user.username },
      });
    } catch (error) {
      return res
        .status(401)
        .json({ status: false, error, message: "Invalid Token" });
    }
  }
}
