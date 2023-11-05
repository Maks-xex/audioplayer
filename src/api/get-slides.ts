import { IAsset } from "../types";
import { HOST } from "./constans";

export const getSlides = async (): Promise<IAsset[]> => {
  if (!HOST) throw new Error("We currently work on this problem");
  try {
    const response = await fetch(`${HOST}/api/slides`);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    return await response.json();
  } catch (err) {
    // handle the error
    if (err instanceof Error) {
      throw err; // Re-throw the error to propagate it up
    }
    throw new Error("An unknown error occurred");
  }
};
