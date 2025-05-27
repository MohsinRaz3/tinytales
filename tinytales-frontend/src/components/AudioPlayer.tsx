import { useState, useRef, useEffect } from 'react';

const AudioPlayer = ({ storyTitle, audioSource }: { storyTitle: string, audioSource: string }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            const audio = audioRef.current;
            if (audio && !isPlaying) {
                audio.play();
                setIsPlaying(true);
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const onLoadedMetadata = () => {
        const audio = audioRef.current;
        if (!audio) return;
        setDuration(audio.duration);
    };

    const onTimeUpdate = () => {
        const audio = audioRef.current;
        if (!audio) return;
        setCurrentTime(audio.currentTime);
        if (audio.duration) {
            setProgress((audio.currentTime / audio.duration) * 100);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;
        const newTime = (Number(e.target.value) / 100) * duration;
        audio.currentTime = newTime;
        setProgress(Number(e.target.value));
    };

    return (
        <div className="max-w-lg mx-auto bg-gradient-to-r from-gray-800 to-black p-4 rounded-lg shadow-2xl backdrop-blur-md mb-10">
            <h3 className="text-sm md:text-xl font-semibold mb-2 text-white">{storyTitle}</h3>
            <audio
                ref={audioRef}
                onLoadedMetadata={onLoadedMetadata}
                onTimeUpdate={onTimeUpdate}
                src={audioSource}
            />
            <div className="flex items-center justify-between mt-4">
                <button
                    className="text-sm bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                    onClick={togglePlay}
                >
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <span className="text-white font-mono text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </span>
            </div>
            <div className="mt-4">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={onSeek}
                    className="w-full h-2 bg-white bg-opacity-30 rounded-lg appearance-none cursor-pointer"
                />
            </div>
        </div>
    );
};

export default AudioPlayer;
