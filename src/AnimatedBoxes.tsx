import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./App.css";


export default function AnimatedBoxes({ numbers }: { numbers: number[] }) {
  const boxRefs = useRef([]);

  // Clear refs on re-render
  boxRefs.current = [];

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !boxRefs.current.includes(el)) {
      boxRefs.current.push(el);
    }
  };

  // Example swap animation on mount
  useEffect(() => {
    if (boxRefs.current.length < 2) return;

    // Swap first and last box after 1 second
    const box1 = boxRefs.current[0];
    const box2 = boxRefs.current[boxRefs.current.length - 1];
    const distance = box2.offsetLeft - box1.offsetLeft;

    gsap.to(box1, { x: distance, duration: 1, ease: "power2.inOut" });
    gsap.to(box2, { x: -distance, duration: 1, ease: "power2.inOut" });
  }, []);

  return (
    <div className="boxes-container">
      {numbers.map((num, index) => (
        <div
          key={index}
          ref={addToRefs}
          className="box"
          style={{ height: `${num}px` }}
        >
          {num}
        </div>
      ))}
    </div>
  );
}
