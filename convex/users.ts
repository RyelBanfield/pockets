import { UserJSON } from "@clerk/backend";
import { ConvexError, v, Validator } from "convex/values";

import {
  internalMutation,
  mutation,
  query,
  QueryCtx,
} from "./_generated/server";

export const current = query({
  handler: async (ctx) => await getCurrentUser(ctx),
});

export const upsertFromClerk = internalMutation({
  args: { data: v.any() as Validator<UserJSON> }, // no runtime validation, trust Clerk
  async handler(ctx, { data }) {
    const userAttributes = {
      clerkId: data.id,
      name: `${data.first_name} ${data.last_name}`,
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

export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  async handler(ctx, { clerkUserId }) {
    const user = await userByClerkId(ctx, clerkUserId);

    if (user !== null) {
      await ctx.db.delete(user._id);
    } else {
      console.warn(
        `Can't delete user, there is none for Clerk user ID: ${clerkUserId}`,
      );
    }
  },
});

export const updateAddress = mutation({
  args: { address: v.string() },
  handler: async (ctx, { address }) => {
    const user = await getCurrentUserOrThrow(ctx);

    // Validate address input
    if (!address.trim()) {
      throw new ConvexError({
        code: "INVALID_INPUT",
        message: "Address cannot be empty",
      });
    }

    if (address.length > 500) {
      throw new ConvexError({
        code: "INVALID_INPUT",
        message: "Address is too long (maximum 500 characters)",
      });
    }

    await ctx.db.patch(user._id, { address: address.trim() });
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
    .withIndex("byClerkId", (q) => q.eq("clerkId", clerkId))
    .unique();
};
