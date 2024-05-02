import { Route, Routes } from "react-router-dom";

import { ErrorPage } from "@components/layout/ErrorPage";
import { Board } from "@pages/board";
import { BoardLayout } from "@pages/board/outlets/boardlayout";
import { FinancialReporting } from "@pages/board/outlets/financialReporting";
import { Requirements } from "@pages/board/outlets/boardlayout/Requirements";
import { dataRequirements } from "@pages/board/outlets/boardlayout/Requirements/config";
import { Approbals } from "@src/pages/board/outlets/financialReporting/approvals";

function BoardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Board />}>
        <Route path="/" element={<BoardLayout />} />
        <Route
          path="solicitud/:id"
          element={
            <FinancialReporting
              requirements={<Requirements data={dataRequirements} />}
              approvals={<Approbals />}
            />
          }
        />
      </Route>
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}

export { BoardRoutes };
