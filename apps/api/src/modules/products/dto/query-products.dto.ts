import { IsOptional, IsString, IsIn } from 'class-validator';

export class QueryProductsDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsIn(['name', 'price'])
  sort?: 'name' | 'price';
}
