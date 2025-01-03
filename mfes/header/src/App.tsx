import { useEffect, useState } from "react";
import { EventBus } from "./EventBus";

export default function Header() {
  const [count, setCount] = useState(0);
  const [globalCount, setGlobalCount] = useState(0);
  const [data, setData] = useState<any>("");

  useEffect(() => {
    const handleGlobalCount = () => {
      setGlobalCount((prev) => ++prev);
    };
    EventBus.on("globalIncrement", handleGlobalCount);

    const handleGlobalData = (event: any) => {
      setData(event.detail.value);
    };
    EventBus.on("data", handleGlobalData);

    return () => {
      EventBus.off("globalIncrement", handleGlobalCount);
      EventBus.off("data", handleGlobalData);
    };
  }, []);

  return (
    <div>
      Header:{" "}
      <button onClick={() => setCount((prev) => ++prev)}>Inner: {count}</button>
      <button onClick={() => EventBus.emit("globalIncrement")}>
        Global: {globalCount}
      </button>
      <button
        onClick={() =>
          EventBus.emit("data", { detail: { value: "From react header" } })
        }
      >
        Data: {data}
      </button>
    </div>
  );
}
