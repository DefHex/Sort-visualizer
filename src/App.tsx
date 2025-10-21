import { useRef, useState, type ChangeEvent } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
// Register the plugin
gsap.registerPlugin(useGSAP);

export default function App() {
  const container = useRef<(HTMLDivElement | null)[]>([]);

  const [array, setArray] = useState<number[]>([]);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    let numbers = text
      .split(",")
      .map(Number)
      .filter((n) => !Number.isNaN(n))
      .slice(0, 10);
    setArray(numbers);
  };
  // Initial animation with useGSAP
  const handleSwap = (index1: number, index2: number): Promise<void> => {
    return new Promise((resolve) => {
      if (!container.current[index1] || !container.current[index2]) {
        resolve();
        return;
      }
      const distance =
        container.current[index2].offsetLeft -
        container.current[index1].offsetLeft;

      gsap.to(container.current[index1], {
        x: distance,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.to(container.current[index2], {
        x: -distance,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(container.current[index1], { x: 0 });
          gsap.set(container.current[index2], { x: 0 });
          resolve();
        },
      });
    });
  };

  const bubble = async () => {
    //copying the useState
    let curr = [...array];
    // running bubble sort on the copied useState array
    for (let i = 0; i < curr.length; i++) {
      for (let j = 0; j < curr.length - i - 1; j++) {
        if (curr[j] > curr[j + 1]) {
          [curr[j], curr[j + 1]] = [curr[j + 1], curr[j]];
          // manipulating useRef -> GSAP animation
          await handleSwap(j, j + 1);
          // wait for the animation to finish then update useState
          setArray([...curr]);
        }
      }
    }
  };

  const insertion = async () => {
    //copying the useState
    let curr = [...array];
    // running insertion sort on the copied useState array
    for (let i = 1; i < curr.length; i++) {
      let j = i;
      while (j > 0 && curr[j] < curr[j - 1]) {
        [curr[j], curr[j - 1]] = [curr[j - 1], curr[j]];
        await handleSwap(j, j - 1);
        setArray([...curr]);
        j--;
      }
    }
  };

  return (
    <div className="Screen flex flex-row gap-2 w-screen h-screen p-2 bg-gray-500">
      <div className="Side Bar flex flex-col items-center justify-safe w-50 h-full bg-indigo-950 rounded-md">
        <button
          className="BubbleSort bg-green-300"
          onClick={() => {
            bubble();
          }}
        >
          Bubble Sort
        </button>
        <button
          className="InsertionSortbg-purple-300"
          onClick={() => {
            insertion();
          }}
        >
          Insertion Sort
        </button>
      </div>
      <div className="Main flex flex-1 flex-col items-center justify-center h-full p-2 bg-indigo-950 rounded-md">
        <div className="Input Field flex flex-row place-items-center gap-2 p-2 bg-gray-500 rounded-md">
          <input type="text" onChange={handleChange} />
        </div>
        <div className="MainBottom flex flex-col items-center justify-center align-middle gap-4 mt-4 w-full h-9/10">
          <div className="Array flex flex-row place-content-evenly gap-2 p-2 bg-gray-500 rounded-md">
            {array.map((number, index) => {
              return (
                <div
                  key={"card" + index}
                  ref={(e) => {
                    container.current[index] = e;
                  }}
                  className="Item w-15 aspect-square bg-cyan-500 rounded-md"
                >
                  {number}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
