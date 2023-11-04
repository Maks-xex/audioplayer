import { IData } from "../types";
import { HOST } from "./constans";

export const getSlides = async (): Promise<IData[]> => {
  if (!HOST) throw Error("server not found");
  try {
    const response = await fetch(`${HOST}/api/slides`);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    return await response.json();
  } catch {
    throw new Error(
      "An error occurred while fetching data. Please check your internet connection and try again."
    );
  }
};
