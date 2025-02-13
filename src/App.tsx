import { useContext } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { ErrorPage } from "@components/layout/ErrorPage";
import { LoginRoutes } from "./routes/login";
import { AppPage } from "./components/layout/AppPage";
import { GlobalStyles } from "./styles/global";
import { AppContext, AppContextProvider } from "./context/AppContext";

import { Login } from "./pages/login";
import { enviroment } from "./config/environment";
import { usePortalLogic } from "./hooks/usePortalRedirect";
import { BoardRoutes } from "@routes/board";
import { ErrorNotClient } from "@pages/login/errors/ErrorNotClient";
import { FlagProvider } from "@inubekit/flag";

function LogOut() {
  localStorage.clear();
  const { logout } = useAuth0();
  logout({ logoutParams: { returnTo: enviroment.REDIRECT_URI } });
  return <AppPage />;
}

function FirstPage() {
  const { businessUnitSigla } = useContext(AppContext);
  return businessUnitSigla.length === 0 ? <Login /> : <BoardRoutes />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="*" element={<FirstPage />} errorElement={<ErrorPage />} />
      <Route path="login/*" element={<LoginRoutes />} />
      <Route path="/*" element={<BoardRoutes />} />
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
    <FlagProvider>
      <AppContextProvider>
        <GlobalStyles />
        <RouterProvider router={router} />
      </AppContextProvider>
    </FlagProvider>
  );
}

export default App;
