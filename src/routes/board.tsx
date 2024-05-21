import { Route, Routes } from "react-router-dom";

import { ErrorPage } from "@components/layout/ErrorPage";
import { Board } from "@pages/board";
import { BoardLayout } from "@pages/board/outlets/boardlayout";
import { FinancialReporting } from "@pages/board/outlets/financialReporting";
import { Requirements } from "@pages/board/outlets/boardlayout/Requirements";
import { dataRequirements } from "@pages/board/outlets/boardlayout/Requirements/config";
import { PromissoryNotes } from "@pages/board/outlets/boardlayout/PromissoryNotes";
import { Postingvouchers } from "@pages/board/outlets/boardlayout/Postingvouchers";
import { Approvals } from "@pages/board/outlets/financialReporting/Approvals";
import { ToDo } from "@pages/board/outlets/boardlayout/ToDo";
import { infoIcon } from "@pages/board/outlets/boardlayout/ToDo/config";
import { CreditProfileInfo } from "@src/pages/board/outlets/creditProfileInfo";

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
              toDo={<ToDo icon={infoIcon} />}
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
