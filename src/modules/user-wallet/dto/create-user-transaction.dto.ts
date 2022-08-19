import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserTransactionDto {
  @IsNotEmpty() @IsString() transaction_type: string;
  @IsNotEmpty() @IsString() coin: string;
  @IsNotEmpty() @IsNumber() coin_count: number;
  @IsNotEmpty() @IsString() account_id: string;
  @IsNotEmpty() user_id: string;
}
