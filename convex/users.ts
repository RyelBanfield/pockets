import { UserJSON } from "@clerk/backend";
import { ConvexError, v, Validator } from "convex/values";
import { internalMutation, query, QueryCtx } from "./_generated/server";

// --- Public Queries ---

// Query: Get the current user (returns null if not authenticated)
export const current = query({
  args: {},
  handler: async (ctx) => getCurrentUser(ctx),
});

// Query: Get a user by Clerk ID (for admin/debug, not exposed to client directly)
export const getByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => userByClerkId(ctx, clerkId),
});

// --- Internal Mutations ---

// Internal mutation: Upsert user from Clerk webhook
export const upsertFromClerk = internalMutation({
  args: { data: v.any() as Validator<UserJSON> },
  handler: async (ctx, { data }) => {
    const userAttributes = {
      clerkId: data.id,
      username: data.username || undefined,
      email: data.email_addresses[0].email_address,
    };
    const user = await userByClerkId(ctx, data.id);
    if (user === null) {
      await ctx.db.insert("users", userAttributes);
    } else {
      await ctx.db.patch(user._id, userAttributes);
    }
  },
});

// --- Private Helpers ---

// Throws if not authenticated
export const getCurrentUserOrThrow = async (ctx: QueryCtx) => {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) {
    throw new ConvexError({
      code: "USER_NOT_AUTHENTICATED",
      message: "User must be authenticated to perform this action",
    });
  }
  return userRecord;
};

// Get current user by Clerk identity
export const getCurrentUser = async (ctx: QueryCtx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  return userByClerkId(ctx, identity.subject);
};

// Lookup user by Clerk ID (exported helper)
export const userByClerkId = async (ctx: QueryCtx, clerkId: string) => {
  return await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
    .unique();
};
