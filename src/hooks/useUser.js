import { useAuth } from "../contexts/AuthContext";

/**
 * Custom hook to access user data and related functions
 * Provides a clean interface for components to consume user data
 * @returns {object} User data and related functions
 */
export function useUser() {
  const context = useAuth();

  if (!context) {
    throw new Error("useUser must be used within an AuthProvider");
  }

  const {
    user,
    userData,
    loading,
    userDataLoading,
    userDataError,
    showUserDataModal,
    fetchUserData,
    updateUserData,
  } = context;

  return {
    // Firebase user object
    user,
    // Complete user data from database
    userData,
    // Loading states
    loading: loading || userDataLoading,
    authLoading: loading,
    userDataLoading,
    // Error state
    error: userDataError,
    // Modal state
    showUserDataModal,
    // Functions
    refetchUserData: fetchUserData,
    updateUserData,
  };
}
