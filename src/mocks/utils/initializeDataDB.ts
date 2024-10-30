import localforage from "localforage";

import { intializedData } from "@mocks/utils/dataMock.service";
import { themes } from "@mocks/design/themes";
import { mockRequests as mockRequestsDefault } from "@mocks/requests/requests.mock";
import { mockRequestsPinned } from "@mocks/requests/requestsPinned.mock";
import { mockAnalyst as mockAnalystDefault } from "@mocks/staff/staff.mock";
import { mockProspectCredit } from "@mocks/prospect/prospectCredit.mock";
import { promissory_note } from "@mocks/promissoryNotes/promissory_note.mock";
import { payroll_discount_authorization } from "@mocks/promissoryNotes/payroll_discount_authorization.mock";
import { approval_by_credit_request_Mock } from "@mocks/financialReporting/Approvals.mock";
import { documents as documentsDefault } from "@mocks/financialReporting/documents.mock";
import { traceMock as traceMockDefault } from "@mocks/financialReporting/trace.mock";
import { error_issued } from "@mocks/financialReporting/error.mock";
import { credit_profileInfo } from "@mocks/creditProfileInfo/creditProfileInfo.mock";
import { uncovered_wallet } from "@mocks/creditProfileInfo/uncoveredWallet.mock";
import { payment_capacity } from "@mocks/creditProfileInfo/paymentCapacity.mock";
import { credit_behavior } from "@mocks/creditProfileInfo/creditBehavior.mock";
import { mockDecisions } from "@mocks/financialReporting/to-do/decisions.mock";
import {
  mockRangeRequeredByTheBusinessUnit,
  mockRiskScoring,
} from "@mocks/credit-profile/risk-scoring/riskScoring.mock";
import { IRiskScoring } from "@services/types";

import {
  mockRequests,
  mockAnalyst,
  mockAccountManager,
  approvalByCreditRequestMock,
  documents,
  errorIssued,
  traceMock,
  requirementsMock,
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
  intializedData<(typeof mockAnalystDefault)[number]>(
    "analyst",
    mockAnalyst(company)
  );
  intializedData<(typeof mockAnalystDefault)[number]>(
    "account-manager",
    mockAccountManager(company)
  );
  intializedData<(typeof approval_by_credit_request_Mock)[number]>(
    "approval",
    approvalByCreditRequestMock(company)
  );
  intializedData<(typeof traceMockDefault)[number]>(
    "trace",
    traceMock(company)
  );
  intializedData<IRiskScoring>("risk-scoring", mockRiskScoring);
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
  intializedData("uncovered_wallet", uncovered_wallet);
  intializedData("credit_behavior", credit_behavior);
  intializedData("prospects", mockProspectCredit);
  intializedData("requirements", requirementsMock(company));
  intializedData(
    "range_requered_Business_Unit",
    mockRangeRequeredByTheBusinessUnit
  );
  intializedData("decisions", mockDecisions);
}
