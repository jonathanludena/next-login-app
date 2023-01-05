import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const PRIVATEKEYSECRET = `${process.env.PUBLIC_NEXT_PRIVATEKEYSECRET}`;

function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      if (email === "admin@admin.local" && password === "admin") {
        const token = jwt.sign(
          { email, username: "adminTest" },
          PRIVATEKEYSECRET,
          {
            expiresIn: "1h",
          }
        );

        const serialized = serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict", // none if extern server
          maxAge: 1000 * 60 * 60 * 24 * 30, // 30 dias
          path: "/",
        });

        res.setHeader("Set-Cookie", serialized);
        return res
          .status(201)
          .json({ status: true, message: "login successfully" });
      }

      return res.json({ status: false, message: "Invalid credentials" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  } else {
    return res
      .status(404)
      .json({ status: false, message: "oops! API Route did not found" });
  }
}

export default loginHandler;
