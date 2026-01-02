
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { TimelineDiagram, StructureDiagram, PopulationChart } from './components/Diagrams.tsx';
import { CampusMap, HallGrid } from './components/CampusMap.tsx';
import { GovernancePage } from './components/Governance.tsx';
import { PastLeadersPage } from './components/PastLeaders.tsx';
import { DocumentLibrary } from './components/DocumentLibrary.tsx';
import { AnnouncementsPage } from './components/Announcements.tsx';
import { TriviaSection } from './components/Trivia.tsx';
import { CommunitiesPage, ClubDetailPage } from './components/Communities.tsx';
import { TowerScene } from './components/QuantumScene.tsx';
import { ToolsPage } from './components/Tools.tsx';
import { OurPeoplePage } from './components/OurPeople.tsx';
import { Menu, X, BookOpen, ArrowRight, Library, Star, MapPin, Scale, Megaphone, ChevronDown, Users, Mail, Check, Wrench, Quote, Award, ShieldCheck, Fingerprint } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// --- SUB-COMPONENTS ---

const Marquee = () => {
  return (
    <div className="bg-nobel-gold text-ui-blue py-2 overflow-hidden relative z-50 cursor-default">
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
      </div>
    </div>
  );
};

const ParallaxCard = ({ title, subtitle, icon: Icon, color, onClick, progress, index }: any) => {
  const x = useTransform(progress, [0, 1], [index * 50, index * -50]);
  
  return (
    <motion.div 
        style={{ x }}
        whileHover={{ y: -10, scale: 1.02 }}
        onClick={onClick}
        className={`relative w-72 h-96 ${color} flex-shrink-0 cursor-pointer shadow-2xl border border-white/10 overflow-hidden group transition-all duration-500 snap-center rounded-none`}
    >
        <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 text-white">
            <div className="flex justify-between items-start">
                <div className="p-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-none">
                    <Icon size={28} />
                </div>
                <div className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowRight size={18} />
                </div>
            </div>
            
            <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60 mb-3">{subtitle}</p>
                <h3 className="font-serif text-3xl leading-none tracking-tight">{title}</h3>
                <div className="w-0 group-hover:w-12 h-1 bg-nobel-gold mt-4 transition-all duration-500"></div>
            </div>
        </div>
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-black/20 rounded-full blur-3xl group-hover:bg-nobel-gold/10 transition-colors duration-700"></div>
    </motion.div>
  );
};

const ContactForm = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="w-full max-w-lg bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-none border border-white/10 shadow-2xl relative overflow-hidden group">
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-nobel-gold/20 rounded-full blur-3xl group-hover:bg-nobel-gold/30 transition-colors duration-1000"></div>
      <h3 className="font-serif text-3xl mb-2 text-white relative z-10">Get in Touch</h3>
      <p className="text-slate-400 text-sm mb-8 relative z-10">Have questions about the archive or history to share?</p>
      
      {formState === 'success' ? (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-64 flex flex-col items-center justify-center text-center bg-white/5 rounded-none border border-white/5"
        >
            <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                <Check size={32} />
            </div>
            <p className="text-white font-bold text-lg">Message Sent Successfully!</p>
            <p className="text-slate-400 text-sm mt-2">The Secretariat will respond shortly.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Name</label>
                    <input id="name" required type="text" className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-nobel-gold focus:bg-white/10 transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email</label>
                    <input id="email" required type="email" className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-nobel-gold focus:bg-white/10 transition-all" placeholder="uites@edu.ng" />
                </div>
            </div>
            <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Message</label>
                <textarea id="message" required rows={4} className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-nobel-gold focus:bg-white/10 transition-all resize-none" placeholder="Type your message here..."></textarea>
            </div>
            <button type="submit" disabled={formState === 'submitting'} className="w-full bg-nobel-gold text-ui-blue font-bold uppercase tracking-widest py-4 rounded-none hover:bg-white hover:shadow-lg hover:shadow-white/10 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 border border-nobel-gold">
                {formState === 'submitting' ? 'Sending...' : 'Send Message'} 
            </button>
        </form>
      )}
    </div>
  );
};

const RevealHeader = ({ children, className }: { children?: React.ReactNode, className?: string }) => (
  <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, ease: "easeOut" }} className={className}>
    {children}
  </motion.h2>
);

