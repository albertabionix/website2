import { useState } from "react";
import { Button } from "@/components/ui/button";
import Tilt from "react-parallax-tilt";

const SLIDES = [
  {
    title: "EMG Prosthetic Leg",
    subtitle: "Developing electromyography integration for intuitive control, sensor fusion, and real-time actuation of the prosthetic leg.",
  },
  {
    title: "Mechanical",
    smallSubtitle: "Chassis, prototyping & manufacturing",
    subtitle: "Responsible for structural design, CAD, materials selection, and rapid prototyping to create a robust prosthetic chassis and mounting systems.",
  },
  {
    title: "Electrical",
    smallSubtitle: "Sensors, power & control electronics",
    subtitle: "Designing circuitry, sensor integration, motor drivers, and power management to enable reliable sensing and actuation for the prototype.",
  },
  {
    title: "Software",
    smallSubtitle: "Signal processing, ML & control",
    subtitle: "Implementing EMG/EEG signal processing, and real-time control software to translate user intent into movement.",
  },
  {
    title: "Physiology",
    smallSubtitle: "User testing, gait & ergonomics",
    subtitle: "Conducting biomechanics analysis, user-centered testing, and ergonomic tuning to ensure safety, comfort, and effective assistance.",
  },
];

const TEAM_SECTIONS = [
  {
    title: "OPERATIONS",
    titleColor: "text-blue-600",
    nameColor: "text-blue-500",
    members: [
      { name: "Lee Garda", role: "Co-President", linkedin: "https://www.linkedin.com/in/leethonwg/", image: "./headshots/lee-garda.jpg" },
      { name: "Rashed Khan", role: "Co-President", linkedin: "", image: "./headshots/rashed-khan.jpg" },
      { name: "Aydin Horobec", role: "VP Finance", linkedin: "", image: "./headshots/aydin-horobec.jpg" },
      { name: "Ayman Sheikh", role: "Co-VP Internal", linkedin: "https://www.linkedin.com/in/ayman-sheikh/", image: "./headshots/ayman-sheikh.jpg" },
      { name: "Daniel Tran", role: "Co-VP Internal", linkedin: "", image: "./headshots/daniel-tran.jpg" },
      { name: "Simon Wong", role: "VP Outreach", linkedin: "https://simonwong.site", image: "./headshots/simon-wong.jpg" },
      { name: "Brayden Ritter", role: "VP Safety", linkedin: "", image: "./headshots/brayden-ritter.jpg" },
    ],
  },
  {
    title: "MECHANICAL",
    titleColor: "text-red-600",
    nameColor: "text-red-500",
    members: [
      { name: "Alan Sheen", role: "Team Co-Lead", linkedin: "https://www.linkedin.com/in/alan-is/", image: "./headshots/alan-sheen.jpg" },
      { name: "Yatharth Gupta", role: "Team Co-Lead", linkedin: "https://www.linkedin.com/in/yatharth-gupta-/", image: "./headshots/yatharth-gupta.jpg" },
      { name: "Lee Garda", role: "Subteam Lead", linkedin: "https://www.linkedin.com/in/leethonwg/", image: "./headshots/lee-garda.jpg" },
      { name: "Sydney Stadnyk", role: "Subteam Lead", linkedin: "https://ca.linkedin.com/in/sydney-stadnyk-941003227", image: "./headshots/sydney-stadnyk.jpg" },
      { name: "Rin Choi", role: "Subteam Lead", linkedin: "", image: "./headshots/rin-choi.jpg"}
    ],
  },
  {
    title: "ELECTRICAL",
    titleColor: "text-emerald-600",
    nameColor: "text-emerald-500",
    members: [
      { name: "Rahul Lakdawala", role: "Team Co-Lead", linkedin: "https://www.linkedin.com/in/rahul-lakdawala/", image: "./headshots/rahul-lakdawala.jpg" },
      { name: "Rashed Khan", role: "Team Co-Lead", linkedin: "", image: "./headshots/rashed-khan.jpg" },
      { name: "Judy Abu Steit", role: "Subteam Lead", linkedin: "/", image: "./headshots/judy-abu-steit.jpg" },
      { name: "Isabelle Hlady", role: "Subteam Lead", linkedin: "/", image: "./headshots/isabelle-hlady.jpg" },
      { name: "Natalie Radwan", role: "Subteam Lead", linkedin: "/", image: "./headshots/natalie-radwan.jpg" },
      { name: "Tamu Siwira", role: "Subteam Lead", linkedin: "/", image: "./headshots/tamu-siwira.jpg" },
    ],
  },
  {
    title: "PHYSIOLOGY",
    titleColor: "text-pink-600",
    nameColor: "text-pink-500",
    members: [
      { name: "Andrey Larkin", role: "Team Co-Lead", linkedin: "", image: "./headshots/andrey-larkin.jpg" },
      { name: "Grace Yin", role: "Team Co-Lead", linkedin: "", image: "./headshots/grace-yin.jpg" },
    ],
  },
  {
    title: "SOFTWARE",
    titleColor: "text-violet-600",
    nameColor: "text-violet-500",
    members: [
      { name: "Lance Quinto", role: "Team Co-Lead", linkedin: "https://www.linkedin.com/in/clanceiq", image: "./headshots/lance-quinto.jpg" },
      { name: "Simon Wong", role: "Lead Co-Lead", linkedin: "https://simonwong.site", image: "./headshots/simon-wong.jpg" },
    ],
  },
];

