import { FinancialReportingDocument } from "./financialReportingDocument";

const getFinancialReportingDocument = (id: string) => {
  return <FinancialReportingDocument id={id} />;
};

export { getFinancialReportingDocument };
