import { Route, Routes } from "react-router-dom";

import { ErrorPage } from "@components/layout/ErrorPage";
import { Board } from "@pages/board";
import { BoardLayout } from "@pages/board/outlets/boardlayout";
import { FinancialReporting } from "@pages/board/outlets/financialReporting";
import { Requirements } from "@pages/board/outlets/financialReporting/Requirements";
import { dataRequirements } from "@pages/board/outlets/financialReporting/Requirements/config";
import { PromissoryNotes } from "@pages/board/outlets/financialReporting/PromissoryNotes";
import { Postingvouchers } from "@pages/board/outlets/financialReporting/Postingvouchers";
import { Approvals } from "@pages/board/outlets/financialReporting/Approvals";
import { CreditProfileInfo } from "@pages/board/outlets/creditProfileInfo";
import { Management } from "@src/pages/board/outlets/financialReporting/management";

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
              promissoryNotes={<PromissoryNotes />}
              postingVouchers={<Postingvouchers />}
              approvals={<Approvals />}
              management={<Management />}
            />
          }
        />
        <Route
          path="solicitud/:id/perfil-crediticio"
          element={<CreditProfileInfo />}
        />
      </Route>
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}

export { BoardRoutes };
