import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

enum USER_TYPE {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(35)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 16)
  readonly password: string;

  @IsOptional()
  @IsEnum(USER_TYPE)
  @IsString()
  readonly role?: string;

  @IsOptional()
  @IsString()
  readonly phone_number?: string;

  @IsOptional()
  @IsString()
  readonly profile_picture_url?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  readonly is_email_verified?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  readonly is_active?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  readonly active_until?: number;
}
