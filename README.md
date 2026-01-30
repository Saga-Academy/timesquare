# Social CMS App

A static React + TypeScript social media application with a manual CMS workflow, designed for GitHub Pages deployment. No backend required - all content is managed through JSON files in the repository.

![Social CMS App](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan?logo=tailwindcss)

## Features

- **Feed Page**: Browse posts from JSON data with likes and comments
- **Stories Viewer**: Auto-progressing stories with tap navigation
- **User Profiles**: View user profiles with posts, followers, and bio
- **Dark/Light Mode**: Toggle between themes with localStorage persistence
- **Responsive Design**: Mobile-first UI that works on all devices
- **Framer Motion**: Smooth animations and transitions
- **Zustand State**: Lightweight client-side state management

## CMS Workflow

This app uses a **manual CMS** approach where all content is stored in JSON files:

```
src/content/
├── posts.json    # All posts data
├── stories.json  # Stories data
└── users.json    # User profiles
```

### How to Update Content

1. **Edit JSON files** in the `src/content/` directory
2. **Add images** to the `public/assets/` directory
3. **Commit and push** to GitHub
4. **GitHub Actions** automatically rebuilds and deploys

### Content Structure

#### Post Model
```json
{
  "id": "post1",
  "author": "Sarah Chen",
  "avatar": "/assets/avatar1.jpg",
  "text": "Post content here...",
  "media": "/assets/post1.jpg",
  "mediaType": "image",
  "createdAt": "2026-01-30T10:30:00Z",
  "likes": 234,
  "comments": [
    {
      "id": "c1",
      "author": "Marcus Johnson",
      "avatar": "/assets/avatar2.jpg",
      "text": "Great post!",
      "createdAt": "2026-01-30T11:15:00Z"
    }
  ]
}
```

#### Story Model
```json
{
  "id": "story1",
  "author": "Sarah Chen",
  "avatar": "/assets/avatar1.jpg",
  "media": "/assets/story1.jpg",
  "mediaType": "image",
  "expiresAt": "2026-01-31T10:30:00Z"
}
```

#### User Model
```json
{
  "id": "user1",
  "name": "Sarah Chen",
  "avatar": "/assets/avatar1.jpg",
  "bio": "Photographer & Travel enthusiast",
  "followers": 1247,
  "following": 342,
  "posts": 89
}
```

## Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/social-cms-app.git
cd social-cms-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### GitHub Pages Deployment

1. **Fork this repository** to your GitHub account

2. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: GitHub Actions

3. **Update base URL** (if using project page):
   - Edit `vite.config.ts`
   - Change `BASE_URL` to match your repo name

4. **Push to main branch** - GitHub Actions will deploy automatically

## Manual Content Updates via GitHub UI

### Adding a New Post

1. Go to your repository on GitHub
2. Navigate to `src/content/posts.json`
3. Click the pencil icon to edit
4. Add a new post object to the `posts` array:

```json
{
  "id": "post7",
  "author": "Sarah Chen",
  "avatar": "/assets/avatar1.jpg",
  "text": "Your new post content here!",
  "media": "/assets/post7.jpg",
  "mediaType": "image",
  "createdAt": "2026-01-30T12:00:00Z",
  "likes": 0,
  "comments": []
}
```

5. Commit changes with a message like "Add new post"
6. The site will rebuild and deploy automatically (takes ~2 minutes)

### Adding Images

1. Go to `public/assets/` directory
2. Click "Add file" → "Upload files"
3. Upload your image (JPG, PNG recommended)
4. Commit the changes
5. Reference the image in your JSON: `/assets/your-image.jpg`

### Adding a New User

1. Edit `src/content/users.json`
2. Add a new user object:

```json
{
  "id": "user6",
  "name": "New User",
  "avatar": "/assets/avatar6.jpg",
  "bio": "Your bio here",
  "followers": 0,
  "following": 0,
  "posts": 0
}
```

## Project Structure

```
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions deployment
├── public/
│   └── assets/             # Images and media files
│       ├── avatar1.jpg
│       ├── post1.jpg
│       └── story1.jpg
├── src/
│   ├── content/            # CMS JSON files
│   │   ├── posts.json
│   │   ├── stories.json
│   │   └── users.json
│   ├── sections/           # React components
│   │   ├── Header.tsx
│   │   ├── Feed.tsx
│   │   ├── PostCard.tsx
│   │   ├── Stories.tsx
│   │   ├── StoryViewer.tsx
│   │   └── Profile.tsx
│   ├── store/
│   │   └── useAppStore.ts  # Zustand state management
│   ├── types/
│   │   └── index.ts        # TypeScript types
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Customization

### Changing the Theme Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#your-color',
        dark: '#your-dark-color',
      }
    }
  }
}
```

### Adding New Content Types

1. Create a new JSON file in `src/content/`
2. Define TypeScript types in `src/types/index.ts`
3. Import and use in `src/store/useAppStore.ts`
4. Create a component to display the content

## Constraints

- **No authentication backend** - All content is public
- **No real file uploads** - Images must be added to the repository
- **No server-side rendering** - Static build only
- **Build time data** - Content is loaded at build time, not runtime

## Technologies

- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Framer Motion](https://www.framer.com/motion/)

## License

MIT License - feel free to use this for your own projects!

## Support

For issues or questions, please open a GitHub issue.
