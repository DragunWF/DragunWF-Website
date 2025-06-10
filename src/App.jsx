import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LayeredBackground } from "animated-backgrounds";
import Homepage from "./pages/Homepage";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Blog from "./pages/Blog";
import ApologyPage from "./pages/ApologyPage";

function App() {
  const layers = [
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
      <LayeredBackground layers={layers} />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route path="*" element={<ApologyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
