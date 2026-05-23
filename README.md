# TikTok Content Planner App

A comprehensive web application for planning, scheduling, and managing TikTok content. Create content calendars, track analytics, discover trending content, and optimize your TikTok strategy.

## Features

- 📅 **Content Calendar**: Plan and schedule your TikTok videos
- 📊 **Analytics Dashboard**: Track views, likes, comments, and engagement
- 🔥 **Trending Content**: Discover what's trending in real-time
- #️⃣ **Hashtag Suggestions**: Get AI-powered hashtag recommendations
- 📱 **Video Management**: Upload, edit, and organize your content
- 🎯 **Content Strategy**: Analyze best posting times and content types
- 📋 **Batch Scheduling**: Schedule multiple videos at once

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Redux for state management
- Axios for HTTP requests

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication
- AWS S3 for video storage

## Project Structure

```
tiktok_planner_app/
├── frontend/              # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── services/
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
├── backend/               # Express API server
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── server.ts
│   ├── package.json
│   └── .env.example
├── docs/                  # Documentation
└── .gitignore
```

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- MongoDB
- AWS S3 account (optional, for video storage)

### Installation

1. Clone the repository
```bash
git clone https://github.com/coberich/tiktok_planner_app.git
cd tiktok_planner_app
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Setup environment variables
```bash
# In backend/.env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_S3_BUCKET=your_bucket_name
```

5. Run the application
```bash
# Terminal 1 - Backend (from backend/)
npm run dev

# Terminal 2 - Frontend (from frontend/)
npm run dev
```

Visit `http://localhost:5173` for the frontend and `http://localhost:5000` for the API.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Content
- `GET /api/content` - Get all content
- `POST /api/content` - Create new content
- `PUT /api/content/:id` - Update content
- `DELETE /api/content/:id` - Delete content

### Analytics
- `GET /api/analytics` - Get analytics data
- `GET /api/analytics/:contentId` - Get specific content analytics

### Trending
- `GET /api/trending/hashtags` - Get trending hashtags
- `GET /api/trending/sounds` - Get trending sounds
- `GET /api/trending/content` - Get trending content

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@tiktokplanner.com or open an issue on GitHub.
