import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Stories } from './Stories';
import { PostCard } from './PostCard';
import { Sparkles } from 'lucide-react';

export function Feed() {
  const { posts } = useAppStore();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-950"
    >
      <Stories />
      
      {/* Feed Header */}
      <div className="bg-white dark:bg-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h2 className="font-semibold text-gray-900 dark:text-white">Your Feed</h2>
        </div>
      </div>

      {/* Posts */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </div>

      {/* End of Feed */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="py-8 text-center"
      >
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          You've reached the end of your feed
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          Load More
        </motion.button>
      </motion.div>
    </motion.main>
  );
}
