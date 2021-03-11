import AppError from '@shared/errors/AppError';

type HandlerErrorResponse = {
  statusCode: number;
  body: string;
};

export default function handlerErrors(error: any): HandlerErrorResponse {
  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      body: error.message,
    };
  }

  return {
    statusCode: 500,
    body: 'Internal server error.',
  };
}
