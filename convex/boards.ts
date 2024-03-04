import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAllOrThrow } from "convex-helpers/server/relationships.js";

export const get = query({
  args: {
    orgID: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    if (args.favorites) {
      const favoriteBoards = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_org", (q) =>
          q.eq("userID", identity.subject).eq("orgID", args.orgID)
        )
        .order("desc")
        .collect();

      const ids = favoriteBoards.map((b) => b.boardID);

      const boards = await getAllOrThrow(ctx.db, ids);

      return boards.map((board) => ({ ...board, isFavorite: true }));
    }

    const title = args.search;
    let boards = [];

    if (title) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", title).eq("orgID", args.orgID)
        )
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgID", args.orgID))
        .order("desc")
        .collect();
    }

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
