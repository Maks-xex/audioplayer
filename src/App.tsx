import React, { useState } from "react";
import { AudioPlayer } from "./components/AudioPlayer/AudioPlayer";
import { getSlides } from "./api/get-slides";
import { useQuery } from "react-query";
import { IAsset } from "./types";
import { Error } from "./components/Error/Error";

export const App: React.FC = () => {
  const [assets, setAssets] = useState<IAsset[]>([]);

  const { isLoading, isError, error } = useQuery<IAsset[], Error>(
    "slides",
    getSlides,
    {
      onSuccess(data) {
        setAssets(data);
      },
    }
  );

  return (
    <>
      {isError && <Error error={error} />}
      <AudioPlayer
        assets={assets}
        isLoading={isLoading}
        data-testid="audio-player-component"
      />
    </>
  );
};
