import localforage from "localforage";

import { intializedData } from "@mocks/utils/dataMock.service";
import { themes } from "@mocks/design/themes";
import { mockRequests } from "@mocks/requests/requests.mock";
import { mockRequestsPinned } from "@mocks/requests/requestsPinned.mock";
import { mockStaff } from "@mocks/staff/staff.mock";
import { mockToDo } from "@mocks/financial-reporting/to-do/toDo.mock";
import { mockRiskScoring } from "@mocks/credit-profile/risk-scoring/riskScoring.mock";
import { promissory_note } from "@mocks/promissoryNotes/promissory_note.mock";
import { payroll_discount_authorization } from "@mocks/promissoryNotes/payroll_discount_authorization.mock";
import { approval_by_credit_request_Mock } from "@src/mocks/financialReporting/Approvals.mock";
import { documents } from "@mocks/financialReporting/documents.mock";
import { traceMock } from "@mocks/financialReporting/trace.mock";
import { error_issued } from "@mocks/financialReporting/error.mock";
import { uncovered_wallet } from "@mocks/creditProfileInfo/uncoveredWallet.mock"
import { credit_profileInfo } from "@src/mocks/creditProfileInfo/creditProfileInfo.mock";
import { payment_capacity } from "@mocks/creditProfileInfo/paymentCapacity.mock";
import { credit_behavior } from "@mocks/creditProfileInfo/creditBehavior.mock"


export function initializeDataDB() {
  localforage.clear();

  intializedData<(typeof themes)[number]>("themes", themes, true);
  intializedData<(typeof mockRequests)[number]>("requests", mockRequests, true);
  intializedData<(typeof mockRequestsPinned)[number]>("requests-pinned", mockRequestsPinned, true);
  intializedData<(typeof mockStaff)[number]>("staff", mockStaff, true);
  intializedData<(typeof approval_by_credit_request_Mock)[number]>(
    "approval",
    approval_by_credit_request_Mock,
    true
  );
  intializedData<(typeof traceMock)[number]>("trace", traceMock, false);
  intializedData<(typeof mockToDo)[number]>("to-do", mockToDo, true);
  intializedData<(typeof mockRiskScoring)[number]>(
    "risk-scoring",
    mockRiskScoring,
    true
  );
  intializedData("document", documents, true);
  intializedData<(typeof promissory_note)[number]>(
    "promissory_note",
    promissory_note,
    true
  );
  intializedData(
    "payroll_discount_authorization",
    payroll_discount_authorization,
    true
  );
  intializedData("error_issued", error_issued, true);
  intializedData("credit_profileInfo", credit_profileInfo, true);
  intializedData("payment_capacity", payment_capacity, true);
  intializedData("uncovered_wallet", uncovered_wallet, true)
  intializedData("credit_behavior", credit_behavior, true);
}
