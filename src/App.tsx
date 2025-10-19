import React from "react";
import AnimatedBoxes from "./AnimatedBoxes";
import "./App.css";

export default function App() {
  const numbers = [50, 120, 80, 200, 150];

  return (
    <div>
      <h1>Animated Boxes Swap</h1>
      <AnimatedBoxes numbers={numbers} />
    </div>
  );
}
