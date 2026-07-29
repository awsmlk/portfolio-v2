import { useMemo, useRef, useState, type ReactNode } from 'react'

type SectionId = 'home' | 'about' | 'resume' | 'portfolio' | 'blog' | 'contact'
type FormStatus = 'idle' | 'sending' | 'sent' | 'error'

// Small, dependency-free icon set keeps the exported app lightweight.
const Icon = ({ children, size = 18, className = '' }: { children: ReactNode; size?: number; className?: string }) => (
  <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
)
const Github = ({ size = 18 }: { size?: number }) => (
  <Icon size={size}><path fill="currentColor" stroke="none" d="M12 2C6.48 2 2 6.48 2 12a10.02 10.02 0 0 0 6.84 9.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.5 9.5 0 0 1 5 0c1.9-1.3 2.74-1.03 2.74-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10.02 10.02 0 0 0 22 12C22 6.48 17.52 2 12 2Z" /></Icon>
)
const Linkedin = ({ size = 18 }: { size?: number }) => (
  <Icon size={size}><path fill="currentColor" stroke="none" d="M5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM3.55 20.45h3.57V9H3.55v11.45ZM9.35 9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9Z" /></Icon>
)
const Mail = ({ size = 18 }: { size?: number }) => (
  <Icon size={size}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></Icon>
)
const ArrowUpRight = ({ size = 15 }: { size?: number }) => <Icon size={size}><path d="M5 19 19 5M9 5h10v10" /></Icon>
const ArrowRight = ({ size = 16 }: { size?: number }) => <Icon size={size}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>
const Download = ({ size = 16 }: { size?: number }) => <Icon size={size}><path d="M12 3v12M7 10l5 5 5-5M5 21h14" /></Icon>
const MapPin = ({ size = 16 }: { size?: number }) => <Icon size={size}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></Icon>
const HomeIcon = ({ size = 16 }: { size?: number }) => <Icon size={size}><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Z" /><path d="M9 21v-7h6v7" /></Icon>

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/awsmlk', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/awsmlk/', icon: Linkedin },
  { label: 'Email', href: 'mailto:awsmlk@proton.me', icon: Mail },
]

const PROJECTS = [
  { name: 'Minimalist Clothing Website', category: 'Web Design', tech: ['HTML', 'CSS', 'JavaScript'], live: 'https://awsmlk.github.io/ICT-Project-Clothing-Website/', emoji: '👕' },
  { name: 'ATM Interface', category: 'Application', tech: ['C++', 'App Logic'], repo: 'https://github.com/awsmlk/ATM-Banking-System', emoji: '🏧' },
  { name: 'Server Response Time Prediction', category: 'Machine Learning', tech: ['Python', 'ML', 'Regression'], repo: 'https://github.com/awsmlk/server-response-prediction-multiple-linear-regression', emoji: '📊' },
  { name: 'Sentiment Analyzer', category: 'Machine Learning', tech: ['Python', 'NLP'], repo: 'https://github.com/awsmlk/sentiment-analyzer', emoji: '🧠' },
  { name: 'Parking Management System', category: 'Application', tech: ['DB Design', 'System Design'], emoji: '🅿️' },
  { name: 'Discord Economy Bot', category: 'Bot', tech: ['Node.js', 'Discord.js'], emoji: '💰' },
  { name: 'Discord Quran Bot', category: 'Bot', tech: ['Node.js', 'Discord.js'], emoji: '📖' },
  { name: 'Discord Ticket Management Bot', category: 'Bot', tech: ['Node.js', 'Discord.js'], emoji: '🎫' },
  { name: 'Discord Verification Bot', category: 'Bot', tech: ['Node.js', 'Discord.js'], emoji: '🔐' },
  { name: 'Discord Feature Testing & QA Bot', category: 'Bot', tech: ['Node.js', 'Discord.js', 'QA'], emoji: '🧪' },
  { name: 'Discord Music Streaming Bot', category: 'Bot', tech: ['Node.js', 'Audio'], emoji: '🎵' },
  { name: 'Discord 24/7 Audio Bot', category: 'Bot', tech: ['Node.js', 'Voice'], emoji: '🔊' },
  { name: 'Line Following Robot', category: 'Robotics', tech: ['Arduino', 'Sensors'], emoji: '🤖' },
  { name: 'Maze Solving Robot', category: 'Robotics', tech: ['Arduino', 'Pathfinding'], emoji: '🌀' },
  { name: 'Obstacle Avoidance Robot', category: 'Robotics', tech: ['Arduino', 'Ultrasonic'], emoji: '🚧' },
  { name: 'Firefighting Robot', category: 'Robotics', tech: ['Arduino', 'Flame Sensor'], emoji: '🔥' },
  { name: 'Remote Control Robot (CODI Bot)', category: 'Robotics', tech: ['Arduino', 'RF'], emoji: '📡' },
  { name: 'Mini Drone', category: 'Robotics', tech: ['Electronics', 'Flight Control'], emoji: '🚁' },
]

