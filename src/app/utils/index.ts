import { ApiError } from "next/dist/server/api-utils";

/**
 * @function sleep Asynchronous function that returns a promise and sleeps for the specified duration.
 * @param { number } duration Optional argument, duration to sleep in milliseconds. Defaults to 1000 if no number is provided.
 */
export const sleep = (duration: number = 1000): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

/**
 * @function raise Custom function to throw errors.
 * @param { string } errorMessage The specified error message to raise.
 */
export const raise = (errorMessage: string): never => {
  throw new Error(errorMessage);
};

/**
 * @function raise Custom function to throw Next.js specific Api errors.
 * @param { number } statusCode The specific HTTP response error code.
 * @param { string } errorMessage The specified error message to raise.
 */
export const raiseApiError = (
  statusCode: number,
  errorMessage: string
): never => {
  throw new ApiError(statusCode, errorMessage);
};
