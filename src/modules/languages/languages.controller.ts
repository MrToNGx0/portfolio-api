import { Controller, Get } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { API_PATHS, createResponse } from 'src/common/utils/constants';

@Controller('languages')
export class LanguagesController {
  constructor(private languageService: LanguagesService) {}

  @Get()
  async getLanguage() {
    const languages = await this.languageService.getLanguages();
    return createResponse(languages, API_PATHS.LANGUAGES);
  }
}
