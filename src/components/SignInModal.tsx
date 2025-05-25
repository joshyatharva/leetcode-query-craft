import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface TooltipCustomProps {
  content: string;
  children?: React.ReactNode;
}

const TooltipCustom = ({ content, children }: TooltipCustomProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>{children}</div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface SignInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SignInModal = ({ open, onOpenChange }: SignInModalProps) => {
  const { signInWithGoogle, signInWithMicrosoft, signInWithApple } = useAuth();

  const handleSignInWithGoogle = async () => {
    await signInWithGoogle();
    onOpenChange(false);
  };

  const handleSignInWithMicrosoft = async () => {
    await signInWithMicrosoft();
    onOpenChange(false);
  };

  const handleSignInWithApple = async () => {
    await signInWithApple();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            Sign in to save your settings and preferences
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <Button
            variant="outline"
            onClick={handleSignInWithGoogle}
            className="flex items-center gap-2 w-full justify-center"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </Button>

          <TooltipCustom content="Coming soon!">
            <Button
              variant="outline"
              onClick={handleSignInWithMicrosoft}
              className="flex items-center gap-2 w-full justify-center"
              disabled
            >
              <svg className="h-5 w-5" viewBox="0 0 23 23">
                <path fill="#f3f3f3" d="M0 0h23v23H0z" />
                <path fill="#f35325" d="M1 1h10v10H1z" />
                <path fill="#81bc06" d="M12 1h10v10H12z" />
                <path fill="#05a6f0" d="M1 12h10v10H1z" />
                <path fill="#ffba08" d="M12 12h10v10H12z" />
              </svg>
              Sign in with Microsoft
            </Button>
          </TooltipCustom>
          <TooltipCustom content="Coming soon!">
            <Button
              variant="outline"
              onClick={handleSignInWithApple}
              className="flex items-center gap-2 w-full justify-center"
              disabled
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a9.91 9.91 0 0 1 3 .46 5.37 5.37 0 0 1 2.54 2.1 5.24 5.24 0 0 1 .8 2.81 5.92 5.92 0 0 1-1.14 3.31 6.25 6.25 0 0 1-2.66 2.1c-.1.05-.11.1-.01.14a6.32 6.32 0 0 1 2.74 2.36A6.25 6.25 0 0 1 18 17.28a5.74 5.74 0 0 1-.77 2.85 5.9 5.9 0 0 1-2 2.07A9.13 9.13 0 0 1 12 23a8.72 8.72 0 0 1-3.15-.58 10.2 10.2 0 0 1-4.64-3.34 9 9 0 0 1-2-5.62A8.89 8.89 0 0 1 4.37 7.3 9.18 9.18 0 0 1 12 2z" />
              </svg>
              Sign in with Apple
            </Button>
          </TooltipCustom>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
