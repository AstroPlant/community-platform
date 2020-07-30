import { array, number, text } from "@storybook/addon-knobs";
import { select, withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import useSWR from "swr";
import Graph from "../../Graph";

export default {
  component: Graph,
  title: "Graphs/Graph",
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const graph = {
    id: 24,
    title: "Humidity Over Time",
    type: select("Type", ["bar", "line"], "line"),
    owner: "rmnrss",
    kitSerial: "k-krmw-vp3y-v4g9",
    configId: 16,
    peripherals: [{ id: 177, peripheralDefinitionId: 3, quantityTypeId: 2 }],
  };

  const fetcher = () =>
    fetch(
      `https://api.astroplant.sda-projects.nl/kits/${graph.kitSerial}/aggregate-measurements?configuration=${graph.configId}&peripheral=${graph.peripherals[0].id}&quantityType=${graph.peripherals[0].quantityTypeId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    ).then((res) => res.json());

  const { data, error, mutate } = useSWR("key", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return <Graph graph={graph} data={data ? data : []} />;
};
