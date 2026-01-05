import { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Tilt from "react-parallax-tilt";

// --- Configuration ---
const COLORS = {
  primary: "#111111", accent: "#7e0000", secondary: "#004749",
  tertiary: "#b09b72", background: "#ededed", white: "#ffffff",
};

const GLASS_STYLES = {
  backdropFilter: 'blur(16px)',
  backgroundColor: `${COLORS.white}cc`,
  border: `1px solid ${COLORS.tertiary}4d`
};

const MISSION_IMAGES = ["/mission/1.png", "/mission/2.png", "/mission/3.png", "/mission/4.png", "/mission/5.png", "/mission/6.png", "/mission/7.png"];

const PROJECT_SLIDES = [
  { title: "EMG Prosthetic Leg", description: "A prosthetic leg controlled by electromyographic (EMG) signals, enabling intuitive, real-time movement.", image: "/projects/transmission.png" },
  { title: "Smart Medication Manager", description: "A device designed to enhance quality of life by automating medication schedules.", image: "/projects/medication.png" },
  { title: "ALEX Arm", description: "An upper-body exoskeleton engineered to prevent repetitive strain injuries.", image: "/projects/arm.png" },
];

const TEAM_INFO = [
  { title: "Mechanical", description: "Designs and manufactures physical components and structural integrity." },
  { title: "Electrical", description: "Develops circuitry, power systems, and sensor integration." },
  { title: "Software", description: "Programs signal processing algorithms and user interfaces." },
  { title: "Physiology", description: "Translates human biomechanics into safety and design requirements." },
];

const PEOPLE_SECTION = [
  { title: "EXECUTIVE", members: [
    { name: "Lee Garda", role: "Co-President", linkedin: "https://www.linkedin.com/in/leethonwg/", image: "/headshots/lee.png" },
    { name: "Rashed Khan", role: "Co-President", linkedin: "https://www.linkedin.com/in/rashedek/", image: "/headshots/rashed.png" },
    { name: "Aydin Horobec", role: "VP Finance", linkedin: "https://www.linkedin.com/in/aydin-horobec-1343a328b/", image: "/headshots/aydin.png" },
    { name: "Ayman Sheikh", role: "Co-VP Internal", linkedin: "https://www.linkedin.com/in/ayman-sheikh/", image: "/headshots/ayman.png" },
    { name: "Daniel Tran", role: "Co-VP Internal", linkedin: "https://www.linkedin.com/in/danieltrqn/", image: "/headshots/daniel.png" },
    { name: "Simon Wong", role: "VP Outreach", linkedin: "https://simonwong.site", image: "/headshots/simon.png" },
    { name: "Brayden Ritter", role: "VP Safety", linkedin: "https://www.linkedin.com/in/braydenritter/", image: "/headshots/brayden.png" },
  ]},
  { title: "MECHANICAL", members: [
    { name: "Alan Sheen", role: "Team Co-Lead", linkedin: "https://www.linkedin.com/in/alan-is/", image: "/headshots/alan.png" },
    { name: "Yatharth Gupta", role: "Team Co-Lead", linkedin: "https://www.linkedin.com/in/yatharth-gupta-/", image: "/headshots/yatharth.png" },
    { name: "Lee Garda", role: "Subteam Lead", linkedin: "https://www.linkedin.com/in/leethonwg/", image: "/headshots/lee.png" },
    { name: "Sydney Stadnyk", role: "Subteam Lead", linkedin: "https://ca.linkedin.com/in/sydney-stadnyk-941003227", image: "/headshots/sydney.png" },
    { name: "Woorin Choi", role: "Subteam Lead", linkedin: "https://www.linkedin.com/in/woorin-choi-/", image: "/headshots/rin.png"}
  ]},
  { title: "ELECTRICAL", members: [
    { name: "Rahul Lakdawala", role: "Team Co-Lead", linkedin: "https://www.linkedin.com/in/rahul-lakdawala/", image: "/headshots/rahul.png" },
    { name: "Rashed Khan", role: "Team Co-Lead", linkedin: "https://www.linkedin.com/in/rashedek/", image: "/headshots/rashed.png" },
    { name: "Judy Abu Steit", role: "Subteam Lead", linkedin: "https://www.linkedin.com/in/judyabus/", image: "/headshots/judy.png" },
    { name: "Isabelle Hlady", role: "Subteam Lead", linkedin: "https://www.linkedin.com/in/isabelle-hlady/", image: "/headshots/isabelle.png" },
    { name: "Natalie Radwan", role: "Subteam Lead", linkedin: "https://www.linkedin.com/in/natalie-radwan-335238236/", image: "/headshots/natalie.png" },
    { name: "Tamu Siwira", role: "Subteam Lead", linkedin: "https://www.linkedin.com/in/tamusiwira/", image: "/headshots/tamu.png" },
  ]},
  { title: "PHYSIOLOGY", members: [
    { name: "Andrey Larkin", role: "Team Co-Lead", linkedin: "https://www.linkedin.com/in/andrey-larkin-2a002a250/", image: "/headshots/andrey.png" },
    { name: "Grace Yin", role: "Team Co-Lead", linkedin: "", image: "/headshots/grace.png" },
  ]},
  { title: "SOFTWARE", members: [
    { name: "Lance Quinto", role: "Team Co-Lead", linkedin: "https://www.linkedin.com/in/clanceiq", image: "/headshots/lance.png" },
    { name: "Simon Wong", role: "Team Co-Lead", linkedin: "https://simonwong.site", image: "/headshots/simon.png" },
  ]},
];

const PREVIOUS_PRESIDENTS = [
  { name: "Adil Younus", linkedin: "https://www.linkedin.com/in/adilyounus/", image: "/headshots/placeholder.png" },
  { name: "Ben Hallworth", linkedin: "https://www.linkedin.com/in/ben-hallworth/", image: "/headshots/placeholder.png" },
  { name: "Justin Boileau", linkedin: "https://www.linkedin.com/in/jboileau99/", image: "/headshots/placeholder.png" },
  { name: "Brianna Tolsma", linkedin: "https://www.linkedin.com/in/briannatolsma/", image: "/headshots/placeholder.png" },
  { name: "Bryant Casem", linkedin: "https://www.linkedin.com/in/bryant-casem/", image: "/headshots/bryant.png" },
];

const SOCIAL_LINKS = [
  { href: "https://www.linkedin.com/company/albertabionix/", label: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { href: "https://www.instagram.com/albertabionix/", label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
  { href: "mailto:uabiomed@ualberta.ca", label: "Email", path: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" }
];

// --- Reusable Components ---
const SectionHeader = ({ title }) => (
  <div className="text-center mb-16">
    <div className="inline-block">
      <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-4 tracking-tight" style={{ color: COLORS.accent }}>{title}</h2>
      <div className="h-1" style={{ background: `linear-gradient(to right, transparent, ${COLORS.accent}, transparent)` }} />
    </div>
  </div>
);

const GlassCard = ({ children, className = "", style = GLASS_STYLES }) => (
  <div className={`rounded-3xl p-8 shadow-lg ${className}`} style={style}>{children}</div>
);

const Carousel = ({ slides, autoScroll = false, interval = 4000 }) => {
  const [curr, setCurr] = useState(0);
  const [fade, setFade] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const move = useCallback((dir) => {
    setFade(false);
    setTimeout(() => {
      setCurr(prev => (prev + dir + slides.length) % slides.length);
      setFade(true);
    }, 300);
  }, [slides.length]);

  useEffect(() => {
    if (!autoScroll || isPaused) return;
    const timer = setInterval(() => move(1), interval);
    return () => clearInterval(timer);
  }, [autoScroll, isPaused, interval, move]);

  return (
    <div className="w-full max-w-4xl mx-auto relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="flex items-center gap-4">
        <button onClick={() => move(-1)} className="z-20 p-3 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-all text-2xl" aria-label="Previous">‹</button>
        <div className="flex-1 transition-opacity duration-300" style={{ opacity: fade ? 1 : 0 }}>{slides[curr]}</div>
        <button onClick={() => move(1)} className="z-20 p-3 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-all text-2xl" aria-label="Next">›</button>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {slides.map((_, i) => (
          <button key={i} onClick={() => { setFade(false); setTimeout(() => { setCurr(i); setFade(true); }, 300); }} 
            className="w-2 h-2 rounded-full transition" style={{ backgroundColor: i === curr ? COLORS.accent : `${COLORS.tertiary}99` }} />
        ))}
      </div>
    </div>
  );
};

const PersonCard = ({ name, role, team, linkedin, image }) => (
  <div className="flex flex-col items-center text-center w-full">
    <a href={linkedin || "#"} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center w-full">
      <div className="w-32 h-32 mb-3 rounded-full overflow-hidden border-2 transition-transform duration-300 group-hover:scale-105 mx-auto"
        style={{ backgroundColor: COLORS.background, borderColor: `${COLORS.primary}75` }}>
        <img src={image} alt={name} className="w-full h-full object-cover" 
          onError={(e) => {
            const initials = name.split(' ').map(n => n[0]).join('');
            e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Crect width='128' height='128' fill='%23ededed'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-weight='700' font-size='48' fill='%23B09B72'%3E${initials}%3C/text%3E%3C/svg%3E`;
          }} 
        />
      </div>
      <div className="text-sm font-black uppercase mb-1" style={{ color: COLORS.secondary }}>{name}</div>
      {team && <div className="text-xs font-semibold mb-1" style={{ color: COLORS.secondary }}>{team}</div>}
      {role && <div className="text-xs whitespace-pre-line opacity-70" style={{ color: COLORS.primary }}>{role}</div>}
    </a>
  </div>
);

// --- Main Index Component ---
const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const missionSlides = useMemo(() => MISSION_IMAGES.map((img, i) => (
    <img key={i} src={img} alt="" className="w-full aspect-[7/5] object-cover rounded-2xl shadow-xl" />
  )), []);

  const projectSlides = useMemo(() => PROJECT_SLIDES.map((p, i) => (
    <GlassCard key={i} className="text-center py-6">
      <h3 className="text-4xl font-extrabold mb-4" style={{ color: COLORS.secondary }}>{p.title}</h3>
      <p className="text-lg mb-6 max-w-2xl mx-auto opacity-80">{p.description}</p>
      <img src={p.image} alt={p.title} className="w-full max-w-2xl mx-auto aspect-square object-cover rounded-2xl shadow-xl" />
    </GlassCard>
  )), []);

  const navScroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all h-16 flex items-center ${isScrolled ? 'shadow-md backdrop-blur-md border-b' : 'bg-transparent'}`}
        style={{ backgroundColor: isScrolled ? `${COLORS.background}e6` : 'transparent', borderBottomColor: `${COLORS.tertiary}33` }}>
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src="/logo.png" alt="Logo" className="h-12 hover:scale-105 transition-transform" />
          </button>
          <div className="hidden md:flex items-center gap-8">
            {["mission", "projects", "people"].map(s => (
              <button key={s} onClick={() => navScroll(s)} className="text-sm font-semibold capitalize hover:text-[#7e0000] transition-colors"
                style={{ color: isScrolled ? COLORS.primary : COLORS.white }}>{s}</button>
            ))}
            <Button size="sm" style={{ backgroundColor: COLORS.accent }} asChild><a href="https://forms.gle/SMaNMvi8qLGoNLtu6">Join Us</a></Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" style={{ background: `linear-gradient(to bottom, ${COLORS.primary}b3, ${COLORS.primary}80, ${COLORS.primary}cc)` }} />
        <div className="relative z-10 px-4">
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable glareMaxOpacity={0.2} scale={1.02}>
            <GlassCard className="p-12 text-center" style={{ backdropFilter: 'blur(12px)', backgroundColor: `${COLORS.white}0d`, border: `1px solid ${COLORS.white}1a` }}>
              <h1 className="text-5xl sm:text-8xl font-black mb-6 text-white">Alberta Bionix</h1>
              <p className="text-xl sm:text-2xl font-light mb-10 text-white/90">Student-led engineering at the University of Alberta.</p>
              <Button size="lg" style={{ backgroundColor: COLORS.accent }} className="px-8 py-6 text-lg" asChild><a href="https://forms.gle/SMaNMvi8qLGoNLtu6">Join Us</a></Button>
            </GlassCard>
          </Tilt>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="py-24 px-6 max-w-7xl mx-auto">
        <SectionHeader title="Mission" />
        <GlassCard className="mb-12 text-center">
          {[["ENGINEER", "INNOVATION."], ["DEVELOP", "SKILLS."], ["EMPOWER", "PEOPLE."]].map(([v, n], i) => (
            <div key={i} className="text-[clamp(1.5rem,6vw,4rem)] font-extralight">
              <span className="font-black" style={{ color: COLORS.secondary }}>{v}</span> <span style={{ color: COLORS.tertiary }}>{n}</span>
            </div>
          ))}
        </GlassCard>
        <Carousel slides={missionSlides} autoScroll interval={2000} />
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
        <SectionHeader title="Projects" />
        <Carousel slides={projectSlides} />
        <h3 className="text-4xl sm:text-5xl font-black uppercase text-center my-16" style={{ color: COLORS.secondary }}>Our Teams</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {TEAM_INFO.map(t => (
            <GlassCard key={t.title}>
              <h3 className="text-2xl font-black mb-4 uppercase" style={{ color: COLORS.secondary }}>{t.title}</h3>
              <p className="opacity-80 leading-relaxed">{t.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* People */}
      <section id="people" className="py-24 px-6 max-w-7xl mx-auto">
        <SectionHeader title="People" />
        
        {/* Leads and Executives */}
        <h3 className="text-4xl font-black uppercase text-center mb-12" style={{ color: COLORS.secondary }}>
          Leads and Executives
        </h3>
        <GlassCard className="mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 justify-items-center justify-center">
            {PEOPLE_SECTION.flatMap(s => 
              s.members.map(m => (
                <PersonCard key={`${s.title}-${m.name}`} {...m} team={s.title} />
              ))
            )}
          </div>
        </GlassCard>

        {/* Past Presidents - Now using the same GlassCard container */}
        <h3 className="text-4xl font-black uppercase text-center mb-12" style={{ color: COLORS.secondary }}>
          Past Presidents
        </h3>
        <GlassCard>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 justify-items-center justify-right">
            {PREVIOUS_PRESIDENTS.map(p => (
              <PersonCard key={p.name} {...p} />
            ))}
          </div>
        </GlassCard>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center relative" style={{ backgroundColor: COLORS.primary, color: COLORS.white }}>
        <img src="/logo.png" alt="" className="h-16 mx-auto mb-6" />
        <div className="flex justify-center gap-6 mb-4">
          {SOCIAL_LINKS.map(s => (
            <a key={s.label} href={s.href} className="hover:opacity-50 transition-opacity">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d={s.path}/></svg>
            </a>
          ))}
        </div>
        <p className="text-sm opacity-60">© 2026 Alberta Bionix.</p>
        <a href="https://simonwong.site" className="absolute bottom-4 right-4 text-[10px] opacity-40 hover:opacity-100">Made by Simon.</a>
      </footer>
    </div>
  );
};

export default Index;