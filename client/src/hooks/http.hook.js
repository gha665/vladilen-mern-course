import { useState, useCallback } from "react";
// import { get } from "mongoose";

// =====Using hooks
export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        // if(body) (
        //     body = JSON.stringify(body)
        //     headers["Content-Type"] = "application/json"
        // )

        const response = await fetch(url, { method, body, headers });
        const data = await response.json(); // <====parses object

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        setLoading(false);

        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );

  const clearError = () => setError(null);

  return { loading, request, error, clearError };
};