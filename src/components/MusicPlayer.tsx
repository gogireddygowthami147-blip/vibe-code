import React, { useState, useRef, useEffect } from 'react';

const TRACKS = [
  { id: 1, title: 'CORRUPT_SECTOR_01.WAV', artist: 'UNKNOWN_ENTITY', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 2, title: 'DATA_LEAK_02.WAV', artist: 'NULL_POINTER', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 3, title: 'SYSTEM_HALT_03.WAV', artist: 'FATAL_EXCEPTION', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
];

export const MusicPlayer = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextTrack = () => { setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length); setIsPlaying(true); };
  const prevTrack = () => { setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length); setIsPlaying(true); };

  return (
    <div className="w-full flex flex-col gap-6 font-mono">
      <audio ref={audioRef} src={currentTrack.url} onEnded={nextTrack} />
      
      <div className="border-l-4 border-[#00ffff] pl-4 bg-[#050505]">
        <h3 className="text-[#ff00ff] text-xl font-bold truncate uppercase">FILE: {currentTrack.title}</h3>
        <p className="text-[#00ffff] text-lg truncate uppercase">SRC: {currentTrack.artist}</p>
      </div>

      <div className="flex items-center justify-between border-t border-b border-[#ff00ff] py-4">
        <div className="flex items-center gap-4 w-full justify-between">
          <button onClick={prevTrack} className="text-[#00ffff] hover:bg-[#00ffff] hover:text-black px-2 py-1 transition-none border border-transparent hover:border-[#00ffff] text-xl">
            [{"<<"}]
          </button>
          <button onClick={togglePlay} className="text-[#ff00ff] hover:bg-[#ff00ff] hover:text-black px-4 py-1 transition-none border border-[#ff00ff] font-bold text-xl">
            {isPlaying ? '[ PAUSE ]' : '[ PLAY ]'}
          </button>
          <button onClick={nextTrack} className="text-[#00ffff] hover:bg-[#00ffff] hover:text-black px-2 py-1 transition-none border border-transparent hover:border-[#00ffff] text-xl">
            [{">>"}]
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-[#ff00ff] uppercase text-xl">VOL:</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full appearance-none bg-[#050505] border border-[#00ffff] h-4 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#ff00ff]"
        />
      </div>
    </div>
  );
};
