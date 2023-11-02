export function getErrorMessage(error: any): string {
  if (error.error.message) return error.error.message;
  else if (error.message) return error.message;
  else return error;
}
