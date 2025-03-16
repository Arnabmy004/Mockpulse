"use client";

import React, { useEffect } from "react";
import Webcam from "react-webcam";
import Image from "next/image";

import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
function RecordanswerSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const [userAnswer, setUserAnswer] = useState("");
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prevAns) => prevAns + result.transcript);
    });
  }, [results]);

const saveUserAnswer=()=>{
    if(isRecording){
      stopSpeechToText();

      if(userAnswer?.length<10)
      {
        toast("Error while recording your answer, please try again");
        return ;
      }
      const feedBackPrompt ="Question"+mockInterviewQuestion[activeQuestionIndex]?.question+
      "Answer:"+userAnswer;
    }else{
      startSpeechToText();
    }
}


  return (
    <div className="flex  items-center justify-center">
      <div className="flex flex-col my-20 items-center bg-black justify-center h-screen  rounded-lg p-5">
        <Image
          src={"/webcam.png"}
          alt="webcam"
          width={200}
          height={200}
          className="absolute"
          mirroed={true}
        />
        <Webcam
          style={{
            height: 200,
            width: "100%",
            zIndex: 10,
            transform: "scaleX(-1)",
          }}
        />
      </div>
      <Button
        variant="outline"
        className="my-10"
        onClick={saveUserAnswer}
      >
        {isRecording ? (
          <h2 className="text-red-500 flex gap-2">
            <Mic/> Recording.....
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>

      <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button>
    </div>
  );
}

export default RecordanswerSection;
