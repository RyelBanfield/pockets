"use client";

import { useConvexAuth, useQuery } from "convex/react";
import { useQuery as useConvexQuery } from "convex/react";
import { UserPlus } from "lucide-react";
import { redirect } from "next/navigation";

import { api } from "@/../convex/_generated/api";
import { api as convexApi } from "@/../convex/_generated/api";
import type { Id } from "@/../convex/_generated/dataModel";

import { PartnerConnection } from "../../components/PartnerConnection";
import { Pockets } from "../../components/Pockets";

type ConvexUser = { _id: Id<"users"> } | null | undefined;
type Connection = { userA: Id<"users">; userB: Id<"users"> } | null | undefined;

const getUserIds = (
  convexUser: ConvexUser,
  connection: Connection,
): Id<"users">[] => {
  if (!convexUser) return [];
  if (!connection) return [convexUser._id];
  const { userA, userB } = connection;
  return userA === convexUser._id ? [userA, userB] : [userB, userA];
};

const DashboardPage = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const convexUser = useQuery(api.users.current);
  const connection = useConvexQuery(
    convexApi.invite.getConnectionForUser,
    (convexUser?._id && { userId: convexUser._id }) || "skip",
  );

  if (isLoading || !convexUser) return <div>Loading...</div>;
  if (!isAuthenticated) redirect("/");

  const userIds = getUserIds(convexUser, connection);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-8 pb-8 md:pt-12 md:pb-12">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Dashboard
      </h1>
      <div className="flex flex-col gap-8">
        <PartnerConnection userId={convexUser._id} />
        {connection ? (
          <Pockets userIds={userIds} />
        ) : (
          <div className="animate-fade-in flex flex-col items-center justify-center gap-4 rounded-xl border border-yellow-300 bg-yellow-50 p-8 text-yellow-900 shadow-sm">
            <UserPlus className="h-10 w-10 text-yellow-400" strokeWidth={2} />
            <div className="text-lg font-semibold">
              No partner connection yet
            </div>
            <div className="max-w-xs text-center text-sm text-yellow-800">
              To create and share pockets, connect with your partner first.
              <br />
              Send or accept an invite to get started!
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardPage;
