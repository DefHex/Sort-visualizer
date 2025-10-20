import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button"
import ShowBoxes from "./ShowBoxes";

// Register the plugin
gsap.registerPlugin(useGSAP);

export default function App() {
  const [numbers, setNumbers] = useState([1, 5, 6, 7, 3, 2, 4]);
  return (
    <ShowBoxes numbers={numbers} setNumbers={setNumbers} />
  );
}