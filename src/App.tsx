import React from "react";
import Cube from "./components/Cube";
import Scene from "./components/Scene";
import { ZoomControls } from "./components/ZoomControls";
import { useDrag } from "./hooks/useDrag";
import RotateControls from "./components/RotateControls";

function App() {
  const targetRef = React.useRef<HTMLDivElement>(null);
  const sceneRef = React.useRef<HTMLDivElement>(null);

  useDrag({ sceneRef });

  return (
    <>
      <RotateControls />
      <ZoomControls max={60} />
      <Scene ref={sceneRef}>
        <Cube ref={targetRef} draggable />
      </Scene>
    </>
  );
}

export default App;
