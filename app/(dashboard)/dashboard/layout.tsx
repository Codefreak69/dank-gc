import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { FC, ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Icon, Icons } from "@/components/Icons";
import Image from "next/image";
import SignOutButton from "@/components/SignOutButton";
import FriendRequestsSIdebarOptions from "@/components/FriendRequestsSIdebarOptions";
import { fetchRedis } from "@/helpers/redis";
import { getFriendsByUserId } from "@/helpers/get-friends-by-user-id";
import SideBarChatList from "@/components/SidebarChatList";
import MobileChatLayout from "@/components/MobileChatLayout";
import { SideBarOption } from "@/types/typings";

interface LayoutProps {
  children: ReactNode;
}

const SideBarOptions: SideBarOption[] = [
  {
    id: 1,
    name: "Add Friend",
    href: "/dashboard/add",
    Icon: "UserPlus",
  },
];

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);

  if (!session) notFound();

  // getting unseen Requestcount

  const friends = await getFriendsByUserId(session.user.id);

  const unseenRequestCount = (
    (await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`
    )) as User[]
  ).length;

  return (
    <div className="w-full flex h-screen">
      <div className="md:hidden ">
        <MobileChatLayout
          friends={friends}
          session={session}
          sidebarOptions={SideBarOptions}
          unseenRequestCount={unseenRequestCount}
        />
      </div>

      <div className="md:flex hidden h-full w-ful max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-primary text-primary-foreground px-6">
        <Link href="/dashboard" className="flex h-16 shrink-0 items-center">
          <Icons.Logo className="h-8 w-auto text-purple-600" />
        </Link>
        {friends.length > 0 ? (
          <div className="text-sx font-semibold leading-6 text-purple-300  border-b border-purple-800 rounded-sm px-2 p-1">
            Your Chats
          </div>
        ) : null}
        <nav className="flex flex-1 flex-col ">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <SideBarChatList friends={friends} sessionId={session.user.id} />
            </li>

            <li>
              <div className="text-sx font-semibold leading-6 text-purple-300  border-b border-purple-800 rounded-sm px-2 p-1 ">
                Overview
              </div>
              <ul role="list" className="-mx-2 mt-2  space-y-1 ">
                {SideBarOptions.map((option) => {
                  const Icon = Icons[option.Icon];
                  return (
                    <li key={option.id}>
                      <Link
                        href={option.href}
                        className="text-purple-600 hover:text-purple-500 hover:bg-purple-300 group flex gap-3 p-2 rounded-md text-sm font-semibold leading-6 transition-colors"
                      >
                        <span className="text-purple-200 border-purple-200 group-hover:border-purple-600 group-hover:text-purple-500 flex h-6 w-6 shrink-0 items-center justify-center rounded-full  text-[0.625rem] font-medium bg-purple-800">
                          <Icon className="h-4 w-4 " />
                        </span>

                        <span className="truncate">{option.name}</span>
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <FriendRequestsSIdebarOptions
                    sessionId={session.user.id}
                    initialUnseenRequestCounts={unseenRequestCount}
                  />
                </li>
              </ul>
            </li>

            <li className="-ml-10 mt-auto flex items-center ">
              <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                <div className="relative h-8 w-8 bg-primary">
                  <Image
                    fill
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    src={session.user.image || ""}
                    alt="Your profile picture"
                  />
                </div>

                <span className="sr-only">Your profile</span>
                <div className="flex flex-col">
                  <span aria-hidden="true" className="text-white">
                    {session.user.name}
                  </span>
                  <span className="text-xs text-zinc-400" aria-hidden="true">
                    {session.user.email}
                  </span>
                </div>
              </div>

              <SignOutButton className="h-full aspect-square" />
            </li>
          </ul>
        </nav>
      </div>
      <aside className="mt-12 w-full md:mt-0">{children}</aside>
    </div>
  );
};

export default Layout;
