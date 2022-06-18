/* eslint-disable @typescript-eslint/ban-types */

declare global {
  namespace Express {
    interface Response {
      sendJson(data: unknown): this;
    }

    interface Request {
      user: any;
    }
  }
}

export {};
