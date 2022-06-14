import { AppDataSource } from '../data-source';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { transformPassword } from '../utils/security/password.util';
export class SeedUsers implements MigrationInterface {

    user: UserEntity = {
        username: "user",
        password: "12345",
        fullName: "User",
        role: "ROLE_USER",
    };

    admin: UserEntity = {
        username: "admin",
        password: "12345",
        fullName: "User",
        role: "ROLE_ADMIN",
    };


    // eslint-disable-next-line
    public async up(queryRunner: QueryRunner): Promise<any> {
        const userRepository = AppDataSource.getRepository(UserEntity)

        await Promise.all([this.user, this.admin].map(user => {
            return {...user, password: transformPassword(user.password)}
        }));

        await userRepository.save([this.user, this.admin]);
    }

    // eslint-disable-next-line
    public async down(queryRunner: QueryRunner): Promise<any> {}
}
