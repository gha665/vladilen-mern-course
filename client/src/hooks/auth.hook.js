import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // ============================================================
  //     LOGIN
  // ============================================================
  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    // =========== Adds state to base browser API
    localStorage.setItem(storageName, JSON.stringify({ 
        userId: id, token: jwtToken
    }));
  }, []);

  // ============================================================
  //     LOGOUT
  // ============================================================
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  // ================= Records data from localStorage to local state ([token, setToken] = useState())
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login]);

  return { login, logout, token, userId };
};
