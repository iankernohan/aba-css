import React, { useCallback, useEffect, useRef } from "react";

let initialZ = 45;
let initialX = 65;
const fireRate = 100;
const turnAmount = 5;

export default function RotateControls() {
  const [currentX, setCurrentX] = React.useState(() => {
    const curr = localStorage.getItem("currentX");
    if (curr) return parseInt(curr);
    localStorage.setItem("currentX", String(initialX));
    return initialX;
  });
  const [currentZ, setCurrentZ] = React.useState(() => {
    const curr = localStorage.getItem("currentZ");
    if (curr) return parseInt(curr);
    localStorage.setItem("currentZ", String(initialZ));
    return initialZ;
  });

  const intervalIdRef = useRef<number | undefined>(undefined);
  const sceneRef = useRef<HTMLElement | null>(null);
  const currentXRef = useRef<number>(currentX);
  const currentZRef = useRef<number>(currentZ);

  useEffect(() => {
    const el = document.querySelector(".scene") as HTMLElement | null;
    sceneRef.current = el;
  }, []);

  useEffect(() => {
    currentXRef.current = currentX;
    currentZRef.current = currentZ;
    if (sceneRef.current) {
      sceneRef.current.style.transform = `rotateX(${currentX ?? initialX}deg) rotateZ(${currentZ ?? initialZ}deg)`;
    }
  }, [currentX, currentZ]);

  useEffect(() => {
    const onUp = () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = undefined;
      }
    };
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = undefined;
      }
    };
  }, []);

  const turnRight = useCallback(() => {
    setCurrentZ((prev) => {
      const updated = prev - turnAmount;
      localStorage.setItem("currentZ", String(updated));
      if (sceneRef.current)
        sceneRef.current.style.transform = `rotateX(${currentXRef.current}deg) rotateZ(${updated}deg)`;
      return updated;
    });
  }, []);

  const turnLeft = useCallback(() => {
    setCurrentZ((prev) => {
      const updated = prev + turnAmount;
      localStorage.setItem("currentZ", String(updated));
      if (sceneRef.current)
        sceneRef.current.style.transform = `rotateX(${currentXRef.current}deg) rotateZ(${updated}deg)`;
      return updated;
    });
  }, []);

  const turnup = useCallback(() => {
    setCurrentX((prev) => {
      const updated = prev + turnAmount;
      localStorage.setItem("currentX", String(updated));
      if (sceneRef.current)
        sceneRef.current.style.transform = `rotateX(${updated}deg) rotateZ(${currentZRef.current}deg)`;
      return updated;
    });
  }, []);

  const turndown = useCallback(() => {
    setCurrentX((prev) => {
      const updated = prev - turnAmount;
      localStorage.setItem("currentX", String(updated));
      if (sceneRef.current)
        sceneRef.current.style.transform = `rotateX(${updated}deg) rotateZ(${currentZRef.current}deg)`;
      return updated;
    });
  }, []);

  function stopTurning() {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = undefined;
    }
  }

  return (
    <>
      <button
        id="button-left"
        onMouseDown={() => {
          if (intervalIdRef.current) return;
          turnLeft();
          intervalIdRef.current = window.setInterval(() => {
            turnLeft();
          }, fireRate);
        }}
        onTouchStart={() => {
          if (intervalIdRef.current) return;
          turnLeft();
          intervalIdRef.current = window.setInterval(() => {
            turnLeft();
          }, fireRate);
        }}
        onMouseUp={stopTurning}
        onMouseLeave={stopTurning}
        onTouchEnd={stopTurning}
      >
        Left
      </button>
      <button
        id="button-right"
        onMouseDown={() => {
          if (intervalIdRef.current) return;
          turnRight();
          intervalIdRef.current = window.setInterval(() => {
            turnRight();
          }, fireRate);
        }}
        onTouchStart={() => {
          if (intervalIdRef.current) return;
          turnRight();
          intervalIdRef.current = window.setInterval(() => {
            turnRight();
          }, fireRate);
        }}
        onMouseUp={stopTurning}
        onMouseLeave={stopTurning}
        onTouchEnd={stopTurning}
      >
        Right
      </button>
      <button
        id="button-up"
        onMouseDown={() => {
          if (intervalIdRef.current) return;
          turnup();
          intervalIdRef.current = window.setInterval(() => {
            turnup();
          }, fireRate);
        }}
        onTouchStart={() => {
          if (intervalIdRef.current) return;
          turnup();
          intervalIdRef.current = window.setInterval(() => {
            turnup();
          }, fireRate);
        }}
        onMouseUp={stopTurning}
        onMouseLeave={stopTurning}
        onTouchEnd={stopTurning}
      >
        Up
      </button>
      <button
        id="button-down"
        onMouseDown={() => {
          if (intervalIdRef.current) return;
          turndown();
          intervalIdRef.current = window.setInterval(() => {
            turndown();
          }, fireRate);
        }}
        onTouchStart={() => {
          if (intervalIdRef.current) return;
          turndown();
          intervalIdRef.current = window.setInterval(() => {
            turndown();
          }, fireRate);
        }}
        onMouseUp={stopTurning}
        onMouseLeave={stopTurning}
        onTouchEnd={stopTurning}
      >
        Down
      </button>
      <span id="x-display">X: {currentX}deg</span>
      <span id="z-display">Z: {currentZ}deg</span>
    </>
  );
}
