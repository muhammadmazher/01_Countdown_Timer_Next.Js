"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components//ui/button";
import { Target } from "lucide-react";

export default function Countdown (){
    const [duration, setDuration] = useState<number | string>("");
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isActive, SetIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleSetDuration = (): void => {
        if (typeof duration === "number" && duration >0){
            setTimeLeft(duration);
            SetIsActive(false);
            setIsPaused(false);
            if(timerRef.current){
                clearInterval(timerRef.current);
            }
        }
    };

    const handleStart = (): void => {
        if(timeLeft > 0) {
            SetIsActive(true);
            setIsPaused(false);
        }
    };

    const handlePause = (): void => {
        if(isActive){
            setIsPaused(true);
            SetIsActive(false);
            if(timerRef.current){
                clearInterval(timerRef.current)
            }
        }
    };

    const handleReset = (): void => {
        SetIsActive(false);
        setIsPaused(false);
        setTimeLeft(typeof duration === "number"? duration : 0);
        if(timerRef.current){
            clearInterval(timerRef.current);
        }
    };

    useEffect(()=> {
        if(isActive && !isPaused) {
            timerRef.current = setInterval(() => {
             setTimeLeft((prevTime) => {
                if(prevTime <= 1) {
                    clearInterval(timerRef.current!);
                    return 0;
                }
                return prevTime -1;
             }) ; 
            }, 1000);
        }
        return () => {
            if(timerRef.current){
                clearInterval(timerRef.current)
            }
        };
    }, [isActive, isPaused]);

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time/60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    }

    const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setDuration(Number(e.target.value) || "");
    };
    return (
        // Container div for centering the content
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg gray-900">
            {/* Timer box container */}
            <div className="bg-white dark:bg-gray-800 shadow-1g rounded-1g p-8 w-full max-w-md" >
                {/*Title of the countdown timer */}
                <h1 className="text-2xl font-bold mb-4 text-blue-700 text-center">
                    Countdown Timer
                </h1>
                {/* Input and set button container */}
                <div className="flex itmes-center mb-6">
                    <Input
                    type="number"
                    id="duration"
                    placeholder="Enter duration in seconds"
                    value={duration}
                    onChange={handleDurationChange}
                    className="flex-1 mr-4 rounded-full border-blue-300 dark:border-blue-600 dark:bg-blue-700 dark:text-blue-200"
                    />
                    <Button
                    onClick={handleSetDuration}
                    variant="outline"
                    className="py-2.5 px-6 text-sm rounded-full border border-solid border-blue-300 text-blue-600 cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-blue-600 hover:text-white"
                    >Set
                    </Button>
                </div>
                {/* Display the formatted time left */}
                <div className="text-6xl font-bold text-blue-700 dark:text-blue-200 mb-8 text-center">
                    {formatTime(timeLeft)}
                </div>
                {/* Buttons to start, pause, and reset the timer */}
                <div className="flex justify-center gap-5">
                    <Button
                    onClick={handleStart}
                    variant="outline"
                    className="py-2.5 px-6 text-sm rounded-full border border-solid border-blue-300 text-blue-600 cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-blue-600 hover:text-white"
                    >{isPaused ? "Resume" : "Start"}
                    </Button>
                    <Button
                        onClick={handlePause}
                        variant="outline"
                        className="py-2.5 px-6 text-sm rounded-full border border-solid border-blue-300 text-blue-600 cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-blue-600 hover:text-white"
                    > Pause
                    </Button>
                    <Button
                        onClick={handleReset}
                        variant="outline"
                        className="py-2.5 px-6 text-sm rounded-full border border-solid border-blue-300 text-blue-600 cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-blue-600 hover:text-white"
                    > Reset
                    </Button>
                </div>
            </div>
        </div>
    );
}