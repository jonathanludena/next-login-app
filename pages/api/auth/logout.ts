import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

const PRIVATEKEYSECRET = String(process.env.PUBLIC_NEXT_PRIVATEKEYSECRET);

export default function logoutHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ status: false, message: "No token" });
  }
  try {
    verify(String(token), PRIVATEKEYSECRET);
    const serialized = serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // none if extern server
      maxAge: 0,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    res.status(201).json({ status: true, message: "logout successfully" });
  } catch (error) {
    return res.status(401).json({ status: false, error });
  }
}
