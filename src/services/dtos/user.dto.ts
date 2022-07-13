import { BaseDTO } from "./base/base.dto";

/**
 * An User DTO object.
 */
export class UserDTO extends BaseDTO {
  username: string;
  password: string;
  fullName?: string;
  role: string;
}
