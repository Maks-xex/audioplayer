import React, { useState } from "react";
import { useQuery } from "react-query";

import { AudioPlayer } from "./components/AudioPlayer/AudioPlayer";
import { Error } from "./components/Error/Error";

import { getSlides } from "./api/get-slides";

import { IAsset } from "./types";

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
