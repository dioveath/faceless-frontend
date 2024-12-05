import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useGenerationById } from '@/hooks/generations/use-generations';
import LoadingScreen from './loading-screen';


type AudioGenerationItemProps = {
    generationId: string;
};

export const AudioGenerationItem = ({ generationId }: AudioGenerationItemProps) => {
    const { data, isPending, error } = useGenerationById(generationId, { enabled: !!generationId, refetchInterval: 1000 })

    if (isPending || data?.status == "Processing") {
        return <LoadingScreen />
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='space-y-4 shadow-md rounded-md p-4'
        >
            {data && data?.output_url && <AudioItem audioUrl={data.output_url} />}
            {error && <p className="text-red-500">{error.message}</p>}
        </motion.div>
    )
}



interface AudioItemProps {
    audioUrl: string;
}

export const AudioItem: React.FC<AudioItemProps> = ({ audioUrl }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.addEventListener('loadedmetadata', () => {
                setDuration(audio.duration);
                setIsLoading(false);
            });
            audio.addEventListener('timeupdate', () => {
                setCurrentTime(audio.currentTime);
            });
        }
        return () => {
            if (audio) {
                audio.removeEventListener('loadedmetadata', () => { });
                audio.removeEventListener('timeupdate', () => { });
            }
        };
    }, []);

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSeek = (value: number[]) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value[0];
            setCurrentTime(value[0]);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <audio ref={audioRef} src={audioUrl} />
            {isLoading ? (
                <div className="flex justify-center items-center h-20">
                    <Loader className="animate-spin" />
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between mb-2">
                        <Button onClick={togglePlayPause} variant="ghost" size="icon">
                            {isPlaying ? <Pause /> : <Play />}
                        </Button>
                        <span className="text-sm">
                            {Math.floor(currentTime)}s / {Math.floor(duration)}s
                        </span>
                    </div>
                    <Slider
                        value={[currentTime]}
                        max={duration}
                        step={0.1}
                        onValueChange={handleSeek}
                        className="w-full"
                    />
                </>
            )}
        </motion.div>
    );
};
