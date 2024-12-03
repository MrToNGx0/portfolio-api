import { HttpStatus } from '@nestjs/common';

export const RESPONSE_MESSAGE_SUCCESS = 'success';

export const ERROR_MESSAGES = {
  DEFAULT_ERROR_MESSAGE: 'An unexpected error occurred',
  NOT_FOUND: 'Not Found',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  FETCH_PERSONAL_INFORMATION_FAILED:
    'Failed to fetch personal informattion data',
  PROFILE_NOT_FOUND: 'Profile not found for the given language',
  FETCH_SKILLS_FAILED: 'Failed to fetch skills',
  FETCH_EXPERIENCES_FAILED: 'Failed to fetch experiences',
  FETCH_EDUCATIONS_FAILED: 'Failed to fetch educations',
  FETCH_PROJECTS_FAILED: 'Failed to fetch projects',
  FETCH_LANGUAGES_FAILED: 'Failed to fetch languages',
};

export const HTTP_STATUS_OK = HttpStatus.OK;

export const API_PATHS = {
  PROFILE: '/profile',
  SKILL: '/skill',
  EXPERIENCE: '/experience',
  EDUCATION: '/education',
  PROJECT: '/project',
  LANGUAGES: '/languages',
};

export const LOG_MESSAGES = {
  SERVER_RUNNING: (port: number) => `Server is running on port : ${port}`,
};

export const createResponse = <T>(
  data: T,
  path: string,
  message = RESPONSE_MESSAGE_SUCCESS,
  statusCode = HTTP_STATUS_OK,
) => ({
  statusCode,
  message,
  data,
  path,
  timestamp: new Date().toISOString(),
});

export const createErrorResponse = (
  status: number,
  message: string,
  error: string,
  path: string,
) => ({
  statusCode: status,
  message,
  error,
  path,
  timestamp: new Date().toISOString(),
});
