import type { Ref, RefObject } from "react";

export type CubeProps = {
  ref?: RefObject<HTMLDivElement | null>;
  draggable?: boolean;
  handleDragStart?: React.DragEventHandler<HTMLDivElement>;
};

export default function Cube({
  ref,
  draggable = false,
  handleDragStart,
}: CubeProps) {
  return (
    <div
      className="cube"
      draggable={draggable}
      onDragStart={handleDragStart}
      style={draggable ? { cursor: "grab" } : {}}
    >
      <div ref={ref}></div>
    </div>
  );
}
