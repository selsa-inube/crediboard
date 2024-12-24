import { IExtraordinaryPayment } from "@src/services/types";
interface IHeaders {
  label: string;
  key: keyof IExtraordinaryPayment;
  action?: boolean;
  mask?: (value: string|number) => string;
}

export type { IHeaders };
