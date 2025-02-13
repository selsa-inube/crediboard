import { useState, useEffect, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { IStaffPortalByBusinessManager } from "@services/staffPortal/types";
import { IBusinessmanagers } from "@services/businessManager/types";
import { getStaffPortalByBusinessManager } from "@services/staffPortal";
import { getBusinessmanagers } from "@services/businessManager";
import { encrypt } from "@utils/encrypt/encrypt";

const usePortalLogic = () => {
  const [portalPublicCode, setPortalPublicCode] = useState<
    IStaffPortalByBusinessManager[]
  >([]);
  const [businessManagers, setBusinessManagers] = useState<IBusinessmanagers>(
    {} as IBusinessmanagers
  );
  const [hasError, setHasError] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);
  const [hasErrorNotClient, setHasErrorNotClient] = useState(false);
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  const validateConsultation = async () => {
    try {
      const StaffPortalData = await getStaffPortalByBusinessManager();
      setPortalPublicCode(StaffPortalData);
    } catch (error) {
      console.info(error);
      setHasError(true);
    }
  };

  useEffect(() => {
    validateConsultation();
  }, []);

  const portalCode = new URLSearchParams(window.location.search).get("portal");

  const portalPublicCodeFiltered = portalPublicCode.filter(
    (data) => data.staffPortalId === portalCode
  );

  const validateBusinessManagers = useCallback(async () => {
    const foundBusiness = portalPublicCodeFiltered.find(
      (bussines) => bussines
    )?.businessManagerId;

    if (!foundBusiness) {
      return setHasErrorNotClient(true);
    }

    if (portalPublicCodeFiltered.length > 0 && foundBusiness) {
      try {
        const newData = await getBusinessmanagers(foundBusiness);
        setBusinessManagers(newData);
      } catch (error) {
        console.info(error);
        setHasError(true);
      }
    } else {
      console.error();
    }
  }, [portalPublicCodeFiltered]);

  useEffect(() => {
    validateBusinessManagers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portalPublicCode]);

  const handleAuthentication = useCallback(() => {
    if (hasRedirected) return;

    if (portalPublicCode.length > 0) {
      if (
        portalPublicCodeFiltered.length > 0 &&
        businessManagers &&
        !isLoading &&
        !isAuthenticated
      ) {
        const encryptedParamValue = encrypt(portalCode!);
        localStorage.setItem("portalCode", encryptedParamValue);
        loginWithRedirect();
      } else if (isAuthenticated) {
        setHasRedirected(true);
      } else {
        setHasError(true);
      }
    } else {
      setHasError(true);
    }
  }, [
    portalPublicCode,
    portalPublicCodeFiltered,
    businessManagers,
    isLoading,
    isAuthenticated,
    hasRedirected,
    loginWithRedirect,
    portalCode,
  ]);

  useEffect(() => {
    handleAuthentication();
  }, [
    businessManagers,
    portalPublicCode,
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    hasRedirected,
    handleAuthentication,
  ]);

  return {
    portalPublicCode,
    businessManagers,
    hasError,
    isLoading,
    isAuthenticated,
    hasErrorNotClient,
  };
};

export { usePortalLogic };
