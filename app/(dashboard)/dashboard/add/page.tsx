import AddFriendButton from "@/components/AddFriendButton";
import React from "react";

const page = () => {
  return (
    <main className="pt-8 mx-auto py-8 md:py-6 flex items-center flex-col ">
      <h1 className="font-bold text-5xl mb-8 ">Add a Friend</h1>
      <AddFriendButton />
    </main>
  );
};

export default page;
