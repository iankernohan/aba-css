import type { RefObject } from "react";
import React, { useCallback } from "react";

export type useDragParams = {
  sceneRef: RefObject<HTMLDivElement | null>;
};

export function useDrag({ sceneRef }: useDragParams) {
  const [dragBeginX, setDragBeginX] = React.useState<number | undefined>();
  const [dragBeginY, setDragBeginY] = React.useState<number | undefined>();
  const scene = sceneRef.current;

  const handleDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      if (!scene) return;

      const dragEndX = (event.clientX / window.innerWidth) * 100;
      const dragEndY = (event.clientY / window.innerHeight) * 100;

      if (dragBeginX === undefined || dragBeginY === undefined) return;

      const dragDiffX = dragBeginX - dragEndX;
      const dragDiffY = dragBeginY - dragEndY;

      const sceneStyles = window.getComputedStyle(scene);
      const currentPositionX =
        (parseInt(sceneStyles.left) / window.innerWidth) * 100;
      const currentPositionY =
        (parseInt(sceneStyles.top) / window.innerHeight) * 100;

      const newPositionX = currentPositionX - dragDiffX;
      const newPositionY = currentPositionY - dragDiffY;

      if (newPositionX > -30 && newPositionX < 130)
        scene.style.left = `${newPositionX}%`;
      if (newPositionY > -30 && newPositionY < 130)
        scene.style.top = `${newPositionY}%`;

      setDragBeginX(undefined);
      setDragBeginY(undefined);
    },
    [dragBeginX, dragBeginY, scene],
  );

  const handleDragStart = useCallback((event: DragEvent) => {
    setDragBeginX((event.clientX / window.innerWidth) * 100);
    setDragBeginY((event.clientY / window.innerHeight) * 100);
  }, []);

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  React.useEffect(() => {
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("drop", handleDrop);

    return () => {
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("drop", handleDrop);
    };
  }, [handleDragStart, handleDragOver, handleDrop]);
}
