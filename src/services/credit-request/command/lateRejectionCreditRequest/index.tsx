import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";

export const lateRejectionOfACreditRequest = async (
  creditRequestId: string | undefined,
  userAccount: string,
  businessUnitPublicCode: string,
  humanDecision: string,
  justificacion: string
) => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "PATCH",
        headers: {
          "X-Action": "LateRejectionOfACreditRequest",
          "X-Business-Unit": businessUnitPublicCode,
          "X-User-Name": userAccount,
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ creditRequestId, humanDecision, justificacion }),
        signal: controller.signal,
      };

      const res = await fetch(
        `${environment.ICOREBANKING_API_URL_PERSISTENCE}/credit-requests`,
        options
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return res;
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al rechazar la solicitud de crédito",
          status: res.status,
          data,
        };
      }
      return { ...data, statusServices: res.status };
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudo rechazar la solicitud de crédito."
        );
      }
    }
  }
  throw new Error("No se pudo completar la solicitud.");
};
