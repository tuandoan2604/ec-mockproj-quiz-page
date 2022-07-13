import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";

import { UserEntity } from "../entities/user.entity";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Get the user ID from previous midleware
    const id = res.locals.jwtPayload.id;

    // Get user role from the database
    const userRepository = AppDataSource.getRepository(UserEntity);
    let userEntity: any = new UserEntity();
    try {
      userEntity = await userRepository.findOne({ where: { id } });
    } catch (error) {
      console.log(error);
      res.status(401).send({
        statusCode: 401,
        message: "Unauthorized",
      });

      return;
    }

    if (!userEntity) {
      res.status(401).send({
        statusCode: 401,
        message: "Unauthorized",
      });

      return;
    }

    //Check if array of authorized roles includes the user's role
    try {
      if (roles.indexOf(userEntity.role) > -1) {
        res.locals.userReq = userEntity;
        next();
      } else {
        res.status(403).send({
          statusCode: 403,
          message: "Forbidden resource",
          error: "Forbidden",
        });
  
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        statusCode: 401,
        message: "Unauthorized",
      });

      return;
    }
  };
};
