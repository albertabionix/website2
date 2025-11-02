import { useEffect, useState, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Tilt from "react-parallax-tilt";
import LiquidGlass from "liquid-glass-react";
import TestLiquidGlass from "./TestLiquidGlass";

// Carousel component for CURRENT PROJECTS
const CarouselPlaceholder = () => {
  const slides = [
    {
      title: "EMG Prosthetic Leg",
      smallSubtitle: "",
      subtitle:
        "Developing electromyography integration for intuitive control, sensor fusion, and real-time actuation of the prosthetic leg.",
    },
    {
      title: "Mechanical",
      smallSubtitle: "Chassis, prototyping & manufacturing",
      subtitle:
        "Responsible for structural design, CAD, materials selection, and rapid prototyping to create a robust prosthetic chassis and mounting systems.",
    },
    {
      title: "Electrical",
      smallSubtitle: "Sensors, power & control electronics",
      subtitle:
        "Designing circuitry, sensor integration, motor drivers, and power management to enable reliable sensing and actuation for the prototype.",
    },
    {
      title: "Software",
      smallSubtitle: "Signal processing, ML & control",
      subtitle:
        "Implementing EMG/EEG signal processing, and real-time control software to translate user intent into movement.",
    },
    {
      title: "Physiology",
      smallSubtitle: "User testing, gait & ergonomics",
      subtitle:
        "Conducting biomechanics analysis, user-centered testing, and ergonomic tuning to ensure safety, comfort, and effective assistance.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const transitioningRef = useRef<number | null>(null);
  const TRANSITION_MS = 300; // fade duration in ms

  const changeTo = (nextIndex: number) => {
    if (transitioningRef.current) {
      window.clearTimeout(transitioningRef.current);
      transitioningRef.current = null;
    }

    // Start fade out
    setVisible(false);

    // After fade out completes, swap slide and fade in
    transitioningRef.current = window.setTimeout(() => {
      setCurrent(nextIndex);
      setVisible(true);
      transitioningRef.current = null;
    }, TRANSITION_MS);
  };

  const prev = () => changeTo((current - 1 + slides.length) % slides.length);
  const next = () => changeTo((current + 1) % slides.length);

  return (
    <div className="w-full max-w-3xl mx-auto relative flex items-center">
      <button
        aria-label="Previous"
        onClick={prev}
        className="z-20   text-stone-900 rounded-full p-3 flex items-center justify-center transition"
      >
        <span className="text-2xl select-none">‹</span>
      </button>

      <div className="w-full px-8 py-10 mx-4 rounded-md text-left min-h-[260px] flex items-center overflow-hidden">
        <div className="relative w-full">
          <div
            className="transition-opacity duration-300"
            style={{ opacity: visible ? 1 : 0 }}
            aria-live="polite"
          >
            <h4 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mb-2">
              {slides[current].title}
            </h4>
            {slides[current].smallSubtitle && (
              <div className="text-sm text-stone-500 italic mb-3">
                ({slides[current].smallSubtitle})
              </div>
            )}
            <p className="text-stone-700 text-lg leading-relaxed">
              {slides[current].subtitle}
            </p>
          </div>
        </div>
      </div>

      <button
        aria-label="Next"
        onClick={next}
        className="z-20 backdrop-blur-sm  text-stone-900 rounded-full p-3 flex items-center justify-center transition"
      >
        <span className="text-2xl select-none">›</span>
      </button>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => changeTo(idx)}
            className={
              "w-2 h-2 rounded-full transition " +
              (idx === current ? "bg-stone-900" : "bg-white/40")
            }
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Index = () => {
  const fillerImages = [
    "./filler1.png",
    "./filler2.png",
    "./filler3.png",
    "./filler4.jpg",
    "./filler5.jpg",
    "./filler6.jpg",
    "./filler7.jpg",
  ];

  const [isMobile, setIsMobile] = useState(false);
  const [showSmartMedModal, setShowSmartMedModal] = useState(false);

  // Smooth scroll helper and join handler
  const smoothScrollTo = (id: string) => {
    if (typeof window === "undefined") return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openJoin = () =>
    window.open(
      "https://forms.gle/SMaNMvi8qLGoNLtu6",
      "_blank",
      "noopener noreferrer",
    );

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Interactive image pan state for CURRENT PROJECTS
  const [imgOffset, setImgOffset] = useState({ x: 0, y: 0 });

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1

    // Amount of pan in pixels (tweak values for desired feel)
    const maxX = Math.min(40, rect.width * 0.03); // up to ~6% of width, capped
    const maxY = Math.min(24, rect.height * 0.04);

    const moveX = (x - 0.5) * 2 * maxX; // -maxX..+maxX
    const moveY = (y - 0.5) * 2 * maxY; // -maxY..+maxY

    setImgOffset({ x: moveX, y: moveY });
  };

  const handleImageLeave = () => {
    setImgOffset({ x: 0, y: 0 });
  };

  // Set grid size and special indices based on breakpoint
  const gridSize = isMobile ? 10 : 25;
  // For mobile, use your requested indices for special cells
  const mobileSpecialIndices = [2, 3, 4, 5, 6, 7]; // adjust as needed for images/text
  const desktopSpecialIndices = [6, 8, 11, 13, 16, 18];
  const specialIndices = isMobile
    ? mobileSpecialIndices
    : desktopSpecialIndices;

  // Filler logic (memoized so it doesn't reshuffle on unrelated rerenders)
  const fillerMap: Record<number, string> = useMemo(() => {
    const availableIndices = Array.from(
      { length: gridSize },
      (_, i) => i,
    ).filter((i) => !specialIndices.includes(i));

    function getRandomIndices(arr: number[], n: number) {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, n);
    }

    const randomFillerIndices = getRandomIndices(
      availableIndices,
      Math.min(fillerImages.length, availableIndices.length),
    );

    const map: Record<number, string> = {};
    randomFillerIndices.forEach((cellIdx, i) => {
      map[cellIdx] = fillerImages[i];
    });

    return map;
  }, [gridSize]);

  return (
    <div className="min-h-screen bg-transparent">
      <nav className="fixed top-3 left-1/2 transform -translate-x-1/2 z-50">
        <div className="inline-flex items-center gap-6 rounded-xl bg-black/10 backdrop-blur-md border border-white/10   px-4 py-2 shadow-2xl">
          <button
            onClick={() => smoothScrollTo("mission")}
            className="text-white font-semibold text-sm "
          >
            Mission
          </button>
          <button
            onClick={() => smoothScrollTo("previous-projects")}
            className="text-white font-semibold text-sm "
          >
            Projects
          </button>
          <button
            onClick={() => smoothScrollTo("meet-team")}
            className="text-white font-semibold text-sm "
          >
            Us
          </button>
          <button
            onClick={openJoin}
            className=" text-white px-3 py-1 rounded-md text-sm font-semibold "
          >
            Join
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="./background.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
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
            glarePosition="top"
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
                  <div className="underline text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-snug sm:leading-tight">
                    ALBERTA BIONIX
                  </div>
                </div>
                <p className="text-white text-lg sm:text-xl md:text-2xl/tight max-w-2xl mb-8">
                  Alberta Bionix is a student-led team developing innovative
                  healthcare technologies, currently focused on creating an
                  EMG-controlled leg prosthesis to empower mobility through
                  muscle signals.
                </p>
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold transition-all duration-100 transform hover:scale-105"
                  asChild
                >
                  <a
                    href="https://forms.gle/SMaNMvi8qLGoNLtu6"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join us
                  </a>
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
      <section
        id="mission"
        className="relative py-7 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-center items-center gap-12"
      >
        <div
          className="absolute inset-0 z-0 bg-fixed"
          style={{
            backgroundImage: "url('./grid.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
            pointerEvents: "none",
          }}
        />
        <div>
          <div className="max-w-6xl mx-auto relative z-10">
            {/* Main Headline */}
            <div className="mb-6 lg:mb-16">
              <h2 className="text-red-700 font-bold leading-tight">
                <div className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-montserrat font-extralight leading-snug">
                  <span className="font-black">ENGINEER</span> ACCESSIBILITY.
                </div>
                <div className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl mt-2 font-montserrat font-extralight leading-snug">
                  <span className="font-black">PROTOTYPE </span>
                  SOLUTIONS.
                </div>
                <div className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl mt-2 font-montserrat font-extralight leading-snug">
                  <span className="font-black">EMPOWER </span>
                  PEOPLE.
                </div>
              </h2>
            </div>

            {/* Flex container for content and image grid */}
            <div className="flex flex-col lg:flex-row gap-12 items-start">
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
              src="./card_images/1.jpg"
              alt="Grid 1"
              className="rounded-xl shadow-lg w-64 h-44 object-cover transition-transform duration-300 hover:scale-105 "
            />
            <img
              src="./card_images/2.jpg"
              alt="Grid 2"
              className="rounded-xl shadow-lg w-64 h-44 object-cover transition-transform duration-300 hover:scale-105"
            />
            <img
              src="./card_images/3.jpg"
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
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-black text-gray-900 mb-6">
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
                asChild
              >
                <a
                  href="https://forms.gle/SMaNMvi8qLGoNLtu6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Involved
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CURRENT PROJECTS Section */}
      <section className="relative bg-white ">
        <div className="  flex flex-col lg:flex-row items-stretch gap-0">
          {/* Left: Carousel & Header */}
          <div className="lg:w-1/2 w-full flex flex-col order-first">
            <div className="relative overflow-hidden px-6 py-6 text-center rounded-none group">
              {/* Striped construction tape background */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(-45deg, #d9a002 0 40px, #1c1c1c 40px 80px)",
                }}
                aria-hidden
              />
              <h3 className="relative text-5xl sm:text-7xl font-extrabold tracking-tight uppercase text-white drop-shadow-md">
                <span className="inline-block">
                  CURRENT PROJECT
                  <span className="block h-1 bg-white rounded transform scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100 w-full" />
                </span>
              </h3>
            </div>

            <div className="relative bg-stone-800/20 border border-white/20   p-3 lg:p-10 pt-1 lg:pt-1 flex-1 flex items-center justify-center">
              <CarouselPlaceholder />
            </div>
          </div>

          <div className="lg:w-1/2 w-full overflow-hidden relative shadow-lg order-last">
            <div
              className="w-full h-64 sm:h-96 lg:h-full relative overflow-hidden"
              onMouseMove={handleImageMouseMove}
              onMouseLeave={handleImageLeave}
            >
              <img
                src="./prototype.jpg"
                alt="Prototype"
                className="absolute inset-0 w-[110%] h-[110%] object-cover transition-transform duration-700 ease-out"
                style={{
                  transform: `translate(${imgOffset.x}px, ${imgOffset.y}px) scale(1.06)`,
                }}
              />

              <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      <section
        id="previous-projects"
        className="h-[90dvh] bg-stone-900 m-0 p-0 relative"
      >
        <div className="z-0 absolute top-0 left-0 w-full h-full grid grid-rows-[1fr_2fr_0.5fr_0.75fr_0.5fr] md:grid-cols-5 grid-cols-2 gap-0">
          {Array.from({ length: gridSize }).map((_, i) => {
            if (fillerMap[i]) {
              return (
                <div
                  key={i}
                  className="z-0 hover:z-50 border border-stone-900/80 w-full h-full bg-center bg-cover relative transition-shadow duration-200 hover:shadow-[0_0_32px_8px_rgba(100,100,100,0.5)]"
                  style={{
                    backgroundImage: `url('${fillerMap[i]}')`,
                  }}
                >
                  <div
                    key={i}
                    className="absolute inset-0 bg-black/70 w-full h-full"
                  ></div>
                </div>
              );
            }
            // Default cell
            // Row 2, Col 2: index 6 (0-based, row*5+col = 1*5+1)
            if (!isMobile) {
              if (i === 6) {
                return (
                  <div
                    key={i}
                    className="z-0 hover:z-50 group border border-sky-900 w-full h-full flex items-center justify-center bg-stone-900 transition-shadow duration-200 hover:shadow-[0_0_32px_8px_rgba(59,130,246,0.5)]"
                  >
                    <img
                      src="./medication.png"
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
                    className="z-0 hover:z-50 group border  border-orange-800 w-full h-full flex items-center justify-center bg-stone-900 transition-shadow duration-200 hover:shadow-[0_0_32px_8px_rgba(246,90,59,0.3)]"
                  >
                    <img
                      src="./alex.jpeg"
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
                    className="z-0 hover:z-50 group bg-stone-800 border border-sky-900 w-full h-full flex items-center transition-shadow duration-200 hover:shadow-[0_0_32px_8px_rgba(59,130,246,0.5)]"
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
                    className="z-0 hover:z-50 group bg-stone-800 border border-orange-800 w-full h-full flex items-center transition-shadow duration-200 hover:shadow-[0_0_32px_8px_rgba(246,90,59,0.3)]"
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
                    className="z-0 hover:z-50 group bg-stone-800 border border-sky-900 w-full h-full flex items-center justify-center p-2 transition-shadow duration-200 hover:shadow-[0_0_32px_8px_rgba(59,130,246,0.5)] z-0 hover:z-50"
                  >
                    <span className="text-white text-lg font-thin transition-shadow duration-200 ">
                      A device used to facilitate a user's quality of life
                      through medication management.
                    </span>
                  </div>
                );
              }
              // Row 4, Col 4: index 18
              if (i === 18) {
                return (
                  <div
                    key={i}
                    className="z-0 hover:z-50 group bg-stone-800 border border-orange-800 w-full h-full flex items-center justify-center p-2 transition-shadow duration-200 hover:shadow-[0_0_32px_8px_rgba(246,90,59,0.3)]"
                  >
                    <span className="text-white text-lg font-thin transition-shadow duration-200 ">
                      An upper body exoskeleton designed to reduce repetitive
                      strain injuries and provide feedback on a user's posture.
                    </span>
                  </div>
                );
              }
            } else {
              if (i === 2) {
                return (
                  <div
                    key={i}
                    className="z-0 hover:z-50 group border border-sky-900 w-full h-full flex items-center justify-center bg-stone-900 transition-shadow duration-200 hover:shadow-[0_0_32px_8px_rgba(59,130,246,0.5)]"
                  >
                    <img
                      src="./medication.png"
                      alt="Medication"
                      className="w-full h-full object-cover transition-transform duration-200 "
                    />
                  </div>
                );
              }
              if (i === 3) {
                return (
                  <div
                    key={i}
                    className="z-0 hover:z-50 group border  border-orange-800 w-full h-full flex items-center justify-center bg-stone-900 transition-shadow duration-200 hover:shadow-[0_0_32px_8px_rgba(246,90,59,0.3)]"
                  >
                    <img
                      src="./alex.jpeg"
                      alt="Alex"
                      className="w-full h-full object-cover transition-transform duration-200"
                    />
                  </div>
                );
              }

              // Row 3, Col 2: index 11
              if (i === 4) {
                return (
                  <div
                    key={i}
                    className="z-0 hover:z-50 group bg-stone-800 border border-sky-900 w-full h-full flex items-center transition-shadow duration-200 hover:shadow-[0_0_32px_8px_rgba(59,130,246,0.5)]"
                  >
                    <span className="text-white text-lg font-extrabold font-montserrat p-3 transition-shadow duration-200 ">
                      Smart Medication Manager
                    </span>
                  </div>
                );
              }
              // Row 3, Col 4: index 13
              if (i === 5) {
                return (
                  <div
                    key={i}
                    className="z-0 hover:z-50 group bg-stone-800 border border-orange-800 w-full h-full flex items-center transition-shadow duration-200 hover:shadow-[0_0_32px_8px_rgba(246,90,59,0.3)]"
                  >
                    <span className="text-white text-lg font-extrabold font-montserrat p-3 transition-shadow duration-200 ">
                      ALEX Exoskeleton
                    </span>
                  </div>
                );
              }
              // Row 4, Col 2: index 16
              if (i === 6) {
                return (
                  <div
                    key={i}
                    className="z-0 hover:z-50 group bg-stone-800 border border-sky-900 w-full h-full flex items-center justify-center p-2 transition-shadow duration-200 hover:shadow-[0_0_32px_8px_rgba(59,130,246,0.5)]"
                  >
                    <span className="text-white text-lg font-thin transition-shadow duration-200 ">
                      A device used to facilitate a user's quality of life
                      through medication management.
                    </span>
                  </div>
                );
              }
              // Row 4, Col 4: index 18
              if (i === 7) {
                return (
                  <div
                    key={i}
                    className="z-0 hover:z-50 group bg-stone-800 border border-orange-800 w-full h-full flex items-center justify-center p-2 transition-shadow duration-200 hover:shadow-[0_0_32px_8px_rgba(246,90,59,0.3)]"
                  >
                    <span className="text-white text-lg font-thin transition-shadow duration-200 ">
                      An upper body exoskeleton designed to reduce repetitive
                      strain injuries and provide feedback on a user's posture.
                    </span>
                  </div>
                );
              }
            }

            return (
              <div
                key={i}
                className="z-0 hover:z-50 border border-white/10 w-full h-full transition-shadow duration-200 hover:shadow-[0_0_32px_8px_rgba(100,100,100,0.5)]"
              />
            );
          })}
        </div>
        <div className="sticky pt-10 pb-3 top-3 w-full justify-center z-40  flex">
          <div
            style={{ "box-shadow": "inset 1px 1px 1px 1px #ccc" }}
            className=" backdrop-blur-sm border-2 border-white/30 rounded-3xl shadow-[0_0_50px_3px_rgba(100,100,100,0.5)] w-7/12 mt-3 py-2 flex flex-col items-center justify-center"
          >
            <div className=" m-1 px-3 text-center font-montserrat font-extrabold text-stone-300 md:text-3xl text-xl rounded-3xl">
              <p className="">PREVIOUS PROJECTS</p>
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

      {showSmartMedModal && (
        <div className="font-montserrat fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
              onClick={() => setShowSmartMedModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-blue-700">
              Smart Medication Manager
            </h2>
            <p className="text-gray-700 mb-2">
              The Smart Medication Manager is a device designed to help users
              manage their medication schedules, provide reminders, and ensure
              proper dosage. It features real-time monitoring, user-friendly
              interfaces, and connectivity for caregivers and healthcare
              professionals.
            </p>
            <ul className="list-disc ml-5 text-gray-600">
              <li>Automated pill dispensing</li>
              <li>Customizable reminders and alerts</li>
              <li>Remote monitoring capabilities</li>
              <li>Accessible design for all users</li>
            </ul>
          </div>
        </div>
      )}
      // Simon edited on Oct 9, 2025 at 21:13. 
      {/* Meet The Team Section */}
      <section id="meet-team" className="bg-stone-900 text-white py-20">
        <div className="lg:max-w-5xl mx-auto px-6 lg:px-20">
          <div className="text-center mb-12">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-normal uppercase">
              <span className="block text-stone-200">MEET THE TEAM</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-center sm:text-left">
            {/* Operations */}
            <div>
              <h3 className="text-blue-600 font-extrabold text-xl mb-4">
                OPERATIONS
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-black uppercase text-blue-500">
                    Bryant
                  </div>
                  <div className="text-xs text-stone-400">President</div>
                </div>
                <div>
                  <div className="text-sm font-black uppercase text-blue-500">
                    Bennett
                  </div>
                  <div className="text-xs text-stone-400">VP Finance</div>
                </div>
                <div>
                  <div className="text-sm font-black uppercase text-blue-500">
                    Marielle
                  </div>
                  <div className="text-xs text-stone-400">VP Safety</div>
                </div>
              </div>
            </div>

            {/* Mechanical */}
            <div>
              <h3 className="text-red-700 font-extrabold text-xl mb-4">
                MECHANICAL
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-black uppercase text-red-600">
                    Alan
                  </div>
                  <div className="text-xs text-stone-400">
                    Lead (Chassis, Foot, Socket)
                    <br />
                    Co-Lead (Battery Integration)
                  </div>
                </div>
                <div>
                  <div className="text-sm font-black uppercase text-red-600">
                    Yatharth
                  </div>
                  <div className="text-xs text-stone-400">Lead (Transmission)</div>
                </div>
                <div>
                  <div className="text-sm font-black uppercase text-red-600">
                    Lee
                  </div>
                  <div className="text-xs text-stone-400">Junior Lead (Foot, Socket)</div>
                </div>
                <div>
                  <div className="text-sm font-black uppercase text-red-600">
                    Sydney
                  </div>
                  <div className="text-xs text-stone-400">Junior Lead (Chassis, Transmission)</div>
                </div>
              </div>
            </div>

            {/* Electrical */}
            <div>
              <h3 className="text-emerald-600 font-extrabold text-xl mb-4">
                ELECTRICAL
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-black uppercase text-emerald-500">
                    Rahul
                  <div className="text-xs text-stone-400">
                    Lead (Embedded Systems)
                    <br />
                    Co-Lead (Battery Integration)
                  </div>
                <div>
                  <div className="text-sm font-black uppercase text-emerald-500">
                    Rashed
                  </div>
                  <div className="text-xs text-stone-400">Lead (Electrical Hardware)</div>
                </div>
              </div>
            </div>

            {/* Physiology */}
            <div>
              <h3 className="text-pink-500 font-extrabold text-xl mb-4">
                PHYSIOLOGY
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-black uppercase text-pink-500">
                    Andrey
                  </div>
                  <div className="text-xs text-stone-400">Co-Lead</div>
                </div>
                <div>
                  <div className="text-sm font-black uppercase text-pink-500">
                    Grace
                  </div>
                  <div className="text-xs text-stone-400">Co-Lead</div>
                </div>
              </div>
            </div>

            {/* Software */}
            <div>
              <h3 className="text-violet-600 font-extrabold text-xl mb-4">
                SOFTWARE
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-black uppercase text-violet-500">
                    Lance
                  </div>
                  <div className="text-xs text-stone-400">Lead (Direct Control)</div>
                </div>
                <div>
                  <div className="text-sm font-black uppercase text-violet-500">
                    Simon
                  </div>
                  <div className="text-xs text-stone-400">Lead (RL Control)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
