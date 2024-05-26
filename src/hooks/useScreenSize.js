import { useState, useEffect } from "react";

function useScreenSize() {
  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
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
