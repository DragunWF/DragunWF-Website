import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LayeredBackground } from "animated-backgrounds";
import { adminSiteUrl } from "./helpers/linkUtils";
import ExternalRedirect from "./helpers/ExernalRedirect";
import Homepage from "./pages/Homepage";
import AnonymousMessage from "./pages/AnonymousMessage";
import About from "./pages/About";
import Blog from "./pages/Blog";
import ApologyPage from "./pages/ApologyPage";
import Navigation from "./components/Navigation";
import BlogPost from "./components/BlogPost";

function App() {
  const animatedBackgroundLayers = [
    {
      animation: "starryNight",
      opacity: 0.7,
      blendMode: "normal",
      speed: 0.5,
    },
    {
      animation: "particleNetwork",
      opacity: 0.3,
      blendMode: "screen",
      speed: 1.2,
    },
    {
      animation: "cosmicDust",
      opacity: 0.5,
      blendMode: "overlay",
      speed: 0.8,
    },
  ];

  return (
    <BrowserRouter>
      <LayeredBackground layers={animatedBackgroundLayers} />
      <Navigation />

      <Routes>
        <Route index element={<Homepage />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:postId" element={<BlogPost />} />
        <Route path="anonymous-message" element={<AnonymousMessage />} />
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
