import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { QueryCtx, MutationCtx, query, mutation } from "./_generated/server";

// --- Public API ---

// Query: Find a couple by user ID (returns the couple if user is userA or userB)
export const findByUserId = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const asA = await ctx.db
      .query("couples")
      .withIndex("by_userA", (q) => q.eq("userA", userId))
      .first();
    if (asA) return asA;
    const asB = await ctx.db
      .query("couples")
      .withIndex("by_userB", (q) => q.eq("userB", userId))
      .first();
    return asB;
  },
});

// Query: List all couples (for admin/debug, not exposed to client directly)
export const listAllCouples = query({
  args: {},
  handler: async (ctx: QueryCtx) => {
    // If this is ever exposed, add access control!
    return await ctx.db.query("couples").collect();
  },
});

// Mutation: Create a couple (public, with access control)
export const createCouple = mutation({
  args: v.object({
    userA: v.id("users"),
    userB: v.id("users"),
  }),
  handler: async (
    ctx: MutationCtx,
    args: { userA: Id<"users">; userB: Id<"users"> },
  ) => {
    const identity = await ctx.auth.getUserIdentity();
    if (
      !identity ||
      (identity.subject !== args.userA && identity.subject !== args.userB)
    ) {
      throw new Error("Unauthorized");
    }
    // Prevent duplicate couples (optional: can be enhanced)
    const existing = await ctx.db
      .query("couples")
      .withIndex("by_userA", (q) => q.eq("userA", args.userA))
      .first();
    if (existing && existing.userB === args.userB) {
      throw new Error("Couple already exists");
    }
    return await ctx.db.insert("couples", {
      userA: args.userA,
      userB: args.userB,
    });
  },
});
