import React, { useState } from "react";

import { useQuery } from "react-query";

import { getData } from "./api/get-data";

import { Slide } from "./components/Slide/Slide";

import { IData } from "./types";

export const App: React.FC = () => {
  const [data, setData] = useState<IData[]>([]);

  const { isLoading } = useQuery<IData[]>("data", getData, {
    onSuccess(data) {
      setData(data);
    },
  });
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && <Slide content={data} />}
    </>
  );
};
