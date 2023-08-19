"use client";

import { useCallback, useEffect, useState } from "react";

export default function useIsScrolling() {
  const [isScrolling, setIsScrolling] = useState(false);

  const onScroll = useCallback(() => {
    setIsScrolling(true);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isScrolling) {
      timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 200);
    }
    return () => clearTimeout(timeout);
  }, [isScrolling]);

  return isScrolling;
}
