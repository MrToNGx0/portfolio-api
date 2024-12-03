import { Injectable, Logger } from '@nestjs/common';
import { executeQuery } from 'src/common/utils/db-helper';
import { LanguageDto } from './dto/language.dto';
import { ERROR_MESSAGES } from 'src/common/utils/constants';

@Injectable()
export class LanguagesService {
  private logger = new Logger(LanguagesService.name);

  async getLanguages(): Promise<LanguageDto[]> {
    try {
      const query = `
        SELECT language_code, language_name, picture_url
        FROM languages
        WHERE is_delete = false
      `;
      const res = await executeQuery(query);
      return res;
    } catch (error) {
      this.logger.error(ERROR_MESSAGES.FETCH_LANGUAGES_FAILED, error);
      throw new Error(ERROR_MESSAGES.FETCH_LANGUAGES_FAILED);
    }
  }
}
