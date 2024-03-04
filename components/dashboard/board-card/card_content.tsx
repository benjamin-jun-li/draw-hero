import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardContentProps } from "@/lib/types";

const CardContent = ({
  isFavorite,
  title,
  authorLabel,
  createdAtLabel,
  onClick,
  disabled,
}: CardContentProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    onClick();
  }
  return (
    <div className="relative bg-white p-3">
      <p className="text-md truncate max-w-[calc(100% - 20px)]">{title}</p>
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[0.8rem] text-muted-foreground truncate">
        {authorLabel}, {createdAtLabel}
      </p>
      <button
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-orange-500",
          disabled && "cursor-not-allowed opacity-75"
        )}
      >
        <Star
          className={cn(
            "h-4 w-4",
            isFavorite && "fill-orange-400 text-orange-400"
          )}
        />
      </button>
    </div>
  );
};

export default CardContent;
