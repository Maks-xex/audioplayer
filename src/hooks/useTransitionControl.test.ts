import { renderHook, act, waitFor } from "@testing-library/react";

import { useTransitionControl } from "./useTransitionControl";

describe("useTransitionControl", () => {
  it("should initialize with isTransitioning set to false", () => {
    const { result } = renderHook(() => useTransitionControl());

    expect(result.current.isTransitioning).toBe(false);
  });

  it("should start and end transitions", () => {
    const { result } = renderHook(() => useTransitionControl());

    act(() => {
      result.current.startTransition();
    });

    expect(result.current.isTransitioning).toBe(true);

    act(() => {
      result.current.endTransition();
    });

    expect(result.current.isTransitioning).toBe(false);
  });

  it("should automatically end transition after the specified duration", async () => {
    const transitionDuration = 100; // Set a shorter duration for testing

    const { result } = renderHook(() =>
      useTransitionControl(transitionDuration)
    );

    act(() => {
      result.current.startTransition();
    });

    expect(result.current.isTransitioning).toBe(true);

    await waitFor(() => expect(result.current.isTransitioning).toBe(false));
  });
});
