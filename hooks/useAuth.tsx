import { useContext } from "react";
import { AuthContext } from "@/components/context/AuthProvider";

// 1️⃣ Define what the AuthContext should contain
export interface AuthContextType {
  user: any | null; // Replace `any` with your actual user type, e.g. Supabase's `User`
  loading: boolean;
}

// 2️⃣ Type-safe hook
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext) as AuthContextType | null;

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default useAuth;
