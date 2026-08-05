import { useCallback, useEffect, useRef, useState } from 'react';
import portrait from './MyPicture2.png';
import htmlIcon from './html.png';
import cssIcon from './css.png';
import jsIcon from './js.png';
import laravelIcon from './Laravel.svg';
import gitIcon from './Git.png';
import githubIcon from './github.png';
import phpIcon from './php.svg';
import CursorGrid from './components/CursorGrid';
import { useScrollSnap } from './scrollsnap';


const NAME = 'Moch. Sutta Putra Heriyanto';
const SHORT_NAME = 'Moch. Sutta Putra';
const CONTACT_EMAIL = 'zenithsteam@google.com';
const CONTACT_PHONE = '+62 882 8771 1618';

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

const SKILLS = [
  { title: 'HTML', icon: htmlIcon, desc: 'Semantic markup and accessible, well-structured documents.' },
  { title: 'CSS', icon: cssIcon, desc: 'Responsive layouts and polished, modern visual systems.' },
  { title: 'JavaScript', icon: jsIcon, desc: 'Interactive UIs, smooth motion, and dynamic client-side logic.' },
  { title: 'Laravel', icon: laravelIcon, desc: 'Backend architecture, REST APIs, and clean MVC patterns.' },
  { title: 'Git', icon: gitIcon, desc: 'Version control workflows and sane branching strategies.' },
  { title: 'GitHub', icon: githubIcon, desc: 'Repository management and open-source collaboration.' },
  { title: 'PHP', icon: phpIcon, desc: 'Server-side scripting and database-driven applications.' },
];

const PROJECTS = [
  {
    title: 'Portfolio Concept',
    tag: 'Design',
    desc: 'A clean, responsive personal showcase with smooth scroll motion and theme support.',
    gradient: 'linear-gradient(150deg, #335765, #74a8a4)',
  },
  {
    title: 'Business Landing',
    tag: 'Development',
    desc: 'Modern business page with service cards and a conversion-focused layout.',
    gradient: 'linear-gradient(150deg, #74a8a4, #b6d9e0)',
  },
  {
    title: 'Creative Studio',
    tag: 'UI/UX',
    desc: 'Image-driven concept with a masonry grid, lightbox, and parallax touches.',
    gradient: 'linear-gradient(150deg, #b6d9e0, #7f543d)',
  },
];

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/yourusername' },
  { label: 'Facebook', href: 'https://facebook.com/yourusername' },
  { label: 'TikTok', href: 'https://tiktok.com/@yourusername' },
  { label: 'GitHub', href: 'https://github.com/yourusername' },
];

const ROLES = ['Frontend Developer', 'Laravel Developer', 'UI Enthusiast', 'Problem Solver'];

/* ---------- Hooks ---------- */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .stagger');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );

    NAV.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return active;
}

function useMagnetic() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const strength = 14;
    const buttons = document.querySelectorAll('.btn');

    const onMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left - rect.width / 2) / rect.width) * strength;
      const y = ((e.clientY - rect.top - rect.height / 2) / rect.height) * strength;
      e.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onLeave = (e) => {
      e.currentTarget.style.transform = '';
    };

    buttons.forEach((b) => {
      b.addEventListener('mousemove', onMove);
      b.addEventListener('mouseleave', onLeave);
    });
    return () => buttons.forEach((b) => {
      b.removeEventListener('mousemove', onMove);
      b.removeEventListener('mouseleave', onLeave);
    });
  }, []);
}

function useSkillGlow() {
  useEffect(() => {
    const cards = document.querySelectorAll('.skill-card');
    const onMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };
    cards.forEach((c) => c.addEventListener('mousemove', onMove));
    return () => cards.forEach((c) => c.removeEventListener('mousemove', onMove));
  }, []);
}

function useCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let rx = tx;
    let ry = ty;
    let raf;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const isInteractive = (el) => el.closest('a, button, .glow-card, .skill-card, .project-card');

    const onOver = (e) => {
      if (isInteractive(e.target)) ringRef.current?.classList.add('hovering');
    };
    const onOut = (e) => {
      if (isInteractive(e.target)) ringRef.current?.classList.remove('hovering');
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { dotRef, ringRef };
}

