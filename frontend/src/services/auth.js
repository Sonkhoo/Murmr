// src/services/auth.js
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signInAnonymously } from "firebase/auth";

/** Sign in with Google */
export const signInWithGoogle = async () => {
  try {
    // Sign out any existing user first to ensure a fresh sign-in
    await auth.signOut();
    
    // Force a redirect to ensure account selection
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    console.log("Signed in user:", user.uid);
    return user;
  } catch (err) {
    console.error("Google sign-in error:", err);
    // Clear any auth state on error
    await auth.signOut();
    throw err;
  }
};

/** Create an anonymous profile */
export const createAnonProfile = async () => {
  try {
    const result = await signInAnonymously(auth);
    const user = result.user;
    console.log("Anonymous user:", user.uid);
    return user;
  } catch (err) {
    console.error("Anonymous sign-in error:", err);
    throw err;
  }
};
