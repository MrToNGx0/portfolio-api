import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class PersonalInformationDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  nickname?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  tel?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  jobPosition?: string;

  @IsString()
  @IsOptional()
  avatarLink?: string;

  @IsString()
  @IsOptional()
  resumeLink?: string;

  social: SocialDto[];
}

export class SocialDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsNotEmpty()
  link: string;
}
