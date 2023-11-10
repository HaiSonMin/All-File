import { useState, useEffect } from "react";

export default function useLocalStorageState(initialState, key) {
  // Initialize in the first time
  const [value, setValue] = useState(function () {
    // Get value form local storage, if value === null => value = initialState
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
