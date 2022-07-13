import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { expiresIn_Token } from "../utils/config/const.config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const JWT_SECRET: any = process.env.ACCESS_TOKEN_SECRET;

  // Get the jwt token from the headers
  const accessToken = <string>req.headers["authorization"]?.split(" ")[1];
  if (!accessToken) {
    res
      .status(401)
      .send({
        statusCode: 401,
        message: "Unauthorized",
      })

    return;
  }

  let jwtPayload;

  // Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(accessToken, JWT_SECRET);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    // If token is not valid, respond with 401 (unauthorized)
    res
      .status(401)
      .send({
        statusCode: 401,
        message: "Unauthorized",
      })

    return;
  }

  // The token is valid for 3 hour
  // We want to send a new token on every request
  const { id, username, role } = jwtPayload;
  const newAccessToken = jwt.sign({ id, username, role }, JWT_SECRET, {
    expiresIn: expiresIn_Token,
  });
  res.setHeader("accessToken", newAccessToken);

  // Call the next middleware or controller
  next();
};
