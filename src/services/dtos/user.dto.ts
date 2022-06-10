// import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from "./base/base.dto";

/**
 * An User DTO object.
 */
export class UserDTO extends BaseDTO {
  //   @ApiModelProperty({ uniqueItems: true, example: 'myuser', description: 'User login' })
  login: string;

  firstName?: string;

  lastName?: string;
}