const PREVIOUS_PRESIDENTS = [
  "Adil Younus",
  "Ben Hallworth",
  "Justin Boileau",
  "Brianna Tolsma",
  "Bryant Casem",
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  const changeTo = (nextIndex: number) => {
    setVisible(false);
    setTimeout(() => {
      setCurrent(nextIndex);
      setVisible(true);
    }, 300);
  };

  const prev = () => changeTo((current - 1 + SLIDES.length) % SLIDES.length);
  const next = () => changeTo((current + 1) % SLIDES.length);

  return (
    <div className="w-full max-w-3xl mx-auto relative flex items-center">
      <button onClick={prev} className="z-20 text-stone-900 rounded-full p-3" aria-label="Previous">
        <span className="text-2xl select-none">‹</span>
      </button>

      <div className="w-full px-8 py-10 mx-4 rounded-md text-left min-h-[260px] flex items-center">
        <div className="relative w-full">
          <div className="transition-opacity duration-300" style={{ opacity: visible ? 1 : 0 }}>
            <h4 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mb-2">
              {SLIDES[current].title}
            </h4>
            {SLIDES[current].smallSubtitle && (
              <div className="text-sm text-stone-500 italic mb-3">
                ({SLIDES[current].smallSubtitle})
              </div>
            )}
            <p className="text-stone-700 text-lg leading-relaxed">
              {SLIDES[current].subtitle}
            </p>
          </div>
        </div>
      </div>

      <button onClick={next} className="z-20 text-stone-900 rounded-full p-3" aria-label="Next">
        <span className="text-2xl select-none">›</span>
      </button>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => changeTo(idx)}
            className={`w-2 h-2 rounded-full transition ${idx === current ? "bg-stone-900" : "bg-white/40"}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Index = () => {
  const [imgOffset, setImgOffset] = useState({ x: 0, y: 0 });

  const smoothScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const maxX = Math.min(40, rect.width * 0.03);
    const maxY = Math.min(24, rect.height * 0.04);

    setImgOffset({
      x: (x - 0.5) * 2 * maxX,
      y: (y - 0.5) * 2 * maxY,
    });
  };

  return (
    <div className="min-h-screen bg-transparent font-sans">
      {/* Navigation */}
      <nav className="fixed top-3 left-1/2 transform -translate-x-1/2 z-50">
        <div className="inline-flex items-center gap-6 rounded-xl bg-black/10 backdrop-blur-md border border-white/10 px-4 py-2 shadow-2xl">
          <button onClick={() => smoothScrollTo("mission")} className="text-white font-semibold text-sm">Mission</button>
          <button onClick={() => smoothScrollTo("projects")} className="text-white font-semibold text-sm">Projects</button>
          <button onClick={() => smoothScrollTo("team")} className="text-white font-semibold text-sm">Us</button>
          <a href="https://forms.gle/SMaNMvi8qLGoNLtu6" target="_blank" rel="noopener noreferrer" className="text-white px-3 py-1 rounded-md text-sm font-semibold">Join</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover" src="./background.mp4" autoPlay loop muted playsInline />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <Tilt
            glareEnable={true}
            glareMaxOpacity={1}
            scale={1.03}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            className="overflow-hidden rounded-xl"
          >
            <div className="max-w-4xl mx-auto rounded-xl p-4 sm:p-8 backdrop-blur-sm" style={{ boxShadow: "inset 0px 0px 30px 0px #ccc" }}>
              <div className="text-white mb-6">
                <div className="text-4xl sm:text-6xl lg:text-7xl font-extralight">we are</div>
                <div className="underline text-4xl sm:text-7xl lg:text-8xl font-bold">ALBERTA BIONIX</div>
              </div>
              <p className="text-white text-lg sm:text-2xl max-w-2xl mb-8">
                Alberta Bionix is a student-led team developing innovative healthcare technologies, currently focused on creating an EMG-controlled leg prosthesis to empower mobility through muscle signals.
              </p>
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold" asChild>
                <a href="https://forms.gle/SMaNMvi8qLGoNLtu6" target="_blank" rel="noopener noreferrer">Join us</a>
              </Button>
            </div>
          </Tilt>
        </div>
      </section>

      {/* Mission Ticker */}
      <section className="bg-gray-100 py-4 overflow-hidden">
        <div className="whitespace-nowrap animate-scroll">
          <div className="inline-flex items-center space-x-8 text-sm sm:text-base">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="flex items-center space-x-8">
                <span className={i % 2 === 1 ? "text-red-600 font-semibold px-3 py-1" : "text-gray-500 px-3 py-1"}>
                  our mission
                </span>
                <span className="text-gray-300">•</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0 bg-fixed opacity-15" style={{ backgroundImage: "url('./grid.jpg')", backgroundSize: "cover" }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-8 lg:mb-16">
            <h2 className="text-red-700 font-bold">
              <div className="text-2xl sm:text-5xl xl:text-6xl font-extralight">
                <span className="font-black">ENGINEER</span> ACCESSIBILITY.
              </div>
              <div className="text-2xl sm:text-5xl xl:text-6xl mt-2 font-extralight">
                <span className="font-black">PROTOTYPE</span> SOLUTIONS.
              </div>
              <div className="text-2xl sm:text-5xl xl:text-6xl mt-2 font-extralight">
                <span className="font-black">EMPOWER</span> PEOPLE.
              </div>
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1">
              <p className="text-gray-700 text-lg sm:text-2xl leading-relaxed">
                Established in 2018, Alberta Bionix is a student-led engineering project group dedicated to advancing mental and physical accessibility technologies in the healthcare industry.{" "}
                <span className="italic">
                  Our mission is to bridge the gap between engineering and medicine to create innovative solutions that improve the quality of life for patients
                </span>{" "}
                - particularly those with disabilities or mobility challenges.
              </p>
            </div>

            <div className="grid lg:grid-cols-1 grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <img
                  key={n}
                  src={`./card_images/${n}.jpg`}
                  alt={`Grid ${n}`}
                  className="rounded-xl shadow-lg w-64 h-44 object-cover transition-transform duration-300 hover:scale-105"
                />
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 sm:p-16 mt-12">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl sm:text-4xl font-black text-gray-900 mb-6">
                Ready to make an impact?
              </h3>
              <p className="text-lg sm:text-xl text-gray-600 mb-8">
                Join our team of passionate engineers and researchers working to create solutions that matter.
              </p>
              <Button size="lg" className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 text-lg font-semibold" asChild>
                <a href="https://forms.gle/SMaNMvi8qLGoNLtu6" target="_blank" rel="noopener noreferrer">Get Involved</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Current Project */}
      <section id="projects" className="relative bg-white">
        <div className="flex flex-col lg:flex-row items-stretch">
          <div className="lg:w-1/2 w-full flex flex-col">
            <div className="relative overflow-hidden px-6 py-6 text-center group" style={{ backgroundImage: "repeating-linear-gradient(-45deg, #d9a002 0 40px, #1c1c1c 40px 80px)" }}>
              <h3 className="relative text-5xl sm:text-7xl font-extrabold uppercase text-white drop-shadow-md">
                CURRENT PROJECT
              </h3>
            </div>

            <div className="bg-stone-800/20 border border-white/20 p-3 lg:p-10 flex-1 flex items-center justify-center">
              <Carousel />
            </div>
          </div>

          <div
            className="lg:w-1/2 w-full overflow-hidden relative shadow-lg"
            onMouseMove={handleImageMouseMove}
            onMouseLeave={() => setImgOffset({ x: 0, y: 0 })}
          >
            <div className="w-full h-64 sm:h-96 lg:h-full relative overflow-hidden">
              <img
                src="./prototype.jpg"
                alt="Prototype"
                className="absolute inset-0 w-[110%] h-[110%] object-cover transition-transform duration-700 ease-out"
                style={{ transform: `translate(${imgOffset.x}px, ${imgOffset.y}px) scale(1.06)` }}
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="bg-stone-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-7xl font-extrabold uppercase text-stone-200">
              MEET THE TEAM
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 justify-items-center">
            {TEAM_SECTIONS.map((section) => (
              section.members.map((member) => (
                <div key={`${section.title}-${member.name}`} className="flex flex-col items-center text-center w-full">
                  <a href={member.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center w-full">
                    <div className="w-32 h-32 mb-3 rounded-full overflow-hidden bg-stone-700 border-2 border-stone-600 transition-transform duration-300 group-hover:scale-105 mx-auto">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Crect width='128' height='128' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Inter' font-size='48' fill='%239CA3AF'%3E" + member.name.split(' ').map(n => n[0]).join('') + "%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <div className={`text-sm font-black uppercase ${section.nameColor} mb-1 text-center`}>
                      {member.name}
                    </div>
                    <div className={`text-xs font-semibold ${section.titleColor} mb-1 text-center`}>
                      {section.title}
                    </div>
                    <div className="text-xs text-stone-400 whitespace-pre-line text-center">
                      {member.role}
                    </div>
                  </a>
                </div>
              ))
            ))}
          </div>
        </div>
      </section>

      {/* Previous Presidents */}
      <section className="bg-stone-800 text-white py-16">
        <div className="lg:max-w-5xl mx-auto px-6 lg:px-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-stone-200">
              PREVIOUS PRESIDENTS
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {PREVIOUS_PRESIDENTS.map((name) => (
              <div key={name} className="text-lg font-black uppercase text-yellow-500">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h4 className="text-2xl font-bold mb-2">ALBERTA BIONIX</h4>
          <div className="mt-2 pt-2 border-t border-stone-800">
            <p className="text-stone-500 text-sm">© 2025 Alberta Bionix</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;