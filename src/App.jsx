import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { PdfCacheProvider } from "./contexts/PdfCacheContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import UserDataModal from "./components/UserDataModal";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SubscriptionPage from "./pages/SubscriptionPage";
import PDFPreviewPage from "./pages/PDFPreviewPage";
import PDFPreviewMobilePage from "./pages/PDFPreviewMobilePage";
import GalleryPage from "./pages/GalleryPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

function AppContent() {
  const { showUserDataModal } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscription"
          element={
            <ProtectedRoute>
              <SubscriptionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pdf-preview/:pdfId"
          element={
            <ProtectedRoute>
              <PDFPreviewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pdf-preview-mobile/:pdfId"
          element={
            <ProtectedRoute>
              <PDFPreviewMobilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gallery/:pdfId"
          element={
            <ProtectedRoute>
              <GalleryPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Global User Data Modal */}
      <UserDataModal isOpen={showUserDataModal} />

      {/* Toast Notifications */}
      <ToastContainer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <PdfCacheProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </PdfCacheProvider>
    </AuthProvider>
  );
}

export default App;
