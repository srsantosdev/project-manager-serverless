type HandlerResponse = {
  statusCode: number;
  body: string;
};

export default function handlerResponse(
  value?: any,
  statusCode?: number,
): HandlerResponse {
  return {
    statusCode: statusCode || 200,
    body: JSON.stringify(value),
  };
}
