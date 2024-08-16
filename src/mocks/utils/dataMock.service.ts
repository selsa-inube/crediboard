import localforage from "localforage";

export async function intializedData<T>(option: string, data: T[]) {
  try {
    await localforage.setItem(option, data);
  } catch (error) {
    return error;
  }
}

export async function get<T = unknown>(option: string) {
  await fakeNetwork();
  try {
    const optionsData = await localforage.getItem(option);

    if (!optionsData) throw new Error("No found");

    return optionsData as T;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function getById(
  key: string,
  option: string,
  identifier: number | string
) {
  try {
    const optionsData = await get(option);

    if (Array.isArray(optionsData)) {
      const foundData = optionsData.find(
        (data) => data[key] === Number(identifier)
      );
      if (!foundData) throw new Error(`No find identifier ${identifier}`);
      return foundData;
    }
    throw new Error("data structure not valid, must be an object list");
  } catch (error) {
    return error;
  }
}

export const getDataById = async <T>(bd: string, key: string, id: string) => {
  try {
    const data = await get(bd);
    if (Array.isArray(data)) {
      return data.filter((dataFilter) => dataFilter[key] === id) as T;
    }
  } catch (e) {
    console.error(e);
  }
};

interface functionActiveById {
  key: string;
  nameDB: string;
  identifier: number | string;
  editData: { [key: string]: string };
}

export async function updateActive(props: functionActiveById) {
  const { key, nameDB, identifier, editData } = props;

  try {
    const data = await get(nameDB);
    if (Array.isArray(data)) {
      const indexData = data.findIndex((item) => item[key] === identifier);

      for (const field in editData) {
        data[indexData][field] = editData[field];
      }

      await localforage.setItem(nameDB, data);
    } else {
      throw new Error("data structure not valid, must be an object list");
    }
  } catch (error) {
    return error;
  }
}

async function fakeNetwork() {
  return new Promise((res) => {
    setTimeout(res, 0);
  });
}

export async function addItem<T>(nameDB: string, newItem: T) {
  try {
    const data = await localforage.getItem(nameDB);

    let updatedData;
    if (Array.isArray(data)) {
      updatedData = [...data, newItem];
    } else {
      updatedData = [newItem];
    }

    await intializedData(nameDB, updatedData);

    console.log("Item added successfully");
  } catch (error) {
    console.error("Failed to add item:", error);
  }
}
