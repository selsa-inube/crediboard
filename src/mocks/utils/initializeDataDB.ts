import localforage from "localforage";

import { intializedData } from "@mocks/utils/dataMock.service";
import { themes } from "@mocks/design/themes";
import { mockRequests } from "@mocks/requests/requests.mock";
import { mockRequestsPinned } from "@mocks/requests/requestsPinned.mock";
import { mockStaff } from "@mocks/staff/staff.mock";
import { traceMock } from "@mocks/trace/trace.mock";
import { payroll_discount_authorization_signature_by_credit_request } from "@mocks/promissoryNotes/payrollDiscountAuthorization.mock";

export function initializeDataDB() {
  localforage.clear();

  intializedData<(typeof themes)[number]>("themes", themes);
  intializedData<(typeof mockRequests)[number]>("requests", mockRequests);
  intializedData<(typeof mockRequestsPinned)[number]>(
    "requests-pinned",
    mockRequestsPinned
  );
  intializedData<(typeof mockStaff)[number]>("staff", mockStaff);
  intializedData<typeof traceMock>("trace", [traceMock]);
  intializedData<
    (typeof payroll_discount_authorization_signature_by_credit_request)[number]
  >(
    "payrollDiscountAuthorization",
    payroll_discount_authorization_signature_by_credit_request
  );
}
