"use client";
import Hint from "../../hint";
import { Button } from "../../ui/button";
import { ToolBtnProps } from "@/lib/types";

const ToolBtn = ({
  label,
  icon: Icon,
  isActive,
  isDisabled,
  onClick,
}: ToolBtnProps) => {
  return (
    <Hint label={label} side="right" sideOffset={14}>
      <Button
        disabled={isDisabled}
        onClick={onClick}
        size="icon"
        variant={isActive ? "boardActive" : "board"}
      >
        <Icon />
      </Button>
    </Hint>
  );
};

export default ToolBtn;
