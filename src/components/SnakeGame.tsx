import React from 'react';
import { motion } from 'motion/react';
import { useSnakeGame } from '../hooks/useSnakeGame';

export const SnakeGame = () => {
  const { snake, food, score, gameOver, isPaused, hasStarted, resetGame, GRID_SIZE } = useSnakeGame();

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-[500px] relative">
      {/* Cyan outlined rectangle from screenshot */}
      <motion.div 
        className="absolute border-[3px] border-[#00aaff] z-50 pointer-events-none"
        animate={{ x: [0, 220, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        style={{
          top: '-5px',
          left: '90px',
          width: '100px',
          height: '255px'
        }}
      />

      <div className="flex justify-between w-full px-2">
        <div className="text-cyan-400 font-mono text-xl md:text-2xl font-bold drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">
          SCORE: {score.toString().padStart(4, '0')}
        </div>
        <div className="text-fuchsia-400 font-mono text-xl md:text-2xl font-bold drop-shadow-[0_0_5px_rgba(217,70,239,0.8)]">
          {isPaused ? 'PAUSED' : 'PLAYING'}
        </div>
      </div>

      <div 
        className="relative bg-gray-950 border-2 border-cyan-500/50 rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.2)] overflow-hidden w-full aspect-square"
      >
        {/* Grid Background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(to right, #22d3ee 1px, transparent 1px), linear-gradient(to bottom, #22d3ee 1px, transparent 1px)',
            backgroundSize: `${100 / GRID_SIZE}% ${100 / GRID_SIZE}%`
          }}
        />

        {/* Food */}
        <div
          className="absolute bg-fuchsia-500 rounded-full shadow-[0_0_10px_rgba(217,70,239,0.8)] animate-pulse"
          style={{
            width: `${100 / GRID_SIZE}%`,
            height: `${100 / GRID_SIZE}%`,
            left: `${(food.x / GRID_SIZE) * 100}%`,
            top: `${(food.y / GRID_SIZE) * 100}%`,
          }}
        />

        {/* Snake */}
        {snake.map((segment, index) => {
          const isHead = index === 0;
          return (
            <div
              key={`${segment.x}-${segment.y}-${index}`}
              className={`absolute rounded-sm ${isHead ? 'bg-cyan-300 z-10' : 'bg-cyan-500/80'} shadow-[0_0_8px_rgba(34,211,238,0.6)]`}
              style={{
                width: `${100 / GRID_SIZE}%`,
                height: `${100 / GRID_SIZE}%`,
                left: `${(segment.x / GRID_SIZE) * 100}%`,
                top: `${(segment.y / GRID_SIZE) * 100}%`,
                transform: isHead ? 'scale(1.1)' : 'scale(0.95)',
              }}
            />
          );
        })}

        {/* Overlays */}
        {!hasStarted && !gameOver && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20">
            <div className="text-center animate-pulse">
              <p className="text-cyan-400 font-mono text-xl md:text-2xl mb-2">PRESS ANY KEY</p>
              <p className="text-fuchsia-400 font-mono text-sm md:text-base">TO START</p>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-40 z-20">
            <div className="text-center flex flex-col items-center gap-4">
              <h2 className="text-red-500 font-mono text-4xl md:text-5xl font-bold drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">GAME OVER</h2>
              <p className="text-cyan-400 font-mono text-xl md:text-2xl">FINAL SCORE: {score}</p>
              <button 
                onClick={resetGame}
                className="mt-4 px-6 py-3 bg-transparent border-2 border-fuchsia-500 text-fuchsia-400 font-mono font-bold rounded hover:bg-fuchsia-500 hover:text-white hover:shadow-[0_0_15px_rgba(217,70,239,0.8)] transition-all"
              >
                PLAY AGAIN
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="text-gray-500 font-mono text-xs md:text-sm flex gap-4 text-center">
        <span>WASD / ARROWS to move</span>
        <span className="hidden sm:inline">•</span>
        <span>SPACE to pause</span>
      </div>
    </div>
  );
};
