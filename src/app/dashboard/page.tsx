"use client";

import { useConvexAuth, useQuery } from "convex/react";
import { redirect } from "next/navigation";

import { api } from "@/../convex/_generated/api";

import { PartnerConnection } from "../../components/PartnerConnection";

const DashboardPage = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const convexUser = useQuery(api.users.current);

  if (isLoading || !convexUser) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    redirect("/");
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-8 pb-8 md:pt-12 md:pb-12">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Dashboard
      </h1>
      <div className="flex flex-col gap-8">
        <PartnerConnection userId={convexUser._id} />
      </div>
    </section>
  );
};

export default DashboardPage;
