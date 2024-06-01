import { useState, useEffect } from "react";

function useScreenSize() {
  function getCurrentDimension() {
    return {
      width: typeof window !== "undefined" ? window.innerWidth : 0,
      height: typeof window !== "undefined" ? window.innerHeight : 0,
    };
  }

  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };

    window.addEventListener("resize", updateDimension);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, []);

  return screenSize;
}

export default useScreenSize;
