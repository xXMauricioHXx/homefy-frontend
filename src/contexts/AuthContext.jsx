import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { auth } from "../firebase";
import {
  fetchUserById,
  saveUserData as saveUserDataApi,
  updateUserData as updateUserDataApi,
} from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [userDataError, setUserDataError] = useState(null);
  const [showUserDataModal, setShowUserDataModal] = useState(false);

  // Fetch user data from API
  const fetchUserData = async (forceRefetch = false) => {
    if (!user) return;

    // Don't refetch if we already have data unless forced
    if (userData && !forceRefetch) return;

    setUserDataLoading(true);
    setUserDataError(null);

    try {
      const token = await user.getIdToken();
      const data = await fetchUserById(token);

      if (data) {
        setUserData(data);
        setShowUserDataModal(false);
      } else {
        // User data not found, show modal
        setShowUserDataModal(true);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserDataError(error.message);
      // If there's an error, we might still want to show the modal
      // to allow the user to enter their data
      setShowUserDataModal(true);
    } finally {
      setUserDataLoading(false);
    }
  };

  // Save or update user data
  const updateUserData = async (newUserData) => {
    if (!user) return;

    setUserDataLoading(true);
    setUserDataError(null);

    try {
      const token = await user.getIdToken();

      // Use create API if user data doesn't exist, update API if it does
      const apiCall = userData
        ? updateUserDataApi(newUserData, token)
        : saveUserDataApi(newUserData, token);

      const savedData = await apiCall;

      setUserData(savedData);
      setShowUserDataModal(false);

      return savedData;
    } catch (error) {
      console.error("Error saving user data:", error);
      setUserDataError(error.message);
      throw error;
    } finally {
      setUserDataLoading(false);
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // Reset user data when user changes
      if (!currentUser) {
        setUserData(null);
        setShowUserDataModal(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch user data when user is authenticated
  useEffect(() => {
    if (user && !loading) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        userData,
        userDataLoading,
        userDataError,
        showUserDataModal,
        fetchUserData,
        updateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
