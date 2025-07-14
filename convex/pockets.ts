// Get all pockets for multiple users
export const getPocketsForUsers = query({
  args: { userIds: v.array(v.id("users")) },
  handler: async (ctx, { userIds }: { userIds: Id<"users">[] }) => {
    const allPockets = await ctx.db.query("pockets").collect();
    return allPockets.filter((pocket) =>
      pocket.userIds.some((id: Id<"users">) => userIds.includes(id)),
    );
  },
});
import { v } from "convex/values";

import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

// Argument validators
const pocketFields = {
  label: v.string(),
  description: v.optional(v.string()),
  target: v.optional(v.number()),
  value: v.number(),
  userIds: v.array(v.id("users")),
};

// Create a pocket
export const createPocket = mutation({
  args: pocketFields,
  handler: async (
    ctx,
    args: {
      label: string;
      description?: string;
      target?: number;
      value: number;
      userIds: Id<"users">[];
    },
  ) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Unauthorized");
    if (!args.userIds.includes(user.subject as Id<"users">)) {
      throw new Error("Creator must be in userIds");
    }
    return await ctx.db.insert("pockets", {
      ...args,
      createdBy: user.subject as Id<"users">,
    });
  },
});

// Get all pockets for a user
export const getPockets = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }: { userId: Id<"users"> }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Unauthorized");
    // Only allow if requesting own or partner's pockets
    // (Optional: add partner check here)
    // Fetch all pockets and filter in code for userId membership
    const allPockets = await ctx.db.query("pockets").collect();
    return allPockets.filter((pocket) => pocket.userIds.includes(userId));
  },
});

// Update a pocket
export const updatePocket = mutation({
  args: {
    pocketId: v.id("pockets"),
    update: v.object({
      label: v.optional(v.string()),
      description: v.optional(v.string()),
      target: v.optional(v.number()),
      value: v.optional(v.number()),
    }),
  },
  handler: async (
    ctx,
    {
      pocketId,
      update,
    }: {
      pocketId: Id<"pockets">;
      update: {
        label?: string;
        description?: string;
        target?: number;
        value?: number;
      };
    },
  ) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Unauthorized");
    const pocket = await ctx.db.get(pocketId);
    if (!pocket) throw new Error("Pocket not found");
    if (!pocket.userIds.includes(user.subject as Id<"users">)) {
      throw new Error("Unauthorized");
    }
    await ctx.db.patch(pocketId, update);
    return pocketId;
  },
});

// Delete a pocket
export const deletePocket = mutation({
  args: {
    pocketId: v.id("pockets"),
  },
  handler: async (ctx, { pocketId }: { pocketId: Id<"pockets"> }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Unauthorized");
    const pocket = await ctx.db.get(pocketId);
    if (!pocket) throw new Error("Pocket not found");
    if (!pocket.userIds.includes(user.subject as Id<"users">)) {
      throw new Error("Unauthorized");
    }
    await ctx.db.delete(pocketId);
    return pocketId;
  },
});
