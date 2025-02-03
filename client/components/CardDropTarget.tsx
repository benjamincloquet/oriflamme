import { JSX } from "react";

type CardDropTargetProps = {
  canDrop?: boolean;
  onDrop: () => void;
};

export function CardDropTarget({
  canDrop,
  onDrop,
}: CardDropTargetProps): JSX.Element | null {
  return canDrop ? (
    <div className="absolute z-40 -inset-4" onMouseUp={onDrop} />
  ) : null;
}
