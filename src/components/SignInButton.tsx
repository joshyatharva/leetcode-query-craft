
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
import { useToast } from "@/hooks/use-toast";

export const SignInButton = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your account",
    });
  };

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
          <DropdownMenuItem onClick={handleSignOut}>
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
        onOpenChange={(open) => {
          setShowSignInModal(open);
          if (!open && user) {
            toast({
              title: "Signed in successfully",
              description: `Welcome ${user.displayName || user.email}!`,
            });
          }
        }}
      />
    </>
  );
};
