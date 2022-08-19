import { Module } from '@nestjs/common';
import { UserTransactionService } from './user-transaction.service';
import { UserTransactionController } from './user-transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTransaction } from './entities/user-transaction.entity';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserTransaction]), AuthModule],
  controllers: [UserTransactionController],
  providers: [UserTransactionService],
})
export class UserTransactionModule {}
