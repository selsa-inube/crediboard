interface IHeaders {
  label: string;
  key: keyof IRowExtraordinaryPayment;
  action?: boolean;
  mask?: (value: string|number) => string;
}

interface IRowExtraordinaryPayment {
  id: string;
  datePayment: string;
  value: number;
  paymentMethod: string;
}

export type { IHeaders, IRowExtraordinaryPayment };
