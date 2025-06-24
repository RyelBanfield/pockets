import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Define your application's database schema here
// For example, you might add tables for users, transactions, budgets, etc.
export default defineSchema({
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
});
