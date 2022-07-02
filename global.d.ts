import { Request, Response, NextFunction } from 'express';

interface JSONResponse {
  success?: boolean;
  error?: boolean;
  message: string;
  data?: Record<string, unknown>;
}

type TypedResponse<T> = Omit<Response, 'json' | 'status'> & {
  json(data: T): TypedResponse<T>;
} & { status(code: number): TypedResponse<T> };

type AppResponse = TypedResponse<JSONResponse>;

declare global {
  type Controller = (req: Request, res: AppResponse, next: NextFunction) => Promise<void>;
}
