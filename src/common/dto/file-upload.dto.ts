
import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsNotEmpty } from 'class-validator';

export class FileUploadDto {
  @IsNotEmpty() user_id: string;

  @ApiProperty({ type: 'string', format: 'binary' }) file: string;
}

export class FileUploadArrayDto {
  @IsNotEmpty() user_id: string;

  @ApiProperty({ type: 'string', format: 'binary' }) file: Array<string>;
}
