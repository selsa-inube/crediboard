import { Requests, ICreditRequestPin } from "@services/types";

interface IBoardData {
  boardRequests: Requests[];
  requestsPinned: ICreditRequestPin[];
}

export type { IBoardData };
