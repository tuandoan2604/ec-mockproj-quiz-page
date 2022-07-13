import { Router, Response, Request } from "express";
import { UserService } from "../services/user.service";
import { DataResponse } from "./data-response/data-response";
import { UserDTO } from "../services/dtos/user.dto";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import { isNumber } from "../utils/validation/is-number.util";
import { isUsernameValid } from "../utils/validation/is-username-val.util";
import { isPasswordValid } from "../utils/validation/is-password-val.util";
import { StatusCodes } from "http-status-codes";
const catchAsync = require("../utils/catch-async/catch-async");

export class UserController {
  public readonly router: Router;
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService(); // Create a new instance of UserController
    this.router = Router();
    this.routes();
  }

  public getUserDetail = catchAsync(async (req: Request, res: Response) => {
    const result = await this.userService.getUserDetail(Number(req.params.id));
    res
      .status(result.statusCode ? result.statusCode : StatusCodes.OK)
      .send(result);
  });

  public getAllUser = async (
    req: Request,
    res: Response
  ): Promise<UserDTO[] | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully");
    try {
      let users = await this.userService.getAllUser();

      dataResponse.result = users;

      return res.status(dataResponse.statusCode).send(dataResponse);
    } catch (error) {
      console.log(error);
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  public getAllUserAndPagination = async (
    req: Request,
    res: Response
  ): Promise<UserDTO[] | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully");
    try {
      const { pageIndex, pageSize } = req.query;

      let numberOfUser = await this.userService.countUser();
      let users = await this.userService.getAllUserPagination(
        Number(pageIndex),
        Number(pageSize)
      );

      dataResponse.result = {
        count: numberOfUser,
        users: users,
      };

      return res.status(dataResponse.statusCode).send(dataResponse);
    } catch (error) {
      console.log(error);
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  public getUserById = async (
    req: Request,
    res: Response
  ): Promise<UserDTO | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully");
    try {
      if (!isNumber(req.params.id)) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Invalid ID! ID Must be a number";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      const id = Number(req.params.id);
      const userFound = await this.userService.getUserById(id);

      if (userFound) {
        dataResponse.result = userFound;
      } else {
        dataResponse.statusCode = 404;
        dataResponse.message = "User not found";
      }

      return res.status(dataResponse.statusCode).send(dataResponse);
    } catch (error) {
      console.log(error);
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  public create = async (
    req: Request,
    res: Response
  ): Promise<UserDTO | any> => {
    let dataResponse = new DataResponse(null, 201, "Successfully created");
    try {
      const userReqDTO: UserDTO = res?.locals?.userReq;
      const userDTO: UserDTO = req.body;
      userDTO.createdBy = userReqDTO.username;

      if (!isPasswordValid(userDTO.password)) {
        dataResponse.statusCode = 400;
        dataResponse.message =
          "Invalid password! Password must contain between 5-20 characters and no spaces.";
      }

      if (!isUsernameValid(userDTO.username)) {
        dataResponse.statusCode = 400;
        dataResponse.message =
          "Invalid username! accepts 4 to 15 characters with any lower case character, digit or special symbol “_-” only.";
      }

      if (
        isUsernameValid(userDTO.username) &&
        isPasswordValid(userDTO.password)
      ) {
        const userCreated = await this.userService.create(userDTO);
        if (userCreated === "Username is already in use") {
          dataResponse.statusCode = 400;
          dataResponse.message = "Username is already in use";
          return res.status(dataResponse.statusCode).send(dataResponse);
        } else {
          dataResponse.statusCode = 201;
          dataResponse.message = "Successfully created";
          dataResponse.result = userCreated;
          return res.status(dataResponse.statusCode).send(dataResponse);
        }
      }

      return res.status(dataResponse.statusCode).send(dataResponse);
    } catch (error) {
      console.log(error);
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  public update = async (
    req: Request,
    res: Response
  ): Promise<UserDTO | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully updated");
    try {
      const userReqDTO: UserDTO = res?.locals?.userReq;
      const userDTO: UserDTO = req.body;
      userDTO.lastModifiedBy = userReqDTO.username;

      if (!isNumber(userDTO.id)) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Invalid ID! ID Must be a number";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      // Neu update password => Check password valid
      if (userDTO.password && !isPasswordValid(userDTO.password)) {
        dataResponse.statusCode = 400;
        dataResponse.message =
          "Invalid password! Password must contain between 5-20 characters and no spaces.";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      if (!isUsernameValid(userDTO.username)) {
        dataResponse.statusCode = 400;
        dataResponse.message =
          "Invalid username! accepts 4 to 15 characters with any lower case character, digit or special symbol “_-” only.";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      const userFindById = await this.userService.getUserById(
        Number(userDTO.id)
      );

      if (!userFindById) {
        dataResponse.statusCode = 404;
        dataResponse.message = "User not found";

        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      // Nếu username không thay đổi
      if (userDTO.username === userFindById.username) {
        // => Update user
        const userUpdated = await this.userService.update(userDTO);

        dataResponse.statusCode = 200;
        dataResponse.message = "Successfully updated";
        dataResponse.result = userUpdated;
        return res.status(dataResponse.statusCode).send(dataResponse);
      } else {
        // Nếu thay đổi username
        // => Check username exist
        const userFindByUsername = await this.userService.getUserByUsername(
          userDTO.username
        );

        // Nếu username đã tồn tại
        if (userFindByUsername) {
          dataResponse.statusCode = 400;
          dataResponse.message = "Username is already in use";
          return res.status(dataResponse.statusCode).send(dataResponse);
        } else {
          // Nếu username chưa tồn tại
          // => Update user
          const userUpdated = await this.userService.update(userDTO);

          dataResponse.statusCode = 200;
          dataResponse.message = "Successfully updated";
          dataResponse.result = userUpdated;
        }
      }
    } catch (error) {
      console.log(error);
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  public delete = async (
    req: Request,
    res: Response
  ): Promise<UserDTO | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully deleted");
    try {
      if (!isNumber(req.params.id)) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Invalid ID! ID Must be a number";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      const id = Number(req.params.id);
      const userToDelete = await this.userService.getUserById(id);
      if (userToDelete) {
        const userDeleted = await this.userService.delete(userToDelete);
        dataResponse.result = userDeleted;
      } else {
        dataResponse.statusCode = 404;
        dataResponse.message = "User not found";
      }

      return res.status(dataResponse.statusCode).send(dataResponse);
    } catch (error) {
      console.log(error);
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  /**
   * Configure the routes of controller
   */
  public routes() {
    this.router.get(
      "/get-all",
      [checkJwt, checkRole(["ROLE_ADMIN"])],
      this.getAllUser
    );
    this.router.get(
      "/get-all-pagination",
      [checkJwt, checkRole(["ROLE_ADMIN"])],
      this.getAllUserAndPagination
    );
    this.router.get(
      "/get-one/:id",
      [checkJwt, checkRole(["ROLE_ADMIN"])],
      this.getUserById
    );
    this.router.post(
      "/create",
      [checkJwt, checkRole(["ROLE_ADMIN"])],
      this.create
    );
    this.router.put(
      "/update",
      [checkJwt, checkRole(["ROLE_ADMIN"])],
      this.update
    );
    this.router.delete(
      "/delete/:id",
      [checkJwt, checkRole(["ROLE_ADMIN"])],
      this.delete
    );
    this.router.get(
      "/get-detail/:id",
      [checkJwt, checkRole(["ROLE_ADMIN"])],
      this.getUserDetail
    );

    // this.router.get("/get-all", this.getAllUser);
    // this.router.get("/get-one/:id", this.getUserById);
    // this.router.post("/create", this.create);
    // this.router.put("/update", this.update);
    // this.router.delete("/delete/:id", this.delete);
  }
}
