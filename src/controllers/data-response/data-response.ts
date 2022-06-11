export class DataResponse {
  result: any;
  statusCode: number;
  message: string;

  constructor(result: any, statusCode: number, message: string) {
    this.result = result;
    this.statusCode = statusCode;
    this.message = message;
  }
}
