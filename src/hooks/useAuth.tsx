
import { useState, useEffect, createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  onAuthStateChanged, 
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
  User
} from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

// Firebase config
const firebaseConfig = {
  // Your Firebase config would go here
  // These would typically come from environment variables
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase (lazy initialization)
let app: any;
let auth: any;

const initializeFirebase = () => {
  if (!app) {
    app = initializeApp(firebaseConfig);
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
  signOut: async () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast({
        title: "Sign in failed",
        description: "Could not sign in with Google",
        variant: "destructive"
      });
    }
  };

  const signInWithMicrosoft = async () => {
    const { auth } = initializeFirebase();
    const provider = new OAuthProvider('microsoft.com');
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Microsoft:", error);
      toast({
        title: "Sign in failed",
        description: "Could not sign in with Microsoft",
        variant: "destructive"
      });
    }
  };

  const signInWithApple = async () => {
    const { auth } = initializeFirebase();
    const provider = new OAuthProvider('apple.com');
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Apple:", error);
      toast({
        title: "Sign in failed",
        description: "Could not sign in with Apple",
        variant: "destructive"
      });
    }
  };

  const signOut = async () => {
    const { auth } = initializeFirebase();
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign out failed",
        description: "Could not sign out",
        variant: "destructive"
      });
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithMicrosoft,
    signInWithApple,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
