// original repo : https://codesandbox.io/s/p5y6262qzm?file=/hooks/useScrollPosition.js
// author : jon64digital

import React, { useState, useEffect } from "react";

const useScrollPosition = () => {
  if (typeof window === "undefined") return 500;

  // Store the state
  const [scrollPos, setScrollPos] = useState(window.pageYOffset);

  // On Scroll
  const onScroll = () => {
    setScrollPos(window.pageYOffset);
  };

  // Add and remove the window listener
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  return scrollPos;
};

export default useScrollPosition;
