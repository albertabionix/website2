import LiquidGlass from "liquid-glass-react";

export default function TestLiquidGlass() {
  return (
    <div
      className=" flex h-dvh"
      style={{
        backgroundImage: "url('/card_images/3.jpg')", // Use your own image path here
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <LiquidGlass
        mode="standard"
        displacementScale={100}
        blurAmount={0.2}
        saturation={140}
        aberrationIntensity={4}
        elasticity={0.0}
        cornerRadius={100}
        className="border-2 border-white/30 rounded-[100px]"
      >
        <h2 className="text-2xl font-bold text-white text-center h-3 flex items-center justify-center">
          PROJECTS
        </h2>
      </LiquidGlass>
    </div>
  );
}
