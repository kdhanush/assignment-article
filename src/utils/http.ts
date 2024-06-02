import Toast from "../components/common/Toast";
import { ERROR_MESSAGE, STATUS, STATUS_CODE } from "./constants";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

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
      let errorMessage: string;
      switch (response.status) {
        case STATUS_CODE.STATUS_404:
          errorMessage = ERROR_MESSAGE.STATUS_404_MESSAGE;
          break;
        case STATUS_CODE.STATUS_500:
          errorMessage = ERROR_MESSAGE.STATUS_500_MESSAGE;
          break;
        default:
          errorMessage = `${ERROR_MESSAGE.DEFAULT} ${response.status}`;
      }
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
