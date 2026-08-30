import { IsOptional, IsString } from 'class-validator';

export class QueryOrdersDto {
  @IsOptional()
  @IsString()
  customerId?: string;
}
