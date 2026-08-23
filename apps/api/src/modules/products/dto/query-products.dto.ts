import { IsOptional, IsString, IsIn, MaxLength } from 'class-validator';

export class QueryProductsDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsIn(['name', 'price'])
  sort?: 'name' | 'price';

  @IsOptional()
  @IsString()
  @MaxLength(100)
  q?: string;
}
