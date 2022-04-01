import React from "react";
import { useState } from "react";

function useToggle(initialValue = false) {
  const [toggle, setToggle] = useState(initialValue);

  return { toggle, setToggle };
}

export default useToggle;
