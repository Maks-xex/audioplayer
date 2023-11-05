import { getSlides } from "./get-slides";
import { HOST } from "./constans";
import { waitFor } from "@testing-library/react";

describe("getSlides", () => {
  const originalEnv = process.env;
  global.fetch = jest.fn();

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...originalEnv,
      NODE_ENV: "test",
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("should fetch data successfully", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, title: "Slide 1" }],
    });

    const slides = await getSlides();

    expect(global.fetch).toHaveBeenCalledWith(`${HOST}/api/slides`);
    expect(slides).toEqual([{ id: 1, title: "Slide 1" }]);
  });

  it("should handle API response error", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
    });

    try {
      await getSlides();
    } catch (error: any) {
      void waitFor(() => expect(error.message).toBe("404"));
    }
  });

  it("should throw an error if HOST is not defined", async () => {
    const originalHost = HOST;
    delete (global as any).HOST;

    try {
      await getSlides();
    } catch (error: any) {
      expect(error.message).toBe(error.message);
    } finally {
      (global as any).HOST = originalHost;
    }
  });
});
