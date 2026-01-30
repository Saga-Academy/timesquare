import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import type { Story } from '@/types';

interface StoryViewerProps {
  stories: Story[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const STORY_DURATION = 5000; // 5 seconds per story

export function StoryViewer({ stories, currentIndex, onClose, onNext, onPrevious }: StoryViewerProps) {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { markStoryViewed } = useAppStore();

  const currentStory = stories[currentIndex];

  const resetProgress = useCallback(() => {
    setProgress(0);
  }, []);

  useEffect(() => {
    resetProgress();
    markStoryViewed(currentStory.id);
  }, [currentIndex, currentStory.id, markStoryViewed, resetProgress]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          onNext();
          return 0;
        }
        return prev + (100 / (STORY_DURATION / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPaused, onNext]);

  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => setIsPaused(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    if (x < width * 0.3) {
      onPrevious();
    } else if (x > width * 0.7) {
      onNext();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black"
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
      >
        {/* Progress Bars */}
        <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-2 pt-12">
          {stories.map((_, index) => (
            <div key={index} className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{
                  width: index < currentIndex ? '100%' : index === currentIndex ? `${progress}%` : '0%',
                }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 pt-12">
          <div className="flex items-center gap-3">
            <img
              src={currentStory.avatar}
              alt={currentStory.author}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <span className="text-white font-medium">{currentStory.author}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-2 text-white"
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Story Content */}
        <motion.img
          key={currentStory.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          src={currentStory.media}
          alt="Story"
          className="w-full h-full object-cover"
        />

        {/* Navigation Hints */}
        <div className="absolute inset-0 flex pointer-events-none">
          <div className="w-1/3 flex items-center justify-start pl-4">
            {currentIndex > 0 && (
              <ChevronLeft className="w-8 h-8 text-white/50" />
            )}
          </div>
          <div className="w-1/3" />
          <div className="w-1/3 flex items-center justify-end pr-4">
            {currentIndex < stories.length - 1 && (
              <ChevronRight className="w-8 h-8 text-white/50" />
            )}
          </div>
        </div>

        {/* Story Counter */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <span className="text-white/60 text-sm">
            {currentIndex + 1} / {stories.length}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
