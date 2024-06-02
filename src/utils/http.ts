import Toast from "../components/common/Toast";
import { ERROR_MESSAGE, STATUS, STATUS_CODE } from "./constants";

/**
 * HTTP methods supported by the fetchWrapper function
 */
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

/**
 *
 * @param method - The HTTP method to be used for the request (GET, POST, PUT, DELETE).
 * @param endpoint - The API endpoint to which the request will be made.
 * @param body - The request body (optional, only applicable for POST and PUT requests).
 */

export async function fetchWrapper<TBody extends object>(
  method: HttpMethod,
  endpoint: string,
  body?: TBody
) {
  const headers = new Headers();
  headers.set("content-type", "application/json");

  const apiUrl: string = `${process.env.REACT_APP_API_URL}${endpoint}`;

  try {
    let response = await fetch(apiUrl, {
      headers,
      method,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorMessage = getErrorMessage(response.status);
      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    if (error instanceof Error) {
      Toast(STATUS.ERROR, error.message);
    } else {
      Toast(STATUS.ERROR, ERROR_MESSAGE.UNKNOWN_MESSAGE);
    }
    throw error;
  }
}

const getErrorMessage = (status: number) => {
  switch (status) {
    case STATUS_CODE.STATUS_404:
      return ERROR_MESSAGE.STATUS_404_MESSAGE;
    case STATUS_CODE.STATUS_500:
      return ERROR_MESSAGE.STATUS_500_MESSAGE;
    default:
      return `${ERROR_MESSAGE.DEFAULT} ${status}`;
  }
};
