"use client";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

export default function SpeachRecongination() {
  const recoginationRef = useRef<any>(null);
  const [isListining, setIsListining] = useState(false);

  const handleMic = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!recoginationRef.current) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        console.log("user", text);
      };

      recoginationRef.current = recognition;
    }

    if (isListining) {
      recoginationRef.current.stop();
      setIsListining(false);
      console.log("mic stope");
    } else {
      recoginationRef.current.start();
      setIsListining(true);
      console.log("Mic Started");
    }
  };

  return (
    <div>
      <Button onClick={handleMic}>
        {isListining ? "Stop Mic" : "Start Mic"}
      </Button>
    </div>
  );
}
