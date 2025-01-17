import clsx from "clsx";
import { JSX } from "react";

type CardDropTargetProps = {
  canDrop?: boolean;
  onDrop: () => void;
  className?: string;
};

export function CardDropTarget({
  canDrop,
  onDrop,
  className,
}: CardDropTargetProps): JSX.Element {
  return (
    <div
      className={clsx(
        "relative h-48 w-36 border rounded flex items-center justify-center",
        canDrop && "border-green-500 border-dashed cursor-copy",
        !canDrop && "border-gray-200",
        className
      )}
    >
      {canDrop && <div className="absolute z-40 -inset-4" onMouseUp={onDrop} />}
    </div>
  );
}
