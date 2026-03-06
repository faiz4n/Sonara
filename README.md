# Sonara 🎵

A full-stack music streaming and management platform for artists to upload, organize, and share their music.

## Overview

Sonara is a web application that empowers artists to manage their music library with ease. It provides tools to upload individual tracks with metadata, create curated albums, and share music with listeners in an intuitive interface.

## Features

- **🔐 User Authentication** - Secure registration and login system
- **🎼 Track Management** - Upload music files with cover art and metadata
- **💿 Album Creation** - Organize tracks into albums with custom artwork
- **🎨 Artist Studio** - Dashboard for artists to manage their content and albums
- **🎧 Music Discovery** - Browse and discover all available music and albums
- **⚡ Real-time Progress** - Upload tracking with visual feedback
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices
- **👤 User Profiles** - View and manage profile information

## Tech Stack

### Frontend

- React 18 + Vite
- Tailwind CSS for styling
- Lucide React Icons
- React Router for navigation
- Axios for API calls

### Backend

- Node.js + Express
- MongoDB for database
- JWT Authentication
- ImageKit for file storage
- Multer for file handling

## Project Structure

```
Sonara/
├── Backend/
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── models/          # MongoDB schemas (User, Music, Album)
│   │   ├── routes/          # API endpoints
│   │   ├── middlewares/     # Auth & validation
│   │   ├── services/        # File storage logic
│   │   └── db/              # Database connection
│   ├── server.js            # Server entry point
│   ├── seed.js              # Database seeding
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── artist/      # Artist-specific components
    │   │   ├── forms/       # Form components (Login, Register, Upload, Album)
    │   │   ├── layout/      # Layout components (Sidebar, PageHeader)
    │   │   ├── music/       # Music display components (AlbumList, TrackList)
    │   │   └── UI/          # Reusable UI components
    │   ├── pages/           # Page components
    │   ├── services/        # API service calls
    │   ├── context/         # Auth context
    │   └── utils/           # Helper functions
    ├── vite.config.js
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB connection string
- ImageKit API credentials
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/faiz4n/Sonara.git
cd sonara
```

2. **Backend Setup**

```bash
cd Backend
npm install

# Create .env file with:
# MONGODB_URI=your_mongodb_uri
# IMAGEKIT_PRIVATE_KEY=your_imagekit_key
# PORT=5000

npm run dev
```

3. **Frontend Setup**

```bash
cd Frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend API will run on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Music

- `GET /api/music` - Get all music
- `GET /api/music/me` - Get user's uploaded tracks (requires auth)
- `POST /api/music/upload` - Upload new track (requires auth, multipart/form-data)
- `POST /api/music/delete/:musicId` - Delete track (requires auth)

### Albums

- `GET /api/music/album` - Get all albums
- `GET /api/music/album/:albumId` - Get album details
- `POST /api/music/album` - Create new album (requires auth, multipart/form-data)

## Recent Updates

### Version 1.1 - March 7, 2026

- ✅ Built complete profile page with user information
- ✅ Fixed album creation with proper validation
- ✅ Implemented track selection for album creation
- ✅ Added mobile-responsive layouts
- ✅ Enhanced form error handling



## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

---

**Last Updated:** March 7, 2026
