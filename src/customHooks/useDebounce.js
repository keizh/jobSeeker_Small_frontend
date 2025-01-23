/* eslint-disable no-unused-vars */
import { useState, useEffect, useDebugValue } from "react";

export default function useDebounce(value, callback, delay) {
  const [DV, setDV] = useState(value);

  useEffect(() => {
    let timer;
    if (value != "" || value != DV) {
      timer = setTimeout(() => {
        setDV(value);
        callback?.(value);
      }, delay);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return DV;
}
