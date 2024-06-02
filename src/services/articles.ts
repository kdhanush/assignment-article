import Toast from "../components/common/Toast";
import { IArticle, IArticleData } from "../types/articles";
import { ERROR_MESSAGE, STATUS } from "../utils/constants";
import { fetchWrapper } from "../utils/http";

export interface FetchActionResponse<T> {
  type: "success" | "error";
  data?: T;
  error?: any;
}

export async function getAllArticles(): Promise<
  FetchActionResponse<IArticle[]>
> {
  try {
    const url = "/articles";
    const response = await fetchWrapper<IArticle[]>("GET", url);
    const articleResponseData = await response.json();
    if (!response.ok) {
      throw articleResponseData.message;
    }
    return {
      type: "success",
      data: articleResponseData,
    };
  } catch (error) {
    return {
      type: "error",
      error: error,
    };
  }
}

export async function getArticleById(
  id: string
): Promise<FetchActionResponse<IArticleData>> {
  try {
    const url = `/articles/${id}`;
    const response = await fetchWrapper<IArticleData>("GET", url);
    const articleResponseData = await response.json();

    if (!response.ok) {
      throw articleResponseData;
    }

    return {
      type: "success",
      data: articleResponseData,
    };
  } catch (error) {
    return {
      type: "error",
      error: error,
    };
  }
}
