import { useEffect, useState } from "react";

const useLocalStorage = (key, defaultValue = []) => {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);

    return jsonValue ? JSON.parse(jsonValue) : defaultValue;
  });

  useEffect(() => {
    if (typeof value === "undefined") {
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
    console.log("key:", key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
