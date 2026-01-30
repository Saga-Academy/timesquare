import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { MapPin, Link as LinkIcon, Calendar, Grid, Bookmark, User } from 'lucide-react';
import { PostCard } from './PostCard';

interface ProfileProps {
  userId?: string;
}

export function Profile({ userId }: ProfileProps) {
  const { users, posts, selectedUserId } = useAppStore();
  
  // Use provided userId or selectedUserId, default to first user
  const targetUserId = userId || selectedUserId || users[0]?.id;
  const user = users.find(u => u.id === targetUserId) || users[0];
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="text-gray-500 dark:text-gray-400">User not found</p>
      </div>
    );
  }

  const userPosts = posts.filter(post => post.author === user.name);
  const joinedDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20"
    >
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-900">
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
        
        {/* Profile Info */}
        <div className="px-4 pb-4">
          <div className="flex justify-between items-start -mt-16 mb-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 overflow-hidden bg-white">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-20 px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors"
            >
              Follow
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
            <p className="text-gray-500 dark:text-gray-400">@{user.name.toLowerCase().replace(' ', '')}</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-3 text-gray-800 dark:text-gray-200"
          >
            {user.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400"
          >
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              San Francisco, CA
            </span>
            <span className="flex items-center gap-1">
              <LinkIcon className="w-4 h-4" />
              website.com
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Joined {joinedDate}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 flex gap-6"
          >
            <div className="flex gap-1">
              <span className="font-bold text-gray-900 dark:text-white">{user.following || 0}</span>
              <span className="text-gray-500 dark:text-gray-400">Following</span>
            </div>
            <div className="flex gap-1">
              <span className="font-bold text-gray-900 dark:text-white">{user.followers || 0}</span>
              <span className="text-gray-500 dark:text-gray-400">Followers</span>
            </div>
            <div className="flex gap-1">
              <span className="font-bold text-gray-900 dark:text-white">{userPosts.length}</span>
              <span className="text-gray-500 dark:text-gray-400">Posts</span>
            </div>
          </motion.div>
        </div>

        {/* Profile Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-800">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 border-b-2 border-purple-600 text-purple-600 font-medium">
            <Grid className="w-4 h-4" />
            Posts
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            <Bookmark className="w-4 h-4" />
            Saved
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            <User className="w-4 h-4" />
            Tagged
          </button>
        </div>
      </div>

      {/* User Posts */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {userPosts.length > 0 ? (
          userPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Grid className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No posts yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              When {user.name.split(' ')[0]} posts, you'll see them here
            </p>
          </motion.div>
        )}
      </div>
    </motion.main>
  );
}
