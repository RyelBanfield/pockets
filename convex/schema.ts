import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    username: v.optional(v.string()),
    email: v.string(),
  }).index("by_clerk_id", ["clerkId"]),
  inviteCodes: defineTable({
    code: v.string(),
    ownerUserId: v.id("users"),
    redeemedByUserId: v.optional(v.id("users")),
    isActive: v.boolean(),
  })
    .index("by_code", ["code"])
    .index("by_ownerUserId", ["ownerUserId"]),
  couples: defineTable({
    userA: v.id("users"),
    userB: v.id("users"),
  })
    .index("by_userA", ["userA"])
    .index("by_userB", ["userB"]),

  pockets: defineTable({
    label: v.string(),
    description: v.optional(v.string()),
    target: v.optional(v.number()),
    value: v.number(),
    userIds: v.array(v.id("users")), // Both partners' user IDs
    createdBy: v.id("users"),
  }).index("by_userIds", ["userIds"]),
});
