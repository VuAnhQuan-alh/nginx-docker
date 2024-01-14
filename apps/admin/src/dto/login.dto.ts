import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  identify: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
