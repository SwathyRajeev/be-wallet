import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Auth } from '../auth/entities/auth.entity';
import { UserTransaction } from './entities/user-transaction.entity';

@Injectable()
export class UserTransactionService extends TypeOrmCrudService<UserTransaction> {
  constructor(@InjectRepository(UserTransaction) repo: Repository<UserTransaction>) {
    super(repo);
  }

  async deleteOne(crudRequest: CrudRequest) {
    const myEntity = await this.getOneOrFail(crudRequest);

    try {
      return await this.repo.remove(myEntity);
    } catch (error) {
      if (error.code === '23503') {
        throw new ForbiddenException(`Can not Delete this data, UserTransaction is being used.`);
      } else {
        throw new InternalServerErrorException(error.code);
      }
    }
  }

  async getUserTransactions(user: Auth) {
    return await this.repo.query(`
                              SELECT
                                  a.username as sender,
                                  r.username as receiver,
                                  to_char(ut.created_date, 'd-Mon-YYYY') "date",
                                  coin_count
                              FROM
                                  public.user_transaction ut
                                  INNER JOIN auth a ON a.user_id = ut.user_id
                                  INNER JOIN auth r ON r.user_id = ut.account_id
                              WHERE
                                  ut.account_id = ${user.user_id}
                                  OR ut.user_id = ${user.user_id}
                              `);
  }
  async getCurrentBalance(user: Auth) {
    const result = await this.repo.query(`
                        SELECT
                          (
                              SELECT
                                  CASE
                                      WHEN SUM(coin_count) IS NULL THEN 0
                                      ELSE SUM(coin_count)
                                  END sum
                              FROM
                                  public.user_transaction
                              WHERE
                                  account_id = ${user.user_id}
                          ) - (
                              SELECT
                                  CASE
                                      WHEN SUM(coin_count) IS NULL THEN 0
                                      ELSE SUM(coin_count)
                                  END sum
                              FROM
                                  public.user_transaction
                              WHERE
                                  user_id = ${user.user_id}
                          ) as current_balance`);
    return result[0];
  }
}
