/**
 * @Info Props used for components
 */

import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export interface OrgItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

export interface HintProps extends LayoutProps {
  label: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
}

export interface DashboardPageProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

export interface BoardListProps extends DashboardPageProps {
  orgID: string;
}

export interface BoardCardProps {
  id: string;
  title: string;
  authorName: string;
  authorID: string;
  createdAt: number;
  imageUrl: string;
  orgID: string;
  isFavorite: boolean;
}

export interface CardContentProps {
  isFavorite: boolean;
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  onClick: () => void;
  disabled: boolean;
}

export interface NewBoardButtonProps {
  orgID: string;
  disabled?: boolean;
}

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import BoardIdPage from "@/app/board/[id]/page";
export interface ActionsProps extends LayoutProps {
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

export interface ConfirmModalProps extends LayoutProps {
  onConfirm: () => void;
  disabled?: boolean;
  header: string;
  description?: string;
}

export interface BoardIdPageProps {
  params: {
    id: string;
  };
}

export interface CanvasProps {
  boardID: string;
}

export type InfoProps = CanvasProps;

export type RoomProps = LayoutProps & {
  roomID: string;
  fallback: NonNullable<ReactNode> | null
};
