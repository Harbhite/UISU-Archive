
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { TowerScene } from './components/QuantumScene';
// WebGLShader removed for the clean aesthetic of the reference image
import { TimelineDiagram, StructureDiagram, PopulationChart } from './components/Diagrams';
import { CampusMap, HallGrid } from './components/CampusMap';
import { GovernancePage } from './components/Governance';
import { PastLeadersPage } from './components/PastLeaders';
import { DocumentLibrary } from './components/DocumentLibrary';
import { AnnouncementsPage } from './components/Announcements';
import { TriviaSection } from './components/Trivia';
import { CommunitiesPage, ClubDetailPage } from './components/Communities';
import { Menu, X, BookOpen, ArrowRight, Library, Star, MapPin, Scale, Megaphone, ChevronDown, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- SUB-COMPONENTS FOR THE NEW DESIGN ---

const Marquee = () => {
  return (
    <div className="bg-nobel-gold text-ui-blue py-2 overflow-hidden relative z-50 cursor-default">
      {/* MICRO-ANIMATION 1: Pause marquee on hover (implemented via CSS in index.css) */}
      <div className="animate-marquee whitespace-nowrap flex gap-8 items-center font-bold text-xs tracking-[0.2em] uppercase">
        <span>First and Best</span> <Star size={10} fill="currentColor" />
        <span>The Greatest Uites</span> <Star size={10} fill="currentColor" />
        <span>Father of Intellectual Unionism</span> <Star size={10} fill="currentColor" />
        <span>Est. 1948</span> <Star size={10} fill="currentColor" />
        <span>Aluta Continua</span> <Star size={10} fill="currentColor" />
        <span>Victoria Ascerta</span> <Star size={10} fill="currentColor" />
        <span>First and Best</span> <Star size={10} fill="currentColor" />
        <span>The Greatest Uites</span> <Star size={10} fill="currentColor" />
        <span>Father of Intellectual Unionism</span> <Star size={10} fill="currentColor" />
        <span>Est. 1948</span> <Star size={10} fill="currentColor" />
        <span>Aluta Continua</span> <Star size={10} fill="currentColor" />
        <span>Victoria Ascerta</span> <Star size={10} fill="currentColor" />
        <span>First and Best</span> <Star size={10} fill="currentColor" />
        <span>The Greatest Uites</span> <Star size={10} fill="currentColor" />
        <span>Father of Intellectual Unionism</span> <Star size={10} fill="currentColor" />
        <span>Est. 1948</span> <Star size={10} fill="currentColor" />
        <span>Aluta Continua</span> <Star size={10} fill="currentColor" />
        <span>Victoria Ascerta</span> <Star size={10} fill="currentColor" />
      </div>
    </div>
  );
};

const TiltedCard = ({ title, subtitle, icon: Icon, color, onClick, delay }: any) => {
  return (
    <motion.div 
        initial={{ opacity: 0, y: 100, rotate: 5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.8, delay: delay, type: "spring" }}
        whileHover={{ y: -20, rotate: -2, scale: 1.05, zIndex: 10 }}
        onClick={onClick}
        className={`relative w-60 h-72 ${color} rounded-2xl flex-shrink-0 cursor-pointer shadow-2xl border-2 border-white/10 overflow-hidden group transition-all duration-500`}
    >
        {/* Card Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 text-white">
            <div className="flex justify-between items-start">
                <div className="p-2 bg-white/20 backdrop-blur-md rounded-full">
                    <Icon size={24} />
                </div>
                <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
            </div>
            
            <div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">{subtitle}</p>
                <h3 className="font-serif text-2xl leading-none">{title}</h3>
            </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
    </motion.div>
  );
};

const LeaderCard = ({ name, role, delay }: { name: string, role: string, delay: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: parseFloat(delay) }}
      whileHover={{ y: -10 }}
      className="flex flex-col group items-center p-8 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 w-full max-w-xs hover:border-nobel-gold/50 cursor-pointer"
    >
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="w-16 h-16 rounded-full bg-slate-50 mb-4 flex items-center justify-center text-2xl font-serif text-nobel-gold font-bold border border-slate-100 group-hover:border-nobel-gold transition-colors"
      >
        {name.charAt(0)}
      </motion.div>
      <h3 className="font-serif text-xl text-ui-blue text-center mb-2">{name}</h3>
      <div className="w-8 h-0.5 bg-nobel-gold mb-3 opacity-60 group-hover:w-16 transition-all duration-300"></div>
      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest text-center leading-relaxed">{role}</p>
    </motion.div>
  );
};

// Micro-animation helper component
const RevealHeader = ({ children, className }: { children?: React.ReactNode, className?: string }) => (
  <motion.h2 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.h2>
);

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'governance' | 'history' | 'documents' | 'announcements' | 'communities' | 'club-detail'>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedClubId, setSelectedClubId] = useState<string | null>(null);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100);
    } else {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    }
  };

  // Sub-view routing
  if (view === 'governance') return <GovernancePage onBack={() => setView('home')} />;
  if (view === 'history') return <PastLeadersPage onBack={() => setView('home')} />;
  if (view === 'documents') return <DocumentLibrary onBack={() => setView('home')} />;
  if (view === 'announcements') return <AnnouncementsPage onBack={() => setView('home')} />;
  
  if (view === 'communities') return (
    <CommunitiesPage 
        onBack={() => setView('home')} 
        onClubSelect={(id) => {
            setSelectedClubId(id);
            setView('club-detail');
        }} 
    />
  );
  
  if (view === 'club-detail' && selectedClubId) return (
    <ClubDetailPage 
        clubId={selectedClubId} 
        onBack={() => setView('communities')} 
    />
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-nobel-gold selection:text-white overflow-x-hidden">
      
      {/* 1. SCROLLING TICKER */}
      <Marquee />

      {/* 2. FLOATING NAVBAR (Pill Shape) */}
      <nav className="fixed top-14 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-40">
        <div className="bg-ui-blue/95 backdrop-blur-md text-white rounded-full px-6 py-3 flex justify-between items-center shadow-2xl border border-white/10">
            {/* Left: Menu Trigger */}
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMenuOpen(!menuOpen)} 
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-nobel-gold transition-colors"
            >
                <AnimatePresence mode="wait">
                    {menuOpen ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                             <X size={18}/>
                        </motion.div>
                    ) : (
                        <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                             <Menu size={18}/>
                        </motion.div>
                    )}
                </AnimatePresence>
                <span className="hidden md:inline">Menu</span>
            </motion.button>

            {/* Center: Logo */}
            {/* MICRO-ANIMATION 2: Logo hover effect */}
            <motion.div 
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
                className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 cursor-pointer" 
                onClick={() => setView('home')}
            >
                <img src="/uisu-logo.png" alt="UISU Logo" className="h-10 w-auto object-contain" />
                <span className="font-serif font-bold text-xl tracking-tight">UISU</span>
            </motion.div>

            {/* Right: Action */}
            <div className="flex items-center gap-4">
                <button onClick={() => setView('announcements')} className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-nobel-gold transition-colors">
                    <Megaphone size={14} /> News
                </button>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToSection('introduction')} 
                    className="bg-nobel-gold text-ui-blue px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
                >
                    Enter
                </motion.button>
            </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-28 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl z-30 p-8 flex flex-col gap-6 text-center border border-slate-200"
        >
            <button onClick={() => {setMenuOpen(false); setView('announcements')}} className="text-xl font-serif text-ui-blue hover:text-nobel-gold transition-colors">News & Events</button>
            <a href="#history" onClick={scrollToSection('history')} className="text-xl font-serif text-ui-blue hover:text-nobel-gold transition-colors">History</a>
            <button onClick={() => {setMenuOpen(false); setView('governance')}} className="text-xl font-serif text-ui-blue hover:text-nobel-gold transition-colors">Governance</button>
            <a href="#halls" onClick={scrollToSection('halls')} className="text-xl font-serif text-ui-blue hover:text-nobel-gold transition-colors">Republics</a>
            <button onClick={() => {setMenuOpen(false); setView('documents')}} className="text-xl font-serif text-ui-blue hover:text-nobel-gold transition-colors">Library</button>
            <button onClick={() => {setMenuOpen(false); setView('communities')}} className="text-xl font-serif text-ui-blue hover:text-nobel-gold transition-colors">Clubs & Societies</button>
        </motion.div>
      )}

      {/* 3. HERO SECTION (Redesigned) */}
      <header className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-white">
        
        {/* Background Grain/Texture - made subtler for white theme */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
            
            {/* Massive Typography */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-6">
                <motion.h1 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-7xl md:text-9xl font-bold tracking-tighter text-ui-blue"
                >
                    UNION
                </motion.h1>
                
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="text-6xl md:text-8xl text-nobel-gold"
                >
                    <Star size={80} fill="currentColor" />
                </motion.div>

                <motion.h1 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-7xl md:text-9xl font-serif italic text-ui-blue"
                >
                    Legacy
                </motion.h1>
            </div>

            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-16 leading-relaxed"
            >
                Platform packed with <span className="bg-slate-100 px-2 rounded text-ui-blue font-medium">History</span> & <span className="bg-slate-100 px-2 rounded text-ui-blue font-medium">Intellectualism</span>. Preserving the Aluta spirit since 1948.
            </motion.p>

            {/* 4. INTERACTIVE TILTED GALLERY (Navigation) */}
            <div className="flex flex-wrap justify-center gap-6 items-center md:mt-12 perspective-1000">
                
                <TiltedCard 
                    title="Announcements" 
                    subtitle="News & Events" 
                    icon={Megaphone}
                    color="bg-red-800"
                    onClick={() => setView('announcements')}
                    delay={0.5}
                />

                <TiltedCard 
                    title="Union History" 
                    subtitle="1948 - Present" 
                    icon={BookOpen}
                    color="bg-ui-blue"
                    onClick={() => scrollToSection('history')({preventDefault: () => {}} as any)}
                    delay={0.6}
                />

                <TiltedCard 
                    title="Communities" 
                    subtitle="Clubs & Societies" 
                    icon={Users}
                    color="bg-emerald-700"
                    onClick={() => setView('communities')}
                    delay={0.65}
                />

                <TiltedCard 
                    title="Governance" 
                    subtitle="Structure & Law" 
                    icon={Scale}
                    color="bg-nobel-gold" // Nobel Gold
                    onClick={() => setView('governance')}
                    delay={0.7}
                />

                <TiltedCard 
                    title="The Republics" 
                    subtitle="Halls of Residence" 
                    icon={MapPin}
                    color="bg-ui-dark" // Darker UI Blue
                    onClick={() => scrollToSection('halls')({preventDefault: () => {}} as any)}
                    delay={0.8}
                />

                <TiltedCard 
                    title="The Library" 
                    subtitle="Constitutions & Bills" 
                    icon={Library}
                    color="bg-slate-800" // Neutral for variety
                    onClick={() => setView('documents')}
                    delay={0.9}
                />

            </div>

            {/* MICRO-ANIMATION 3: Scroll Down Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 2, y: { duration: 1.5, repeat: Infinity } }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 flex flex-col items-center gap-2 cursor-pointer"
                onClick={scrollToSection('introduction')}
            >
                <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
                <ChevronDown size={20} />
            </motion.div>
        </div>
      </header>

      <main>
        {/* Introduction */}
        <section id="introduction" className="py-24 bg-slate-50 relative overflow-hidden">
           {/* Abstract BG */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-nobel-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start relative z-10">
            <div className="md:col-span-5">
              <div className="inline-block mb-3 px-3 py-1 bg-ui-blue/10 text-ui-blue text-xs font-bold tracking-widest uppercase rounded-full">About Us</div>
              {/* MICRO-ANIMATION 4: Section Header Reveal */}
              <RevealHeader className="font-serif text-5xl md:text-6xl mb-6 leading-tight text-ui-blue">
                First and <br/><span className="italic text-nobel-gold">Best.</span>
              </RevealHeader>
              <p className="text-lg text-slate-500 font-medium">The Father of Intellectual Unionism.</p>
            </div>
            <div className="md:col-span-7 text-xl text-slate-800 leading-relaxed space-y-6 font-light">
              <p>
                Founded in 1948, the University of Ibadan Students' Union is the <strong>oldest and most prestigious</strong> student body in Nigeria. 
              </p>
              <p>
                From the anti-colonial struggles to the fight for democracy, Uites have always stood on the side of the people. This archive serves to document that rich history, structure, and culture.
              </p>
              <div className="pt-4">
                  <button onClick={() => scrollToSection('history')({preventDefault: () => {}} as any)} className="group flex items-center gap-2 text-ui-blue font-bold uppercase tracking-widest text-sm">
                      Start Exploring <ArrowRight className="group-hover:translate-x-2 transition-transform"/>
                  </button>
              </div>
            </div>
          </div>
        </section>

        {/* History Timeline */}
        <section id="history" className="py-24 bg-white border-y border-slate-200">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <RevealHeader className="font-serif text-5xl text-ui-blue mb-6">The Aluta Spirit</RevealHeader>
                        <p className="text-lg text-slate-600 leading-relaxed">
                           The history of the Union is written in the ink of intellectualism and the sweat of struggle. Trace the defining moments that shaped the Union.
                        </p>
                    </div>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setView('history')} 
                        className="shrink-0 px-6 py-3 bg-slate-50 border border-slate-300 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-ui-blue hover:text-white transition-all shadow-sm"
                    >
                        View All Leaders
                    </motion.button>
                </div>
                <TimelineDiagram />
            </div>
        </section>

        {/* Structure & Governance */}
        <section className="py-24 bg-ui-blue text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-nobel-gold via-ui-blue to-ui-blue"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1 w-full">
                        <StructureDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-nobel-gold text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-white/10">
                            GOVERNANCE
                        </div>
                        <RevealHeader className="font-serif text-5xl mb-6 text-white">Union Structure</RevealHeader>
                        <p className="text-xl text-slate-300 mb-6 leading-relaxed font-light">
                            Modeled after the Federal Republic. A complete separation of powers ensuring accountability.
                        </p>
                        <p className="text-lg text-slate-400 leading-relaxed mb-8">
                            The <strong>CEC</strong> executes, the <strong>SRC</strong> legislates, and the <strong>Judiciary</strong> interprets.
                        </p>
                        <button 
                            onClick={() => setView('governance')}
                            className="flex items-center gap-2 text-nobel-gold font-bold uppercase tracking-wider text-sm hover:text-white transition-colors group"
                        >
                            Explore the Constitution <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                     </div>
                </div>
            </div>
        </section>

        {/* Halls of Residence */}
        <section id="halls" className="py-24 bg-slate-50">
          <div className="container mx-auto px-6">
             <div className="text-center mb-16">
                <RevealHeader className="font-serif text-5xl mb-4 text-ui-blue">The Republics</RevealHeader>
                <p className="text-lg text-slate-500 uppercase tracking-widest font-bold">Halls of Residence</p>
             </div>
             
             <div className="max-w-6xl mx-auto">
                <CampusMap />
                <HallGrid />
             </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-24 bg-white border-t border-slate-200">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <PopulationChart />
                </div>
            </div>
        </section>

        {/* New Trivia Section */}
        <TriviaSection />

        {/* Culture / Tower */}
        <section className="py-24 bg-slate-50 border-t border-slate-200">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5 relative min-h-[400px] bg-white rounded-2xl overflow-hidden shadow-sm">
                    <TowerScene />
                    <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-slate-200 text-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Landmark</span>
                        <p className="font-serif text-lg text-ui-blue">The Tower of Ibadan</p>
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col justify-center">
                    <RevealHeader className="font-serif text-5xl mb-8 text-ui-blue">Campus Culture</RevealHeader>
                    <p className="text-xl text-slate-600 mb-8 leading-relaxed font-light">
                        Life as a Uite is unique. From the gyration at the SUB to the quiet study sessions at Kenneth Dike Library. The halls—Mellamby, Tedder, Kuti, Sultan Bello, Independence, Zik, Queens, Idia, Awo—are nations with their own rich traditions.
                    </p>
                    
                    <div className="p-8 bg-white border-l-4 border-nobel-gold rounded-r-xl shadow-sm">
                        <p className="font-serif italic text-2xl text-ui-blue mb-4">
                            "If you are not a Uite, you are not a Uite. First and Best."
                        </p>
                        <span className="text-sm font-bold text-slate-500 tracking-wider uppercase">— The Anthem</span>
                    </div>
                </div>
             </div>
        </section>

        {/* Leaders / Footer CTA */}
        <section className="py-24 bg-white">
           <div className="container mx-auto px-6 text-center">
                <RevealHeader className="font-serif text-4xl md:text-5xl mb-12 text-ui-blue">Notable Figures</RevealHeader>
                
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center flex-wrap mb-12">
                    <LeaderCard name="Kunle Adepeju" role="The Martyr (1971)" delay="0s" />
                    <LeaderCard name="Segun Okeowo" role="Ali Must Go (1978)" delay="0.1s" />
                    <LeaderCard name="Bolaji Aweda" role="Union President (2024)" delay="0.2s" />
                </div>

                <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 33, 71, 0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setView('history')}
                    className="px-8 py-4 bg-ui-blue text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-nobel-gold hover:text-slate-900 transition-all shadow-lg transform"
                >
                    View All Executives
                </motion.button>
           </div>
        </section>

      </main>

      <footer className="bg-ui-blue text-white py-20 border-t border-white/10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-white text-ui-blue rounded-full flex items-center justify-center font-serif font-bold text-xl">U</div>
                    <div className="text-3xl font-serif font-bold">UISU ARCHIVE</div>
                </div>
                <p className="text-slate-400 max-w-sm">Documenting the history, struggle, and intellectual dominance of the University of Ibadan Students' Union.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-400">
                <a href="#" className="hover:text-nobel-gold transition-colors">Contact</a>
                <a href="#" className="hover:text-nobel-gold transition-colors">Donate</a>
                <a href="#" className="hover:text-nobel-gold transition-colors">Submit History</a>
                <a href="#" className="hover:text-nobel-gold transition-colors">Legal</a>
            </div>
        </div>
        <div className="text-center mt-16 text-xs text-slate-600 tracking-widest uppercase">
            © 2024 UISU Archive Project. Not officially affiliated with the University administration.
        </div>
      </footer>
    </div>
  );
};

export default App;
