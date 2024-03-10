import { auth, currentUser } from "@clerk/nextjs";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCK_SECRET_KEY as string,
});

export async function POST(request: Request) {
  const authorization = await auth();
  const user = await currentUser();

  if (!authorization || !user)
    return new Response("Unauthorized", { status: 403 });

  const { room } = await request.json();
  const board = await convex.query(api.board.get, { id: room });  

  if (board?.orgID !== authorization.orgId) {
    return new Response("Unauthorized", { status: 403 });
  }

  const userInfo = {
    name: user.firstName || "Anonymous",
    picture: user.imageUrl,
  };

  const session = liveblocks.prepareSession(user.id, {
    userInfo,
  });

  if (room) session.allow(room, session.FULL_ACCESS);

  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
//   // Get the current user from your database
//   const user = __getUserFromDB__(request);

//   // Start an auth session inside your endpoint
//   const session = liveblocks.prepareSession(
//     user.id,
//     { userInfo: user.metadata } // Optional
//   );

//   // Implement your own security, and give the user access to the room/organization.
//   // Note: Even if room is defined, we recommend to always use wildcards.
//   const { room } = request.body;
//   if (room && __shouldUserHaveAccess__(user, room)) {
//     session.allow(room, session.FULL_ACCESS);
//   }
//   else {
//     session.allow(`${user.organization}*`, session.READ_ACCESS)
//   }

//   // Authorize the user and return the result
//   const { status, body } = await session.authorize();
//   return new Response(body, { status });
// }
