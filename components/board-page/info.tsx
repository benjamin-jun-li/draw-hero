import { Skeleton } from "../ui/skeleton";
const Info = () => {
  return (
    <div className="absolute top-2 left-2 bg-neutral-100 rounded-md px-1.5 h-12 flex items-center shadow-md">
      info of the board
    </div>
  );
};

Info.Skeleton = function InfoSkeletion() {
  return (
    <div className="absolute top-2 left-2 bg-neutral-100 rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]"></div>
  );
};

export default Info;