function useTypewriter(words, { typeSpeed = 65, deleteSpeed = 35, pause = 1500 } = {}) {
  const [text, setText] = useState('');

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId;

    const tick = () => {
      const current = words[wordIndex];
      if (!deleting) {
        charIndex += 1;
        setText(current.slice(0, charIndex));
        if (charIndex === current.length) {
          deleting = true;
          timeoutId = setTimeout(tick, pause);
          return;
        }
        timeoutId = setTimeout(tick, typeSpeed);
      } else {
        charIndex -= 1;
        setText(current.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
        timeoutId = setTimeout(tick, deleteSpeed);
      }
    };

    timeoutId = setTimeout(tick, 600);
    return () => clearTimeout(timeoutId);
  }, [words, typeSpeed, deleteSpeed, pause]);

  return text;
}

/* ---------- Small components ---------- */

function Navbar({ active, scrolled, mobileOpen, setMobileOpen, goTo }) {
  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a className="nav-brand" href="#home" onClick={(e) => { e.preventDefault(); goTo('home'); }}>
            <span className="nav-brand-mark">MS</span>
            {SHORT_NAME}
          </a>

          <nav className="nav-links">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${active === item.id ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); goTo(item.id); }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              className={`nav-toggle ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        {NAV.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={active === item.id ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); goTo(item.id); setMobileOpen(false); }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
}

function GlowCard({ className = '', children }) {
  return (
    <div className={`glow-card ${className}`}>
      <div className="glow-card-inner">{children}</div>
    </div>
  );
}

/* ---------- App ---------- */

function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection();
  const { dotRef, ringRef } = useCursor();
  const roleText = useTypewriter(ROLES);

  useReveal();
  useMagnetic();
  useSkillGlow();
  const containerRef = useScrollSnap();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const goTo = useCallback((id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = fd.get('email')?.toString().trim() || '';
    const phone = fd.get('phone')?.toString().trim() || '';
    const message = fd.get('message')?.toString().trim() || '';
    const subject = encodeURIComponent('Portfolio Inquiry');
    const body = encodeURIComponent(`Email: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      {loading && (
        <div className="loading-screen">
          <div className="loading-mark">MS<span>.</span></div>
          <div className="loading-bar"><div className="loading-bar-fill" /></div>
        </div>
      )}

      <div className="backdrop" aria-hidden="true">
        <div className="grain" />
        <div className="blob blob-a" />
        <div className="blob blob-b" />
      </div>

      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -10,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <CursorGrid
          cellSize={45}
          color="#009cff"
          radius={100}
          falloff="smooth"
          holdTime={400}
          fadeDuration={350}
          lineWidth={1.7}
          maxOpacity={0.55}
          fillOpacity={0.04}
          gridOpacity={0.09}
          cellRadius={3}
          clickPulse
          pulseSpeed={300}
        />
      </div>

      <Navbar active={active} scrolled={scrolled} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} goTo={goTo} />

      

      {/* HOME */}
      <div ref={containerRef}>

      <section id="home" className="hero container">
        <div className="hero-copy">
          <div className="hero-status">
            <span className="hero-status-dot" />
            Available for freelance work
          </div>

          <h1 className="hero-title">
            <span className="hero-word"><span style={{ animationDelay: '150ms' }}>Where</span></span>{' '}
            <span className="hero-word"><span className="italic" style={{ animationDelay: '260ms' }}>Thoughtful Design</span></span>
            <br />
            <span className="hero-word"><span style={{ animationDelay: '370ms' }}>Meets clean Development.</span></span>
          </h1>

          <p className="hero-lede">
            I design and develop modern digital experiences that balance aesthetics, performance, and usability—crafting products that feel as good as they look.
          </p>

          <div className="hero-cta">
            <a className="btn btn-primary" href="#work" onClick={(e) => { e.preventDefault(); goTo('work'); }}>
              See my work <span className="btn-arrow">→</span>
            </a>
            <a className="btn btn-secondary" href="#contact" onClick={(e) => { e.preventDefault(); goTo('contact'); }}>
              Get in touch
            </a>
          </div>

          <p className="hero-roles">{roleText}<span className="type-cursor">|</span></p>
        </div>

        <div className="hero-visual">
          <div className="hero-portrait">
            <img src={portrait} alt={NAME} />
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-num">2+</div>
              <div className="hero-stat-label">Years coding</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">7</div>
              <div className="hero-stat-label">Technologies</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">&#8734;</div>
              <div className="hero-stat-label">Ideas</div>
            </div>
          </div>
        </div>

        <div className="marquee">
          <div className="marquee-track">
            {[0, 1].flatMap((dup) =>
              SKILLS.map((s) => (
                <span className="marquee-item" key={`${dup}-${s.title}`}>
                  <strong>{s.title}</strong> <span className="marquee-dot">&#10022;</span>
                </span>
              )),
            )}
          </div>
        </div>

        <div className="scroll-cue" aria-hidden="true"><span className="scroll-cue-line" /></div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section container">
        <div className="section-head">
          <div className="eyebrow reveal">About</div>
          <h2 className="section-title reveal d1">
            A portfolio built to feel <span className="italic">personal</span>, balanced, and modern.
          </h2>
          <p className="section-desc reveal d2">
            Every layout starts with the message. I shape the flow around what matters most,
            then add motion and polish that improves the experience without overwhelming it.
          </p>
        </div>

        <div className="about-layout">
          <div className="about-copy reveal">
            <p>
              I'm <strong>{NAME}</strong>, a web developer based in Indonesia who enjoys turning
              straightforward ideas into interfaces that feel considered, not just functional.
            </p>
            <p>
              My process usually starts on paper: what does this page need to say, and in what
              order? Once that's settled, the visual layer and motion come in to support it,
              never to distract from it.
            </p>
          </div>

          <div className="about-cards stagger">
            <GlowCard>
              <div className="about-card-icon">🎯</div>
              <h3>What I build</h3>
              <p>
                Thoughtful layouts, subtle motion, and strong typography for personal brands,
                small businesses, and showcase pages that need to stand out.
              </p>
            </GlowCard>
            <GlowCard>
              <div className="about-card-icon">⚡</div>
              <h3>Working style</h3>
              <p>
                Start with the message, shape the flow, then add only the motion that improves
                the experience. Clean, deliberate, and always user-first.
              </p>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section container">
        <div className="section-head">
          <div className="eyebrow reveal">Skills</div>
          <h2 className="section-title reveal d1">Tools and technologies I use every day.</h2>
          <p className="section-desc reveal d2">
            From front-end fundamentals to backend frameworks — here's what I reach for to turn
            ideas into working, polished products.
          </p>
        </div>

        <div className="skills-grid stagger">
          {SKILLS.map((skill) => (
            <div className="skill-card" key={skill.title}>
              <img className="skill-icon" src={skill.icon} alt={`${skill.title} icon`} />
              <h3>{skill.title}</h3>
              <p>{skill.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="section container">
        <div className="section-head">
          <div className="eyebrow reveal">Selected work</div>
          <h2 className="section-title reveal d1">Projects that show how I think about layout and motion.</h2>
          <p className="section-desc reveal d2">
            A small selection that demonstrates my approach to structure, interaction, and
            responsive design.
          </p>
        </div>

        <div className="projects-grid stagger">
          {PROJECTS.map((project) => (
            <div className="project-card" key={project.title}>
              <div className="project-media">
                <div className="project-media-bg" style={{ background: project.gradient }} />
                <span className="project-tag">{project.tag}</span>
              </div>
              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section container">
        <div className="section-head">
          <div className="eyebrow reveal">Contact</div>
          <h2 className="section-title reveal d1">Let's work together on your next project.</h2>
          <p className="section-desc reveal d2">
            Have a project in mind or just want to say hello? Fill out the form and I'll get
            back to you as soon as I can.
          </p>
        </div>

        <div className="contact-layout">
          <form className="reveal" onSubmit={handleSubmit}>
            <label className="field">
              Email
              <input type="email" name="email" placeholder="you@example.com" required />
            </label>
            <label className="field">
              Phone
              <input type="tel" name="phone" placeholder="+62 8xx xxxx xxxx" required />
            </label>
            <label className="field">
              Message
              <textarea name="message" rows="5" placeholder="Tell me about your project..." required />
            </label>
            <button className="btn btn-primary" type="submit">
              Send message <span className="btn-arrow">→</span>
            </button>
          </form>

          <div className="contact-side stagger">
            <GlowCard>
              <h3>Social links</h3>
              <div className="social-row">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
                ))}
              </div>
            </GlowCard>
            <GlowCard>
              <h3>Quick contact</h3>
              <p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
              <p><a href="tel:+6281234567890">{CONTACT_PHONE}</a></p>
            </GlowCard>
            <GlowCard>
              <h3>Location</h3>
              <p>Indonesia</p>
            </GlowCard>
          </div>
        </div>
      </section>
      </div>

      <footer className="footer container">
        <p>&copy; {new Date().getFullYear()} {NAME}. Built with React.</p>
        <span className="footer-top" onClick={() => goTo('home')}>Back to top &uarr;</span>
      </footer>
    </>
  );
}

export default App;

