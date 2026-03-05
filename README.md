# Sonara 🎵

A full-stack music streaming and management platform for artists to upload, organize, and share their music.

## Features

- **🔐 User Authentication** - Secure registration and login system
- **🎼 Track Management** - Upload music files with cover art and metadata
- **💿 Album Creation** - Organize tracks into albums with custom artwork
- **🎨 Artist Studio** - Dashboard for artists to manage their content
- **🎧 Music Discovery** - Browse and discover music
- **⚡ Real-time Progress** - Upload tracking with visual feedback

## Tech Stack

### Frontend

- React 18 + Vite
- Tailwind CSS
- Lucide React Icons
- React Router for navigation
- Axios for API calls

### Backend

- Node.js + Express
- MongoDB
- JWT Authentication
- File storage service integration

## Project Structure

```
Sonara/
├── Backend/
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API endpoints
│   │   ├── middlewares/     # Auth & validation
│   │   ├── services/        # File storage logic
│   │   └── db/              # Database connection
│   ├── server.js            # Server entry point
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── components/      # React components
    │   ├── pages/           # Page components
    │   ├── services/        # API services
    │   ├── context/         # Auth context
    │   └── utils/           # Helper functions
    ├── vite.config.js
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB connection string
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/sonara.git
cd sonara
```

2. **Backend Setup**

```bash
cd Backend
npm install
# Create .env file with MongoDB URI and other configs
npm run dev
```

3. **Frontend Setup**

```bash
cd Frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

## API Endpoints

### Auth

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Music

- `GET /api/music` - Get all music
- `GET /api/music/my` - Get user's music
- `POST /api/music` - Upload new track
- `DELETE /api/music/:id` - Delete track

### Albums

- `GET /api/albums` - Get all albums
- `GET /api/albums/:id` - Get album details
- `POST /api/albums` - Create album

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.
