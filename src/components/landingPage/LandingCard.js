import tasks from "@/images/tasks-completed.svg";
import { useRouter } from "next/navigation";
import { isObjectEmpty } from "@/helpers/functions";
import { useDispatch, useSelector } from "react-redux";
import { showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import { useState, useEffect } from "react";
const LandingCard = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.authSlice?.user);

  const [isListening, setIsListening] = useState(false);
  const [transcripts, setTranscripts] = useState([]);
  const [finalTranscript, setFinalTranscript] = useState('');

  useEffect(() => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          setFinalTranscript(prevTranscript => prevTranscript + event.results[i][0].transcript + ' ');
          setTranscripts(prevTranscripts => [...prevTranscripts, event.results[i][0].transcript]);
        } else {
          
          interimTranscript += event.results[i][0].transcript;
          console.log(interimTranscript)
        }
      }
      console.log(interimTranscript);

      const correctedTranscript = processTranscripts(interimTranscript);
      // console.log('Corrected Transcript:', correctedTranscript);

      // Redirect if the corrected transcript contains the word "charge"
      if (correctedTranscript.includes('charge')) {
        // Handle navigation to the charging station
        // handleNavigationToChargingStation();
      }
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
    setIsListening((prevState) => !prevState);
  };

  const processTranscripts = (text) => {
    // List of similar-sounding words to "charge"
    const similarWords = [
      /charg/gi,
      /charj/gi,
      /chrg/gi,
      /chargeing/gi,
      /chargin/gi,
      /charj/gi,
      /chargeing/gi,
      /chargin/gi,
    ];

    // Replace similar-sounding words with "charge"
    let correctedText = text;
    similarWords.forEach((pattern) => {
      correctedText = correctedText.replace(pattern, 'charge');
    });
    console.log(correctedText)
    return correctedText;
  };

  const handleNavigationToChargingStation = () => {
    // Implement your navigation logic here
    console.log('Navigating to the charging station page');
    // router.push('/charging-station');
  };
  const handleNavigation = () => {
    dispatch(showLoader("Going to the products page"));
    if (!isObjectEmpty(user) && user.role === "admin") {
      router.push("/admin/products");
    } else if (!isObjectEmpty(user)) {
      router.push("/user/products");
    } else {
      router.push("/products");
    }
  };

  return (
    <div className="pt-20 p-5 flex flex-col mx-auto justify-center bg-gradient-to-b from-midnightBlue-800 to-darkMagneta-600 text-white">
      <div className="flex sm:flex-row flex-col justify-around items-center space-x-10 mx-auto 2xl:max-w-7xl xl:max-w-5xl lg:max-w-4xl max-w-2xl md:p-8 p-4">
        <div className="flex flex-col flex-1">
          <h1 className="text-7xl font-bold mb-4 italic text-orange-600 uppercase">
            Lorem Ipsum
          </h1>
          <h1 className="text-2xl font-semibold italic mb-4 uppercase">
            Lorem Ipsuma
          </h1>
          <div className="mt-10">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text
          </div>
          <div className="mt-16 flex justify-center">
            <button
              onClick={handleNavigation}
              className="px-4 py-3 w-1/2 rounded-xl bg-gray-900 hover:bg-gradient-to-r hover:from-gray-800 hover:to-black shadow-xl hover:scale-105"
            >
              Go to shop
            </button>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleSpeechRecognition}
              className="px-4 py-3 w-1/2 rounded-xl bg-blue-900 hover:bg-gradient-to-r hover:from-blue-800 hover:to-black shadow-xl hover:scale-105"
            >
              {isListening ? "Stop Listening" : "Start Listening"}
            </button>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={processTranscripts}
              className="px-4 py-3 w-1/2 rounded-xl bg-green-900 hover:bg-gradient-to-r hover:from-green-800 hover:to-black shadow-xl hover:scale-105"
            >
              Process Transcripts
            </button>
            {transcripts}
          </div>
        </div>
        <div className="flex flex-1 lg:w-96 md:w-80 sm:w-60 bg-cover bg-center rounded-lg">
          <img
            src={tasks.src}
            className="h-full w-full object-cover rounded-lg"
            alt="background"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingCard;
