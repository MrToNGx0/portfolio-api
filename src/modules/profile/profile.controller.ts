import { Controller, Get, Query } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { API_PATHS, createResponse } from 'src/common/utils/constants';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('personalInformation')
  async getProfile(@Query('language') language: string) {
    const profile = await this.profileService.getPersonalInformation(language);
    return createResponse(profile, API_PATHS.PROFILE);
  }

  @Get('skill')
  async getSkill(@Query('language') language: string) {
    const skills = await this.profileService.getSkills(language);
    return createResponse(skills, API_PATHS.SKILL);
  }

  @Get('experience')
  async getExperiences(@Query('language') language: string) {
    const experiences = await this.profileService.getExperiences(language);
    return createResponse(experiences, API_PATHS.EXPERIENCE);
  }

  @Get('education')
  async getEducation(@Query('language') language: string) {
    const educations = await this.profileService.getEducations(language);
    return createResponse(educations, API_PATHS.EDUCATION);
  }

  @Get('project')
  async getProjects(@Query('language') language: string) {
    const projects = await this.profileService.getProjects(language);
    return createResponse(projects, API_PATHS.PROJECT);
  }
}
