import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme, Post, Story, User } from '@/types';

// Import CMS content
import postsData from '@/content/posts.json';
import storiesData from '@/content/stories.json';
import usersData from '@/content/users.json';

interface AppState {
  // Theme
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  
  // CMS Data
  posts: Post[];
  stories: Story[];
  users: User[];
  
  // UI State
  selectedUserId: string | null;
  setSelectedUserId: (id: string | null) => void;
  
  // Posts interactions
  likedPosts: string[];
  toggleLike: (postId: string) => void;
  
  // Stories
  viewedStories: string[];
  markStoryViewed: (storyId: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: 'light',
      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        set({ theme: newTheme });
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      },
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.classList.toggle('dark', theme === 'dark');
      },
      
      // CMS Data (loaded at build time)
      posts: postsData.posts as Post[],
      stories: storiesData.stories as Story[],
      users: usersData.users as User[],
      
      // UI State
      selectedUserId: null,
      setSelectedUserId: (id) => set({ selectedUserId: id }),
      
      // Posts interactions
      likedPosts: [],
      toggleLike: (postId) => {
        const { likedPosts } = get();
        if (likedPosts.includes(postId)) {
          set({ likedPosts: likedPosts.filter(id => id !== postId) });
        } else {
          set({ likedPosts: [...likedPosts, postId] });
        }
      },
      
      // Stories
      viewedStories: [],
      markStoryViewed: (storyId) => {
        const { viewedStories } = get();
        if (!viewedStories.includes(storyId)) {
          set({ viewedStories: [...viewedStories, storyId] });
        }
      },
    }),
    {
      name: 'social-cms-storage',
      partialize: (state) => ({
        theme: state.theme,
        likedPosts: state.likedPosts,
        viewedStories: state.viewedStories,
      }),
    }
  )
);

// Initialize theme on load
export const initializeTheme = () => {
  const stored = localStorage.getItem('social-cms-storage');
  if (stored) {
    const parsed = JSON.parse(stored);
    const theme = parsed.state?.theme || 'light';
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }
};
