import { ICreditRequest, PinnedRequest } from "@services/types";

interface IBoardData {
  boardRequests: ICreditRequest[];
  requestsPinned: PinnedRequest[];
}

export type { IBoardData };
