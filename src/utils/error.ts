import { isAxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  } else if (error instanceof Error) {
    return error.message;
  } else return "Something went wrong. Please try again later.";
};
