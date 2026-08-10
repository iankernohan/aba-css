import type { RefObject } from "react";

export type SceneProps = {
  children: React.ReactNode;
  ref?: RefObject<HTMLDivElement | null>;
};

export default function Scene({ children, ref }: SceneProps) {
  return (
    <div className="scene" ref={ref}>
      {children}
    </div>
  );
}
