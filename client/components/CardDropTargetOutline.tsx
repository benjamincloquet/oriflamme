import clsx from "clsx";
import { JSX } from "react";

type CardDropTargetOutlineProps = {
  canDrop?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function CardDropTargetOutline({
  canDrop,
  children,
  className,
}: CardDropTargetOutlineProps): JSX.Element {
  return (
    <div
      className={clsx(
        "relative h-48 w-36 border rounded flex items-center justify-center",
        canDrop && "border-green-500 border-dashed cursor-copy",
        !canDrop && "border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
}
