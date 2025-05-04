import { useToast } from "@/hooks/use-toast";
import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  signOut as firebaseSignOut,
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
  type Auth as FirebaseAuth,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase (lazy initialization)
let app: FirebaseApp;
let auth: FirebaseAuth;

const initializeFirebase = () => {
  if (!app) {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  }
  return { app, auth };
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithMicrosoft: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signInWithMicrosoft: async () => {},
  signInWithApple: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const { auth } = initializeFirebase();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const { auth } = initializeFirebase();
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast({
        title: "Sign in failed",
        description: "Could not sign in with Google",
        variant: "destructive",
      });
    }
  };

  const signInWithMicrosoft = async () => {
    const { auth } = initializeFirebase();
    const provider = new OAuthProvider("microsoft.com");
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Microsoft:", error);
      toast({
        title: "Sign in failed",
        description: "Could not sign in with Microsoft",
        variant: "destructive",
      });
    }
  };

  const signInWithApple = async () => {
    const { auth } = initializeFirebase();
    const provider = new OAuthProvider("apple.com");
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Apple:", error);
      toast({
        title: "Sign in failed",
        description: "Could not sign in with Apple",
        variant: "destructive",
      });
    }
  };

  const signOut = async () => {
    const { auth } = initializeFirebase();
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign out failed",
        description: "Could not sign out",
        variant: "destructive",
      });
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithMicrosoft,
    signInWithApple,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
