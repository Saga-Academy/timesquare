// CMS Data Models

export interface Post {
  id: string;
  author: string;
  avatar: string;
  text: string;
  media?: string;
  mediaType?: 'image' | 'video';
  createdAt: string;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  createdAt: string;
}

export interface Story {
  id: string;
  author: string;
  avatar: string;
  media: string;
  mediaType?: 'image' | 'video';
  expiresAt: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  followers?: number;
  following?: number;
  posts?: number;
}

export type Theme = 'light' | 'dark';

export interface AppState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}
