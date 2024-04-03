import localforage from "localforage";

import { intializedData } from "@src/mocks/utils/dataMock.service";
import { themes } from "@mocks/design/themes";

export function initializeDataDB() {
  localforage.clear();

  intializedData<(typeof themes)[number]>("themes", themes);
}
