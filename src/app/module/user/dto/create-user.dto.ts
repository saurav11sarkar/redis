import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '../user-role.enum';

export class CreateUserDto {
  @ApiPropertyOptional({ example: 'saurav' })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiPropertyOptional({ example: 'sarkar' })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiPropertyOptional({ example: 'Bangladesh' })
  @IsString()
  @IsOptional()
  country: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @ApiPropertyOptional({ example: 'school@gmail.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: '123456' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ enum: UserRole, default: UserRole.USER })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({ example: '017XXXXXXXX' })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiPropertyOptional({ example: 'Dhaka, Bangladesh' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 'This is school bio' })
  @IsOptional()
  @IsString()
  bio?: string;
}
