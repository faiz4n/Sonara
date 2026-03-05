import Sidebar from "./components/layout/Sidebar";
import Albums from "./pages/Albums";
import ArtistStudio from "./pages/ArtistStudio";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Standalone pages (no sidebar) — only for guests */}
          <Route element={<GuestRoute />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Pages with sidebar — protected */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/*"
              element={
                <div className="h-screen text-white flex">
                  <Sidebar />
                  <div className="ml-80 w-full">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/albums" element={<Albums />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route element={<ProtectedRoute requiredRole="artist" />}>
                        <Route
                          path="/artist-studio"
                          element={<ArtistStudio />}
                        />
                      </Route>
                    </Routes>
                  </div>
                </div>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
