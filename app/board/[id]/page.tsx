import Canvas from "@/components/board-page/canvas";
import { BoardIdPageProps } from "@/lib/types";

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  return <Canvas boardID={params.boardID}/>;
};

export default BoardIdPage;
