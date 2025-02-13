import { AppContext } from "@context/AppContext";
import { validateBusinessUnities } from "@pages/login/utils";
import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventData, setBusinessUnitsToTheStaff } = useContext(AppContext);

  useEffect(() => {
    if (eventData.portal.publicCode) {
      validateBusinessUnities(
        eventData.portal.publicCode,
        eventData.user.userAccount
      ).then((data) => {
        setBusinessUnitsToTheStaff(data);
      });
    }
  }, [
    eventData.portal.publicCode,
    eventData.user.userAccount,
    setBusinessUnitsToTheStaff,
  ]);

  useEffect(() => {
    if (
      location.pathname === "/login" ||
      location.pathname === "/login/" ||
      location.pathname === "/"
    ) {
      navigate(`/login/${eventData.user.userAccount}/checking-credentials/`);
    }
  }, [location, navigate, eventData.user.userAccount]);

  return { eventData };
};

export { useLogin };
