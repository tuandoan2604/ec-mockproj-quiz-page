import { EntityRepository, Repository } from 'typeorm';
import { Quiz } from './Quiz';

@EntityRepository(Quiz)
export class UserRepository extends Repository<Quiz> {
  getInactiveUsers(): Promise<Quiz[]> {
    return this.createQueryBuilder().where('isActive = :active', { active: false }).getMany();
  }
}
