import { Pause, Play, VolumeX, Volume2 } from "lucide-react";
import React, { useRef, useState } from "react";

type VideoItemProps = {
  src: string;
  title: string;
  description: string;
  thumbnail?: string;
  isThumb?: boolean;
};

export default function VideoItem({ src, thumbnail, title, description, isThumb = false }: VideoItemProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const mediaRef = useRef<HTMLVideoElement>(null);

  const togglePlay = (e: any) => {
    e.preventDefault();
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
      } else {
        mediaRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: any) => {
    e.preventDefault();
    if (mediaRef.current) {
      mediaRef.current.muted = !mediaRef.current.muted;
      setIsMuted(mediaRef.current.muted);
    }
  };

  return (
    <React.Fragment>
      <video ref={mediaRef as React.RefObject<HTMLVideoElement>} src={src} poster={thumbnail} className="w-full h-full object-cover" muted={isMuted} loop={false} preload="none" autoPlay={true} onClick={togglePlay}/>
      {!isThumb && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold">{title}</h3>
              <p className="text-white/80 text-sm">{description}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={togglePlay} className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
              </button>
              <button onClick={toggleMute} className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
