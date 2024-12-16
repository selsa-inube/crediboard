import { ICreditRequest, ICreditRequestPin } from "@services/types";

interface IBoardData {
  boardRequests: ICreditRequest[];
  requestsPinned: ICreditRequestPin[];
}

export type { IBoardData };
