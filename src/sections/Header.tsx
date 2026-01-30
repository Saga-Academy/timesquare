import { useAppStore } from '@/store/useAppStore';
import { Moon, Sun, User, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  onNavigate: (page: 'feed' | 'profile') => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const { theme, toggleTheme } = useAppStore();

  return (
    <motion.div
  className="flex items-center gap-2 cursor-pointer"
  whileHover={{ scale: 1.02 }}
  onClick={() => onNavigate('feed')}
>
  {/* Logo */}
  <img
    src="/logo.png"
    alt="Timesquare Logo"
    className="w-7 h-7"
  />

  {/* Brand Text */}
  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
    timesquare
  </h1>
</motion.div>
        
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('feed')}
            className={`p-2 rounded-full transition-colors ${
              currentPage === 'feed' 
                ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            <Home className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('profile')}
            className={`p-2 rounded-full transition-colors ${
              currentPage === 'profile' 
                ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            <User className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
