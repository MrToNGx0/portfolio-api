import { IsString } from 'class-validator';

export class LanguageDto {
  @IsString()
  language_code: string;

  @IsString()
  language_name: string;

  @IsString()
  picture_url: string;
}
