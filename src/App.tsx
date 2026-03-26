import React from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#00ffff] font-mono selection:bg-[#ff00ff] selection:text-black flex flex-col overflow-x-hidden crt-flicker">
      <div className="static-bg" />
      <div className="scanlines" />

      <header className="relative z-10 p-6 flex justify-center items-center border-b-4 border-[#ff00ff] bg-[#050505]">
        <h1 className="glitch-text text-xl md:text-3xl tracking-widest" data-text="SYS.FAIL // PROTOCOL_SNAKE">
          SYS.FAIL // PROTOCOL_SNAKE
        </h1>
      </header>

      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-16 p-4 md:p-8 max-w-7xl mx-auto w-full screen-tear">
        <div className="flex-1 flex justify-center w-full order-2 lg:order-1">
          <SnakeGame />
        </div>
        
        <div className="w-full lg:w-96 order-1 lg:order-2 flex flex-col gap-8">
          <div className="bg-[#050505] p-6 border-2 border-[#00ffff] shadow-[4px_4px_0px_#ff00ff]">
            <h2 className="text-xl font-pixel text-[#ff00ff] mb-6 uppercase tracking-widest">
              > AUDIO_STREAM
            </h2>
            <MusicPlayer />
          </div>
          
          <div className="bg-[#050505] p-6 border-2 border-[#ff00ff] shadow-[4px_4px_0px_#00ffff]">
             <h3 className="text-[#00ffff] font-pixel text-sm mb-4">> SYSTEM.INFO</h3>
             <div className="text-[#ff00ff] text-xl leading-relaxed uppercase">
               <p className="mb-2">WARNING: MEMORY CORRUPTION DETECTED.</p>
               <p className="mb-2">OVERRIDE ENGAGED.</p>
               <p className="mb-2">AVOID SELF-INTERSECTION.</p>
               <p className="animate-pulse">CONSUME DATA BLOCKS TO RESTORE SECTORS.</p>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
