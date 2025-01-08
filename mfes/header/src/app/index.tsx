import { useState } from "react";
import useWindowState from "../shared/hooks/useWindowState";
import useBroadcastState from "../shared/hooks/useBroadcastState";

export default function Header() {
  const [count, setCount] = useState(0);
  const [globalCount, setGlobalCount] = useWindowState<number>(
    "globalIncrement",
    3
  );
  const [eventData, setEventData] = useWindowState<string>("eventData");
  const [broadcastData, setBroadcastData] =
    useBroadcastState<string>("broadcastData");

  return (
    <div>
      Header:{" "}
      <button onClick={() => setCount((prev) => ++prev)}>Inner: {count}</button>
      <button onClick={() => setGlobalCount(globalCount + 1)}>
        Global: {globalCount}
      </button>
      <button
        onClick={() => {
          setEventData(`From react header and his inner count ${count}`);
        }}
      >
        EventData: {eventData}
      </button>
      <button
        onClick={() => {
          setBroadcastData(`From react header and his inner count ${count}`);
        }}
      >
        BroadcasrData: {broadcastData}
      </button>
    </div>
  );
}
