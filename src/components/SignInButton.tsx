
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import SignInModal from "./SignInModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

export const SignInButton = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const { user, signOut } = useAuth();

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2" size="sm">
            <User className="h-4 w-4" />
            <span>{user.displayName || user.email}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowSignInModal(true)}
      >
        Sign In
      </Button>

      <SignInModal
        open={showSignInModal}
        onOpenChange={setShowSignInModal}
      />
    </>
  );
};
