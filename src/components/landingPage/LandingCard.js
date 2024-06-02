import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Lottie from "@/core/Lottie";
import microphoneLottie from "@/images/microphone.json";
import * as React from "react";

const LandingCard = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isListening, setIsListening] = useState(false);
  const [transcripts, setTranscripts] = useState([]);
  const [finalTranscript, setFinalTranscript] = useState("");

  useEffect(() => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          setFinalTranscript(
            (prevTranscript) =>
              prevTranscript + event.results[i][0].transcript + " ",
          );
          setTranscripts((prevTranscripts) => [
            ...prevTranscripts,
            event.results[i][0].transcript,
          ]);
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      const correctedTranscript = String(interimTranscript).toLocaleLowerCase();
      setTimeout(() => {
        if (correctedTranscript.includes("fast charge")) {
          
          console.log("FastCharge detected");
          // Handle FastCharge logic
        } else if (correctedTranscript.includes("low cost")) {
          console.log("low cost detected");
          // Handle low cost logic
        }
        else if (correctedTranscript.includes("charge")) {
          console.log("normal charge");
          // Handle low cost logic
        }
      }, 300); // 0.8s delay
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    recognition.onend = () => {
      if (isListening) {
        recognition.start();
      }
    };

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  const handleSpeechRecognition = () => {
    setIsListening(true);
  };


  


  useEffect(() => {
    if (!isListening) {
      handleSpeechRecognition();
    }
  }, []);

  return (
    <div className="pt-20 p-5 flex flex-col mx-auto justify-center text-white">
      <div className="flex sm:flex-row flex-col justify-around items-center space-x-10 mx-auto 2xl:max-w-7xl xl:max-w-5xl lg:max-w-4xl max-w-2xl md:p-8 p-4">
        <div className="flex flex-col flex-1">
          <div className="mt-4 flex justify-center">
         
            {transcripts}
          </div>
        </div>
      </div>
      <Lottie
        animation={microphoneLottie}
        className="flex flex-1 object-contain md:w-1/6 md:h-1/6 sm:w-1/5 sm:h-1/5 w-1/3 h-1/3"
        text=""
      />
    </div>
  );
};

export default LandingCard;
