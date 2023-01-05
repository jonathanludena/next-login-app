import * as jose from "jose";

const PRIVATEKEYSECRET = `${process.env.PUBLIC_NEXT_PRIVATEKEYSECRET}`;

export const validateToken = (token: string) => {
  try {
    const data = jose.jwtVerify(
      token,
      new TextEncoder().encode(PRIVATEKEYSECRET)
    );

    return data;
  } catch (error) {
    return error;
  }
};
