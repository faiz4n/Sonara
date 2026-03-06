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
import SidebarMobile from "./components/layout/SidebarMobile";
import PageHeader from "./components/layout/PageHeader";
import Header from "./components/UI/Header";

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
                <div className="h-screen text-white flex flex-col">
                  <Sidebar />
                  <Header />
                  <div className="flex-1 overflow-y-auto overflow-x-hidden md:ml-80 max-md:mb-19 w-full md:w-auto">
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
                  <SidebarMobile />
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
