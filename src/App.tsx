import { useRef, useState, type ChangeEvent } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
// Register the plugin
gsap.registerPlugin(useGSAP);

const container = useRef<(HTMLDivElement | null)[]>([]);

export default function App() {
  const [array, setArray] = useState<number[]>([]);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    let numbers = text
      .split(",")
      .map((element) => Number(element))
      .filter((n) => !isNaN(n))
      .slice(0, 10);
    setArray(numbers);
  };

  const swap(index1: number, index2: number) {

  }

  return (
    <div className="Screen flex flex-row gap-2 w-screen h-screen p-2 bg-gray-500">
      <div className="Side Bar flex flex-col items-center justify-safe w-50 h-full bg-indigo-950 rounded-md"></div>
      <div className="Main flex flex-1 flex-col items-center justify-center h-full p-2 bg-indigo-950 rounded-md">
        <div className="Input Field flex flex-row place-items-center gap-2 p-2 bg-gray-500 rounded-md">
          <input type="text" onChange={handleChange} />
        </div>
        <div className="MainBottom flex flex-col items-center justify-center align-middle gap-4 mt-4 w-full h-9/10">
          <div className="Array flex flex-row place-content-evenly gap-2 p-2 bg-gray-500 rounded-md">
            {array.map((number, index) => {
              return (
                <div
                  key={index}
                  ref= {e => {container.current[index] = e}}
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
