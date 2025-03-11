import { enviroment } from "@config/environment";

import { ICustomer } from "./types";
import { mapStaffToEntity } from "./mapper";

const getCustomer = async (
): Promise<ICustomer[]> => {
  const requestUrl = `${enviroment.VITE_ICLIENT_QUERY_PROCESS_SERVICE}/customers`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "X-Action": "SearchAllCustomerCatalog",
        "X-Business-Unit": "fondecom",
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const res = await fetch(requestUrl, options);
    if (res.status === 204) {
      return [];
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Error al obtener los datos: ${res.status}`);
    }

    return data.map((item: Record<string, string | number | object>) =>
        mapStaffToEntity(item)
    );
  } catch (error) {
    console.error(error);
  }

  return [];
};

export { getCustomer };