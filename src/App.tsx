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
        backgroundColor: "#ec4899",
        duration: 2,
        ease: "power2.out",
      });

      gsap.to(container.current[index2], {
        x: -distance,
        backgroundColor: "#ec4899",
        duration: 2,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(container.current[index1], {
            x: 0,
            backgroundColor: "#06b6d4",
          });
          gsap.set(container.current[index2], {
            x: 0,
            backgroundColor: "#06b6d4",
          });
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

  const selection = async () => {
    //copying the useState
    let curr = [...array];
    // running selection sort on the copied useState array
    for (let i = 0; i < curr.length; i++) {
      let min = i;
      for (let j = i + 1; j < curr.length; j++) {
        if (curr[j] < curr[min]) {
          min = j;
        }
      }
      [curr[i], curr[min]] = [curr[min], curr[i]];
      await handleSwap(i, min);
      setArray([...curr]);
    }
  };

  const cocktail = async () => {
    let curr = [...array];
    let sorted = false;
    let start = 0;
    let end = curr.length;

    while (sorted == false) {
      sorted = true;
      for (let i = start; i < end - 1; ++i) {
        if (curr[i] > curr[i + 1]) {
          [curr[i], curr[i + 1]] = [curr[i + 1], curr[i]];
          await handleSwap(i, i + 1);
          setArray([...curr]);
          sorted = false;
        }
      }

      if (sorted == true) break;
      sorted = true;
      end = end - 1;
      for (let i = end - 1; i >= start; i--) {
        if (curr[i] > curr[i + 1]) {
          [curr[i], curr[i + 1]] = [curr[i + 1], curr[i]];
          await handleSwap(i, i + 1);
          setArray([...curr]);
          sorted = false;
        }
      }
      start = start + 1;
    }
  };

  const quick = async (arr: number[], low: number, high: number) => {
    const partition = async (low: number, high: number) => {
      let pivot = arr[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]]; // update the copy of the useState
          await handleSwap(i, j); // wait for the animation
          setArray([...arr]); // update the use state
        }
      }
      let pi = i + 1;
      [arr[pi], arr[high]] = [arr[high], arr[pi]];
      await handleSwap(pi, high);
      setArray([...arr]);
      return pi;
    };

    if (low < high) {
      let pivIndex = await partition(low, high);
      await quick(arr, low, pivIndex - 1);
      await quick(arr, pivIndex + 1, high);
    }
  };

  return (
    <div className="Screen flex flex-row gap-2 w-screen h-screen p-2 border-4 border-black bg-gray-500">
      <div className="Side Bar flex flex-col place-content-evenly w-50 h-full p-2 border-4 border-black bg-indigo-950">
        <button
          className="BubbleSort bg-purple-400 p-2 border-4 border-black hover:translate-y-1 active:translate-y-2 font-bold text-xs font-['Press_Start_2P']"
          onClick={() => {
            bubble();
          }}
        >
          Bubble Sort
        </button>
        <button
          className="InsertionSort bg-blue-400 p-2 border-4 border-black hover:translate-y-1 active:translate-y-2 font-bold text-xs font-['Press_Start_2P']"
          onClick={() => {
            insertion();
          }}
        >
          Insertion Sort
        </button>
        <button
          className="SelectionSort bg-red-400 p-2 border-4 border-black hover:translate-y-1 active:translate-y-2 font-bold text-xs font-['Press_Start_2P']"
          onClick={() => {
            selection();
          }}
        >
          Selection Sort
        </button>
        <button
          className="SelectionSort bg-amber-400 p-2 border-4 border-black hover:translate-y-1 active:translate-y-2 font-bold text-xs font-['Press_Start_2P']"
          onClick={() => {
            cocktail();
          }}
        >
          Cocktail Sort
        </button>
        <button
          className="SelectionSort bg-fuchsia-500 p-2 border-4 border-black hover:translate-y-1 active:translate-y-2 font-bold text-xs font-['Press_Start_2P']"
          onClick={async () => {
            let arr = [...array];
            await quick(arr, 0, array.length - 1);
            setArray([...arr]);
          }}
        >
          Quick Sort
        </button>
      </div>
      <div className="Main flex flex-1 flex-col items-center justify-center h-full p-2 border-4 border-black bg-indigo-950">
        <div className="Input Field flex flex-row place-items-center border-4 border-black gap-2 p-2 bg-gray-500">
          <input
            type="text"
            onChange={handleChange}
            className="font-['Lexend']"
          />
        </div>
        <div className="MainBottom flex flex-col items-center justify-center align-middle gap-4 mt-4 w-full h-9/10">
          <div className="Array flex flex-row place-content-evenly border-4 border-black gap-2 p-2 bg-gray-500">
            {array.map((number, index) => {
              return (
                <div
                  key={"card" + index}
                  ref={(e) => {
                    container.current[index] = e;
                  }}
                  className="Item flex items-center justify-center w-15 aspect-square bg-cyan-500 border-4 border-black truncate text-xs font-['Press_Start_2P']"
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
