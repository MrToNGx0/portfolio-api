import { Injectable, Logger } from '@nestjs/common';
import { executeQuery } from 'src/common/utils/db-helper';
import { appConfig } from 'src/config/app.config';
import { PersonalInformationDto } from './dto/personalInformation.dto';
import { SkillDto } from './dto/skill.dto';
import { EducationDto } from './dto/education.dto';
import { ExperienceDto } from './dto/experience.dto';
import { ProjectDto } from './dto/project.dto';
import { ERROR_MESSAGES } from 'src/common/utils/constants';

@Injectable()
export class ProfileService {
  private readonly userId: number = Number(appConfig.user);
  private logger = new Logger(ProfileService.name);

  async getPersonalInformation(
    language: string,
  ): Promise<PersonalInformationDto> {
    try {
      const query = `
        SELECT ui.first_name, ui.last_name, ui.nickname, u.email, u.phone, ui.address, ui.job_position, u.avatar_url, ui.resume_url 
        FROM users u
        LEFT JOIN user_info ui ON ui.user_id = u.id AND ui.is_delete = false
        LEFT JOIN languages l ON l.id = ui.language_id AND l.is_delete = false
        WHERE lower(l.language_code) = $1 AND u.is_delete = false AND u.id = $2
      `;

      const res = await executeQuery(query, [
        language.toLowerCase(),
        this.userId,
      ]);
      const profileData = res[0];

      if (!profileData) {
        throw new Error(ERROR_MESSAGES.PROFILE_NOT_FOUND);
      }

      const socialQuery = `
        SELECT social_name, picture_url, social_link
        FROM socials
        WHERE user_id = $1 AND is_delete = false
      `;
      const socialRes = await executeQuery(socialQuery, [this.userId]);

      return {
        firstName: profileData.first_name,
        lastName: profileData.last_name,
        nickname: profileData.nickname,
        email: profileData.email,
        tel: profileData.phone,
        location: profileData.address,
        jobPosition: profileData.job_position,
        avatarLink: profileData.avatar_url,
        resumeLink: profileData.resume_url,
        social: socialRes.map((row) => ({
          label: row.social_name,
          icon: row.picture_url,
          link: row.social_link,
        })),
      };
    } catch (error) {
      this.logger.error(
        ERROR_MESSAGES.FETCH_PERSONAL_INFORMATION_FAILED,
        error,
      );
      throw new Error(ERROR_MESSAGES.FETCH_PERSONAL_INFORMATION_FAILED);
    }
  }

  async getSkills(language: string): Promise<SkillDto[]> {
    try {
      const query = `
      SELECT s.skill_name AS label, s.picture_url AS icon, s.description AS description, s.link AS link
      FROM public.skills s
      JOIN public.languages l ON s.language_id = l.id
      WHERE lower(l.language_code) = $1 AND s.is_delete = false AND s.user_id = $2
    `;

      const result = await executeQuery(query, [
        language.toLowerCase(),
        this.userId,
      ]);

      return result;
    } catch (error) {
      this.logger.error(ERROR_MESSAGES.FETCH_SKILLS_FAILED, error);
      throw new Error(ERROR_MESSAGES.FETCH_SKILLS_FAILED);
    }
  }

  async getExperiences(language: string): Promise<ExperienceDto[]> {
    try {
      const query = `
        SELECT 
            e.organization_name,
            e.job_title,
            e.start_date,
            e.end_date,
            e.responsibilities
        FROM experiences e
        LEFT JOIN languages l ON l.id = e.language_id
        WHERE lower(l.language_code) = $1
          AND e.user_id = $2
          AND e.is_delete = false
        ORDER BY e.start_date DESC;
        `;

      const result = await executeQuery(query, [
        language.toLowerCase(),
        this.userId,
      ]);

      return result.map((row) => ({
        organizationName: row.organization_name,
        jobTitle: row.job_title,
        startDate: row.start_date,
        endDate: row.end_date,
        responsibilities: row.responsibilities
          ? row.responsibilities.split(',').map((res) => res.trim())
          : [],
      }));
    } catch (error) {
      this.logger.error(ERROR_MESSAGES.FETCH_EXPERIENCES_FAILED, error);
      throw new Error(ERROR_MESSAGES.FETCH_EXPERIENCES_FAILED);
    }
  }

  async getEducations(language: string): Promise<EducationDto[]> {
    try {
      const query = `
      SELECT 
        e.institution,
        e.degree,
        e.faculty,
        e.major,
        e.gpa,
        e.start_date,
        e.end_date
      FROM educations e
      LEFT JOIN languages l ON l.id = e.language_id
      WHERE lower(l.language_code) = $1
        AND e.user_id = $2
        AND e.is_delete = false
      ORDER BY e.start_date DESC
    `;

      const result = await executeQuery(query, [
        language.toLowerCase(),
        this.userId,
      ]);

      return result.map((row) => ({
        institute: row.institution,
        degree: row.degree,
        faculty: row.faculty,
        major: row.major,
        gpa: row.gpa,
        startDate: row.start_date,
        endDate: row.end_date,
      }));
    } catch (error) {
      this.logger.error(ERROR_MESSAGES.FETCH_EDUCATIONS_FAILED, error);
      throw new Error(ERROR_MESSAGES.FETCH_EDUCATIONS_FAILED);
    }
  }

  async getProjects(language: string): Promise<ProjectDto[]> {
    try {
      const query = `
      SELECT p.title, p.description, p.banner_url, p.link, 
             s.skill_name AS skill_name, s.picture_url AS icon
      FROM projects p
      LEFT JOIN project_skills ps ON p.id = ps.project_id
      LEFT JOIN skills s ON ps.skill_id = s.id AND s.language_id = p.language_id
      LEFT JOIN languages l ON l.id = p.language_id
      WHERE lower(l.language_code) = $1
      AND p.is_delete = false
      AND p.user_id = $2
      ORDER BY p.created_at DESC
    `;

      const result = await executeQuery(query, [
        language.toLowerCase(),
        this.userId,
      ]);

      const projects = result.reduce((acc, row) => {
        let project = acc.find((p) => p.title === row.title);
        if (!project) {
          project = {
            title: row.title,
            description: row.description,
            banner_url: row.banner_url,
            link: row.link,
            skills: [],
          };
          acc.push(project);
        }
        if (row.skill_name && row.icon) {
          project.skills.push({
            label: row.skill_name,
            icon: row.icon,
          });
        }
        return acc;
      }, []);

      return projects;
    } catch (error) {
      this.logger.error(ERROR_MESSAGES.FETCH_PROJECTS_FAILED, error);
      throw new Error(ERROR_MESSAGES.FETCH_PROJECTS_FAILED);
    }
  }
}
