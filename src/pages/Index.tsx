import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Tilt from "react-parallax-tilt";

const COLORS = {
  primary: "#111111",
  accent: "#7e0000",
  secondary: "#004749",
  tertiary: "#b09b72",
  background: "#ededed",
  white: "#ffffff",
};

const GLASS_STYLES = {
  backdropFilter: 'blur(16px)',
  backgroundColor: `${COLORS.white}cc`,
  border: `1px solid ${COLORS.tertiary}4d`
};

const GLASS_TRANSLUCENT = {
  backdropFilter: 'blur(12px)',
  backgroundColor: `${COLORS.white}0d`,
  border: `1px solid ${COLORS.white}1a`
};

const MISSION_IMAGES = [
  "/mission/1.png", "/mission/2.png", "/mission/3.png",
  "/mission/4.png", "/mission/5.png", "/mission/6.png",
  "/mission/7.png"
];

const PROJECT_SLIDES = [
  {
    title: "EMG Prosthetic Leg",
    description: "A prosthetic leg controlled by electromyographic (EMG) signals, enabling intuitive, real-time movement by translating muscle activity into precise joint control.",
    image: "/projects/transmission.png",
  },
  {
    title: "Smart Medication Manager (Past Project)",
    description: "A device designed to enhance users' quality of life by automating and managing their medication schedules.",
    image: "/projects/medication.png",
  },
  {
    title: "ALEX Arm (Past Project)",
    description: "An upper-body exoskeleton engineered to prevent repetitive strain injuries while providing feedback to improve user posture.",
    image: "/projects/arm.png",
  },
];

const TEAM_INFO = [
  { title: "Mechanical", description: "The mechanical team designs and manufactures the physical components that make up the structure of our prosthetic leg. They ensure strength and reliability while meeting performance and safety requirements." },
  { title: "Electrical", description: "The electrical team develops the circuitry and power systems that drive our prosthetic leg. They integrate sensors, motors, batteries, and microcontrollers to ensure reliable and responsive operation." },
  { title: "Software", description: "The software team programs the systems that interpret user signals and control our prosthetic leg. They work on algorithms, EMG signal processing, and user interfaces to ensure smooth, reliable, and intuitive operation." },
  { title: "Physiology", description: "The physiology team supports all engineering efforts by translating human anatomy and biomechanics into design requirements and safety guidelines for our prosthetic leg." },
]

