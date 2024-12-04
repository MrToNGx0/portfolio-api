import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { SkillDto } from './skill.dto';

export class ProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  banner_url?: string;

  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsOptional()
  github_link?: string;

  skills: SkillDto[];
}
