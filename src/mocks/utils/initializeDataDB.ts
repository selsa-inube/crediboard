import localforage from "localforage";

import { intializedData } from "@mocks/utils/dataMock.service";
import { themes } from "@mocks/design/themes";
import { mockRequests as mockRequestsDefault } from "@mocks/requests/requests.mock";
import { mockRequestsPinned } from "@mocks/requests/requestsPinned.mock";
import { mockStaff as mockStaffDefault } from "@mocks/staff/staff.mock";
import { mockToDo } from "@mocks/financial-reporting/to-do/toDo.mock";
import { mockRiskScoring } from "@mocks/credit-profile/risk-scoring/riskScoring.mock";
import { mockProspectsResponse } from "@mocks/prospect/prospect.mock";
import { promissory_note } from "@mocks/promissoryNotes/promissory_note.mock";
import { payroll_discount_authorization } from "@mocks/promissoryNotes/payroll_discount_authorization.mock";
import { approval_by_credit_request_Mock } from "@mocks/financialReporting/Approvals.mock";
import { documents as documentsDefault } from "@mocks/financialReporting/documents.mock";
import { traceMock as traceMockDefault } from "@mocks/financialReporting/trace.mock";
import { error_issued } from "@mocks/financialReporting/error.mock";
import { credit_profileInfo } from "@src/mocks/creditProfileInfo/creditProfileInfo.mock";
import { payment_capacity } from "@src/mocks/creditProfileInfo/paymentCapacity.mock";

import {
  mockRequests,
  mockStaff,
  approvalByCreditRequestMock,
  documents,
  errorIssued,
  traceMock,
} from "./importDataDb";

export function initializeDataDB(company: string) {
  localforage.clear();

  intializedData<(typeof themes)[number]>("themes", themes);
  intializedData<(typeof mockRequestsDefault)[number]>(
    "requests",
    mockRequests(company)
  );

  intializedData<(typeof mockRequestsPinned)[number]>(
    "requests-pinned",
    mockRequestsPinned
  );
  intializedData<(typeof mockStaffDefault)[number]>(
    "staff",
    mockStaff(company)
  );
  intializedData<(typeof approval_by_credit_request_Mock)[number]>(
    "approval",
    approvalByCreditRequestMock(company)
  );
  intializedData<(typeof traceMockDefault)[number]>(
    "trace",
    traceMock(company)
  );
  intializedData<(typeof mockToDo)[number]>("to-do", mockToDo);
  intializedData<(typeof mockRiskScoring)[number]>(
    "risk-scoring",
    mockRiskScoring
  );
  intializedData<(typeof documentsDefault)[number]>(
    "document",
    documents(company)
  );
  intializedData<(typeof promissory_note)[number]>(
    "promissory_note",
    promissory_note
  );
  intializedData(
    "payroll_discount_authorization",
    payroll_discount_authorization
  );
  intializedData<(typeof error_issued)[number]>(
    "error_issued",
    errorIssued(company)
  );
  intializedData("credit_profileInfo", credit_profileInfo);
  intializedData("payment_capacity", payment_capacity);
  intializedData("prospects", mockProspectsResponse);
}