const CATEGORIES = ['All', 'Web Design', 'Application', 'Machine Learning', 'Bot', 'Robotics']

const EDUCATION = [
  { school: 'Bahria University', degree: 'Bachelor of Science (BS), Information Technology', period: '2025 – 2029', desc: 'Pursuing IT with coursework and hands-on experience in software development, web technologies, databases, networking, and system design.' },
  { school: 'Army Public School (APSACS)', degree: 'High School — Science', period: '2020 – 2024', desc: 'Class Representative, Peace Keeper, Debate Club, Young Journalists Club, IKMC, Makerspace Skills Programme, badminton, chess, tree plantation, and clean water projects.' },
]

const EXPERIENCE = [
  { role: 'STEM & Robotics Workshops', org: 'LearnOBots STEM Camp', period: '2017 – 2019', desc: 'Completed robotics and STEM workshops with hands-on robot building and programming experience.' },
  { role: 'Online Courses & Certifications', org: 'Coursera · Udemy · freeCodeCamp', period: '2020 – present', desc: 'Completed courses in web development, programming, and computer science across multiple platforms.' },
  { role: 'Self-taught Developer', org: 'Personal Learning Journey', period: '2016 – present', desc: 'Continuously learning through self-study, projects, and current technology trends.' },
]

const SKILLS = [
  { group: 'Languages', items: ['JavaScript', 'Python', 'C++', 'HTML5', 'CSS3', 'LaTeX'] },
  { group: 'Frameworks & Libraries', items: ['Node.js', 'Express.js', 'Discord.js'] },
  { group: 'Databases & Platforms', items: ['MongoDB', 'MySQL', 'Microsoft Access', 'Heroku', 'Vercel', 'Replit'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Arduino', 'Linux'] },
  { group: 'Areas of Interest', items: ['Web Development', 'Machine Learning', 'Robotics', 'APIs'] },
  { group: 'Professional Skills', items: ['Problem Solving', 'Attention to Detail', 'Communication', 'Team Collaboration', 'Adaptability', 'Continuous Learning'] },
]

const BLOG_POSTS = [
  { tag: 'AI / ML', title: 'My Machine Learning Journey: From Theory to Projects', body: 'Notes from turning the math into small experiments.' },
  { tag: 'Robotics', title: 'Getting Started with Arduino: My Robotics Journey', body: 'The lessons that made sensors and motors click.' },
  { tag: 'Development', title: 'Building Discord Bots with Node.js — Tips & Tricks', body: 'Patterns for bots that stay useful as communities grow.' },
]

const NAV_ITEMS: Array<{ id: SectionId; label: string }> = [
  { id: 'home', label: 'Home' }, { id: 'about', label: 'About' }, { id: 'resume', label: 'Resume' },
  { id: 'portfolio', label: 'Portfolio' }, { id: 'blog', label: 'Blog' }, { id: 'contact', label: "Let's talk" },
]

function SocialLinks({ compact = false }: { compact?: boolean }) {
  return <div className={compact ? 'social-links social-links--compact' : 'social-links'}>
    {SOCIALS.map(({ label, href, icon: SocialIcon }) => (
      <a className="social-link" key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'} aria-label={label}>
        <SocialIcon size={compact ? 16 : 17} /><span>{compact ? '' : label}</span>
      </a>
    ))}
  </div>
}

function SectionHeader({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead?: string }) {
  return <header className="section-header">
    <p className="eyebrow">{eyebrow}</p>
    <h1>{title}</h1>
    {lead && <p className="section-lead">{lead}</p>}
  </header>
}

function HomeSection({ onNavigate }: { onNavigate: (id: SectionId) => void }) {
  return <section className="home-section page-enter" aria-labelledby="hero-title">
    <div className="watermark watermark-one">JavaScript — Python — C++ — HTML — CSS — Node.js</div>
    <div className="watermark watermark-two">Discord.js — Express.js — MongoDB — Automation — QA</div>
    <div className="watermark watermark-three">Arduino — Robotics — Sensors — Machine Learning — APIs</div>
    <div className="hero-topline">
      <span>👋 Hey there!</span>
      <div className="hero-icons">
        {SOCIALS.map(({ label, href, icon: SocialIcon }) => (
          <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'} aria-label={label}><SocialIcon size={21} /></a>
        ))}
      </div>
    </div>
    <div className="hero-grid">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">AI &amp; Robotics Enthusiast</p>
        <h1 id="hero-title"><span>Awais</span><span className="muted-word">Malik</span></h1>
        <div className="hero-actions">
          <button className="button button--primary" onClick={() => onNavigate('portfolio')}>See my work <ArrowRight /></button>
          <a className="button button--ghost" href={`${import.meta.env.BASE_URL}resume.pdf`} download="awais-malik-resume.pdf"><Download /> Resume</a>
        </div>
      </div>
    </div>
  </section>
}

function AboutSection() {
  return <section className="section-page about-page page-enter" aria-labelledby="about-title">
    <div className="simple-content">
        <p className="page-kicker">01 / About</p>
        <p className="about-intro">Hey, I'm Awais! I love coding and building things.</p>
        <h1 id="about-title" className="about-title">AI &amp; Robotics enthusiast, <span>building useful software.</span></h1>
        <div className="about-copy">
          <p>I'm a computer science student with a passion for <mark className="mark-blue">software engineering</mark>, <mark className="mark-purple">artificial intelligence</mark>, and <mark className="mark-green">robotics</mark>.</p>
          <p>I enjoy building web applications, Discord bots, machine learning projects, and intelligent robotic systems. I love turning ideas into real-world solutions and continuously learning new technologies.</p>
        </div>
        <div className="terminal-card" aria-label="Awais Malik terminal profile">
          <div className="terminal-bar"><span /><span /><span /><em>awais@portfolio</em></div>
          <div className="terminal-body"><p><b>awais@portfolio</b><i>:~$</i> whoami</p><p className="terminal-muted">Awais Malik — AI &amp; Robotics Enthusiast</p><p><b>awais@portfolio</b><i>:~$</i> cat skills.txt</p><p className="terminal-muted">JavaScript, Python, C++, Node.js, Arduino, ML, Discord.js...</p><p><b>awais@portfolio</b><i>:~$</i> echo $CURRENT_FOCUS</p><p className="terminal-muted">Building smarter software, one commit at a time.</p><p><b>awais@portfolio</b><i>:~$</i> <span className="cursor">█</span></p></div>
        </div>
        <h2 className="what-title">What I'm doing</h2>
        <div className="service-grid">{[
          { icon: '🌐', title: 'Web Development', body: 'High-quality sites using modern technologies.' },
          { icon: '🎨', title: 'Web Design', body: 'Modern, polished design with strong attention to detail.' },
          { icon: '⚙️', title: 'Backend & APIs', body: 'Robust REST APIs and server-side solutions.' },
          { icon: '🤝', title: 'Open Source', body: 'Contributing to open-source projects and communities.' },
        ].map(({ icon, title, body }) => <article className="service-card" key={title}><span className="service-emoji">{icon}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
    </div>
  </section>
}

function Timeline({ title, items }: { title: string; items: Array<{ period: string; school?: string; degree?: string; role?: string; org?: string; desc: string }> }) {
  return <div className="timeline-group"><p className="eyebrow timeline-label">{title}</p><div className="timeline">{items.map((item, index) => <article className="timeline-item" key={`${item.period}-${index}`}><div className="timeline-marker" /><div><span className="timeline-period">{item.period}</span><h3>{item.school || item.role}</h3><p className="timeline-org">{item.degree || item.org}</p><p>{item.desc}</p></div></article>)}</div></div>
}

function ResumeSection() {
  return <section className="section-page resume-page page-enter" aria-labelledby="resume-title">
    <div className="simple-content">
        <p className="page-kicker">02 / Resume</p>
        <h1 id="resume-title" className="resume-title">Education &amp; Experience</h1>
        <Timeline title="Education" items={EDUCATION} />
        <Timeline title="Experience" items={EXPERIENCE} />
        <div className="skills-block"><p className="eyebrow timeline-label">Skills</p><div className="skills-list">{SKILLS.map(group => <div className="skill-row" key={group.group}><span>{group.group}</span><div>{group.items.map(skill => <span className="skill-chip" key={skill}>{skill}</span>)}</div></div>)}</div></div>
    </div>
  </section>
}

function ProjectCard({ project }: { project: typeof PROJECTS[number] }) {
  return <article className="project-card">
    <span className="project-emoji" aria-hidden="true">{project.emoji}</span>
    <div className="project-info"><h3>{project.name}</h3><p>{project.category}</p><div className="tech-list">{project.tech.map(tech => <span key={tech}>{tech}</span>)}</div></div>
    {(project.live || project.repo) && <div className="project-actions">{project.live && <a className="project-link" aria-label={`Open ${project.name} live demo`} href={project.live} target="_blank" rel="noopener noreferrer"><ArrowUpRight size={16} /></a>}{project.repo && <a className="project-link" aria-label={`Open ${project.name} repository`} href={project.repo} target="_blank" rel="noopener noreferrer"><ArrowUpRight size={16} /></a>}</div>}
  </article>
}

function PortfolioSection({ category, setCategory }: { category: string; setCategory: (category: string) => void }) {
  const filtered = useMemo(() => category === 'All' ? PROJECTS : PROJECTS.filter(project => project.category === category), [category])
  return <section className="section-page projects-page page-enter" aria-labelledby="portfolio-title">
    <div className="projects-content">
      <h1 id="portfolio-title">Projects</h1>
      <div className="filter-row" role="group" aria-label="Filter projects">{CATEGORIES.map(item => <button key={item} className={`filter-button ${category === item ? 'is-active' : ''}`} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <div className="project-grid">{filtered.map(project => <ProjectCard key={project.name} project={project} />)}</div>
    </div>
  </section>
}

function BlogSection() {
  return <section className="section-page page-enter" aria-labelledby="blog-title">
    <div className="simple-content narrow-content">
        <SectionHeader eyebrow="04 / Blog" title={<>Notes from the<br /><span className="muted-word">workbench.</span></>} lead="Writing about software, robotics, and the things I'm learning. Articles are on the way." />
        <div className="blog-list">{BLOG_POSTS.map((post, index) => <article className="blog-card" key={post.title}><span className="blog-index">0{index + 1}</span><div><p className="eyebrow">{post.tag}</p><h2>{post.title}</h2><p>{post.body}</p></div><span className="coming-soon">Coming soon</span></article>)}</div>
        <div className="newsletter-card"><div className="newsletter-icon"><Mail size={20} /></div><div><h2>Want the first draft?</h2><p>Drop me a note and I'll send new writing your way.</p></div><a href="mailto:awsmlk@proton.me?subject=Keep%20me%20posted" className="button button--dark-outline">Keep me posted <ArrowRight /></a></div>
    </div>
  </section>
}

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '', company: '' })
  const [status, setStatus] = useState<FormStatus>('idle')
  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (form.company) return
    setStatus('sending')
    try {
      const response = await fetch('https://formspree.io/f/xpzgkjrb', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ name: form.name, email: form.email, message: form.message }) })
      setStatus(response.ok ? 'sent' : 'error')
      if (response.ok) setForm({ name: '', email: '', message: '', company: '' })
    } catch { setStatus('error') }
  }
  return <section className="section-page page-enter" aria-labelledby="contact-title">
    <div className="contact-layout">
      <div className="contact-copy"><SectionHeader eyebrow="05 / Contact" title={<>Let's make<br /><span className="muted-word">something.</span></>} lead="Have an idea, a project, or just want to say hi? I reply to everything." /><SocialLinks /><div className="contact-meta"><span><MapPin /> Islamabad, Pakistan</span><a href="mailto:awsmlk@proton.me"><Mail /> awsmlk@proton.me</a></div></div>
      <div className="contact-form-card">{status === 'sent' ? <div className="form-success"><span>✓</span><h2>Message sent.</h2><p>Thanks for reaching out — I'll get back to you soon.</p><button className="button button--dark-outline" onClick={() => setStatus('idle')}>Send another <ArrowRight /></button></div> : <form onSubmit={submit}><input className="honeypot" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.company} onChange={event => setForm({ ...form, company: event.target.value })} /><label>Your name<input required name="name" value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} /></label><label>Email address<input required type="email" name="email" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} /></label><label>What are you building?<textarea required name="message" rows={5} value={form.message} onChange={event => setForm({ ...form, message: event.target.value })} /></label>{status === 'error' && <p className="form-error" role="alert">Something went wrong. Please email me directly at awsmlk@proton.me.</p>}<button className="button button--primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : <>Send message <ArrowRight /></>}</button></form>}</div>
    </div>
    <div className="map-card"><div><p className="eyebrow">Based in</p><h2>Islamabad, Pakistan</h2><p>Open to remote collaborations and thoughtful projects around the world.</p></div><iframe title="Map showing Islamabad, Pakistan" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=72.973%2C33.649%2C73.184%2C33.762&amp;layer=mapnik" /></div>
  </section>
}

export default function App() {
  const [section, setSection] = useState<SectionId>('home')
  const [category, setCategory] = useState('All')
  const scrollRef = useRef<HTMLDivElement>(null)

  const navigate = (next: SectionId) => {
    setSection(next)
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return <div className="app" ref={scrollRef}>
    <main id="main-content">
      {section === 'home' && <HomeSection onNavigate={navigate} />}
      {section === 'about' && <AboutSection />}
      {section === 'resume' && <ResumeSection />}
      {section === 'portfolio' && <PortfolioSection category={category} setCategory={setCategory} />}
      {section === 'blog' && <BlogSection />}
      {section === 'contact' && <ContactSection />}
    </main>
    <nav className="bottom-nav" aria-label="Primary navigation">{NAV_ITEMS.map(item => <button key={item.id} aria-label={item.label} className={`${section === item.id ? 'is-active' : ''} ${item.id === 'contact' ? 'is-contact' : ''}`} onClick={() => navigate(item.id)}>{item.id === 'home' ? <HomeIcon size={18} /> : <span>{item.label}</span>}{item.id === 'contact' && <ArrowRight size={15} />}</button>)}</nav>
  </div>
}
