import { EntityRepository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { AppDataSource } from "../data-source";

@EntityRepository()
export class UserRepository {
  constructor(
    private readonly userRepository = AppDataSource.getRepository(UserEntity)
  ) {}
 
  async find(): Promise<UserEntity[] | any> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      return;
    }
  }
  async findPagination(pageIndex: number, pageSize: number): Promise<UserEntity[] | any> {
    const take = pageSize;
    const offset = pageSize * (pageIndex - 1);
    try {
      return await this.userRepository.find({
        take: pageSize,
        skip: offset,
      });
    } catch (error) {
      return;
    }
  }

  async findOne(id: number): Promise<UserEntity | any> {
    try {
      return await this.userRepository.findOne({where: {id}});
    } catch (error) {
      return;
    }
  }

  async save(userEntity: UserEntity): Promise<UserEntity | any> {
    try {
      const userCreated = await this.userRepository.save(userEntity);

      return userCreated;
    } catch (error) {
      return;
    }
  }

  async update(userEntity: UserEntity): Promise<UserEntity | any> {
    try {
      const userUpdated = await this.userRepository.save(userEntity);

      return userUpdated;
    } catch (error) {
      return;
    }
  }

  async delete(userEntity: UserEntity): Promise<UserEntity | any> {
    try {
      const userDeleted = await this.userRepository.remove(userEntity);

      return userDeleted;
    } catch (error) {
      return;
    }
  }

  async findByUsername(username: string): Promise<UserEntity | any> {
    try {
      return await this.userRepository.findOneOrFail({
        where: {username: username},
        select: ['id', 'username', 'password', 'fullName', 'role']
      });
    } catch (error) {
      return;
    }
  }

  async count(): Promise<number | any> {
    try {
      const countUser = await AppDataSource
      .createQueryBuilder(UserEntity, "user")
      .getCount()

      return countUser;
    } catch (error) {
      return;
    }
  }

}