const PEOPLE_SECTION = [
  {
    title: "EXECUTIVE",
    members: [
      { name: "Lee Garda", role: "Co-President", linkedin: "https://www.linkedin.com/in/leethonwg/", image: "/headshots/lee.png" },
      { name: "Rashed Khan", role: "Co-President", linkedin: "https://www.linkedin.com/in/rashedek/", image: "/headshots/rashed.png" },
      { name: "Aydin Horobec", role: "VP Finance", linkedin: "https://www.linkedin.com/in/aydin-horobec-1343a328b/", image: "/headshots/aydin.png" },
      { name: "Ayman Sheikh", role: "Co-VP Internal", linkedin: "https://www.linkedin.com/in/ayman-sheikh/", image: "/headshots/ayman.png" },
      { name: "Daniel Tran", role: "Co-VP Internal", linkedin: "https://www.linkedin.com/in/danieltrqn/", image: "/headshots/daniel.png" },
      { name: "Simon Wong", role: "VP Outreach", linkedin: "https://simonwong.site", image: "/headshots/simon.png" },
      { name: "Brayden Ritter", role: "VP Safety", linkedin: "https://www.linkedin.com/in/braydenritter/", image: "/headshots/brayden.png" },
    ],
  },
  {
    title: "MECHANICAL",
    members: [
      { name: "Alan Sheen", role: "Team Co-Lead", linkedin: "https://www.linkedin.com/in/alan-is/", image: "/headshots/alan.png" },
      { name: "Yatharth Gupta", role: "Team Co-Lead", linkedin: "https://www.linkedin.com/in/yatharth-gupta-/", image: "/headshots/yatharth.png" },
      { name: "Lee Garda", role: "Subteam Lead", linkedin: "https://www.linkedin.com/in/leethonwg/", image: "/headshots/lee.png" },
      { name: "Sydney Stadnyk", role: "Subteam Lead", linkedin: "https://ca.linkedin.com/in/sydney-stadnyk-941003227", image: "/headshots/sydney.png" },
      { name: "Woorin Choi", role: "Subteam Lead", linkedin: "https://www.linkedin.com/in/woorin-choi-/", image: "/headshots/rin.png"}
    ],
  },
  {
    title: "ELECTRICAL",
    members: [
      { name: "Rahul Lakdawala", role: "Team Co-Lead", linkedin: "https://www.linkedin.com/in/rahul-lakdawala/", image: "/headshots/rahul.png" },
      { name: "Rashed Khan", role: "Team Co-Lead", linkedin: "https://www.linkedin.com/in/rashedek/", image: "/headshots/rashed.png" },
      { name: "Judy Abu Steit", role: "Subteam Lead", linkedin: "https://www.linkedin.com/in/judyabus/", image: "/headshots/judy.png" },
      { name: "Isabelle Hlady", role: "Subteam Lead", linkedin: "https://www.linkedin.com/in/isabelle-hlady/", image: "/headshots/isabelle.png" },
      { name: "Natalie Radwan", role: "Subteam Lead", linkedin: "https://www.linkedin.com/in/natalie-radwan-335238236/", image: "/headshots/natalie.png" },
      { name: "Tamu Siwira", role: "Subteam Lead", linkedin: "https://www.linkedin.com/in/tamusiwira/", image: "/headshots/tamu.png" },
    ],
  },
  {
    title: "PHYSIOLOGY",
    members: [
      { name: "Andrey Larkin", role: "Team Co-Lead", linkedin: "https://www.linkedin.com/in/andrey-larkin-2a002a250/", image: "/headshots/andrey.png" },
      { name: "Grace Yin", role: "Team Co-Lead", linkedin: "", image: "/headshots/grace.png" },
    ],
  },
  {
    title: "SOFTWARE",
    members: [
      { name: "Lance Quinto", role: "Team Co-Lead", linkedin: "https://www.linkedin.com/in/clanceiq", image: "/headshots/lance.png" },
      { name: "Simon Wong", role: "Team Co-Lead", linkedin: "https://simonwong.site", image: "/headshots/simon.png" },
    ],
  },
];

const PREVIOUS_PRESIDENTS = [
  { name: "Adil Younus", linkedin: "https://www.linkedin.com/in/adilyounus/" },
  { name: "Ben Hallworth", linkedin: "https://www.linkedin.com/in/ben-hallworth/" },
  { name: "Justin Boileau", linkedin: "https://www.linkedin.com/in/jboileau99/" },
  { name: "Brianna Tolsma", linkedin: "https://www.linkedin.com/in/briannatolsma/" },
  { name: "Bryant Casem", linkedin: "https://www.linkedin.com/in/bryant-casem/" },
];

