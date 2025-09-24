import React from "react";

// Confetti Component
const Confetti = () => {
  const pieces = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    rotate: `${Math.random() * 360}deg`,
    width: `${Math.random() * 6 + 3}px`,
    height: `${Math.random() * 14 + 6}px`,
    bg: [
      "bg-red-500",
      "bg-yellow-400",
      "bg-pink-600",
      "bg-purple-600",
      "bg-green-500",
      "bg-blue-500",
    ][Math.floor(Math.random() * 6)],
    delay: `${Math.random() * 2}s`,
    duration: `${Math.random() * 2 + 2}s`,
  }));

  return (
    <div className="absolute w-1/2 h-full flex justify-center items-start overflow-hidden z-50">
      {pieces.map((p) => (
        <span
          key={p.id}
          className={`absolute animate-makeItRain ${p.bg}`}
          style={{
            left: p.left,
            transform: `rotate(${p.rotate})`,
            width: p.width,
            height: p.height,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
};

// Main Result Card
const ResultCard = () => {

  return (
    <>
      {/* Confetti */}
      <Confetti />

      {/* Result Section */}
      <div className="flex flex-col w-1/2 items-center justify-center bg-gradient-to-b from-pink-700 to-purple-900 rounded-2xl p-5 text-center animate-gradient">
        <h3 className="text-xl uppercase tracking-wider mb-2">Your Result</h3>
        <div className="w-36 h-36 rounded-full flex flex-col items-center justify-center bg-gradient-to-b from-pink-700 to-purple-900 animate-gradient">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-pink-500">88</h1>
          <p className="mt-[-0.5rem] text-sm text-purple-200">of 100</p>
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2">Great</h2>
          <p className="text-sm text-purple-100">
            You scored higher than 65% of the people who have taken these tests.
          </p>
        </div>
      </div>
    </>
  );
};

export default ResultCard;
