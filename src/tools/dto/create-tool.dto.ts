
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateToolDto{
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  serialCode!: string;
}
