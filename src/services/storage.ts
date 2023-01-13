import { User } from "../types";

const get = (name: string, parse?: boolean) => {
  try {
    const storageValue = localStorage.getItem(name);

    if (storageValue !== null) {
      if (parse) {
        const parsed = JSON.parse(storageValue);
        return parsed;
      }
      return storageValue;
    }
    return undefined;
  } catch (error: any) {
    console.warn("Error while retrieving data", error);
  }
  return undefined;
};

const set = (name: string, data: any, parse?: boolean) => {
  try {
    const value = parse ? JSON.stringify(data) : String(data);

    localStorage.setItem(name, value);
  } catch (error: any) {
    console.warn("Error while storing data:", error);
  }
};

const merge = <T>(name: string, data: T): T => {
  try {
    const oldData = get(name);

    if (oldData) {
      const parsed = JSON.parse(oldData);
      const merged = { ...parsed, ...data };
      set(name, merged);

      return merged;
    }

    return data;
  } catch (error: any) {
    console.warn("Error while merging data:", error);
  }
  return data;
};

const remove = (name: string) => {
  try {
    localStorage.removeItem(name);
  } catch (error: any) {
    console.warn("Error while removing data:", error);
  }
};

const clear = () => {
  try {
    localStorage.clear();
  } catch (error: any) {
    console.warn("Error while clearing data:", error);
  }
};

const getUser = () => {
  try {
    const user: User = get("@app:user", true);

    return user;
  } catch (error: any) {
    console.warn("Error while retrieving user:", error);
  }
};

const setUser = (data: User) => {
  try {
    set("@app:user", data, true);
  } catch (error: any) {
    console.warn("Error when setting user:", error);
  }
};

const StorageService = {
  get,
  set,
  merge,
  remove,
  clear,

  setUser,
  getUser,
};

export default StorageService;
