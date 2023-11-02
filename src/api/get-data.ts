import { IData } from "../types";
import { HOST } from "./constans";

export const getData = async (): Promise<IData[]> => {
  const response = await fetch(`${HOST}/api/slides`);
  if (!response.ok) {
    throw new Error("something went wrong");
  }
  return await response.json();
};
