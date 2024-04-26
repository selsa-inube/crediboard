import localforage from "localforage";

export async function getAll(option: string) {
  await fakeNetwork();
  try {
    const optionsData = await localforage.getItem(option);

    if (!optionsData) throw new Error("No found");

    return optionsData;
  } catch (error) {
    return error;
  }
}
async function fakeNetwork() {
  return new Promise((res) => {
    setTimeout(res, Math.random() * 1000);
  });
}
