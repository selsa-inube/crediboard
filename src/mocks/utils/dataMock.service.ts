import localforage from "localforage";

function buildData<T>(data: T[]) {
  const dataMock = data.map((optionData) => {
    const newObj = Object.assign({ id: crypto.randomUUID() }, optionData);
    return newObj;
  });
  return dataMock;
}

export async function intializedData<T>(option: string, data: T | T[]) {
  try {
    let dataMock;
    if (Array.isArray(data)) {
      dataMock = buildData(data);
    } else {
      dataMock = data;
    }
    await localforage.setItem(option, dataMock);
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
