import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './modules/profile/profile.module';
import { LanguagesModule } from './modules/languages/languages.module';
import { GlobalFiltersModule } from './global-filter.module';

@Module({
  imports: [ProfileModule, LanguagesModule, GlobalFiltersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
