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
import { credit_profileInfo } from "@src/mocks/creditProfileInfo/creditProfileInfo.mock";
import { mockProspectsResponse } from "../prospect/prospect.mock";

export function initializeDataDB() {
  localforage.clear();

  intializedData<(typeof themes)[number]>("themes", themes);
  intializedData<(typeof mockRequests)[number]>("requests", mockRequests);
  intializedData<(typeof mockRequestsPinned)[number]>(
    "requests-pinned",
    mockRequestsPinned
  );
  intializedData<(typeof mockStaff)[number]>("staff", mockStaff);
  intializedData<(typeof approval_by_credit_request_Mock)[number]>(
    "approval",
    approval_by_credit_request_Mock
  );
  intializedData<(typeof traceMock)[number]>("trace", traceMock);
  intializedData<(typeof mockToDo)[number]>("to-do", mockToDo);
  intializedData<(typeof mockRiskScoring)[number]>(
    "risk-scoring",
    mockRiskScoring
  );
  intializedData("document", documents);
  intializedData<(typeof promissory_note)[number]>(
    "promissory_note",
    promissory_note
  );
  intializedData(
    "payroll_discount_authorization",
    payroll_discount_authorization
  );
  intializedData("error_issued", error_issued);
  intializedData("credit_profileInfo", credit_profileInfo);
  intializedData("prospects", mockProspectsResponse);
}