const Carousel = ({ slides, showDots = true, autoScroll = false, autoScrollInterval = 4000 }) => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const changeTo = (nextIndex) => {
    setVisible(false);
    setTimeout(() => {
      setCurrent(nextIndex);
      setVisible(true);
    }, 300);
  };

  const prev = () => changeTo((current - 1 + slides.length) % slides.length);
  const next = () => changeTo((current + 1) % slides.length);

  useEffect(() => {
    if (!autoScroll || isPaused) return;
    const interval = setInterval(next, autoScrollInterval);
    return () => clearInterval(interval);
  }, [current, autoScroll, isPaused, autoScrollInterval]);

  return (
    <div 
      className="w-full max-w-4xl mx-auto relative"
      onMouseEnter={() => autoScroll && setIsPaused(true)}
      onMouseLeave={() => autoScroll && setIsPaused(false)}
    >
      <div className="flex items-center">
        <button 
          onClick={prev} 
          style={{ color: COLORS.primary }} 
          className="z-20 hover:text-[#540000] rounded-full p-3 backdrop-blur-sm bg-white/30 hover:bg-white/50 transition-all" 
          aria-label="Previous"
        >
          <span className="text-2xl select-none">‹</span>
        </button>

        <div className="flex-1 px-4">
          <div className="transition-opacity duration-300" style={{ opacity: visible ? 1 : 0 }}>
            {slides[current]}
          </div>
        </div>

        <button 
          onClick={next} 
          style={{ color: COLORS.primary }} 
          className="z-20 hover:text-[#540000] rounded-full p-3 backdrop-blur-sm bg-white/30 hover:bg-white/50 transition-all" 
          aria-label="Next"
        >
          <span className="text-2xl select-none">›</span>
        </button>
      </div>

      {showDots && (
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => changeTo(idx)}
              style={{ backgroundColor: idx === current ? COLORS.accent : `${COLORS.tertiary}99` }}
              className="w-2 h-2 rounded-full transition"
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SectionHeader = ({ title }) => (
  <div className="text-center mb-16">
    <div className="inline-block">
      <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-4 tracking-tight" style={{ color: COLORS.accent }}>
        {title}
      </h2>
      <div 
        className="h-1"
        style={{ background: `linear-gradient(to right, transparent, ${COLORS.accent}, transparent)` }}
      />
    </div>
  </div>
);

const GlassCard = ({ children, className = "" }) => (
  <div className={`rounded-3xl p-8 shadow-lg ${className}`} style={GLASS_STYLES}>
    {children}
  </div>
);

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const smoothScrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const missionSlides = MISSION_IMAGES.map((img, idx) => (
    <div key={idx} className="w-full">
      <img src={img} alt={`Mission Image ${idx + 1}`} className="w-full object-cover rounded-2xl shadow-xl" style={{ aspectRatio: '7/5' }} />
    </div>
  ));

  const projectSlides = PROJECT_SLIDES.map((project, idx) => (
    <GlassCard key={idx}>
      <div className="text-center py-6">
        <h3 className="text-4xl font-extrabold mb-4" style={{ color: COLORS.secondary }}>{project.title}</h3>
        <p className="text-lg mb-6 max-w-2xl mx-auto" style={{ color: `${COLORS.primary}cc` }}>{project.description}</p>
        <img src={project.image} alt={project.title} className="w-full max-w-2xl mx-auto aspect-square object-cover rounded-2xl shadow-xl" />
      </div>
    </GlassCard>
  ));

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
      {/* Navigation */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backdropFilter: 'blur(16px)',
          backgroundColor: isScrolled ? `${COLORS.background}e6` : `${COLORS.white}1a`,
          borderBottom: isScrolled ? `1px solid ${COLORS.tertiary}33` : `1px solid ${COLORS.white}1a`,
          boxShadow: isScrolled ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center group">
              <img src="/logo.png" alt="Alberta Bionix Logo" className="h-12 w-auto transition-transform duration-300 group-hover:scale-105" />
            </button>

            <div className="hidden md:flex items-center gap-8">
              {["mission", "projects", "people"].map((section) => (
                <button
                  key={section}
                  onClick={() => smoothScrollTo(section)}
                  className="text-sm font-semibold transition-colors hover:text-[#540000] capitalize"
                  style={{ color: isScrolled ? COLORS.primary : `${COLORS.white}e6` }}
                >
                  {section}
                </button>
              ))}
              <Button size="sm" style={{ backgroundColor: COLORS.accent }} className="hover:bg-[#540000]/90 text-white px-6 py-2 text-sm font-semibold shadow-md" asChild>
                <a href="https://forms.gle/SMaNMvi8qLGoNLtu6" target="_blank" rel="noopener noreferrer">Join Us</a>
              </Button>
            </div>

            <div className="md:hidden">
              <Button size="sm" style={{ backgroundColor: COLORS.accent }} className="hover:bg-[#540000]/90 text-white px-4 py-2 text-sm font-semibold" asChild>
                <a href="https://forms.gle/SMaNMvi8qLGoNLtu6" target="_blank" rel="noopener noreferrer">Join Us</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div 
          className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, ${COLORS.primary}b3, ${COLORS.primary}80, ${COLORS.primary}cc)` }}
        />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable glareMaxOpacity={0.2} scale={1.02}>
            <div className="rounded-3xl p-12 shadow-2xl" style={GLASS_TRANSLUCENT}>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-6 drop-shadow-2xl" style={{ color: COLORS.white }}>
                Alberta Bionix
              </h1>
              <p className="text-xl sm:text-2xl font-light mb-10 drop-shadow-lg" style={{ color: `${COLORS.white}e6` }}>
                A student-led engineering project group at the University of Alberta, <br />developing an EMG-controlled prosthetic leg.
              </p>
              <Button size="lg" style={{ backgroundColor: COLORS.accent }} className="hover:bg-[#540000]/90 text-white px-8 py-3 text-lg font-semibold transition-all shadow-lg" asChild>
                <a href="https://forms.gle/SMaNMvi8qLGoNLtu6" target="_blank" rel="noopener noreferrer">Join Us</a>
              </Button>
            </div>
          </Tilt>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Mission" />

          <GlassCard className="mb-12 text-center overflow-hidden">
            <div className="font-bold flex flex-col gap-2">
              {[
                ["ENGINEER", "INNOVATION."],
                ["DEVELOP", "SKILLS."],
                ["EMPOWER", "PEOPLE."]
              ].map(([verb, noun], idx) => (
                <div key={idx} className="text-[clamp(1.25rem,7vw,4rem)] font-extralight whitespace-nowrap">
                  <span className="font-black" style={{ color: COLORS.secondary }}>{verb}</span>{" "}
                  <span style={{ color: COLORS.tertiary }}>{noun}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <div className="mb-12">
            <Carousel slides={missionSlides} autoScroll={true} autoScrollInterval={2000} />
          </div>

          <GlassCard>
            <p className="text-lg sm:text-xl leading-relaxed text-center max-w-4xl mx-auto italic font-semibold" style={{ color: COLORS.primary }}>
              Our mission is to engineer innovative biomedical technologies, develop engineering skills, and empower people.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Projects" />

          <div className="mb-16">
            <Carousel slides={projectSlides} />
          </div>

          <div className="text-center mb-12">
            <h3 className="text-4xl sm:text-5xl font-black uppercase" style={{ color: COLORS.secondary }}>Our Teams</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TEAM_INFO.map((team) => (
              <GlassCard key={team.title}>
                <h3 className="text-2xl font-black mb-4 uppercase" style={{ color: COLORS.secondary }}>{team.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: COLORS.primary }}>{team.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* People Section */}
      <section id="people" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="People" />

          <GlassCard>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 justify-items-center">
              {PEOPLE_SECTION.flatMap((section) => 
                section.members.map((member) => (
                  <div key={`${section.title}-${member.name}`} className="flex flex-col items-center text-center w-full">
                    <a href={member.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center w-full">
                      <div 
                        className="w-32 h-32 mb-3 rounded-full overflow-hidden border-2 transition-transform duration-300 group-hover:scale-105 mx-auto"
                        style={{ backgroundColor: COLORS.background, borderColor: `${COLORS.primary}75` }}
                      >
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Crect width='128' height='128' fill='%23ededed'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Inter, system-ui, -apple-system, sans-serif' font-weight='700' font-size='48' fill='%23B09B72'%3E" + member.name.split(' ').map(n => n[0]).join('') + "%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                      <div className="text-sm font-black uppercase mb-1 text-center" style={{ color: COLORS.secondary }}>{member.name}</div>
                      <div className="text-xs font-semibold mb-1 text-center" style={{ color: COLORS.secondary }}>{section.title}</div>
                      <div className="text-xs whitespace-pre-line text-center" style={{ color: `${COLORS.primary}b3` }}>{member.role}</div>
                    </a>
                  </div>
                ))
              )}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Previous Presidents Section */}
      <section className="pb-12 px-4">
        <div className="lg:max-w-5xl mx-auto">
          <GlassCard>
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 uppercase" style={{ color: COLORS.secondary }}>Previous Presidents</h2>
              <div className="flex flex-wrap justify-center gap-8">
                {PREVIOUS_PRESIDENTS.map((president) => (
                  <a 
                    key={president.name}
                    href={president.linkedin || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg font-black uppercase hover:opacity-70 transition-opacity" 
                    style={{ color: COLORS.tertiary }}
                  >
                    {president.name}
                  </a>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
        <footer className="py-12 px-4 relative" style={{ backgroundColor: COLORS.primary, color: COLORS.white }}>
          <div className="max-w-6xl mx-auto text-center">
            <img src="/logo.png" alt="Alberta Bionix Logo" className="h-16 w-auto mx-auto mb-4" />
            <div className="flex justify-center gap-6 mb-4">
              {[
                { href: "https://www.linkedin.com/company/albertabionix/", label: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                { href: "https://www.instagram.com/albertabionix/", label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" }
              ].map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                  aria-label={social.label}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
            <p className="text-sm">© 2026 Alberta Bionix.</p>
          </div>
          <a 
            href="https://simonwong.site" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 text-[10px] hover:opacity-70 transition-opacity"
            style={{ color: COLORS.tertiary }}
          >
            Made by Simon.
          </a>
        </footer>
    </div>
  );
};

export default Index;