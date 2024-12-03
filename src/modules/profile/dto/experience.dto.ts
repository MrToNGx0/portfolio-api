import { IsString, IsOptional } from 'class-validator';

export class ExperienceDto {
  @IsString()
  organizationName: string;

  @IsString()
  jobTitle: string;

  @IsString()
  startDate: string;

  @IsOptional()
  @IsString()
  endDate?: string;

  responsibilities: string[];
}
