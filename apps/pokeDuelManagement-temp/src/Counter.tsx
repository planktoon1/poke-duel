import React from "react";
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((count) => count + 1);
  }
  return (
    <div>
      {count}
      <button onClick={handleClick}>increment</button>;
    </div>
  );
}

export default Counter;
