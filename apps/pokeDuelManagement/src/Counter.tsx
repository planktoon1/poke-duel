import { Button } from "@chakra-ui/react";
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
      <Button bg={"blackAlpha.400"} onClick={handleClick}>
        increment
      </Button>
    </div>
  );
}

export default Counter;
