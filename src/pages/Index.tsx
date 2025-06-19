import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Tilt from "react-parallax-tilt";
import LiquidGlass from "liquid-glass-react";
import TestLiquidGlass from "./TestLiquidGlass";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/background.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Hero Content */}

        <div className="relative z-10 flex items-center justify-center h-full px-4 ">
          <Tilt
            glareEnable={true}
            glareMaxOpacity={1}
            scale={1.03}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            tiltAngleXInitial={1.5}
            tiltAngleYInitial={-1}
            transitionSpeed={5000}
            perspective={500}
            className="overflow-hidden rounded-xl"
          >
            <div
              className="
              relative
              max-w-4xl mx-auto
              rounded-xl
              p-4 sm:p-8
              overflow-hidden
              backdrop-blur-sm
            "
              style={{ "box-shadow": "inset 0px 0px 30px 0px #ccc" }}
            >
              <div className="relative z-10 inner-element">
                <div className="text-white mb-6 inner-element ">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight leading-tight">
                    we are
                  </div>
                  <div className="underline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
                    ALBERTA BIONIX
                  </div>
                </div>
                <p className="text-white text-lg sm:text-xl md:text-2xl/tight max-w-2xl mb-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque feugiat libero sed purus cnvallis pharetra.
                  Vestibulum faucibus magna quis convallis.
                </p>
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold transition-all duration-100 transform hover:scale-105"
                >
                  Join us
                </Button>
              </div>
            </div>
          </Tilt>
        </div>
      </section>

      {/* Mission Statement Tickers */}
      <section className="bg-gray-100 py-4 overflow-hidden">
        <div className="whitespace-nowrap animate-scroll">
          <div className="inline-flex items-center space-x-8 text-sm sm:text-base text-gray-600 font-medium">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="flex items-center space-x-8">
                <span
                  className={cn(
                    "px-3 py-1",
                    i % 2 === 1
                      ? "text-red-600 font-semibold"
                      : "text-gray-500",
                  )}
                >
                  our mission
                </span>
                <span className="text-gray-300">•</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-center items-center gap-12">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/grid.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.1,
            pointerEvents: "none",
          }}
        />
        <div>
          <div className="max-w-6xl mx-auto relative z-10">
            {/* Main Headline */}
            <div className="mb-12 lg:mb-16">
              <h2 className="text-red-700 font-bold leading-tight">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-montserrat font-extralight ">
                  <span className="font-black">ENGINEER</span> ACCESSIBILITY.
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl mt-2 font-montserrat font-extralight ">
                  <span className="font-black">PROTOTYPE </span>
                  SOLUTIONS.
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl mt-2 font-montserrat font-extralight">
                  <span className="font-black">EMPOWER </span>
                  PEOPLE.
                </div>
              </h2>
            </div>

            {/* Flex container for content and image grid */}
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              {/* Left: Text and CTA */}
              <div className="flex-1">
                <div className="max-w-4xl">
                  <p className="text-gray-700 text-lg sm:text-xl lg:text-2xl leading-relaxed">
                    Established in 2018, Alberta Bionix is a student-led
                    engineering project group dedicated to advancing mental and
                    physical accessibility technologies in the healthcare
                    industry.{" "}
                    <span className="italic">
                      Our mission is to bridge the gap between engineering and
                      medicine to create innovative solutions that improve the
                      quality of life for patients
                    </span>{" "}
                    - particularly those with disabilities or mobility
                    challenges. Through collaboration with healthcare
                    professionals, researchers, and organizations, we aim to
                    make a lasting impact on patient care. As a club, we foster
                    a hands-on, interdisciplinary learning environment where
                    members can strengthen and refine their skills while
                    contributing to impactful projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center z-10">
          <div className="grid lg:grid-cols-1 grid-cols-3 gap-6">
            <img
              src="/card_images/1.jpg"
              alt="Grid 1"
              className="rounded-xl shadow-lg w-64 h-44 object-cover transition-transform duration-300 hover:scale-105 "
            />
            <img
              src="/card_images/2.jpg"
              alt="Grid 2"
              className="rounded-xl shadow-lg w-64 h-44 object-cover transition-transform duration-300 hover:scale-105"
            />
            <img
              src="/card_images/3.jpg"
              alt="Grid 3"
              className="rounded-xl shadow-lg w-64 h-44 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </section>
      {/* Call to Action Section */}
      <div>
        <div className="bg-gray-50 rounded-2xl p-8 sm:p-12 lg:p-16">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Ready to make an impact?
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              Join our team of passionate engineers and researchers working to
              create solutions that matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 text-lg font-semibold"
              >
                Get Involved
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-red-700 text-red-700 hover:bg-red-50 px-8 py-3 text-lg font-semibold"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      <section className="h-[80dvh] bg-stone-900 m-0 p-0 relative">
        <div className="z-0 absolute top-0 left-0 w-full h-full grid grid-rows-[1fr_2fr_0.5fr_0.75fr_0.5fr] grid-cols-5 gap-0">
          {Array.from({ length: 25 }).map((_, i) => {
            // Row 2, Col 2: index 6 (0-based, row*5+col = 1*5+1)
            if (i === 6) {
              return (
                <div
                  key={i}
                  className="group border border-sky-900 w-full h-full flex items-center justify-center bg-stone-900 transition-shadow duration-200 hover:shadow-[0_0_32px_8px_rgba(59,130,246,0.5)]"
                >
                  <img
                    src="/medication.png"
                    alt="Medication"
                    className="w-full h-full object-cover transition-transform duration-200 "
                  />
                </div>
              );
            }
            // Row 2, Col 4: index 8 (1*5+3)
            if (i === 8) {
              return (
                <div
                  key={i}
                  className="group border  border-orange-800 w-full h-full flex items-center justify-center bg-stone-900 transition-shadow duration-200 hover:shadow-[0_0_32px_8px_rgba(246,90,59,0.3)]"
                >
                  <img
                    src="/alex.jpeg"
                    alt="Alex"
                    className="w-full h-full object-cover transition-transform duration-200"
                  />
                </div>
              );
            }

            // Row 3, Col 2: index 11
            if (i === 11) {
              return (
                <div
                  key={i}
                  className="group bg-stone-800 border border-sky-900 w-full h-full flex items-center transition-shadow duration-200 hover:shadow-[0_0_32px_8px_rgba(59,130,246,0.5)]"
                >
                  <span className="text-white text-lg font-extrabold font-montserrat p-3 transition-shadow duration-200 ">
                    Smart Medication Manager
                  </span>
                </div>
              );
            }
            // Row 3, Col 4: index 13
            if (i === 13) {
              return (
                <div
                  key={i}
                  className="group bg-stone-800 border border-orange-800 w-full h-full flex items-center transition-shadow duration-200 hover:shadow-[0_0_32px_8px_rgba(246,90,59,0.3)]"
                >
                  <span className="text-white text-lg font-extrabold font-montserrat p-3 transition-shadow duration-200 ">
                    ALEX Exoskeleton
                  </span>
                </div>
              );
            }
            // Row 4, Col 2: index 16
            if (i === 16) {
              return (
                <div
                  key={i}
                  className="group bg-stone-800 border border-sky-900 w-full h-full flex items-center justify-center p-2 transition-shadow duration-200 hover:shadow-[0_0_32px_8px_rgba(59,130,246,0.5)]"
                >
                  <span className="text-white text-lg font-thin transition-shadow duration-200 ">
                    A device used to facilitate a user's quality of life through
                    medication management.
                  </span>
                </div>
              );
            }
            // Row 4, Col 4: index 18
            if (i === 18) {
              return (
                <div
                  key={i}
                  className="group bg-stone-800 border border-orange-800 w-full h-full flex items-center justify-center p-2 transition-shadow duration-200 hover:shadow-[0_0_32px_8px_rgba(246,90,59,0.3)]"
                >
                  <span className="text-white text-lg font-thin transition-shadow duration-200 ">
                    An upper body exoskeleton designed to reduce repetitive
                    strain injuries and provide feedback on a user's posture.
                  </span>
                </div>
              );
            }
            // Default cell
            return (
              <div
                key={i}
                className="border border-white/10 w-full h-full transition-shadow duration-200 hover:shadow-[0_0_32px_8px_rgba(100,100,100,0.5)]"
              />
            );
          })}
        </div>
        <div className="sticky top-2 w-full justify-center z-40 h-24 flex  ">
          <div
            style={{ "box-shadow": "inset 1px 1px 1px 1px #ccc" }}
            className=" backdrop-blur-sm border-2 border-white/30 rounded-3xl shadow-[0_0_50px_3px_rgba(100,100,100,0.5)] w-7/12 mt-3 py-2 flex items-center justify-center"
          >
            <div className="text-center font-montserrat font-black text-stone-300 text-4xl rounded-3xl">
              PREVIOUS & CURRENT PROJECTS
            </div>
          </div>
        </div>
      </section>

      {/* <TestLiquidGlass /> */}
      {/* 
      <LiquidGlass>
        <div className="p-6">
          <h2>Your content here</h2>
          <p>This will have the liquid glass effect</p>
        </div>
      </LiquidGlass> */}

      {/* Footer */}
      <footer className="bg-stone-950 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h4 className="text-2xl font-bold mb-2">ALBERTA BIONIX</h4>

            <div className="mt-2 pt-2 border-t border-stone-800">
              <p className="text-stone-500 text-sm">© 2025 Alberta Bionix</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
