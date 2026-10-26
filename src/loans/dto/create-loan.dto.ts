
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

class LoanMaterialDto {
  @IsInt()
  @Min(1)
  materialId: number;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateLoanDto {
  @IsInt()
  @Min(1)
  employeeId: number;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(1, { each: true })
  unitIds: number[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LoanMaterialDto)
  materials: LoanMaterialDto[];
}
