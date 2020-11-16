import jwt from "jsonwebtoken";

import authConfig from "../../config/auth";
import { promisify } from "util";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  // const [bearer, token] = authHeader.split(" ");

  // desestruturando array, e ignorando o bearer
  const [, token] = authHeader.split(" ");

  try {
    // transformando decoded em promisse (era callback) a função retornada eu chamo passando token e authConfig.secret
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    console.log(decoded);
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalid" });
  }

  console.log(authHeader);

  return next();
};
