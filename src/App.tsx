import { useContext } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FlagProvider } from "@inubekit/flag";

import { AppContext, AppContextProvider } from "@context/AppContext";
import { usePortalLogic } from "@hooks/usePortalRedirect";

import { ErrorPage } from "@components/layout/ErrorPage";
import { AppPage } from "@components/layout/AppPage";

import { GlobalStyles } from "@styles/global";
import { Login } from "@pages/login";
import { ErrorNotClient } from "@pages/login/errors/ErrorNotClient";

import { enviroment } from "@config/environment";
import { initializeDataDB } from "@mocks/utils/initializeDataDB";

import { LoginRoutes } from "@routes/login";
import { BoardRoutes } from "@routes/board";
import { AddProspectRoutes } from "@routes/addProspect";
import { EditProspectRoutes } from "@routes/editProspect";
import { FilingApplicationRoutes } from "@routes/filingApplication";

function LogOut() {
  localStorage.clear();
  const { logout } = useAuth0();
  logout({ logoutParams: { returnTo: enviroment.GOOGLE_REDIRECT_URI } });
  return <AppPage />;
}

function FirstPage() {
  const { businessUnitSigla } = useContext(AppContext);
  initializeDataDB(businessUnitSigla);
  return businessUnitSigla.length === 0 ? <Login /> : <BoardRoutes />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="*" element={<FirstPage />} errorElement={<ErrorPage />} />
      <Route path="login/*" element={<LoginRoutes />} />
      <Route path="/*" element={<BoardRoutes />} />
      <Route path="add-prospect/*" element={<AddProspectRoutes />} />
      <Route path="edit-prospect/*" element={<EditProspectRoutes />} />
      <Route
        path="filing-application/*"
        element={<FilingApplicationRoutes />}
      />
      <Route path="logout" element={<LogOut />} />
    </>
  )
);

function App() {
  const { hasError, isLoading, isAuthenticated, hasErrorNotClient } =
    usePortalLogic();

  if (isLoading) {
    return null;
  }

  if (hasError && !isAuthenticated) {
    return <ErrorPage />;
  }
  if (!hasErrorNotClient) {
    return <ErrorNotClient />;
  }
  if (!isAuthenticated) {
    console.log("Not authenticated");
    return null;
  }

  return (
    <AppContextProvider>
      <FlagProvider>
        <GlobalStyles />
        <RouterProvider router={router} />
      </FlagProvider>
    </AppContextProvider>
  );
}

export default App;
