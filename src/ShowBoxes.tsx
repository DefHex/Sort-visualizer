import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button"

// Register the plugin
gsap.registerPlugin(useGSAP);

export default function ShowBoxes({ numbers, setNumbers }: { numbers: number[]; setNumbers: React.Dispatch<React.SetStateAction<number[]>> }) {
    const containerRef = useRef<HTMLDivElement>(null);
  const [box1Ref, box2Ref] = [useRef<HTMLDivElement|null>(null), useRef<HTMLDivElement | null>(null)];
  // numbers.sort(() => Math.random() - 0.5); // Shuffle numbers for variety
  const [swapped, setSwapped] = useState(false);

  // Initial animation with useGSAP
  useGSAP(() => {
    gsap.from([box1Ref.current, box2Ref.current], {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
    });
  }, { scope: containerRef });

  const handleSwap = () => {
    const box1 = box1Ref.current;
    const box2 = box2Ref.current;
    if (!box1 || !box2) return;

    const distance = box2.offsetLeft - box1.offsetLeft;
    if (swapped) {
      gsap.to([box1, box2], { x: 0, duration: 0.8, ease: "power2.inOut" });
    } else {
      gsap.to(box1, { x: distance, duration: 0.8, ease: "power2.inOut" });
      gsap.to(box2, { x: -distance, duration: 0.8, ease: "power2.inOut" });
    }

    setSwapped(!swapped);
    };

    return (
    <div ref={containerRef} className="bg-black min-h-screen flex flex-col items-center justify-center gap-8">
      <div className="flex flex-row  items-end justify-center gap-4">
        {numbers.map((number, index) => (
          <div key={index} ref={box1Ref} className={`bg-lime-500 h-${number * 5} text-white box${index + 1}`}>
            Box {number}
          </div>
        ))}
      </div>
      <Button className="swap-btn" onClick={handleSwap}>Swap  Boxes</Button>
    </div>
  );
}
