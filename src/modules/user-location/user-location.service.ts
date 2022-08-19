import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { UserLocation } from './entities/user-location.entity';

@Injectable()
export class UserLocationService extends TypeOrmCrudService<UserLocation> {
  constructor(@InjectRepository(UserLocation) repo: Repository<UserLocation>) {
    super(repo);
  }

  async deleteOne(crudRequest: CrudRequest) {
    const myEntity = await this.getOneOrFail(crudRequest);

    try {
      return await this.repo.remove(myEntity);
    } catch (error) {
      if (error.code === '23503') {
        throw new ForbiddenException(`Can not Delete this state, UserLocation is being used.`);
      } else {
        throw new InternalServerErrorException(error.code);
      }
    }
  }

  async getUserLocations() {
    return await this.repo.query(`SELECT * FROM states s`);
  }
}
