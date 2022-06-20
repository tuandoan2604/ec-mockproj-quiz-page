import { DeleteResult, Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { MyBaseEntity } from './base.entity';

export class BaseService<T extends MyBaseEntity, R extends Repository<T>> {
  protected readonly repository: R;

  constructor(repository: R) {
    this.repository = repository;
  }

  index(): Promise<T[]> {
    return this.repository.find();
  }

  findById(id: string): Promise<T> {
    return this.repository.findOne({ where: { id } } as FindOneOptions<T>);
  }

  // findByIds(ids: [string]): Promise<T[]> {
  //   return this.repository.find({ where: { id: ids } } as FindManyOptions<T>);
  // }

  insert(data: T): Promise<T> {
    // return data.save();
    return this.repository.save(data);
  }

  insertMany(data: T[]): Promise<T[]> {
    // return data.save();
    return this.repository.save(data);
  }

  update(data: T): Promise<T> {
    return this.repository.save(data);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
