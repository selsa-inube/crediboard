import localforage from "localforage";

import { intializedData } from "@mocks/utils/dataMock.service";
import { themes } from "@mocks/design/themes";
import { mockRequests } from "@mocks/requests/requests.mock";
import { mockRequestsPinned } from "@mocks/requests/requestsPinned.mock";
import { mockStaff } from "@mocks/staff/staff.mock";
import { approval_by_credit_request_Mock } from "@src/mocks/financialReporting/Approvals.mock";
import { traceMock } from "@src/mocks/financialReporting/trace.mock";
import { documents } from "../financialReporting/documents.mock";

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
  intializedData<typeof traceMock>("trace", [traceMock]);
  intializedData("document", documents);
}
