import { Route, Routes } from "react-router-dom";

import { ItemNotFound } from "@components/layout/ItemNotFound";
import { requestNotFoundConfig } from "@pages/request/config/requestNotFound.config";
import { ErrorPage } from "@src/components/layout/ErrorPage";
import { Board } from "@src/pages/board";
import { BoardLayout } from "@pages/board/outlets/boardlayout";

function BoardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Board />}>
        <Route path="/" element={<BoardLayout />} />
        <Route
          path="/peticion/:solicitud_id"
          element={
            <ItemNotFound
              image={requestNotFoundConfig.image}
              title={requestNotFoundConfig.title}
              description={requestNotFoundConfig.description}
              buttonDescription={requestNotFoundConfig.buttonDescription}
              route={requestNotFoundConfig.route}
            />
          }
        />
      </Route>
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}

export { BoardRoutes };
