import { useState, useRef } from "react";

export default function VideoHero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.play(); // play the video
  };

  return (
    <div className="relative w-full aspect-video overflow-hidden">
      {/* Video always mounted but controlled */}
      <video
        ref={videoRef}
        src="/hero-video.mp4"
        controls
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Thumbnail + play button overlay */}
      {!isPlaying && (
        <>
          <img
            src="/hero-banner.png"
            alt="Video thumbnail"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <PlayIcon onClick={handlePlay} />
        </>
      )}
    </div>
  );
}

export function PlayIcon({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                 bg-slate-800 text-white flex justify-center items-center 
                 rounded-full w-16 h-16 cursor-pointer hover:bg-black 
                 active:scale-95 transition-all duration-250 group md:size-40 size-20"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50%"
        height="50%"
        viewBox="0 0 24 24"
        fill="white"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="group-hover:scale-105 transition-all duration-250"
      >
        <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
      </svg>
    </div>
  );
}
