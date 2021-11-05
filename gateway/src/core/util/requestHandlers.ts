import { AxiosInstance, AxiosResponse } from "axios";

export const handleGet = async (cb: AxiosInstance, url: string) => {
  let result = null;
  try {
    const res = await cb.get(url);
    if (res && res.data) result = res.data;
  } catch (error) {
    console.error("error: ", (error as Error).message);
  }
  return result;
}