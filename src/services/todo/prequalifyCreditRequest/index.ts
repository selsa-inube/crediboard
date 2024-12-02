import {
  enviroment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { IPrequalifyCreditRequest } from "@services/types";

export const registerNewsPrequalify = async (
  prequalify: IPrequalifyCreditRequest
): Promise<void> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "PATCH",
        headers: {
          "X-Action": prequalify.xAction,
          "X-Business-Unit": enviroment.BUSINESS_UNIT,
          "X-User-Name": "Erg",
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(prequalify),
        signal: controller.signal,
      };

      const res = await fetch(
        `${enviroment.ICOREBANKING_API_URL_PERSISTENCE}/credit-requests`,
        options
      );
      console.log("respuesta----> ", { res });
      clearTimeout(timeoutId);

      if (res.status === 204) {
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message:
            "Error al actualizar la calificación de la solicitud de crédito",
          status: res.status,
          data,
        };
      }

      return;
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudo registrar la calificación en la solicitud de crédito."
        );
      }
    }
  }
};
