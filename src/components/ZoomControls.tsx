import React from "react";

const CHANGE_AMOUNT = 1;
const INITIAL_ZOOM_AMOUNT = 20;

export type ZoomControlsProps = {
  min?: number;
  max?: number;
};

export function ZoomControls({ min = 2, max = 40 }: ZoomControlsProps) {
  const [zoomAmount, setZoomAmount] = React.useState(() => {
    const curr = localStorage.getItem("zoomAmount");
    if (curr) return parseInt(curr);
    localStorage.setItem("zoomAmount", String(INITIAL_ZOOM_AMOUNT));
    return INITIAL_ZOOM_AMOUNT;
  });

  React.useEffect(() => {
    document.body.style.fontSize = `${zoomAmount}px`;
  }, [zoomAmount]);

  const handleZoomIn = React.useCallback(() => {
    const updated = zoomAmount + CHANGE_AMOUNT;
    document.body.style.fontSize = `${updated}px`;
    localStorage.setItem("currentFontSize", String(updated));
    setZoomAmount(updated);
  }, [zoomAmount]);

  const handleZoomOut = React.useCallback(() => {
    const updated = zoomAmount - CHANGE_AMOUNT;
    document.body.style.fontSize = `${updated}px`;
    localStorage.setItem("currentFontSize", String(updated));
    setZoomAmount(updated);
  }, [zoomAmount]);

  function handleInput(event: React.InputEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    document.body.style.fontSize = `${value}px`;
    localStorage.setItem("currentFontSize", value);
    setZoomAmount(parseInt(event.currentTarget.value));
  }

  React.useEffect(() => {
    function handleZoomKeyControls(event: KeyboardEvent) {
      console.log(event.key);
      switch (event.key) {
        case ".":
          return handleZoomIn();
        case ",":
          return handleZoomOut();
      }
    }

    window.addEventListener("keydown", handleZoomKeyControls);

    return () => {
      window.removeEventListener("keydown", handleZoomKeyControls);
    };
  }, [handleZoomIn, handleZoomOut]);

  return (
    <>
      <button id="button-zoom-in" onClick={handleZoomIn}>
        +
      </button>
      <button id="button-zoom-out" onClick={handleZoomOut}>
        -
      </button>
      <input
        value={zoomAmount}
        onInput={handleInput}
        type="range"
        id="zoom-range"
        name="zoom-range"
        min={min}
        max={max}
      />
    </>
  );
}
