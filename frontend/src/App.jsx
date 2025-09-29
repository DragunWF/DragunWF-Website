import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LayeredBackground } from "animated-backgrounds";

import { adminSiteUrl, pageLinks } from "./constants/urls";
import ExternalRedirect from "./helpers/ExernalRedirect";

import Homepage from "./pages/Homepage";
import AnonymousMessage from "./pages/AnonymousMessage";
import About from "./pages/About";
import Blog from "./pages/Blog";
import ApologyPage from "./pages/ApologyPage";

import Navigation from "./components/ui/Navigation";
import BlogPost from "./components/blog/BlogPost";

function App() {
  const animatedBackgroundLayers = [
    {
      animation: "starryNight",
      opacity: 0.8,
      blendMode: "normal",
      speed: 0.4,
      colors: ["#1a202c", "#2d3748", "#4a5568"],
    },
    {
      animation: "particleNetwork",
      opacity: 0.4,
      blendMode: "screen",
      speed: 1.0,
      colors: ["#22c55e", "#10b981", "#059669"],
    },
    {
      animation: "cosmicDust",
      opacity: 0.3,
      blendMode: "overlay",
      speed: 0.6,
      colors: ["#374151", "#4b5563", "#6b7280"],
    },
  ];

  return (
    <BrowserRouter>
      <LayeredBackground layers={animatedBackgroundLayers} />
      <Navigation />

      <Routes>
        <Route index element={<Homepage />} />
        <Route path={pageLinks.about} element={<About />} />
        <Route path={pageLinks.blog} element={<Blog />} />
        <Route path={`${pageLinks.blog}/:postId`} element={<BlogPost />} />
        <Route
          path={pageLinks.anonymousMessage}
          element={<AnonymousMessage />}
        />
        <Route
          path="/admin"
          element={<ExternalRedirect url={adminSiteUrl} />}
        />
        <Route path="*" element={<ApologyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
