import { LayeredBackground } from "animated-backgrounds";

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
    <div>
      <LayeredBackground layers={layers} />
      {/* Your content */}
    </div>
  );
}

export default App;
