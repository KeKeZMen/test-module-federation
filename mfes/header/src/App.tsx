import { useEffect, useState } from "react";
import { EventBus } from "./EventBus";

export default function Header() {
  const [count, setCount] = useState(0);
  const [globalCount, setGlobalCount] = useState(0);

  useEffect(() => {
    EventBus.on("globalIncrement", () => {
      setGlobalCount((prev) => ++prev);
    });
  }, []);

  return (
    <div>
      Header:{" "}
      <button onClick={() => setCount((prev) => ++prev)}>Inner: {count}</button>
      <button onClick={() => EventBus.emit("globalIncrement")}>
        Global: {globalCount}
      </button>
    </div>
  );
}
