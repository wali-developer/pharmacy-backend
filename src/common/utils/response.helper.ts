export const successResponse = (data: any, status = 200) => ({
  success: true,
  status,
  body: data,
});

export const errorResponse = (errorMessage: string, status = 400) => ({
  success: false,
  error: errorMessage,
  status,
});
