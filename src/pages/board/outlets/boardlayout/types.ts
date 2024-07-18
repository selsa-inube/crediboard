import { Requests, PinnedRequest } from "@services/types";

interface IBoardData {
  boardRequests: Requests[];
  requestsPinned: PinnedRequest[];
}

export type { IBoardData };
