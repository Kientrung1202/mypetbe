export const success = (message: string) => ({
  success: true,
  code: 200,
  reason: message || "SUCCESS",
});
export const badRequest = (message: string) => ({
  success: false,
  code: 400,
  reason: message || "BAD_REQUEST",
});
export const notFound = (message: string) => ({
  success: false,
  code: 404,
  reason: message || "NOT_FOUND",
});
export const serverError = (reason: string) => ({
  success: false,
  code: 500,
  reason: reason || "INTERNAL_SERVER_ERROR",
});
