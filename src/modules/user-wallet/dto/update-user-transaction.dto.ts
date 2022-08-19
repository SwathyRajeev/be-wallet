import { PartialType } from '@nestjs/swagger';
import { CreateUserTransactionDto } from './create-user-transaction.dto';

export class UpdateUserTransactionDto extends PartialType(CreateUserTransactionDto) {}