// Added the main App component and exported it as default
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'governance' | 'leaders' | 'docs' | 'announcements' | 'communities' | 'club-detail' | 'tools' | 'people'>('home');
  const [selectedClubId, setSelectedClubId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const navigateTo = (page: any) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const openClubDetail = (id: string) => {
    setSelectedClubId(id);
    setCurrentPage('club-detail');
    window.scrollTo(0, 0);
  };

  if (currentPage === 'governance') return <GovernancePage onBack={() => navigateTo('home')} />;
  if (currentPage === 'leaders') return <PastLeadersPage onBack={() => navigateTo('home')} />;
  if (currentPage === 'docs') return <DocumentLibrary onBack={() => navigateTo('home')} />;
  if (currentPage === 'announcements') return <AnnouncementsPage onBack={() => navigateTo('home')} />;
  if (currentPage === 'communities') return <CommunitiesPage onBack={() => navigateTo('home')} onClubSelect={openClubDetail} />;
  if (currentPage === 'club-detail' && selectedClubId) return <ClubDetailPage clubId={selectedClubId} onBack={() => navigateTo('communities')} />;
  if (currentPage === 'tools') return <ToolsPage onBack={() => navigateTo('home')} />;
  if (currentPage === 'people') return <OurPeoplePage onBack={() => navigateTo('home')} />;

  return (
    <div className="min-h-screen bg-white text-ui-blue font-sans selection:bg-nobel-gold selection:text-ui-blue">
      <Marquee />
      
      {/* Navigation */}
      <nav className="fixed top-12 left-0 right-0 z-[100] px-6 md:px-12 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/80 backdrop-blur-xl border border-ui-blue/10 p-4 md:p-6 pointer-events-auto shadow-2xl">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigateTo('home')}>
             <div className="w-10 h-10 bg-ui-blue flex items-center justify-center text-nobel-gold shadow-lg">
                <Star size={24} fill="currentColor" />
             </div>
             <div>
                <h1 className="text-xl font-serif font-bold tracking-tight leading-none">UISU</h1>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Digital Archive</p>
             </div>
          </div>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.2em]">
            <button onClick={() => navigateTo('governance')} className="hover:text-nobel-gold transition-colors">Governance</button>
            <button onClick={() => navigateTo('leaders')} className="hover:text-nobel-gold transition-colors">Leaders</button>
            <button onClick={() => navigateTo('docs')} className="hover:text-nobel-gold transition-colors">Library</button>
            <button onClick={() => navigateTo('communities')} className="hover:text-nobel-gold transition-colors">Clubs</button>
            <button onClick={() => navigateTo('people')} className="hover:text-nobel-gold transition-colors">People</button>
            <button onClick={() => navigateTo('tools')} className="bg-ui-blue text-white px-6 py-3 hover:bg-nobel-gold hover:text-ui-blue transition-all flex items-center gap-2">
                <Wrench size={12} /> Matrix
            </button>
          </div>

          <button className="lg:hidden p-2 text-ui-blue" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-ui-blue z-[90] flex flex-col items-center justify-center p-12 lg:hidden"
          >
             <div className="flex flex-col gap-8 text-center">
                {['governance', 'leaders', 'docs', 'communities', 'announcements', 'people', 'tools'].map((page) => (
                    <button 
                        key={page}
                        onClick={() => navigateTo(page as any)}
                        className="text-white text-4xl font-serif capitalize hover:text-nobel-gold transition-colors"
                    >
                        {page}
                    </button>
                ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-ui-blue pt-20">
        <div className="absolute inset-0 z-0">
          <TowerScene />
          <div className="absolute inset-0 bg-gradient-to-b from-ui-blue/20 via-transparent to-ui-blue/90"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1 bg-nobel-gold text-ui-blue text-[10px] font-bold uppercase tracking-[0.4em] mb-8">Established 1948</span>
            <h1 className="text-7xl md:text-[10rem] font-serif text-white leading-none tracking-tighter mb-8">
              Aluta <br/> <span className="italic text-nobel-gold opacity-90">Continua</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
              The living history of student activism, intellectual unionism, and the pursuit of excellence at Nigeria's premier university.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button onClick={() => navigateTo('docs')} className="group flex items-center gap-4 bg-white text-ui-blue px-10 py-5 font-bold uppercase tracking-widest text-xs hover:bg-nobel-gold transition-all shadow-2xl">
                Explore The Archive <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button onClick={() => navigateTo('announcements')} className="flex items-center gap-4 border border-white/20 text-white px-10 py-5 font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
                Latest Dispatch <Megaphone size={16} />
              </button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-12 hidden md:block">
            <div className="flex items-center gap-4 text-white/20 text-[10px] font-bold uppercase tracking-[0.5em] rotate-90 origin-left">
                Scroll to delve <ArrowRight size={12} />
            </div>
        </div>
      </header>

      {/* Quick Access Matrix Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <RevealHeader className="text-5xl md:text-7xl font-serif mb-20 text-center">Foundations of <br/><span className="italic text-slate-300">Intellectualism</span></RevealHeader>
          
          <div className="flex overflow-x-auto gap-8 pb-12 snap-x hide-scrollbar">
            <ParallaxCard 
              title="Union Governance" 
              subtitle="The Three Arms" 
              icon={Scale} 
              color="bg-ui-blue" 
              onClick={() => navigateTo('governance')}
              progress={scrollYProgress}
              index={0}
            />
             <ParallaxCard 
              title="Document Library" 
              subtitle="Primary Sources" 
              icon={Library} 
              color="bg-stone-800" 
              onClick={() => navigateTo('docs')}
              progress={scrollYProgress}
              index={1}
            />
             <ParallaxCard 
              title="Past Leaders" 
              subtitle="Hall of Fame" 
              icon={Users} 
              color="bg-ui-blue" 
              onClick={() => navigateTo('leaders')}
              progress={scrollYProgress}
              index={2}
            />
             <ParallaxCard 
              title="Student Tools" 
              subtitle="Matrix Services" 
              icon={Wrench} 
              color="bg-stone-800" 
              onClick={() => navigateTo('tools')}
              progress={scrollYProgress}
              index={3}
            />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div>
                <RevealHeader className="text-5xl md:text-8xl font-serif mb-8 leading-tight">The <br/> Struggle <br/> <span className="italic text-slate-300">Timeline</span></RevealHeader>
                <p className="text-xl text-slate-600 font-light mb-12 leading-relaxed">
                  From the colonial foundations to the modern digital era, the Students' Union has remained the conscience of the university.
                </p>
                <button onClick={() => navigateTo('leaders')} className="text-xs font-bold uppercase tracking-[0.4em] text-ui-blue border-b-2 border-nobel-gold pb-2 hover:text-nobel-gold transition-colors">View All Administrations</button>
             </div>
             <TimelineDiagram />
          </div>
        </div>
      </section>

      {/* Structure Section */}
      <section className="py-32 bg-ui-blue text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-nobel-gold opacity-5 skew-x-12 translate-x-20"></div>
        <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-24">
                <RevealHeader className="text-5xl md:text-7xl font-serif mb-8">Structural Integrity</RevealHeader>
                <p className="text-white/60 text-lg font-light leading-relaxed italic">"Justice and welfare through accountability."</p>
            </div>
            <StructureDiagram />
        </div>
      </section>

      {/* Campus Map Section */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <RevealHeader className="text-5xl md:text-7xl font-serif mb-6">Halls of <br/><span className="italic text-slate-300">Residence</span></RevealHeader>
              <p className="text-slate-500 font-light text-lg">Every hall carries a legacy. Explore the history, motto, and culture of UI's residential units.</p>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <MapPin size={16} /> Campus Geographic Matrix
            </div>
          </div>
          
          <CampusMap />
          <HallGrid />
        </div>
      </section>

      {/* Trivia Section */}
      <TriviaSection />

      {/* Statistics Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
           <PopulationChart />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-ui-blue text-white pt-32 pb-12 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
            <div>
               <h2 className="text-6xl md:text-8xl font-serif mb-12">Preserve <br/> The <span className="italic text-nobel-gold">Legacy</span></h2>
               <p className="text-white/40 text-lg font-light max-w-md mb-12 leading-relaxed">
                 The UISU Digital Archive is a community-driven project. Help us document the struggle and the triumphs of the greatest Uites.
               </p>
               
               <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-nobel-gold">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">Secretariat</div>
                      <div className="text-lg">archive@uisu.ng</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-nobel-gold">
                      <Megaphone size={20} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">Publicity</div>
                      <div className="text-lg">@UISU_Official</div>
                    </div>
                  </div>
               </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <ContactForm />
            </div>
          </div>

          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-nobel-gold text-ui-blue flex items-center justify-center font-bold">U</div>
               <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">© 2024 UISU Digital Secretariat</div>
            </div>
            
            <div className="flex gap-12 text-[9px] font-bold uppercase tracking-widest text-white/30">
               <button className="hover:text-white transition-colors">Privacy Protocol</button>
               <button className="hover:text-white transition-colors">Access Policy</button>
               <button className="hover:text-white transition-colors">Legal Charter</button>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/10">Engineered for Excellence</span>
                <Fingerprint size={16} className="text-white/5" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
