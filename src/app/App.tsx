import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Github, Linkedin, Mail, Phone, MapPin, ExternalLink,
  Code, Rocket, Trophy, Award, Briefcase, GraduationCap,
  ChevronUp, Menu, X, Star, CheckCircle2, Terminal,
  Database, Server, Layout, Sparkles, ArrowRight, Download
} from 'lucide-react';
import profileTransparent from '../imports/profile-transparent.png';
import samriddhKhetiImg from '../imports/SamriddhKheti.png';
import jalvaaniImg from '../imports/Jalvaani.png';
import ticTacToeImg from '../imports/TicTacToe.png';
import resumePdf from '../imports/Vidushi R.pdf';
import emailService from '../services/emailService';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = resumePdf;
    link.download = 'Vidushi R.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'achievements', 'certifications', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: any) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 14;
    setMouseOffset({ x, y });
  };

  const resetMouseOffset = () => setMouseOffset({ x: 0, y: 0 });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a12] via-[#11111b] to-[#0a0a12] text-[#f8f9ff] relative overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7c6aff] via-[#b06aff] to-[#6affd4] z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-[#050816]/80 backdrop-blur-2xl border-b border-white/5 shadow-[0_24px_80px_rgba(7,12,29,0.18)]' : 'bg-transparent'
      }`}>
        <div className="max-w-[1280px] mx-auto px-[40px] py-4 flex items-center justify-between">
          <motion.div
            className="text-2xl font-bold tracking-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-[#7c6aff]">VS</span>
            <span className="text-white">.</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Certifications', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-sm font-medium transition-all duration-300 relative group ${
                  activeSection === item.toLowerCase() ? 'text-white' : 'text-[#9ca3af] hover:text-white'
                }`}
              >
                {item}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#7c6aff] to-[#6ee7d8] transition-all ${
                  activeSection === item.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Open mobile menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-[#050816]/95 backdrop-blur-2xl border-t border-white/5"
          >
            <div className="px-[40px] py-4 flex flex-col gap-4">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Certifications', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[#9ca3af] hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden min-h-screen pt-[3.5rem] pb-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,106,255,0.14),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(6,229,255,0.08),transparent_30%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:80px_80px] opacity-20 pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-[40px] min-h-[calc(100vh-6rem)] flex items-center">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] items-center">
            <motion.div
              className="max-w-[620px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 rounded-full border border-[#7c6aff]/20 bg-[#ffffff]/5 px-5 py-3 text-sm font-semibold text-[#6ee7d8] shadow-[0_20px_60px_rgba(110,231,216,0.08)] backdrop-blur-xl transition-transform duration-300 hover:scale-[1.02]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#6ee7d8] shadow-[0_0_12px_rgba(110,231,216,0.6)]" />
                OPEN TO OPPORTUNITIES
              </motion.div>

              <h1 className="mt-6 text-[clamp(4rem,8vw,5.5rem)] font-extrabold leading-[0.95] tracking-tight text-white">
                Vidushi
                <br />
                <span
                  className="bg-gradient-to-r from-[#7c6aff] via-[#a855f7] to-[#6ee7d8] bg-clip-text text-transparent"
                  style={{ backgroundSize: '200% auto', animation: 'gradientShift 8s linear infinite' }}
                >
                  Srivastava
                </span>
              </h1>

              <div className="mt-3 text-[clamp(1.5rem,2.5vw,2rem)] font-semibold text-[#9ca3af] leading-tight">
                <TypedText />
              </div>

              <p className="mt-3 text-lg leading-8 text-[#cbd5e1] max-w-[650px]">
                Pre-final year Computer Engineering student passionate about Full Stack Development, Generative AI, and intelligent automation. I build scalable web applications and AI-powered solutions that solve real-world problems through innovation and technology.
              </p>

              <div className="mt-5 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#7c6aff] to-[#6ee7d8] px-8 py-4 text-sm font-semibold text-white shadow-[0_24px_80px_rgba(124,106,255,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_32px_100px_rgba(124,106,255,0.28)]"
                >
                  <Code size={20} />
                  View Projects
                </a>
                <button
                  onClick={handleDownloadResume}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-[#cbd5e1] shadow-[0_0_30px_rgba(110,231,216,0.08)] transition-all duration-300 hover:border-[#6ee7d8]/30 hover:text-[#6ee7d8] hover:bg-white/10 cursor-pointer"
                >
                  <Download size={20} />
                  Download Resume
                </button>
              </div>

            </motion.div>

            <motion.div
              className="flex justify-center lg:justify-end lg:-mr-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div
                className="relative w-full max-w-[420px]"
                onMouseMove={handleMouseMove}
                onMouseLeave={resetMouseOffset}
              >
                <motion.div
                  className="absolute -top-10 -left-8 h-[260px] w-[260px] rounded-[2.5rem] bg-[#7c4dff]/20 blur-3xl"
                  style={{ transform: `translate3d(${mouseOffset.x / 4}px, ${mouseOffset.y / 5}px, 0)` }}
                  animate={{ opacity: [0.8, 0.95, 0.8] }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute -bottom-12 -right-8 h-[300px] w-[300px] rounded-[2.5rem] bg-[#00d4ff]/15 blur-3xl"
                  style={{ transform: `translate3d(${mouseOffset.x / 5}px, ${mouseOffset.y / 6}px, 0)` }}
                  animate={{ opacity: [0.6, 0.85, 0.6] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                />

                <motion.span
                  className="absolute top-12 right-6 h-3 w-3 rounded-full bg-[#6ee7d8] shadow-[0_0_24px_rgba(110,231,216,0.45)]"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.span
                  className="absolute left-6 bottom-16 h-2.5 w-2.5 rounded-full bg-[#00d4ff] shadow-[0_0_18px_rgba(0,212,255,0.35)]"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                />

                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ transform: `translate3d(${mouseOffset.x / 5}px, ${mouseOffset.y / 5}px, 0)` }}
                >
                  <svg viewBox="0 0 420 520" className="h-full w-full">
                    <path
                      d="M36 106C86 20 212 2 314 54C419 108 408 236 345 318C286 398 198 440 108 392C18 344 -10 192 36 106Z"
                      stroke="#00D4FF"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.75"
                    />
                  </svg>
                </motion.div>

                <motion.img
                  src={profileTransparent}
                  alt="Vidushi Srivastava"
                  className="relative mx-auto block max-h-[420px] w-auto"
                  style={{ transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)` }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          </div>

          <div className="absolute inset-x-0 bottom-6 flex justify-center">
            <motion.a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#ffffff]/10 px-5 py-3 text-sm text-[#cbd5e1] backdrop-blur-xl shadow-[0_0_40px_rgba(124,106,255,0.08)]"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-[#6ee7d8]">↓</span>
              Scroll to Explore
            </motion.a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-[#11111b]/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader tag="About Me" title="Crafting Experiences, One Line at a Time" />

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="md:col-span-2 space-y-6">
              <p className="text-[#9ca3af] leading-relaxed">
                I'm <span className="text-white font-semibold">Vidushi Srivastava</span>, a Computer Engineering undergraduate at ABES Engineering College, Ghaziabad. I have a deep interest in <span className="text-white font-semibold">frontend development</span> and <span className="text-white font-semibold">Generative AI</span> — building tools that are not just functional but genuinely helpful.
              </p>
              <p className="text-[#9ca3af] leading-relaxed">
                From building smart farming platforms with AI-powered chat to creating analytics dashboards during hackathons, I enjoy turning complex problems into clean, intuitive interfaces using React, Next.js, and modern GenAI APIs.
              </p>
              <p className="text-[#9ca3af] leading-relaxed">
                When I'm not coding, I'm competing in hackathons, contributing to open-source, or upskilling through certifications from IBM, Google Cloud, AWS, and more. I've solved <span className="text-white font-semibold">200+ DSA problems</span> and secured <span className="text-white font-semibold">Top 10 position</span> in Microsoft AgriTech Hackathon.
              </p>
            </div>

            <div className="space-y-4">
              <InfoItem label="College" value="ABES Engineering College" />
              <InfoItem label="Degree" value="B.Tech CSE (2023–2027)" />
              <InfoItem label="GPA" value="7.8 / 10" />
              <InfoItem label="Location" value="Ghaziabad, UP, India" />
              <InfoItem label="Focus" value="Frontend + GenAI" />
              <InfoItem label="Status" value="Open to Internships" />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader tag="What I Know" title="Technical Skills" subtitle="Certificate-backed and project-proven skills across languages, frameworks, and AI tools." />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <SkillCard icon={<Code />} title="Languages" skills={['C++', 'JavaScript', 'Python', 'SQL', 'C', 'HTML5', 'CSS3']} />
            <SkillCard icon={<Layout />} title="Frontend" skills={['React.js', 'Next.js', 'Tailwind CSS', 'Responsive UI']} />
            <SkillCard icon={<Server />} title="Backend" skills={['Node.js', 'Express.js', 'REST APIs', 'Firebase']} />
            <SkillCard icon={<Database />} title="Database & Tools" skills={['MongoDB', 'SQL', 'Git', 'GitHub', 'Vercel']} />
            <SkillCard icon={<Terminal />} title="Core CS" skills={['Data Structures', 'Algorithms', 'OOP', 'DBMS', 'OS', 'System Design']} />
            <SkillCard icon={<Sparkles />} title="AI & Emerging" skills={['Prompt Engineering', 'GenAI APIs', 'LLM Integration']} />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,77,255,0.08),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <SectionHeader tag="What I've Built" title="Featured Projects" subtitle="Premium solutions crafted with cutting-edge technology and AI innovation." />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ProjectCard
                title="Samriddh Kheti"
                description="AI-powered smart agriculture platform designed to assist farmers with crop recommendations, agricultural insights, and data-driven decision-making for improved productivity and sustainable farming."
                tech={['React.js', 'TypeScript', 'Tailwind CSS', 'AI APIs', 'REST APIs']}
                image={samriddhKhetiImg}
                github="https://github.com/Vidushi-1012/Samriddh-Kheti"
                liveDemo="https://samriddh-kheti.vercel.app/"
                featured
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ProjectCard
                title="JalVaani"
                description="An intelligent water conservation and awareness platform that provides actionable insights, promotes sustainable water usage, and encourages community-driven environmental responsibility."
                tech={['React.js', 'TypeScript', 'Tailwind CSS', 'AI Integration', 'REST APIs']}
                image={jalvaaniImg}
                github="https://github.com/Vidushi-1012/JalVaani"
                liveDemo="https://jalvaani.vercel.app/"
                badge="Top 25 Nationally"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ProjectCard
                title="Tic Tac Toe Game"
                description="Responsive and interactive Tic Tac Toe game featuring real-time gameplay, score tracking, game state management, and smooth animations for an engaging user experience across devices."
                tech={['HTML5', 'CSS3', 'JavaScript', 'DOM Manipulation', 'Responsive Design']}
                image={ticTacToeImg}
                github="https://github.com/Vidushi-1012/TicTacToe"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader tag="Experience" title="Professional Journey" subtitle="Simulations and practical experience in cloud architecture and software development." />

          <div className="mt-12 space-y-6">
            <ExperienceCard
              company="AWS Solutions Architecture Job Simulation"
              role="Forage"
              date="Sep 2025"
              points={[
                'Designed scalable cloud-hosting architecture for client use cases',
                'Applied system design principles to improve scalability and performance',
                'Evaluated architectural trade-offs and infrastructure requirements'
              ]}
            />
            <ExperienceCard
              company="Deloitte Technology Job Simulation"
              role="Forage"
              date="Jul 2025"
              points={[
                'Completed software development tasks in simulated enterprise environment',
                'Applied programming and debugging skills to solve technical challenges'
              ]}
            />
            <ExperienceCard
              company="Goldman Sachs Risk Job Simulation"
              role="Forage"
              date="Apr 2026"
              points={[
                'Analyzed risk management scenarios and technical solutions',
                'Developed understanding of financial technology systems'
              ]}
            />
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 px-6 bg-[#11111b]/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader tag="Achievements" title="Hackathons & Competitions" subtitle="Competing, building, and learning under pressure — nationally and regionally." />

          <div className="grid md:grid-cols-2 gap-4 mt-12">
            <AchievementCard
              title="Microsoft AgriTech Hackathon"
              detail="Azure Developer Community & Reskilll · National Level · 500+ Teams"
              badge="🏆 Top 10"
              badgeColor="gold"
            />
            <AchievementCard
              title="Triwizardathon 1.0"
              detail="Microsoft Learn Student Ambassador – GLA University · Finale at Microsoft Office, Gurugram"
              badge="Finalist"
              badgeColor="silver"
            />
            <AchievementCard
              title="HackLoop Hackathon 2025"
              detail="Built Metric Mesh – Social Media Analytics Dashboard · Offline Qualifier"
              badge="Qualifier"
              badgeColor="blue"
            />
            <AchievementCard
              title="SmartKrishi 2025"
              detail="GLA University, Greater Noida · AgriTech Innovation · Nov 3, 2025"
              badge="Qualifier"
              badgeColor="blue"
            />
            <AchievementCard
              title="GDG on Campus Solution Challenge"
              detail="Google Developer Groups · Powered by Hack2skill · 2025"
              badge="Participant"
              badgeColor="blue"
            />
            <AchievementCard
              title="HackGround India 2K25"
              detail="TechVerse Nexus Community · Team IGNITE · ABES Engineering College"
              badge="Participant"
              badgeColor="blue"
            />
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-6 bg-[#11111b]/50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="flex items-center gap-3 text-[#7c6aff] text-sm font-bold uppercase tracking-wider mb-3 justify-center">
              <div className="w-8 h-0.5 bg-[#7c6aff]" />
              Credentials
              <div className="w-8 h-0.5 bg-[#7c6aff]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight">
              Certifications & Professional Development
            </h2>
            <p className="text-lg text-slate-400 font-light">
              Technical Skills, Industry Experience, and Continuous Learning
            </p>
          </div>

          {/* Three equal-width domain cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#171726] border border-white/5 rounded-xl p-6 hover:border-[#7c6aff]/30 transition-all shadow-sm hover:shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Software Engineering</h3>
              <div className="space-y-4">
                <CertCard title="Full Stack Development" issuer="Udemy" link="https://ude.my/UC-0471a484-5f47-457e-a320-2866d8a4b8ef" />
                <CertCard title="Python Basics" issuer="HackerRank" link="https://www.hackerrank.com/certificates/iframe/28f5f465538d" />
                <CertCard title="Problem Solving Basics" issuer="HackerRank" link="https://www.hackerrank.com/certificates/iframe/45025c657dda" />
                <CertCard title="Basics of C++" issuer="Coding Ninjas" link="https://files.codingninjas.in/certi_image842095a5db90fb4685a0d22f66fee14426ebc1.jpg" />
              </div>
            </div>

            <div className="bg-[#171726] border border-white/5 rounded-xl p-6 hover:border-[#7c6aff]/30 transition-all shadow-sm hover:shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Cloud & Architecture</h3>
              <div className="space-y-4">
                <CertCard title="AWS Cloud Architecture Job Simulation" issuer="Forage / AWS" link="https://www.theforage.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_MJrJxPSR4wzqFfAuF_1758436084791_completion_certificate.pdf" />
                <CertCard title="Deloitte Technology Job Simulation" issuer="Forage / Deloitte" link="https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/udmxiyHeqYQLkTPvf_9PBTqmSxAf6zZTseP_MJrJxPSR4wzqFfAuF_1751353020939_completion_certificate.pdf" />
              </div>
            </div>

            <div className="bg-[#171726] border border-white/5 rounded-xl p-6 hover:border-[#7c6aff]/30 transition-all shadow-sm hover:shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Artificial Intelligence</h3>
              <div className="space-y-4">
                <CertCard title="Introduction to Generative AI" issuer="Simplilearn" link="https://simpli-web.app.link/e/plTor8L0N3b" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-[#11111b]/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader tag="Get In Touch" title="Let's Work Together" subtitle="Open to internships, collaborations, and hackathon teams. Feel free to reach out!" />

          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div className="space-y-6">
              <ContactItem icon={<Mail />} label="Email" value="vidushi.official1210@gmail.com" href="mailto:vidushi.official1210@gmail.com" />
              {/* Phone removed per request */}
              <ContactItem icon={<MapPin />} label="Location" value="Ghaziabad, Uttar Pradesh, India" />

              <div>
                <p className="text-sm text-[#9ca3af] uppercase tracking-wider mb-4">Find me on</p>
                <div className="flex gap-3">
                  <a href="https://github.com/Vidushi-1012" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-white/10 rounded-lg flex items-center justify-center text-[#9ca3af] hover:text-[#7c6aff] hover:border-[#7c6aff]/50 hover:bg-[#7c6aff]/5 transition-all">
                    <Github size={20} />
                  </a>
                  <a href="https://linkedin.com/in/srivastava-vidushi" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-white/10 rounded-lg flex items-center justify-center text-[#9ca3af] hover:text-[#7c6aff] hover:border-[#7c6aff]/50 hover:bg-[#7c6aff]/5 transition-all">
                    <Linkedin size={20} />
                  </a>
                  <a href="mailto:vidushi.official1210@gmail.com" className="w-12 h-12 border border-white/10 rounded-lg flex items-center justify-center text-[#9ca3af] hover:text-[#7c6aff] hover:border-[#7c6aff]/50 hover:bg-[#7c6aff]/5 transition-all">
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </div>

            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setSuccessMsg(null);
                setErrorMsg(null);

                const validation = emailService.validateForm(formData as any);
                if (Object.keys(validation).length) {
                  setErrors(validation as Record<string, string>);
                  return;
                }

                setErrors({});
                setIsSending(true);

                try {
                  await emailService.sendEmail(formData as any);
                  setSuccessMsg("Thank you for reaching out! I'll get back to you soon.");
                  setFormData({ name: '', email: '', subject: '', message: '' });
                } catch (err: any) {
                  console.error(err);
                  setErrorMsg('Failed to send message. Please try again later.');
                } finally {
                  setIsSending(false);
                }
              }}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="sr-only">Name</span>
                  <input
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    type="text"
                    placeholder="Your Name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'error-name' : undefined}
                    className="px-4 py-3 bg-[#171726] border border-white/10 rounded-lg focus:border-[#7c6aff] focus:outline-none text-white placeholder:text-[#9ca3af]"
                  />
                  {errors.name && <span id="error-name" className="text-sm text-[#ff6b6b] mt-1">{errors.name}</span>}
                </label>

                <label className="flex flex-col">
                  <span className="sr-only">Email</span>
                  <input
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    type="email"
                    placeholder="Email Address"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'error-email' : undefined}
                    className="px-4 py-3 bg-[#171726] border border-white/10 rounded-lg focus:border-[#7c6aff] focus:outline-none text-white placeholder:text-[#9ca3af]"
                  />
                  {errors.email && <span id="error-email" className="text-sm text-[#ff6b6b] mt-1">{errors.email}</span>}
                </label>
              </div>

              <label className="flex flex-col">
                <span className="sr-only">Subject</span>
                <input
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  type="text"
                  placeholder="Subject"
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'error-subject' : undefined}
                  className="w-full px-4 py-3 bg-[#171726] border border-white/10 rounded-lg focus:border-[#7c6aff] focus:outline-none text-white placeholder:text-[#9ca3af]"
                />
                {errors.subject && <span id="error-subject" className="text-sm text-[#ff6b6b] mt-1">{errors.subject}</span>}
              </label>

              <label className="flex flex-col">
                <span className="sr-only">Message</span>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message..."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'error-message' : undefined}
                  className="w-full px-4 py-3 bg-[#171726] border border-white/10 rounded-lg focus:border-[#7c6aff] focus:outline-none text-white placeholder:text-[#9ca3af] resize-none"
                />
                {errors.message && <span id="error-message" className="text-sm text-[#ff6b6b] mt-1">{errors.message}</span>}
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSending}
                  aria-disabled={isSending}
                  className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all ${isSending ? 'bg-[#4b34a6] text-[#d1c7ff] cursor-wait opacity-80' : 'bg-gradient-to-r from-[#7c6aff] to-[#00d4ff] text-white hover:shadow-lg hover:shadow-purple-500/50 hover:-translate-y-0.5'}`}
                >
                  {isSending ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail size={18} />
                      Send Message
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                {successMsg && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-[#6ee7d8] bg-[#042826] px-3 py-2 rounded-md">
                    ✓ {successMsg}
                  </motion.div>
                )}

                {errorMsg && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-[#ff6b6b] bg-[#2b0a0a] px-3 py-2 rounded-md">
                    {errorMsg}
                  </motion.div>
                )}
              </div>

              {/* Debug panel (temporary) */}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-2xl font-bold">
            <span className="text-[#7c6aff]">VS</span>
            <span className="text-white">.</span>
          </div>
          <p className="text-[#9ca3af] text-sm">© 2026 Vidushi Srivastava. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#home" className="text-sm text-[#9ca3af] hover:text-white transition-colors">Home</a>
            <a href="#projects" className="text-sm text-[#9ca3af] hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="text-sm text-[#9ca3af] hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {scrolled && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#7c6aff] text-white rounded-lg flex items-center justify-center hover:bg-[#b06aff] transition-all hover:shadow-lg hover:shadow-purple-500/50 z-40"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </div>
  );
}

// Component Helpers
function TypedText() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const roles = [
    'AI & Full Stack Developer',
    'Generative AI Enthusiast',
    'Building Intelligent Solutions',
    'Computer Engineering Student'
  ];
  const [delta, setDelta] = useState(120);

  useEffect(() => {
    const ticker = setTimeout(() => {
      tick();
    }, delta);

    return () => clearTimeout(ticker);
  }, [text, delta]);

  const tick = () => {
    const i = loopNum % roles.length;
    const fullText = roles[i];
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(50);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(2000);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(120);
    }
  };

  return (
    <span className="inline-flex items-center gap-2">
      <span className="text-[#6ee7d8] font-semibold">{text}</span>
      <span className="text-[#6ee7d8] animate-pulse">|</span>
    </span>
  );
}

function SectionHeader({ tag, title, subtitle }: { tag: string; title: string; subtitle?: string }) {
  return (
    <div>
      <div className="flex items-center gap-3 text-[#7c6aff] text-sm font-bold uppercase tracking-wider mb-3">
        <div className="w-8 h-0.5 bg-[#7c6aff]" />
        {tag}
      </div>
      <h2 className="text-4xl md:text-5xl font-bold mb-3">{title}</h2>
      {subtitle && <p className="text-[#9ca3af] max-w-2xl">{subtitle}</p>}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l-2 border-[#7c6aff]/30 pl-4">
      <p className="text-xs text-[#9ca3af] uppercase tracking-wider">{label}</p>
      <p className="text-white font-medium mt-1">{value}</p>
    </div>
  );
}

function SkillCard({ icon, title, skills }: { icon: React.ReactNode; title: string; skills: string[] }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-[#171726] border border-white/5 rounded-xl p-6 hover:border-[#7c6aff]/30 transition-all"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[#7c6aff]/10 rounded-lg flex items-center justify-center text-[#7c6aff]">
          {icon}
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span key={skill} className="px-3 py-1 bg-white/5 border border-white/5 rounded text-sm text-[#9ca3af] hover:text-[#7c6aff] hover:border-[#7c6aff]/30 transition-all">
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function ProjectCard({ title, description, tech, image, github, liveDemo, featured, badge }: {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  liveDemo?: string;
  featured?: boolean;
  badge?: string;
}) {
  const [imageHover, setImageHover] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -12 }}
      transition={{ duration: 0.3 }}
      className="group relative h-full"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#7c4dff]/10 to-[#00d4ff]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative h-full flex flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-[#0a0f1f]/95 via-[#050816]/95 to-[#0a0f1f]/95 backdrop-blur-xl overflow-hidden transition-all duration-300 group-hover:border-[#7c4dff]/30 shadow-[0_0_40px_rgba(124,77,255,0.1)] group-hover:shadow-[0_20px_60px_rgba(124,77,255,0.2)]">
        {/* Gradient border accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7c4dff] via-[#a855f7] to-[#00d4ff]" />

        {/* Image container */}
        <div className="relative overflow-hidden h-48 bg-[#050816]/60">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
        </div>

        {/* Content container */}
        <div className={`flex flex-col flex-1 p-6 ${featured ? '' : ''}`}>
          {/* Badges */}
          {(featured || badge) && (
            <div className="flex gap-2 mb-3 flex-wrap">
              {featured && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#7c4dff]/20 border border-[#7c4dff]/50 text-[#00d4ff] rounded-full text-xs font-semibold">
                  <Star size={12} />
                  Featured
                </span>
              )}
              {badge && (
                <span className="px-3 py-1 bg-[#00d4ff]/20 border border-[#00d4ff]/40 text-[#6ee7d8] rounded-full text-xs font-semibold">
                  {badge}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>

          {/* Description */}
          <p className="text-[#cbd5e1] text-sm leading-relaxed mb-4 flex-1">
            {description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tech.map((t) => (
              <span key={t} className="px-3 py-1.5 bg-[#0a0f1f] border border-[#7c4dff]/40 text-[#00d4ff] rounded-full text-xs font-medium transition-all duration-300 group-hover:border-[#00d4ff]/70 group-hover:bg-[#7c4dff]/10">
                {t}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-auto">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#7c4dff] to-[#00d4ff] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,77,255,0.4)] hover:-translate-y-0.5"
            >
              <Github size={16} />
              GitHub
            </a>
            {liveDemo ? (
              <a
                href={liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-[#00d4ff]/40 bg-[#00d4ff]/5 px-4 py-2.5 text-sm font-semibold text-[#6ee7d8] transition-all duration-300 hover:border-[#00d4ff]/70 hover:bg-[#00d4ff]/15 hover:-translate-y-0.5"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ExperienceCard({ company, role, date, points }: {
  company: string;
  role: string;
  date: string;
  points: string[];
}) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="bg-[#171726] border border-white/5 rounded-xl p-6 hover:border-[#7c6aff]/30 transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-[#7c6aff]/10 rounded-xl flex items-center justify-center text-[#7c6aff] flex-shrink-0">
          <Briefcase size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1">{company}</h3>
          <div className="flex items-center gap-3 text-sm text-[#9ca3af] mb-4">
            <span>{role}</span>
            <span>·</span>
            <span>{date}</span>
          </div>
          <ul className="space-y-2">
            {points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[#9ca3af] text-sm">
                <CheckCircle2 size={16} className="text-[#6affd4] flex-shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function AchievementCard({ title, detail, badge, badgeColor }: {
  title: string;
  detail: string;
  badge: string;
  badgeColor: string;
}) {
  const colorMap: Record<string, string> = {
    gold: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500',
    silver: 'bg-[#6affd4]/10 border-[#6affd4]/30 text-[#6affd4]',
    blue: 'bg-[#7c6aff]/10 border-[#7c6aff]/30 text-[#7c6aff]'
  };

  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="bg-[#171726] border border-white/5 rounded-xl p-6 hover:border-[#7c6aff]/30 transition-all flex items-center gap-4"
    >
      <div className="w-12 h-12 bg-[#7c6aff]/10 rounded-xl flex items-center justify-center text-[#7c6aff] flex-shrink-0">
        <Trophy size={24} />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <p className="text-sm text-[#9ca3af]">{detail}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${colorMap[badgeColor]}`}>
        {badge}
      </span>
    </motion.div>
  );
}

function CertCard({ title, issuer, date, link }: { title: string; issuer: string; date?: string; link?: string }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-[#171726] border border-white/5 rounded-xl p-5 hover:border-[#7c6aff]/30 transition-all flex gap-4 items-start"
    >
      <div className="w-10 h-10 bg-[#7c6aff]/10 rounded-lg flex items-center justify-center text-[#7c6aff] flex-shrink-0">
        <Award size={20} />
      </div>
      <div className="flex-1">
        <h3 className="text-base font-bold mb-1 leading-snug text-white">{title}</h3>
        <p className="text-xs text-[#9ca3af] mb-2">{issuer}</p>
        {date && <p className="text-xs text-[#7c6aff] font-semibold">{date}</p>}
      </div>
      {link && (
        <div className="flex-shrink-0">
          <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 bg-[#0b1220] border border-white/5 text-xs text-[#6ee7d8] rounded hover:shadow-[0_0_20px_rgba(110,231,216,0.06)]">
            View
            <ExternalLink size={14} />
          </a>
        </div>
      )}
    </motion.div>
  );
}

function CertCardClean({ title, issuer, date }: { title: string; issuer: string; date: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -2 }}
      className="bg-[#171726] border border-white/5 rounded-xl p-6 hover:border-[#7c6aff]/30 transition-all flex items-center gap-4"
    >
      <div className="w-10 h-10 bg-[#7c6aff]/10 rounded-lg flex items-center justify-center text-[#7c6aff] flex-shrink-0">
        <Award size={20} />
      </div>
      <div className="flex-1">
        <h3 className="text-base font-bold mb-1 leading-snug text-white">{title}</h3>
        <p className="text-xs text-[#9ca3af] mb-2">{issuer}</p>
        <p className="text-xs text-[#7c6aff] font-semibold">{date}</p>
      </div>
    </motion.div>
  );
}

function ContactItem({ icon, label, value, href }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-[#7c6aff]/10 border border-[#7c6aff]/20 rounded-xl flex items-center justify-center text-[#7c6aff] flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-[#9ca3af] uppercase tracking-wider mb-1">{label}</p>
        <p className="text-white font-medium">{value}</p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block hover:opacity-80 transition-opacity">
      {content}
    </a>
  ) : (
    <div>{content}</div>
  );
}