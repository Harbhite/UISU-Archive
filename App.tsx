/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { TimelineDiagram, StructureDiagram, PopulationChart } from './components/Diagrams.tsx';
import { TriviaSection } from './components/Trivia.tsx';
import { TowerScene } from './components/QuantumScene.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { Menu, X, BookOpen, ArrowRight, Star, MapPin, Wrench, Users, Mail, Check, Award, ShieldCheck, Building2, Palette, AlertCircle, ChevronDown, Scale, Gavel, BrainCircuit, Sparkles, Loader2, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// --- PERFORMANCE: LAZY LOADING COMPONENTS ---
const GovernancePage = lazy(() => import('./components/Governance.tsx').then(m => ({ default: m.GovernancePage })));
const PastLeadersPage = lazy(() => import('./components/PastLeaders.tsx').then(m => ({ default: m.PastLeadersPage })));
const DocumentLibrary = lazy(() => import('./components/DocumentLibrary.tsx').then(m => ({ default: m.DocumentLibrary })));
const AnnouncementsPage = lazy(() => import('./components/Announcements.tsx').then(m => ({ default: m.AnnouncementsPage })));
const ToolsPage = lazy(() => import('./components/Tools.tsx').then(m => ({ default: m.ToolsPage })));
const OurPeoplePage = lazy(() => import('./components/OurPeople.tsx').then(m => ({ default: m.OurPeoplePage })));
const ConstitutionPage = lazy(() => import('./components/Constitution.tsx').then(m => ({ default: m.ConstitutionPage })));
const AIQuizPage = lazy(() => import('./components/AIQuiz.tsx').then(m => ({ default: m.AIQuizPage })));
const StudyBuddyPage = lazy(() => import('./components/StudyBuddy.tsx').then(m => ({ default: m.StudyBuddyPage })));
const CommunitiesPage = lazy(() => import('./components/Communities.tsx').then(m => ({ default: m.CommunitiesPage })));
const ClubDetailPage = lazy(() => import('./components/Communities.tsx').then(m => ({ default: m.ClubDetailPage })));
const HallsPage = lazy(() => import('./components/Halls.tsx').then(m => ({ default: m.HallsPage })));
const HallDetailPage = lazy(() => import('./components/Halls.tsx').then(m => ({ default: m.HallDetailPage })));
const StyleGuidePage = lazy(() => import('./components/StyleGuide.tsx').then(m => ({ default: m.StyleGuidePage })));

const LoadingModule = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center">
    <Loader2 className="animate-spin text-nobel-gold mb-4" size={40} />
    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">Loading Registry Artifact...</span>
  </div>
);

const Marquee = () => (
  <div className="bg-nobel-gold text-ui-blue py-2 overflow-hidden relative z-50 cursor-default">
    <div className="animate-marquee whitespace-nowrap flex gap-8 items-center font-bold text-xs tracking-[0.2em] uppercase">
      {Array.from({ length: 10 }).map((_, i) => (
        <React.Fragment key={i}>
          <span>First and Best</span> <Star size={10} fill="currentColor" />
          <span>The Greatest Uites</span> <Star size={10} fill="currentColor" />
          <span>Father of Intellectual Unionism</span> <Star size={10} fill="currentColor" />
          <span>Est. 1948</span> <Star size={10} fill="currentColor" />
        </React.Fragment>
      ))}
    </div>
  </div>
);

const ParallaxCard = ({ title, subtitle, icon: Icon, color, onClick, progress, index }: any) => {
  const x = useTransform(progress, [0, 1], [index * 50, index * -50]);
  return (
    <motion.div 
        style={{ x }} whileHover={{ y: -10, scale: 1.02 }} onClick={onClick}
        className={`relative w-72 h-96 ${color} flex-shrink-0 cursor-pointer shadow-2xl border border-white/10 overflow-hidden group transition-all duration-500 snap-center rounded-none`}
    >
        <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 text-white">
            <div className="flex justify-between items-start">
                <div className="p-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-none"><Icon size={28} /></div>
                <div className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"><ArrowRight size={18} /></div>
            </div>
            <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60 mb-3">{subtitle}</p>
                <h3 className="font-serif text-3xl leading-none tracking-tight">{title}</h3>
                <div className="w-0 group-hover:w-12 h-1 bg-nobel-gold mt-4 transition-all duration-500"></div>
            </div>
        </div>
    </motion.div>
  );
};

