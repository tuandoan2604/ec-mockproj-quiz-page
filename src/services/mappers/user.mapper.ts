import { UserEntity } from "../../entities/user.entity";
import { UserDTO } from "../dtos/user.dto";

/**
 * An User mapper object.
 */
export class UserMapper {
  static fromDTOtoEntity(userDTO: UserDTO | any): UserEntity | any{
    if (!userDTO) {
      return;
    }
    let userEntity: any = new UserEntity();
    const fields = Object.getOwnPropertyNames(userDTO);
    fields.forEach((field) => {
        userEntity[field] = userDTO[field];
    });
    return userEntity;
  }

  static fromEntityToDTO(userEntity: UserEntity | any): UserDTO | any {
    if (!userEntity) {
      return;
    }
    let userDTO: any = new UserDTO();

    const fields = Object.getOwnPropertyNames(userEntity);

    fields.forEach((field) => {
      userDTO[field] = userEntity[field];
    });

    return userDTO;
  }
}
