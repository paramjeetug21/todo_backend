import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  details?: string;

  @IsUUID()
  declare userId: string;
}
