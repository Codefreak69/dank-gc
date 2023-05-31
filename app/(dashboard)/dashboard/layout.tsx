import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { FC, ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Icon, Icons } from "@/components/Icons";
import Image from "next/image";
import SignOutButton from "@/components/SignOutButton";

interface LayoutProps {
  children: ReactNode;
}
interface SideBarOption {
  id: number;
  name: string;
  href: string;
  Icon: Icon;
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

  return (
    <div className="w-full flex h-screen">
      <div className="flex h-full w-ful max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-primary text-primary-foreground px-6">
        <Link href="/dashboard" className="flex h-16 shrink-0 items-center">
          <Icons.Logo className="h-8 w-auto text-purple-600" />
        </Link>
        <div className="text-sx font-semibold leading-6 text-purple-300  border-b border-purple-800 rounded-sm px-2 p-1">
          Your Chats
        </div>
        <nav className="flex flex-1 flex-col ">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>{/* chats that this user has */}</li>

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
              </ul>
            </li>

            <li className="-mx-6 mt-auto flex items-center">
              <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-small font-semibold leading-6 text-purple-800  ">
                <div className="relative h-8 w-8 bg-purple-50 rounded-full">
                  <Image
                    fill
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    src={session.user.image || ""}
                    alt="profile picture"
                  />
                </div>
                <span className="sr-only">Your Profile</span>
                <div className="flex flex-col">
                  <span aria-hidden="true">{session.user.name}</span>
                  <span className="text-xs  text-purple-400" aria-hidden="true">
                    {session.user.email}
                  </span>
                </div>
              </div>
              <SignOutButton className="h-full aspect-square" />
            </li>
          </ul>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default Layout;
