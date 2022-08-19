import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserLocationDto {
  @IsNotEmpty() @IsString() ip: string;
  @IsNotEmpty() @IsString() city: string;
  @IsNotEmpty() @IsString() region: string;
  @IsNotEmpty() @IsString() country_name: string;
  @IsNotEmpty() @IsString() timezone: string;
  @IsNotEmpty() @IsString() utc_offset: string;
  @IsNotEmpty() user_id: string;
}
