import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { apiV1 } from "../libs/axios";
import { AuthContext } from "./auth";

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // Set the Authorization header for future requests
          apiV1.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Verify the token by getting user profile
          const response = await apiV1.get("/users/profile");
          setUser(response.data);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        // Remove invalid token
        localStorage.removeItem("token");
        delete apiV1.defaults.headers.common["Authorization"];
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await apiV1.post("/users/auth", { email, password });
      const { token, ...userData } = response.data;

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Set the Authorization header for future requests
      apiV1.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Set user data
      setUser(userData);

      return { success: true, user: userData };
    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const response = await apiV1.post("/users/register", userData);
      const { token, ...userInfo } = response.data;

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Set the Authorization header for future requests
      apiV1.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Set user data
      setUser(userInfo);

      return { success: true, user: userInfo };
    } catch (error) {
      console.error("Registration failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      };
    }
  };

  // Logout function
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Remove Authorization header
    delete apiV1.defaults.headers.common["Authorization"];

    // Clear user data
    setUser(null);
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return user !== null;
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
