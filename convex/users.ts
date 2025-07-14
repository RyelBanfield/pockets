import { UserJSON } from "@clerk/backend";
import { ConvexError, v, Validator } from "convex/values";

import { internalMutation, query, QueryCtx } from "./_generated/server";

export const current = query({
  handler: async (ctx) => await getCurrentUser(ctx),
});

export const upsertFromClerk = internalMutation({
  args: { data: v.any() as Validator<UserJSON> },
  async handler(ctx, { data }) {
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

export const getCurrentUser = async (ctx: QueryCtx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  return await userByClerkId(ctx, identity.subject);
};

const userByClerkId = async (ctx: QueryCtx, clerkId: string) => {
  return await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
    .unique();
};
