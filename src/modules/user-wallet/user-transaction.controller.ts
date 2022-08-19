import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserTransactionService } from './user-transaction.service';
import { CreateUserTransactionDto } from './dto/create-user-transaction.dto';
import { UpdateUserTransactionDto } from './dto/update-user-transaction.dto';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserTransaction } from './entities/user-transaction.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { Auth } from '../auth/entities/auth.entity';

@ApiTags('UserTransactions - APP & Admin Panel')
@ApiBearerAuth('JWT')
@Crud({
  model: {
    type: UserTransaction,
  },
  dto: {
    create: CreateUserTransactionDto,
    update: UpdateUserTransactionDto,
  },
  routes: {
    only: ['createOneBase', 'getManyBase', 'updateOneBase', 'deleteOneBase'],
    createOneBase: {
      decorators: [UseGuards(AuthGuard())],
    },
    getManyBase: {
      decorators: [UseGuards(AuthGuard())],
    },
    updateOneBase: {
      decorators: [UseGuards(AuthGuard())],
    },
    deleteOneBase: {
      decorators: [UseGuards(AuthGuard())],
    },
  },
  query: {
    exclude: ['created_date', 'updated_date', 'deleted_At'],
  },
})
@Controller('user-transaction')
@UseGuards(AuthGuard())
export class UserTransactionController implements CrudController<UserTransaction> {
  constructor(public service: UserTransactionService) { }

  @ApiOperation({ summary: 'Get UserTransactions' })
  @Get()
  async getUserTransactions(@GetUser() user: Auth) {
    return await this.service.getUserTransactions(user);
  }

  @ApiOperation({ summary: 'Get current balance of user' })
  @Get('current-balance')
  async getCurrentBalance(@GetUser() user: Auth) {
    return await this.service.getCurrentBalance(user);
  }

}
