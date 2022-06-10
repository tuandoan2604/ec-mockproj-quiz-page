import { EntityRepository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { AppDataSource } from "../data-source";

@EntityRepository()
export class UserRepository {
  constructor(
    private readonly userRepository = AppDataSource.getRepository(UserEntity)
  ) {}
 
  async find(): Promise<UserEntity[] | any> {
    return await this.userRepository.find();
  }

}
