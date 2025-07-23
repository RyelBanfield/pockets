import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

// Helper: Find Convex user by Clerk subject
// import type { QueryCtx } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

// Query: Get all pockets for multiple users (filter in code for array membership)
export const getPocketsForUsers = query({
  args: { userIds: v.array(v.id("users")) },
  handler: async (ctx, { userIds }) => {
    const allPockets: Doc<"pockets">[] = await ctx.db
      .query("pockets")
      .order("desc")
      .collect();
    return allPockets.filter((pocket) =>
      pocket.userIds.some((id) => userIds.includes(id)),
    );
  },
});

// Mutation: Create a pocket
export const createPocket = mutation({
  args: v.object({
    label: v.string(),
    description: v.optional(v.string()),
    target: v.optional(v.number()),
    value: v.optional(v.number()),
    userIds: v.array(v.id("users")),
  }),
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    // Ensure the creator is in the userIds array
    if (!args.userIds.some((id) => id === user._id)) {
      throw new Error("Creator must be in userIds");
    }
    return ctx.db.insert("pockets", {
      ...args,
      value: args.value ?? 0,
      createdBy: user._id,
    });
  },
});

// Query: Get all pockets for a user (filter in code for array membership)
export const getPocketsForUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    await getCurrentUserOrThrow(ctx);
    // Only allow if requesting own or partner's pockets (optional: add partner check)
    const allPockets: Doc<"pockets">[] = await ctx.db
      .query("pockets")
      .collect();
    return allPockets.filter((pocket) => pocket.userIds.includes(userId));
  },
});

// Mutation: Update a pocket
export const updatePocket = mutation({
  args: v.object({
    pocketId: v.id("pockets"),
    update: v.object({
      label: v.optional(v.string()),
      description: v.optional(v.string()),
      target: v.optional(v.number()),
      value: v.optional(v.number()),
    }),
  }),
  handler: async (ctx, { pocketId, update }) => {
    const user = await getCurrentUserOrThrow(ctx);
    const pocket = await ctx.db.get(pocketId);
    if (!pocket) throw new Error("Pocket not found");
    if (!pocket.userIds.includes(user._id)) {
      throw new Error("Unauthorized");
    }
    await ctx.db.patch(pocketId, update);
    return pocketId;
  },
});

// Mutation: Delete a pocket
export const deletePocket = mutation({
  args: v.object({
    pocketId: v.id("pockets"),
  }),
  handler: async (ctx, { pocketId }) => {
    const user = await getCurrentUserOrThrow(ctx);
    const pocket = await ctx.db.get(pocketId);
    if (!pocket) throw new Error("Pocket not found");
    if (!pocket.userIds.includes(user._id)) {
      throw new Error("Unauthorized");
    }
    await ctx.db.delete(pocketId);
    return pocketId;
  },
});
