"use client";
import { FunctionComponent, useState } from "react";
import { Button } from "./ui/button";
import { addFriendValidator } from "@/lib/validations/add-friend";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddFriendButtonProps {}
// change the default type of a generic using Zod's infer
type FormData = z.infer<typeof addFriendValidator>;

const AddFriendButton: FunctionComponent<AddFriendButtonProps> = () => {
  const [showSuccessState, setShowSuccessState] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });

  const addFriend = async (email: string) => {
    try {
      const validatedEmail = addFriendValidator.parse({ email });

      await axios.post("/api/friends/add", {
        email: validatedEmail,
      });
      setShowSuccessState(true);
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError("email", {
          message: e.message,
        });

        return;
      }
      if (e instanceof AxiosError) {
        setError("email", {
          message: e.response?.data,
        });
        return;
      }
      setError("email", {
        message: "Something went wrong",
      });
    }
  };

  const onSubmit = (data: FormData) => {
    addFriend(data.email);
  };

  return (
    <form className="max-w-sm" onSubmit={handleSubmit(onSubmit)}>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Add Friend by Email
      </label>
      <div className="mt-2 flex gap-4">
        <input
          type="text"
          {...register("email")}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
          placeholder="you@example.com"
        />
        <Button>Add</Button>
      </div>
      <p className="mt-1 text-sm text-red-600">{errors.email?.message}</p>
      {showSuccessState ? (
        <p className="mt-1 text-sm text-green-600">One Nigga Added!</p>
      ) : null}
    </form>
  );
};

export default AddFriendButton;