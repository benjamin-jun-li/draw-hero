import Loading from "@/components/board-page/loading";
import Canvas from "@/components/board-page/canvas";
import Room from "@/components/room";
import { BoardIdPageProps } from "@/lib/types";

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  return (
    <Room roomID={params.id} fallback={<Loading />}>
      <Canvas boardID={params.id} />
    </Room>
  );
};

export default BoardIdPage;
