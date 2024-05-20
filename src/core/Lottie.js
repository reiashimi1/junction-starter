import { useEffect, useRef } from "react";
import lottie from "lottie-web";

const Lottie = ({ animation, text, ...props }) => {
  const animationContainer = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animation,
    });

    return () => anim.destroy();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div {...props} ref={animationContainer}></div>
      <span className="text-slate-700 font-semibold text-sm italic">{text}</span>
    </div>
  );
};

export default Lottie;
