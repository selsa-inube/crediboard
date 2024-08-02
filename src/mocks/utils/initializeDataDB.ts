import localforage from "localforage";

import { intializedData } from "@mocks/utils/dataMock.service";
import { themes } from "@mocks/design/themes";
import { mockRequests } from "@mocks/requests/requests.mock";
import { mockRequestsPinned } from "@mocks/requests/requestsPinned.mock";
import { mockStaff } from "@mocks/staff/staff.mock";
import { approval_by_credit_request_Mock } from "@mocks/financialReporting/Approvals.mock";
import { traceMock } from "@mocks/financialReporting/trace.mock";
import { error_issued } from "@mocks/financialReporting/error.mock";

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
  intializedData("error_issued", error_issued, true);
}
