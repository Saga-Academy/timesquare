import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { StoryViewer } from './StoryViewer';
import { Plus } from 'lucide-react';

export function Stories() {
  const { stories, viewedStories } = useAppStore();
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);

  const activeStories = stories.filter(story => {
    const expiresAt = new Date(story.expiresAt);
    return expiresAt > new Date();
  });

  const handleStoryClick = (index: number) => {
    setSelectedStoryIndex(index);
  };

  const handleClose = () => {
    setSelectedStoryIndex(null);
  };

  const handleNext = () => {
    if (selectedStoryIndex !== null && selectedStoryIndex < activeStories.length - 1) {
      setSelectedStoryIndex(selectedStoryIndex + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (selectedStoryIndex !== null && selectedStoryIndex > 0) {
      setSelectedStoryIndex(selectedStoryIndex - 1);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-4"
      >
        <div className="flex gap-4 overflow-x-auto px-4 scrollbar-hide">
          {/* Add Story Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 flex flex-col items-center gap-1"
          >
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-purple-500 flex items-center justify-center bg-purple-50 dark:bg-purple-900/20">
              <Plus className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Add</span>
          </motion.button>

          {/* Story Items */}
          {activeStories.map((story, index) => {
            const isViewed = viewedStories.includes(story.id);
            return (
              <motion.button
                key={story.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleStoryClick(index)}
                className="flex-shrink-0 flex flex-col items-center gap-1"
              >
                <div
                  className={`w-16 h-16 rounded-full p-[2px] ${
                    isViewed
                      ? 'bg-gray-300 dark:bg-gray-700'
                      : 'bg-gradient-to-tr from-yellow-400 via-purple-500 to-pink-500'
                  }`}
                >
                  <img
                    src={story.avatar}
                    alt={story.author}
                    className="w-full h-full rounded-full object-cover border-2 border-white dark:border-gray-900"
                  />
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-[4rem]">
                  {story.author.split(' ')[0]}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Story Viewer */}
      {selectedStoryIndex !== null && (
        <StoryViewer
          stories={activeStories}
          currentIndex={selectedStoryIndex}
          onClose={handleClose}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </>
  );
}
