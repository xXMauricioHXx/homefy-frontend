import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, updateProfile } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";

// Firebase configuration from environment variables
// See .env.example for required variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const environment = import.meta.env.VITE_ENVIRONMENT;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

/**
 * Upload profile picture to Firebase Storage
 * @param {File} file - The image file to upload
 * @param {string} userId - The user's ID
 * @returns {Promise<string>} The download URL of the uploaded image
 */
export async function uploadProfilePicture(file, userId) {
  if (!file) {
    throw new Error("No file provided");
  }

  // Validate file type
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!validTypes.includes(file.type)) {
    throw new Error(
      "Invalid file type. Please upload a JPG, PNG, or WebP image.",
    );
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    throw new Error(
      "File size too large. Please upload an image smaller than 5MB.",
    );
  }
  const suffix = environment === "production" ? "" : "-dev";

  // Delete existing profile pictures for this user
  try {
    const userProfilePicturesRef = ref(
      storage,
      `profile-pictures${suffix}/${userId}`,
    );
    const existingFiles = await listAll(userProfilePicturesRef);

    // Delete all existing files in the user's profile pictures folder
    const deletePromises = existingFiles.items.map((fileRef) =>
      deleteObject(fileRef),
    );

    if (deletePromises.length > 0) {
      await Promise.all(deletePromises);
      console.log(
        `Deleted ${deletePromises.length} existing profile picture(s) for user ${userId}`,
      );
    }
  } catch (error) {
    // If the folder doesn't exist or there's an error, log it but continue with upload
    console.warn("Error deleting existing profile pictures:", error);
  }

  // Create a reference to the storage location
  const timestamp = Date.now();
  const fileExtension = file.name.split(".").pop();
  const storageRef = ref(
    storage,
    `profile-pictures${suffix}/${userId}/${timestamp}.${fileExtension}`,
  );

  // Upload the file
  const snapshot = await uploadBytes(storageRef, file);

  // Get the download URL
  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
}

/**
 * Update user's photoUrl in Firebase Auth
 * @param {Object} user - The Firebase user object
 * @param {string} photoUrl - The new photo URL
 * @returns {Promise<void>}
 */
export async function updateUserPhotoUrl(user, photoUrl) {
  if (!user) {
    throw new Error("No user provided");
  }

  await updateProfile(user, {
    photoUrl,
  });
}

export default app;
