import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsString() @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString() @IsNotEmpty()
  phone: string;

  @IsString() @IsNotEmpty()
  address: string;
}