const RevealHeader = ({ children, className }: any) => (
  <motion.h2 
    initial={{ opacity: 0, y: 30 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true }} 
    className={className}
  >
    {children}
  </motion.h2>
);

const ContactForm = () => {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('submitting');
        setTimeout(() => setFormState('success'), 1500);
    };

    if (formState === 'success') return (
        <div className="h-64 flex flex-col items-center justify-center text-center bg-white/5 border border-white/5 p-10">
            <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4"><Check size={32} /></div>
            <p className="text-white font-bold">Protocol Transmitted.</p>
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-5 bg-white/5 p-10 border border-white/10 relative overflow-hidden group">
            <h3 className="font-serif text-3xl text-white mb-8">Archives Inquiry</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input required className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-nobel-gold" placeholder="Name" />
                <input required type="email" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-nobel-gold" placeholder="Email" />
            </div>
            <textarea required rows={4} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-nobel-gold resize-none" placeholder="Message"></textarea>
            <button className="w-full bg-nobel-gold text-ui-blue font-bold uppercase tracking-widest py-4 hover:bg-white transition-all border border-nobel-gold">
                {formState === 'submitting' ? 'Transmitting...' : 'Dispatch Signal'}
            </button>
        </form>
    );
};

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'governance' | 'history' | 'documents' | 'announcements' | 'communities' | 'club-detail' | 'tools' | 'people' | 'halls' | 'hall-detail' | 'style-guide' | 'constitution' | 'ai-quiz' | 'ai-explainer'>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedClubId, setSelectedClubId] = useState<string | null>(null);
  const [selectedHallId, setSelectedHallId] = useState<string | null>(null);
  
  // --- NAVIGATION VISIBILITY LOGIC (SCROLL) ---
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // Instruction: Go away while scrolling up and come back while scrolling down
      if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setNavVisible(true);
      } else {
        // Scrolling up
        if (currentScrollY > 100) { // Only hide if we've scrolled a bit
            setNavVisible(false);
        } else {
            setNavVisible(true);
        }
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start end", "end start"] });

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [view]);

  const Shell = ({ children }: { children?: React.ReactNode }) => (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-nobel-gold selection:text-white overflow-x-hidden pt-32">
        <Marquee />
        
        {/* PERSISTENT ROUNDED MENU BUTTON --- SCROLL SENSITIVE --- */}
        <AnimatePresence>
            {/* Always render the floating button */}
            <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ 
                    y: navVisible ? 0 : 100, 
                    opacity: navVisible ? 1 : 0 
                }}
                exit={{ y: 50, opacity: 0 }}
                className="fixed bottom-10 right-10 z-[110]"
            >
                <button 
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="bg-ui-blue text-nobel-gold w-16 h-16 flex items-center justify-center shadow-2xl border-2 border-nobel-gold/50 rounded-full group hover:bg-nobel-gold hover:text-ui-blue transition-all duration-300"
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </motion.div>
        </AnimatePresence>

        {/* FULL NAVBAR ON HOME --- SCROLL SENSITIVE --- */}
        <AnimatePresence>
            {view === 'home' && (
                <motion.nav 
                    initial={{ y: -100 }}
                    animate={{ y: navVisible ? 20 : -100 }}
                    className="fixed top-0 left-1/2 -translate-x-1/2 z-[100]"
                >
                    <div className="flex items-center gap-6 bg-slate-900/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-2xl text-white">

                        <motion.button 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }} 
                            onClick={() => setMenuOpen(!menuOpen)} 
                            className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-nobel-gold transition-colors"
                        >
                            <Menu size={18} />
                            <span>Menu</span>
                        </motion.button>

                        <div className="h-6 w-px bg-white/20"></div>

                        <motion.div whileHover={{ scale: 1.1 }} onClick={() => setView('home')} className="flex items-center gap-3 cursor-pointer">
                            <div className="w-8 h-8 bg-nobel-gold flex items-center justify-center text-ui-blue shadow-lg font-serif font-bold italic text-lg rounded-sm">U</div>
                        </motion.div>

                        <div className="h-6 w-px bg-white/20"></div>

                        <div className="flex items-center gap-6">
                            <button onClick={() => setView('ai-explainer')} className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-nobel-gold transition-colors"><Sparkles size={14} /> Study</button>
                            <button onClick={() => setView('ai-quiz')} className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-nobel-gold transition-colors"><BrainCircuit size={14} /> Quiz</button>
                        </div>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>

        {/* Global Navigation Menu */}
        <AnimatePresence>
            {menuOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-slate-950/98 backdrop-blur-3xl z-[150] flex items-center justify-center p-6 md:p-20"
                >
                    <button onClick={() => setMenuOpen(false)} className="absolute top-8 right-8 md:top-12 md:right-12 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all group border border-white/5 hover:border-nobel-gold/50">
                        <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                    </button>

                    <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
                        <div className="hidden md:flex md:col-span-5 flex-col justify-center border-r border-white/5 pr-12 py-12 relative">
                            <div className="absolute top-0 left-0 w-20 h-1 bg-nobel-gold"></div>
                            <div>
                                <div className="text-nobel-gold text-xs font-bold uppercase tracking-[0.6em] mb-6">The Registry</div>
                                <h2 className="text-5xl lg:text-7xl font-serif text-white mb-8 italic leading-[0.9]">Union <br/> <span className="text-slate-500">Legacy</span></h2>
                                <p className="text-slate-400 max-w-sm leading-relaxed text-lg font-light">Navigating the intellectual and cultural heritage of the First and Best.</p>
                            </div>
                            <div className="mt-24 flex gap-4">
                                <div className="p-4 rounded-full bg-white/5 border border-white/5"><Star size={20} className="text-nobel-gold" /></div>
                                <div className="p-4 rounded-full bg-white/5 border border-white/5"><Scale size={20} className="text-slate-400" /></div>
                                <div className="p-4 rounded-full bg-white/5 border border-white/5"><Building2 size={20} className="text-slate-400" /></div>
                            </div>
                        </div>

                        <nav className="md:col-span-7 flex flex-col justify-center gap-2">
                            {[
                               { id: 'home', label: 'Archival Home', icon: Star },
                               { id: 'ai-explainer', label: 'StudyBuddy Matrix', icon: Sparkles },
                               { id: 'ai-quiz', label: 'AI Quiz Matrix', icon: BrainCircuit },
                               { id: 'tools', label: 'Uite Matrix', icon: Wrench },
                               { id: 'people', label: 'Executive Registry', icon: Users },
                               { id: 'halls', label: 'The Hall Republics', icon: Building2 },
                               { id: 'announcements', label: 'Official Dispatch', icon: Mail },
                               { id: 'constitution', label: 'Union Constitution', icon: Scale },
                            ].map((v, i) => (
                                <motion.button
                                    key={v.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 + 0.2 }}
                                    onClick={() => {setMenuOpen(false); setView(v.id as any)}}
                                    className={`group flex items-center gap-6 p-4 rounded-xl transition-all hover:bg-white/5 text-left w-full`}
                                >
                                    <span className={`text-2xl md:text-4xl font-serif ${view === v.id ? 'text-nobel-gold italic' : 'text-slate-400 group-hover:text-white group-hover:italic'} transition-all duration-300`}>{v.label}</span>
                                    <div className="h-px bg-white/10 flex-1 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                                    <v.icon size={20} className={`opacity-0 group-hover:opacity-100 text-nobel-gold transition-all duration-300 -translate-x-4 group-hover:translate-x-0`} />
                                </motion.button>
                            ))}
                        </nav>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Content Area wrapped in Error Boundary & Suspense */}
        <main className={view !== 'home' ? 'pt-10' : ''}>
            <ErrorBoundary>
                <Suspense fallback={<LoadingModule />}>
                    {children}
                </Suspense>
            </ErrorBoundary>
        </main>

        {/* FOOTER ONLY ON HOME */}
        <AnimatePresence>
            {view === 'home' && (
                <footer className="bg-ui-blue text-white pt-32 pb-12 border-t border-white/10 relative overflow-hidden mt-20">
                    <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
                        <ContactForm />
                        <div className="flex flex-col justify-between py-6">
                            <div>
                                <div className="flex items-center gap-4 mb-8">
                                    <span className="font-serif text-4xl font-bold italic text-nobel-gold border-b-2 border-nobel-gold pb-1">U</span>
                                    <span className="font-serif text-4xl font-bold tracking-tighter">UISU Archive</span>
                                </div>
                                <p className="text-slate-400 text-xl leading-relaxed font-light mb-12">Safeguarding the intellectual and cultural lineage of the First and Best union in the land.</p>
                                <div className="space-y-4 text-slate-300 font-mono text-xs uppercase tracking-widest">
                                    <div className="flex items-center gap-4"><MapPin size={18} className="text-nobel-gold" /> Kunle Adepeju Building, Ibadan</div>
                                    <div className="flex items-center gap-4"><Mail size={18} className="text-nobel-gold" /> archives.sec@uisu.org</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex justify-between text-[9px] uppercase tracking-[0.4em] text-slate-500">
                        <span>© {new Date().getFullYear()} Secretariat Archives</span>
                        <span>Aluta Continua • Victoria Ascerta</span>
                    </div>
                </footer>
            )}
        </AnimatePresence>
    </div>
  );

  const HomeView = () => (
    <>
      <header className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-20 overflow-hidden bg-white">
        <div className="container mx-auto px-6 text-center relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-6">
                <motion.h1 initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="text-7xl md:text-9xl font-bold tracking-tighter text-ui-blue">UNION</motion.h1>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="6xl md:text-8xl text-nobel-gold"><Star size={80} fill="currentColor" /></motion.div>
                <motion.h1 initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="text-7xl md:text-9xl font-serif italic text-ui-blue">Legacy</motion.h1>
            </div>
            <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-16 leading-relaxed font-light">Documenting the <span className="text-ui-blue font-bold">Intellectual Vanguard</span> and the Aluta spirit of the University of Ibadan since 1948.</p>
            
            <div ref={scrollRef} className="w-full relative mt-12 md:mt-24">
                <div className="flex overflow-x-auto gap-8 pb-12 px-6 no-scrollbar snap-x snap-mandatory">
                    <ParallaxCard index={0} progress={scrollYProgress} title="StudyBuddy" subtitle="AI Study Suite" icon={Sparkles} color="bg-indigo-900" onClick={() => setView('ai-explainer')} />
                    <ParallaxCard index={1} progress={scrollYProgress} title="Our People" subtitle="Executive Branch" icon={Users} color="bg-ui-blue" onClick={() => setView('people')} />
                    <ParallaxCard index={2} progress={scrollYProgress} title="The Nations" subtitle="Hall Republics" icon={Building2} color="bg-stone-800" onClick={() => setView('halls')} />
                    <ParallaxCard index={3} progress={scrollYProgress} title="Uite Matrix" subtitle="Function Modules" icon={Wrench} color="bg-zinc-900" onClick={() => setView('tools')} />
                </div>
            </div>
        </div>
      </header>

      <main>
        <section className="py-32 bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
            <div className="md:col-span-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-nobel-gold mb-6 block">Foundation Protocol</span>
              <h2 className="font-serif text-6xl text-ui-blue leading-[0.9] mb-8 italic">The Father of <br/> Intellectual Unionism.</h2>
              <div className="w-24 h-1 bg-ui-blue mb-8"></div>
              <p className="text-lg text-slate-500 font-medium">1948 — Established as the first student government in West Africa.</p>
            </div>
            <div className="md:col-span-7 text-xl text-slate-800 leading-relaxed space-y-8 font-light italic">
              <p>The University of Ibadan Students' Union is more than a body; it is a repository of struggle, character, and administrative excellence.</p>
              <p>From the anti-colonial era to the restoration of democracy, Uites have remained the conscience of the nation. This digital archive is the living testament to that vanguard.</p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white"><div className="container mx-auto px-6"><TimelineDiagram /></div></section>
        <section className="py-24 bg-slate-50"><div className="container mx-auto px-6"><StructureDiagram /></div></section>
        <section className="py-24 bg-ui-blue text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
                <RevealHeader className="text-5xl md:text-7xl font-serif mb-12 italic text-nobel-gold">Aluta Continua, <br/> Victoria Ascerta.</RevealHeader>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-12 border-t border-white/10">
                    {[ {l:'Founded',v:'1948'}, {l:'Artifacts',v:'12k+'}, {l:'Constituencies',v:'17+'}, {l:'Vanguard',v:'35k'} ].map((s,i) => (
                        <div key={i}>
                            <div className="text-3xl font-serif text-white">{s.v}</div>
                            <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500 mt-2">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        <section className="py-24 bg-white border-b border-slate-200"><div className="container mx-auto px-6"><PopulationChart /></div></section>
        <TriviaSection />
        <section className="py-24 bg-white">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <div className="aspect-[4/5] bg-slate-50 relative overflow-hidden border border-slate-200"><TowerScene /></div>
                <div>
                    <h2 className="font-serif text-6xl text-ui-blue mb-8">Cultural <br/> <span className="italic text-slate-300">Resonance</span></h2>
                    <p className="text-xl text-slate-600 font-light leading-relaxed italic mb-8">"The greatest weapon against tyranny is the sharp mind of the intellectual."</p>
                    <div className="p-8 border-l-4 border-nobel-gold bg-slate-50 font-bold text-xs uppercase tracking-[0.3em] text-ui-blue shadow-inner">Secretariat System Protocol v4.0.8</div>
                </div>
             </div>
        </section>
      </main>
    </>
  );

  const renderContent = () => {
    switch (view) {
      case 'home': return <HomeView />;
      case 'governance': return <GovernancePage onBack={() => setView('home')} />;
      case 'history': return <PastLeadersPage onBack={() => setView('home')} />;
      case 'documents': return <DocumentLibrary onBack={() => setView('home')} />;
      case 'announcements': return <AnnouncementsPage onBack={() => setView('home')} />;
      case 'tools': return <ToolsPage onBack={() => setView('home')} />;
      case 'people': return <OurPeoplePage onBack={() => setView('home')} />;
      case 'style-guide': return <StyleGuidePage onBack={() => setView('home')} />;
      case 'constitution': return <ConstitutionPage onBack={() => setView('home')} />;
      case 'ai-quiz': return <AIQuizPage onBack={() => setView('home')} />;
      case 'ai-explainer': return <StudyBuddyPage onBack={() => setView('home')} />;
      case 'communities': return <CommunitiesPage onBack={() => setView('home')} onClubSelect={(id) => { setSelectedClubId(id); setView('club-detail'); }} />;
      case 'club-detail': return selectedClubId ? <ClubDetailPage clubId={selectedClubId} onBack={() => setView('communities')} /> : <HomeView />;
      case 'halls': return <HallsPage onBack={() => setView('home')} onHallSelect={(id) => { setSelectedHallId(id); setView('hall-detail'); }} />;
      case 'hall-detail': return selectedHallId ? <HallDetailPage hallId={selectedHallId} onBack={() => setView('halls')} /> : <HomeView />;
      default: return <HomeView />;
    }
  };

  return <Shell>{renderContent()}</Shell>;
};

export default App;