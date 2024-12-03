export class ResponseDto<T> {
  statusCode: number;
  message: string;
  data?: T;
  error?: string;
  path: string;
  timestamp: string;
}
