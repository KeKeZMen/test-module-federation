import { useState } from "react";

export default function Header() {
  const [count, setCount] = useState(0);

  return (
    <div>
      Header:{" "}
      <button onClick={() => setCount((prev) => ++prev)}>{count}</button>
    </div>
  );
}
