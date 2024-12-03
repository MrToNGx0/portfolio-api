import { IsString, IsOptional } from 'class-validator';

export class EducationDto {
  @IsString()
  institute: string;

  @IsString()
  degree: string;

  @IsString()
  faculty: string;

  @IsString()
  major: string;

  @IsOptional()
  @IsString()
  gpa?: string;

  @IsString()
  startDate: string;

  @IsOptional()
  @IsString()
  endDate?: string;
}
