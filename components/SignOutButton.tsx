"use client";
import { ButtonHTMLAttributes, FunctionComponent, useState } from "react";
import { Button } from "./ui/button";

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOutButton: FunctionComponent<SignOutButtonProps> = () => {
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  return <Button variant="ghost"></Button>;
};

export default SignOutButton;
