import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {
    orgID: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const boards = ctx.db
      .query("boards")
      .withIndex("by_org", (q) => q.eq("orgID", args.orgID))
      .order("desc")
      .collect();

    return boards;
  },
});
