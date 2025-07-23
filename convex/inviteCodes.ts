import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";

// --- Private Helpers ---

// Generate a random 6-character alphanumeric code (not exported)
function generateInviteCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0, O, 1, I for clarity
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// --- Public API ---

// Mutation: Generate a new invite code for a user
export const generateInviteCodeForUser = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    // Access control: only allow the user to generate their own code
    const identity = await ctx.auth.getUserIdentity();
    console.log("Generating invite code for user:", identity);
    if (!identity) {
      throw new Error("Unauthorized");
    }
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
      ownerUserId: userId,
      isActive: true,
    });
    return code;
  },
});

// Query: Get active invite code for a user
export const getActiveInviteCode = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    // Use the index for efficient lookup
    const codes = await ctx.db
      .query("inviteCodes")
      .withIndex("by_ownerUserId", (q) => q.eq("ownerUserId", userId))
      .collect();
    return codes.find((c) => c.isActive && !c.redeemedByUserId);
  },
});

// Mutation: Redeem an invite code
export const redeemInviteCode = mutation({
  args: { code: v.string(), userId: v.id("users") },
  handler: async (ctx, { code, userId }) => {
    // Access control: only allow the user to redeem for themselves
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || identity.subject !== userId) {
      throw new Error("Unauthorized");
    }
    const codeEntry = await ctx.db
      .query("inviteCodes")
      .withIndex("by_code", (q) => q.eq("code", code))
      .first();
    if (!codeEntry || !codeEntry.isActive || codeEntry.redeemedByUserId) {
      throw new Error("Invalid or already used invite code.");
    }
    // Mark code as redeemed
    await ctx.db.patch(codeEntry._id, {
      redeemedByUserId: userId,
      isActive: false,
    });
    // Create couple relationship using couples.createCouple mutation
    await ctx.runMutation(api.couples.createCouple, {
      userA: codeEntry.ownerUserId,
      userB: userId,
    });
    return true;
  },
});
