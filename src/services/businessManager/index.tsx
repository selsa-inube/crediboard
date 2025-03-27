import { environment } from "@config/environment";

import { IBusinessManagers } from "./types";
import { mapResendApiToEntity } from "./mappers";

const getBusinessManagers = async (
  businessManagerId: string
): Promise<IBusinessManagers> => {
  const requestUrl = `${environment.IVITE_ISAAS_QUERY_PROCESS_SERVICE}/business-managers/${businessManagerId}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "X-Action": "SearchByIdBusinessManager",
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const res = await fetch(requestUrl, options);
    if (res.status === 204) {
      return {} as IBusinessManagers;
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Error al obtener los datos: ${res.status}`);
    }

    return mapResendApiToEntity(data);
  } catch (error) {
    console.error(error);
  }

  return {} as IBusinessManagers;
};

export { getBusinessManagers };
