import { ICreditRequest, ICreditRequestPinned } from "@services/types";

interface IBoardData {
  boardRequests: ICreditRequest[];
  requestsPinned: ICreditRequestPinned[];
}

export type { IBoardData };
