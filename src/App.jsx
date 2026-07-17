import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "./ui/AppLayout";
import AdsPage from "./pages/AdsPage";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import AdDetailPage from "./pages/AdDetailPage";
import ChatLayout from "./pages/ChatLayout";
import ProfilePage from "./pages/ProfilePage";
import MyAdsPage from "./pages/MyAdsPage";
import EditAdPage from "./pages/EditAdPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className:
            "font-sansReg bg-dark-800 text-white border border-white/10",
          duration: 3000,
          style: {
            background: "#1E232B",
            color: "#fff",
            padding: "16px",
            borderRadius: "12px",
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />} />
          <Route path="/ads" element={<AdsPage />} />
          <Route path="/ad/:id" element={<AdDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/my-ads" element={<MyAdsPage />} />
          <Route path="/edit-ad/:id" element={<EditAdPage />} />

          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />

          <Route path="/chat" element={<ChatLayout />} />
          <Route path="/chat/:conversationId" element={<ChatLayout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
