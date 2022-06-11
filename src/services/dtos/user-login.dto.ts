import { BaseDTO } from "./base/base.dto";

/**
 * An User Login DTO object.
 */
export class UserLoginDTO {
  username: string;
  password: string;
  remember?: boolean;
}
