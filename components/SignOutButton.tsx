"use client";
import { ButtonHTMLAttributes, FunctionComponent, useState } from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { Loader2, LogOut } from "lucide-react";

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOutButton: FunctionComponent<SignOutButtonProps> = ({ ...props }) => {
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

  return (
    <Button
      variant="ghost"
      {...props}
      onClick={async () => {
        setIsSigningOut(true);
        try {
          await signOut();
        } catch (err) {
          toast.error("Failed to sign out");
        } finally {
          setIsSigningOut(false);
        }
      }}
    >
      {isSigningOut ? (
        <Loader2 className="animate-spin h-4  w-4" />
      ) : (
        <LogOut className="h-4 w-4" />
      )}
    </Button>
  );
};

export default SignOutButton;
