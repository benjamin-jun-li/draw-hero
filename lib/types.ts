/**
 * @Info Props used for components
 */

import React, { ReactNode, VoidFunctionComponent } from "react";

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
  fallback: NonNullable<ReactNode> | null;
};

export interface UserAvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
}

import { LucideIcon } from "lucide-react";
export interface ToolBtnProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

export interface CursorProps {
  connectionID: number;
}

export interface ToolBarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export interface LayerPreviewProps {
  id: string;
  onLayerPointDown: (e: React.PointerEvent, layerID: string) => void;
  selectionColor?: string;
}

export interface RectangleProps {
  id: string,
  layer: RectangleLayer,
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export interface EllipseProps extends Omit<RectangleProps, 'layer'> {
  layer: EllipseLayer;
}

export interface SelectionBoxProps {
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void
}

export interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

export interface ColorPickerProps {
  onChange: (color: Color) => void;
}

export interface ColorButtonProps {
  onClick: (color: Color) => void;
  color: Color;
}

/**
 * @description type for canvas
 */
export enum CanvasMode {
  None,
  Pressing,
  SelectionNet,
  Translating,
  Inserting,
  Resizing,
  Pencil,
}

export type Color = {
  r: number;
  g: number;
  b: number;
};

export type Camera = {
  x: number;
  y: number;
};

export enum CanvasLayerType {
  Rectangle,
  Ellipse,
  Path,
  Text,
  Note,
}

export type RectangleLayer = {
  type: CanvasLayerType.Rectangle;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: Color;
  value?: string;
};

export type EllipseLayer = {
  type: CanvasLayerType.Ellipse;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: Color;
  value?: string;
};

export type PathLayer = {
  type: CanvasLayerType.Path;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: Color;
  points: number[][];
  value?: string;
};

export type TextLayer = {
  type: CanvasLayerType.Text;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: Color;
  value?: string;
};

export type NoteLayer = {
  type: CanvasLayerType.Note;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: Color;
  value?: string;
};

export type Point = {
  x: number;
  y: number;
};

export type XYWH = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export enum Side {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
}

export type CanvasState =
  | {
      mode: CanvasMode.None;
    }
  | {
      mode: CanvasMode.SelectionNet;
      origin: Point;
      current?: Point;
    }
  | {
      mode: CanvasMode.Translating;
      current: Point;
    }
  | {
      mode: CanvasMode.Inserting;
      layerType:
        | CanvasLayerType.Ellipse
        | CanvasLayerType.Rectangle
        | CanvasLayerType.Text
        | CanvasLayerType.Note;
    }
  | {
      mode: CanvasMode.Pencil;
    }
  | {
      mode: CanvasMode.Pressing;
      origin: Point;
    }
  | {
      mode: CanvasMode.Resizing;
      initialBounds: XYWH;
      corner: Side;
    }; // keep track of the tool we are using

export type Layer =
  | RectangleLayer
  | EllipseLayer
  | PathLayer
  | TextLayer
  | NoteLayer;
