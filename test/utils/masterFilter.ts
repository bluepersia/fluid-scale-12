import config from "../../config.json";

function filterMasters<T extends { index: number }>(masters: T[]): T[] {
  return masters.filter((master) =>
    config.includeMasters.includes(master.index)
  );
}

export { filterMasters };
