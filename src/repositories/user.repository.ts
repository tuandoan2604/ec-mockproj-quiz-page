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

  async findOne(id: number): Promise<UserEntity | any> {
    return await this.userRepository.findOne({where: {id}});
  }

  async save(userEntity: UserEntity): Promise<UserEntity | any> {
    const userCreated = await this.userRepository.save(userEntity);

    return userCreated;
  }

  async update(userEntity: UserEntity): Promise<UserEntity | any> {
    const userUpdated = await this.userRepository.save(userEntity);

    return userUpdated;
  }

  async delete(userEntity: UserEntity): Promise<UserEntity | any> {
    const userDeleted = await this.userRepository.remove(userEntity);

    return userDeleted;
  }

  async findByUsername(username: string): Promise<UserEntity | any> {
    return await this.userRepository.findOne({where: {username: username}});
  }

}
