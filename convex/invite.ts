import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

// Query: Check if a user is in a couple/connection
export const getConnectionForUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    // Check if user is userA or userB in any couple
    const asA = await ctx.db
      .query("couples")
      .withIndex("by_userA", (q) => q.eq("userA", args.userId))
      .first();
    if (asA) return asA;
    const asB = await ctx.db
      .query("couples")
      .withIndex("by_userB", (q) => q.eq("userB", args.userId))
      .first();
    return asB;
  },
});

// Helper to generate a random 6-character alphanumeric code
function generateInviteCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0, O, 1, I for clarity
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Mutation: Generate a new invite code for a user
export const generateInviteCodeForUser = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    let code: string | null = null;
    let attempts = 0;
    const maxAttempts = 5;
    while (attempts < maxAttempts) {
      const candidate = generateInviteCode();
      const existing = await ctx.db
        .query("inviteCodes")
        .withIndex("by_code", (q) => q.eq("code", candidate))
        .first();
      if (!existing) {
        code = candidate;
        break;
      }
      attempts++;
    }
    if (!code) {
      throw new Error(
        "Failed to generate a unique invite code. Please try again.",
      );
    }
    await ctx.db.insert("inviteCodes", {
      code,
      ownerUserId: args.userId,
      isActive: true,
    });
    return code;
  },
});

// Query: Get active invite code for a user
export const getActiveInviteCode = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    // Use the index for efficient lookup
    const codes = await ctx.db
      .query("inviteCodes")
      .withIndex("by_ownerUserId", (q) => q.eq("ownerUserId", args.userId))
      .collect();
    return codes.find((c) => c.isActive && !c.redeemedByUserId);
  },
});

// Mutation: Redeem an invite code
export const redeemInviteCode = mutation({
  args: { code: v.string(), userId: v.id("users") },
  handler: async (ctx, args) => {
    const codeEntry = await ctx.db
      .query("inviteCodes")
      .withIndex("by_code", (q) => q.eq("code", args.code))
      .first();
    if (!codeEntry || !codeEntry.isActive || codeEntry.redeemedByUserId) {
      throw new Error("Invalid or already used invite code.");
    }
    // Mark code as redeemed
    await ctx.db.patch(codeEntry._id, {
      redeemedByUserId: args.userId,
      isActive: false,
    });
    // Create couple relationship
    await ctx.db.insert("couples", {
      userA: codeEntry.ownerUserId,
      userB: args.userId,
    });
    return true;
  },
});
