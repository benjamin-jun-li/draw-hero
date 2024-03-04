import { v } from "convex/values";
import { query } from "./_generated/server";
import { favorite } from "./board";

export const get = query({
  args: {
    orgID: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const boards = await ctx.db
      .query("boards")
      .withIndex("by_org", (q) => q.eq("orgID", args.orgID))
      .order("desc")
      .collect();

    const boardsWithFavoriteRelation = boards.map((board) =>
      ctx.db
        .query("userFavorites")
        .withIndex("by_user_board", (q) =>
          q.eq("userID", identity.subject).eq("boardID", board._id)
        )
        .unique()
        .then((favorite) => ({ ...board, isFavorite: !!favorite }))
    );

    return Promise.all(boardsWithFavoriteRelation);
  },
});
