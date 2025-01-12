import { HTMLAttributes, JSX } from "react";
import { motion, MotionProps } from "motion/react";
import clsx from "clsx";

export type InteractiveItemProps = {
  className?: string;
} & MotionProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof MotionProps>;

export function InteractiveItem({
  className,
  children,
  ...motionDivProps
}: InteractiveItemProps): JSX.Element {
  const { whileDrag, ...otherProps } = motionDivProps ?? {};

  return (
    <motion.div
      drag
      dragSnapToOrigin
      whileDrag={{
        scale: 1.1,
        zIndex: 30,
        pointerEvents: "none",
        ...(typeof whileDrag === "object" ? whileDrag : {}),
      }}
      {...otherProps}
      className={clsx(
        "relative hover:cursor-grab active:cursor-grabbing",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
